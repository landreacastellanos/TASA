// vim: sw=4 ts=4 expandtab
function up(){
    saveUserForm.submit();
}

function up_edit() {
   updateUserForm.submit(); 
}

function show_user() {
    var table = document.getElementById("userlist");
    var checkbox_input = table.querySelectorAll('input[type=checkbox]');
    for(var i = 0; i < checkbox_input.length; i ++) {
        var input = checkbox_input[i];
        if(input.checked == true) {
            ajax("GET", "user?user="+input.value, "", function(response){
                showUser.innerHTML = response;
                selectElement("role_id", parseInt(id_role.value));
                remove(userList);
                show(user);
                selectElement("role_id", parseInt(id_role.value));
            });
        }
        //console.log(checkbox_input[i]); 
    }
}

function list() {
    remove(profiles)
    show(userList);
    ajax("POST", "userList", "", function(response){
       userlist.innerHTML = response;
    })
    
}

function create(type, classlist) {
    var element = document.createElement(type);
    for(var i = 0; i < classlist.length; i++){
        addClass(element, classlist[i]);
    }
    return element
}

function appendchild(element, node) {
    element.appendChild(node);
}

function add() {
    var classArray = ["form-group", "col-md-4"]
    var land_group = create("div", classArray)
    var ha_group = create("div", classArray)
    var hide_group = create("div", classArray)

    var classinput = ["form-control", "form-control-lg"]
    var land_input = create("input", classinput);
    var ha_input = create("input", classinput);

    var label_land = document.createElement("label");
    var label_ha = document.createElement("label");
    label_land.innerText = "Nombre del Lote";
    label_ha.innerText = "Hectareas del Lote";

    land_group.appendChild(label_land);
    land_group.appendChild(land_input);
    
    ha_group.appendChild(label_ha);
    ha_group.appendChild(ha_input);

    land.appendChild(land_group);
    land.appendChild(ha_group);
    land.appendChild(hide_group);
}


function edit() {
    var table = document.getElementById("userlist");
    var checkbox_input = table.querySelectorAll('input[type=checkbox]');
    for(var i = 0; i < checkbox_input.length; i ++) {
        var input = checkbox_input[i];
        if(input.checked == true) {
            ajax("GET", "userList?user="+input.value, "", fill_data);
        }
        //console.log(checkbox_input[i]); 
    }
    editUser.classList.remove("hide");
}

function fill_data(response) {
    addClass(panel_list, "hide");
    editUser.innerHTML = response;
    btn_approve.classList.remove("hide");
    selectElement("role_id", parseInt(id_role.value));

}

function f_home() {
    var active_content = document.querySelectorAll("div.tab-content>.show")[0];
    // document.querySelectorAll("div.tab-content>.tab-pane>.hide")
    // var active_sub_content = document.querySelectorAll("div.tab-content>.hide")[0];
    panel_list.classList.remove("hide");
    var active_header = document.querySelectorAll(".navbar-nav>li.nav-item>.active")[0];
    addClass(editUser, "hide")
    remove(active_content);   
    remove(active_header);
    show(home);
    show(home_tab);
}

// Only apply this functions for tab-panel or if there a class name fade
function show(element){
    element.classList.add("show");
    element.classList.add("active");
}

function remove(element) {
    element.classList.remove("show");
    element.classList.remove("active");
}

function addClass(element, class_name) {
    element.classList.add(class_name);
}

function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
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

