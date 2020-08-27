// vim: sw=4 ts=4 expandtab
// TODO: Simplify Those up, up_property, up_edit, functions in a single one
function up(){
    saveUserForm.submit();
}

function up_property(){
    validate_lands();
    l_lands.value = JSON.stringify(g_lands);
    savePropertyForm.submit();
}

function load_land_info(property_id, land_name) {
    clear();
    show(seeLand)
    ajax("GET", "land?id="+property_id+"&land_name="+land_name, "", function(response){
       seeLand.innerHTML = response; 
    })
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

function clear(){
    var tab_pane = document.querySelectorAll(".tab-pane");
    for(var i = 0; i<tab_pane.length; i++) {
        var classes = tab_pane[i].classList;
        if(classes.contains("show") || classes.contains("active")) {
            tab_pane[i].classList.remove("show");
            tab_pane[i].classList.remove("active");
        }
    }
    window.location.hash= "";
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
                //remove(userList);
                clear();
                show(user);
            });
        }
        //console.log(checkbox_input[i]); 
    }
}

function list() {
    clear();
    show(document.getElementById("userList"));
    page(1);
}

function page(add) {
    var offset = window.location.hash;
    var page = ""
    if(offset == ""){
        page = "0";
        window.location.hash = page;
    }else {
        offset = offset.split("#");
        if(add == "0"){
            page = parseInt(offset[1])-7
            if(page<0){
                window.location.hash = "0"
                page = 0;
            }
            window.location.hash = page 
        }else {
            page = parseInt(offset[1])+7
            window.location.hash = page 
            //window.location.hash = new_offset;
        }
    }    
    ajax("GET", "userList?offset="+page,"", function(response){
        userlist.innerHTML = response;
    });
}

function addUser() {
    clear();
    show(profiles);
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
    validate_lands()
}

var g_lands = []
function validate_lands() {
    var inputs = lands.querySelectorAll("input");
    //var j_lands = []
    var l_name = "";
    var l_hec = "";
    for(var i = 0; i<inputs.length; i++){
        var e = inputs[i];
        if(e.name == "name_land_1") {
            l_name = e.value;
            e.disable = true;
            e.value = "";
        }else if (e.name == "hec_land_1"){
            l_hec = e.value;
            e.disable = true;
            if(l_name != "" && l_hec != "") {
                g_lands.push({land_name:l_name, land_ha: l_hec});
            }
            e.value = "";
        }
    }
    //l_lands.value = JSON.stringify(j_lands);
    //g_lands = JSON.stringify(j_lands);
}

function edit() {
    var table = document.getElementById("userlist");
    var checkbox_input = table.querySelectorAll('input[type=checkbox]');
    for(var i = 0; i < checkbox_input.length; i ++) {
        var input = checkbox_input[i];
        if(input.checked == true) {
            ajax("GET", "editUser?user="+input.value, "", fill_data);
        }
        //console.log(checkbox_input[i]); 
    }
}

function deleteUser() {
    var table = document.getElementById("userlist");
    var checkbox_input = table.querySelectorAll('input[type=checkbox]');
    for(var i = 0; i < checkbox_input.length; i ++) {
        var input = checkbox_input[i];
        if(input.checked == true) {
            ajax("DELETE", "deleteUser?user="+input.value, "", function(response){
                userlist.innerHTML = response;
             });
             $('#deleteModal').modal('hide');
        }
    }
}

function confirm_delete() {
    var table = document.getElementById("userlist");
    var checkbox_input = table.querySelectorAll('input[type=checkbox]'); 
    for(var i = 0; i < checkbox_input.length; i ++) {
        var input = checkbox_input[i];
        if(input.checked == true) {
            $('#deleteModal').modal();
        }
    }
 }

function fill_data(response) {
    addClass(panel_list, "hide");
    editUser.innerHTML = response;
    btn_approve.classList.remove("hide");
    selectElement("role_edit_id", parseInt(edit_id_role.value));
    clear();
    show(edituser);
}

function f_home() {
    var active_content = document.querySelectorAll("div.tab-content>.show")[0];
    // document.querySelectorAll("div.tab-content>.tab-pane>.hide")
    // var active_sub_content = document.querySelectorAll("div.tab-content>.hide")[0];
    panel_list.classList.remove("hide");
    var active_header = document.querySelectorAll(".navbar-nav>li.nav-item>.active")[0];
    addClass(editUser, "hide")
    //remove(active_content);   
    //remove(active_header);
    clear();
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

