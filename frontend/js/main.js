// vim: sw=4 ts=4 expandtab
function up(){
    saveUserForm.submit();
}

function up_edit() {
   updateUserForm.submit(); 
}

function list() {
    remove(profiles)
    show(userList);
    ajax("POST", "userList", "", function(response){
       userlist.innerHTML = response;
    })
    
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
    addClass(editUser, "panel1");
    addClass(editUser, "panel-list");
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

