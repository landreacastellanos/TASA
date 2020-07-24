from flask import Flask
from flask import request, session, redirect, url_for, render_template

import funcs

app = Flask(__name__, static_url_path="", static_folder="../frontend")
app.template_folder = "../frontend"
app.secret_key = b'#$somestrangesupersecrethashautogenerated!/___'

INSERT = 0
UPDATE = 1
SEARCH = 2
DELETE = 3


@app.route('/ping', methods=['GET', 'POST'])
def ping():
    return 'Hello, World!'


@app.route('/')
def index():
    if 'user' not in session:
        return "<script> location.href=\'/index.html\' </script>"
    return render_template("main.html", user=session["user"])
    # return "Welcome: " + session["user"]


@app.route('/saveUser', methods=['POST'])
def saveUser():
    is_logged = funcs.validateSession(session)
    if is_logged == -1:
        return "<script> location.href=\'/index.html\' </script>"
    dict_form = funcs.parseForm(request.form, funcs.saveUser, INSERT)
    if dict_form == -1:
        return "Sorry The User Already exists."
    return dict_form


@app.route('/updateUser', methods=['POST'])
def updateUser():
    if funcs.validateSession(session) == -1:
        return "Please Login"
    # Parse Form
    result = funcs.parseForm(request.form, funcs.updateUser, UPDATE)
    if result == -1:
        return "Some Error Happend, Please Contact the Admin"
    return result


@app.route('/userList', methods=['GET', 'POST'])
def userList():
    if funcs.validateSession(session) == -1:
        return "Please Login"
    response = {}
    if request.method == "GET":
        user = request.args.get("user")
        response = funcs.userList(user)
    if request.method == "POST":
        response = funcs.userList()
    return render_template("table.html", user_list=response)


# TODO: Validate LOGIN
@app.route('/save_property', methods=['POST'])
def save_property():
    if funcs.validateSession(session) == -1:
        return "Please Login"

    funcs.parseForm(request.form, funcs.saveProperty, INSERT)
    return "Wait.."


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "GET":
        return "<script> location.href=\'/index.html\' </script>"
    else:
        dict_form = funcs.parseForm(request.form, funcs.searchUser, SEARCH)
        if dict_form != -1:
            session['user'] = dict_form["email"]
            return redirect(url_for('index'))

        return '''<script>
            alert("You are not enable in the login");
            location.href=\'/index.html\' </script>'''


@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('user', None)
    return redirect(url_for('login'))
