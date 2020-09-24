import jwt
import time
from flask import Flask
from flask_mail import Mail
from flask import request, session, redirect, url_for, render_template, flash
from flask_sqlalchemy import SQLAlchemy
from switch import switch

import funcs
import i18n
import send_email
import query
import json

app = Flask(__name__, static_url_path="", static_folder="../frontend")
app.template_folder = "../frontend"
app.secret_key = b'#$somestrangesupersecrethashautogenerated!/___'

INSERT = 0
UPDATE = 1
SEARCH = 2
DELETE = 3
STAGE = 4

UPLOAD_FOLDER = '../images_stages/'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:Admin123.@localhost/tasa'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'digitaltasa@gmail.com'
app.config['MAIL_PASSWORD'] = 'Abc.123@?'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
mail = Mail()
app.app_context().push()
db = SQLAlchemy(app)
mail.init_app(app)


@app.route('/ping', methods=['GET', 'POST'])
def ping():
    return 'Hello, World!'


@app.route('/')
def index():
    if 'user' not in session:
        return render_template('/index.html')
    return render_template("main.html", user=session["user"])
    # return "Welcome: " + session["user"]


@app.route('/saveUser', methods=['POST'])
def saveUser():
    is_logged = funcs.validateSession(session)
    if is_logged == -1:
        return "<script> location.href=\'/index.html\' </script>"
    dict_form = funcs.parseForm(request.form, funcs.saveUser, INSERT)
    if dict_form == -1:
        print(dict_form)
        return "<script> alert('El usuario ya existe en el sistema'); location.href=\'/\'; </script>"
    return "<script> alert('"+dict_form+"'); location.href=\'/\'; </script>"


@app.route('/updateUser', methods=['POST'])
def updateUser():
    if funcs.validateSession(session) == -1:
        return "Please Login"
    # Parse Form
    result = funcs.parseForm(request.form, funcs.updateUser, UPDATE)
    if result == -1:
        return "<script> alert('Some Error Happend, Please Contact the Admin') </script>"
    # "<script> alert('"+result+"'); location.href=\'/\'; </script>"
    return render_template("main.html", user=session["user"], action=UPDATE)


@app.route('/property', methods=['GET', 'POST'])
def propertyList():
    if request.method == "GET":
        property_id = request.args.get("id")
        offset = request.args.get("offset")
        property_dict = funcs.searchPropertyById(property_id, offset)
        return render_template("property.html", property_dict=property_dict[0], i18n=i18n.i18n)


@app.route('/land', methods=['GET'])
def landView():
    property_id = request.args.get("id")
    land_id = request.args.get("land_id")
    q = query.getPropertyLandCalendar(property_id, land_id)
    html = funcs.searchLandByPropertyId(q)
    filled_stages = funcs.search_property_procedure(property_id, land_id)
    filled_stages = json.dumps(filled_stages)
    if html == -1:
        return "<script> alert('Lote no encontrado, refresque la pagina') </script>"
    return render_template("land_view.html", land=html[0], stages=filled_stages, i18n=i18n.i18n)


@app.route("/property_menu", methods=['GET'])
def printPropertyMenu():
    propertyList = funcs.getPropertiesName()
    if propertyList == -1:
        return "Aún no hay propiedades"
    propertyLand = funcs.getLandByProperty()
    return render_template("property_menu.html", property_list=propertyList, property_land=propertyLand)


# TODO: Add Documentation of the endpoints of the api
# TODO: Create i18n for responses and headers
@app.route('/userList', methods=['GET', 'POST'])
def userList():
    if funcs.validateSession(session) == -1:
        return "Please Login"
    response = {}
    if request.method == "GET":
        offset = request.args.get("offset")
        response = funcs.userList(offset)
        return render_template("table.html", user_list=response)
    if request.method == "POST":
        response = funcs.userList()
    return render_template("table.html", user_list=response)


@app.route('/editUser', methods=['GET', 'POST'])
def editUser():
    user = request.args.get("user")
    response = funcs.userList(user=user)
    return render_template("user.html", user=response[0], i18n=i18n.i18n)


@app.route('/deleteUser', methods=['DELETE'])
def deleteUser():
    if funcs.validateSession(session) == -1:
        return "Please Login"
    response = {}
    if request.method == "DELETE":
        user = request.args.get("user")
        result = funcs.deactivateUser(user)
        response = funcs.userList()
    return render_template("table.html", user_list=response)


@app.route('/user', methods=["GET"])
def showUser():
    if request.method == "GET":
        user = request.args.get("user")
        response = funcs.userList(user=user)
        return render_template("show_user.html", user=response[0], i18n=i18n.i18n)


