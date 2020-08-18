// vim: sw=4 ts=4 expandtab
// TODO: Simplify Those up, up_property, up_edit, functions in a single one
function up(){
    saveUserForm.submit();
}

function up_property(){
    validate_lands();
    savePropertyForm.submit();
}

function load_properties(){
    ajax("GET", "property_menu", "", function(response){
        properties.innerHTML = response
    });
    ajax("GET", "userSelect", "", function(response){
        list_users.innerHTML = response;
    });    
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
                selectElement("role_show_id", parseInt(show_id_role.value));
                remove(userList);
                show(user);
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
    var lands = document.getElementById("lands");
    var clone_name_land = lands.children.name_land.cloneNode(true);
    var clone_hec_land = lands.children.hec_land.cloneNode(true);
    lands.appendChild(clone_name_land);
    lands.appendChild(clone_hec_land);
}

function validate_lands() {
    var inputs = lands.querySelectorAll("input");
    var j_lands = []
    var l_name = "";
    var l_hec = "";
    for(var i = 0; i<inputs.length; i++){
        var e = inputs[i];
        if(e.name == "name_land_1") {
            l_name = e.value;
            e.disable = true;
        }else if (e.name == "hec_land_1"){
            l_hec = e.value;
            e.disable = true;
            j_lands.push({land_name:l_name, land_ha: l_hec});
        }
    }
    l_lands.value = JSON.stringify(j_lands);
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
    selectElement("role_edit_id", parseInt(edit_id_role.value));

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

