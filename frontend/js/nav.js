// vim: sw=4 ts=4 expandtab

var main_url="http://0.0.0.0:5000/";
function main(){
    add_events("click",document.querySelectorAll("[rel='addProperty']"),dashf.bind(this, addProperty));
    add_events("click",document.querySelectorAll("[rel='listProperties']"),dashf.bind(this, listProperties));
    add_events("click",document.querySelectorAll("[rel='addUser']"),dashf.bind(this, addUser));
    add_events("click",document.querySelectorAll("[rel='userList']"),user_list.bind(this, userList));
}

function user_list(item, element) {
    var id = item.getAttribute("id");
    clean(id);
    item.classList.add("show");

    ajax("POST", "userList", "", function(response){
       userlist.innerHTML = response;
    })
}


function fill_data(response) {
    editUser.classList.remove("hide");
    editUser.classList.add("show");
    editUser.innerHTML = response;
    selectElement("role_id", parseInt(id_role.value));
}

function edit(email) {
    clean(userList);
    ajax("GET", "userList?user="+email, "", fill_data);
}

function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

function dashf(item, element){
	var id = item.getAttribute("id"); 
	clean(id)
	item.classList.add("show")
}

function add_events(type_evt,elments,funct){
    var element;
    for(var i = 0; i < elments.length; i++){
        element = elments[i];
        element.addEventListener(type_evt,funct);
    }
}

function clean(id){
    var el = document.getElementsByClassName("custom-item");
    for(var i = 0; i< el.length; i++){
        el[i].classList.remove('show');
	el[i].classList.add('hide');
    }
    var side = document.querySelectorAll(".sidebar [rel]");
    for(var i = 0; i<side.length; i++){
        side[i].parentElement.classList.remove("show");
    }
}


function ajax(method,url,json,callback){
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open(method, url);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if(json != null) {
        xmlhttp.send(json);
    }else{
        xmlhttp.send();
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            callback(this.response);
        }
    };
}