# TODO: Validate LOGIN
@app.route('/save_property', methods=['POST'])
def save_property():
    if funcs.validateSession(session) == -1:
        return "Please Login"

    response = funcs.parseForm(request.form, funcs.saveProperty, INSERT)
    print(response)
    if response != 1:
        flash('No se Pudo Crear la Finca')
        return redirect(url_for('index'))
    return "<script> alert('La finca fue Creada'); location.href=\"/\" </script>"


@app.route('/see_stage', methods=['GET', 'POST'])
def seeStage():
    stage_id = request.args.get("stage_id")
    type_planting = request.args.get("type_planting")
    property_id = request.args.get("property_id")
    land_name = request.args.get("land_name")
    # print(stage_id, sowing_system(type_planting), property_id, land_name)
    type_planting = i18n.sowing_system(type_planting)
    stageProducts, propertyLand, segment_days = funcs.getStageByProperty(
                                                            stage_id,
                                                            type_planting,
                                                            property_id,
                                                            land_name)
    if int(stage_id) != 14: # 14 is sowing date segment id
        return render_template("property_stage.html",
                                                stage=stageProducts[0],
                                                property_land=propertyLand[0],
                                                i18n=i18n.i18n,
                                                segment_days=segment_days)
    else:
        return render_template("burning_stage.html",
                                                 stage=stageProducts[0],
                                                 property_land=propertyLand[0],
                                                 i18n=i18n.i18n)


    # with switch(int(stage_id)) as s:
    #    if s.case(1, True):
    #        return render_template("property_stage.html",
    #                                            stage=stageProducts[0],
    #                                            property_land=propertyLand[0],
    #                                            i18n=i18n.i18n)
    #    if s.case(14, True):
    #        return render_template("burning_stage.html",
    #                                             stage=stageProducts[0],
    #                                             property_land=propertyLand[0],
    #                                             i18n=i18n.i18n)


@app.route('/add_stage', methods=['GET', 'POST'])
def addStage():
    form = request.form
    stage_id = request.form['stage_id']
    print("form2", form)
    # with switch(int(stage_id)) as s:
    if int(stage_id) != 14:
        files = request.files.getlist('files')
        result = funcs.addStageProperty(form, files)
        if result == -1:
            print("Error Reported")
            return "<script> alert('Ocurrio un Error');location.href='/';</script>"
        ln = request.form['land_id']
        pid = request.form['property_id']
        return render_template("main.html", user=session["user"],
                                    action=STAGE, property_id=pid, land_id=ln)

    else:
        variety_land = request.form['variety_land']
        seedtime = request.form['seedtime']
        land_id = request.form['land_id']
        result = funcs.updateSeedtimeByLandId(land_id, seedtime)
        if result == -1:
            print("Error Reported")
            return "<script> alert('Ocurrio un Error');location.href='/';</script>"
        return "<script> alert('Se ha guardado la fecha');location.href='/';</script>"


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "GET":
        return render_template('/index.html')
    else:
        dict_form = funcs.parseForm(request.form, funcs.searchUser, SEARCH)
        if dict_form != -1:
            session['user'] = dict_form["email"]
            session['role'] = dict_form["role_id"]
            session['user_id'] = dict_form["id"]
            return redirect(url_for('index'))

        flash('Usuario no se encuentra en el sistema')
        return render_template('/index.html')

@app.route('/reset_password', methods=['GET', 'POST'])
def reset_password():
    if request.method == "GET":
        return render_template('/reset_password.html')


    if request.method == "POST":
        dict_form = funcs.parseForm(request.form, funcs.searchUserByEmail, SEARCH)
        if dict_form != -1:
            email = dict_form["user"]
            token = get_reset_token(email)
            recover_url = url_for(
            'reset_with_token',
            token=token,
            _external=True)
            send_email.welcome_mail(email, recover_url)
            flash('Hemos enviado un link al correo registrado')
            return render_template('/index.html')
        
        flash('Este correo no se encuentra registrado')
        return render_template('/reset_password.html')

def get_reset_token(self, expires=5000):
    return jwt.encode({'reset_password': self,
                           'exp':    time.time() + expires},
                           key=app.secret_key)

@app.route('/reset/<token>', methods=["GET", "POST"])
def reset_with_token(token):
    if request.method == "GET":
        try:
            username = jwt.decode(token,
                key=app.secret_key)['reset_password']
        except Exception as e:
            print(e)
            return

        user = {"user":username}
        return render_template('email/reset_with_token.html', token=token)
    if request.method == "POST":
        new_password = request.form['password']
        token = request.form['token']
        email = jwt.decode(token,
                key=app.secret_key)['reset_password']

        result = funcs.updateUserPasswordByEmail(email, new_password)
        flash('Se ha restaurado la contraseña')
        return redirect(url_for('index'))


@app.route('/userSelect', methods=["GET"])
def printSelect():
    html = funcs.listOfUsers()
    return html


@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('user', None)
    session.pop('role', None)
    session.pop('user_id', None)
    return redirect(url_for('login'))
