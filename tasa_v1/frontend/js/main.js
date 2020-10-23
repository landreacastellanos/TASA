// vim: sw=4 ts=4 expandtab
// TODO: Simplify Those up, up_property, up_edit, functions in a single one
var var_edit = false
function up(){
    if(validate_password() != false) {
        saveUserForm.submit();
    }
}

function upStage(){
    if(visit_date.value == "") {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
        visit_date.value = today;
    }
    segmentStageForm.submit();
}

function upBurningStage(){
    segmentStageForm.submit();
}

function up_property(){
    validate_lands();
    l_lands.value = JSON.stringify(g_lands);
    savePropertyForm.submit();
}


function edit_property(){    
	var text = $("#editFinca > label").text()
	if(text==" Editar Finca "){
		var_edit=true
		$("input",$("#viewProperty")).removeAttr("disabled");
		$(".list_users").empty();
		load_properties();
		$("#editFinca > label").text(" Guardar cambios ");	
	    
		ajax("GET", "userSelect", "", function(response){
        $(".list_users").html(response);
		}); 
		var control = $("[name='sowing_system']",$(".property_update"))
		var parent = control.parent()
		control.remove("input")
		parent.append('<select id="sowing_system" name="sowing_system" class="form-control form-control-lg"><option value="1">Arroz Secano</option><option value="2">Arroz de Riego</option></select>');
		
	}
	else{
		e_g_lands=[]
		validate_lands_edit();
		edit_l_lands.value = JSON.stringify(e_g_lands);
		updatePropertyForm.submit();
		var_edit=false
		$("#editFinca > label").text(" Editar Finca ")
		$("input",$("#viewProperty")).attr("disabled","disabled")
	}
}

function load_land_info(property_id, land_id) {
    clear();
    show(viewLand);
    ajax("GET", "land?id="+property_id+"&land_id="+land_id, "", function(response){
        seeLand.innerHTML = response;
        fill_stages();
    })
}

function fill_stages() {
    var filled = JSON.parse(filled_stages.value);
    for(i in filled) {
        // console.log(filled[i]);
        var elements = document.getElementsByName("stage_"+filled[i].stage_id);
        for(var j=0; j<elements.length; j++) {
             // console.log(elements[j]);
            elements[j].style = "background-color: #FB0200;";
        }
    }
}

function pageLand(add, amount_records){
    page(add, amount_records, 'property?id='+property_id.value+'&', seeProperty)
}

function load_property_info(property_id) {
    clear();
    show(viewProperty);
    ajax("GET", "property?id="+property_id+"&offset=0", "", function(response){
        window.location.hash = "0";   
        seeProperty.innerHTML = response;
        // sowing_system.value = show_sowing_system.value;
    })
}


function load_properties(){
    // TODO: Old version is a list of the properties in the main menu
    /*ajax("GET", "property_menu", "", function(response){
        properties.innerHTML = response
    });*/
    ajax("GET", "userSelect", "", function(response){
        list_users.innerHTML = response;
    });    
}

function validate_password(){
    if(password.value != confirm_password.value || confirm_password.value == "") {
        alert('La Contraseña no Coinciden');
        return false;
    }
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

function show_user(item_value) {
    /*var table = document.getElementById("userlist");
    var checkbox_input = table.querySelectorAll('input[type=checkbox]');
    for(var i = 0; i < checkbox_input.length; i ++) {
        var input = checkbox_input[i];
        if(input.checked == true) {
        */
            ajax("GET", "user?user="+item_value, "", function(response){
                showUser.innerHTML = response;
                selectElement("role_show_id", parseInt(show_id_role.value));
                //remove(userList);
                clear();
                show(user);
            });
    /*}
        //console.log(checkbox_input[i]); 
    }*/
}

function getItemSelected(item, f_callback){
    var table = document.getElementById(item);
    var checkbox_input = table.querySelectorAll('input[type=radio]');
    for(var i = 0; i < checkbox_input.length; i ++) {
        var input = checkbox_input[i];
        if(input.checked == true) {
            clear();
            f_callback(input.value);
        }
    }
}

function list() {
    clear();
    show(document.getElementById("userList"));
    page(1, 7, "userList?", userlist);
}

function property_list() {
	$("#editFinca > label").text(" Editar Finca ");
	var_edit=false;
    clear();
    show(document.getElementById("propertyList"));
    page(1, 7, "property_menu?", propertylist);

}

function page(add, amount_records, endpoint, element) {
    var offset = window.location.hash;
    var page = ""
    if(offset == ""){
        page = "0";
        window.location.hash = page;
    }else {
        offset = offset.split("#");
        if(add == "0"){
            page = parseInt(offset[1])-amount_records
            if(page<0){
                window.location.hash = "0"
                page = 0;
            }
            window.location.hash = page 
        }else {
            page = parseInt(offset[1])+amount_records
            window.location.hash = page 
            //window.location.hash = new_offset;
        }
    }    
    ajax("GET", endpoint+"offset="+page,"", function(response){
        element.innerHTML = response;
		$("#editFinca > label").text(" Editar Finca ")
		if(var_edit)
			edit_property()
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

var e_g_lands = []
function validate_lands_edit() {
    var inputs = view_lands.querySelectorAll("input");
    //var j_lands = []
    var l_name = "";
    var l_hec = "";
	var l_id = "";
    for(var i = 0; i<inputs.length; i++){
        var e = inputs[i];
        if(e.name == "name_land_1") {
            l_name = e.value;
			l_id = e.id;
            e.disable = true;
            e.value = "";
        }else if (e.name == "hec_land_1"){
            l_hec = e.value;
            e.disable = true;
            if(l_name != "" && l_hec != "") {
                e_g_lands.push({id:l_id,land_name:l_name, land_ha: l_hec});
            }
            e.value = "";
        }
    }
    //l_lands.value = JSON.stringify(j_lands);
    //g_lands = JSON.stringify(j_lands);
}

function edit() {
    var table = document.getElementById("userlist");
    var checkbox_input = table.querySelectorAll('input[type=radio]');
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
    var checkbox_input = table.querySelectorAll('input[type=radio]');
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
    var checkbox_input = table.querySelectorAll('input[type=radio]'); 
    for(var i = 0; i < checkbox_input.length; i ++) {
        var input = checkbox_input[i];
        if(input.checked == true) {
            $('#deleteModal').modal();
        }
    }
 }

function fill_data(response) {
    editUser.innerHTML = response;
    btn_approve.classList.remove("hide");
    selectElement("role_edit_id", parseInt(edit_id_role.value));
    clear();
    show(edituser);
}

function add_item(item_id) {
    if(document.getElementById("selected_item_"+item_id)) {
        document.getElementById("selected_item_"+item_id).remove();
        return
    }
    var item = "product_id_"+item_id;
    var clonedNode = document.getElementById(item).cloneNode(true);
    clonedNode.id="selected_item_"+item_id;
    total = calculate_total_kg(clonedNode.childNodes)
    // Add input for the total kg/lt
    var item_input = custom_total.cloneNode(true);
    item_input.id = "total_kg_"+item_id;
    item_input.firstElementChild.value = total;

    item_input.firstElementChild.name = "total_kg_"+item_id;
    clonedNode.appendChild(item_input);
    segment_recipe.insertBefore(clonedNode, segment_recipe.firstElementChild);
    // Remove Checkbox for the second table
    var c = document.getElementById("selected_item_"+item_id)
    c.firstElementChild.remove();
}

var g_amount_new_products = 0;
function addProduct(){
    g_amount_new_products++;
    var segment = segment_input_fields.cloneNode(true);
    // segment.classList.remove("hidde");
    segment.id = segment.id.replace("fields", "fields_"+g_amount_new_products);
    for (var i = 0; i<segment.children.length; i ++) {
        segment.children[i].firstElementChild.name = segment.children[i].firstElementChild.name.replace("_0", "_"+g_amount_new_products);
        segment.children[i].firstElementChild.id = segment.children[i].firstElementChild.id.replace("_0", "_"+g_amount_new_products);
        segment.children[i].firstElementChild.value = "";
        /* if(segment.children[i].id == "custom_dose") {
            segment.children[i].id = "custom_dose_"+g_amount_new_products;
        }
        if(segment.children[i].id == "custom_total") {
            segment.children[i].id = "custom_total_"+g_amount_new_products;
        }*/
    }
    segment_recipe.appendChild(segment)
}

function calculate_total_kg(cloned_childs) {
    for(var i = 0; i<cloned_childs.length; i++) {
        var element = cloned_childs[i]
        if(element.id == "stage_dose_by_ha") {
            var dose = element.innerText
            var total = parseInt(property_stage_land_ha.value)*parseFloat(dose.trim().replace(",", "."));
            return total.toFixed(2)
        }
    }
}

function calculate() {
    var dose_elements = document.querySelectorAll("#custom_dose");
    for(var i = 0; i<dose_elements.length; i++) {
        var dose_input = dose_elements[i].firstElementChild.value;
        var total = parseInt(property_stage_land_ha.value)*parseFloat(dose_input.trim().replace(",", "."));
        var total_input = dose_elements[i].parentElement.lastElementChild.firstElementChild.value = total.toFixed(2);
    }
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


function f_stages(){
	load_land_info(stage_property_id.value,segment_land_id.value);
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

function show_images(element) {
    if(element == "before") {
        after_image.classList.add("hide")
        after_image.classList.remove("show")
        before_image.classList.add("show")
        before_image.classList.remove("hide")
    }else {
        after_image.classList.add("show")
        after_image.classList.remove("hide")
        before_image.classList.add("hide")
        before_image.classList.remove("show")

    }
        /*hide_element.classList.add("hide")
    hide_element.classList.remove("show")
    show_element.classList.remove("hide")
    show_element.classList.add("show")*/
}

// use load_land_info to go back the segments
// after see a stage, 
// and use the property_id and land_name 
// to retrieve the info to print again in the stage view
function see_stage(stage_id) {
    var query = "stage_id="+stage_id
    query += "&type_planting="+property_sowing_system.value
    query += "&property_id="+land_property_id.value
    query += "&land_name="+property_land_name.value
    query += "&land_id="+land_id.value

    var add_product = document.getElementById("add_product");
    var upStageId = document.getElementById("upStageId");
    var upBurningStageId = document.getElementById("upBurningStageId");
	
	if (stage_id == 14) {
        add_product.style.display = "none";
        upStageId.style.display = "none";
        upBurningStageId.style.display = "block";
	} else {
        add_product.style.display = "block";
        upStageId.style.display = "block";
        upBurningStageId.style.display = "none";
    }
    
    ajax("GET", "see_stage?"+query, "", function(response){
        clear();
        show(viewStage);
        seeStage.innerHTML = response;
        segment_stage.value = stage_id;
        if (stage_id != 14) {
            segment_land_id.value = stage_land_id.value;
            segment_set_dates();
        }
        if(document.getElementsByName("product").length > 0) {
            segment_input_fields.classList.add("hidde");
        }
		realtime_value = realtime.value
		if(realtime_value != "")
		{
			alert_label.style.display = "none"
			$("input",$("#burning_stage")).attr("disabled","disabled")
		}
		else{
			alert_label.style.display = "auto"
			$("#seedtime").removeAttr("disabled")
			$("#variety_land").removeAttr("disabled")
			$("#sowing_type").removeAttr("disabled")
			$("#realtime").removeAttr("disabled")
		}
    })
} 

function segment_set_dates() {
    var days = segment_days.value.split(",");
    var day_segment_end = days[0];
    var day_segment_start = days[1];
    var seed_time_start = Date.parse(stage_seedtime.value.replaceAll("-","/"));
    var seed_time_end = Date.parse(stage_seedtime.value.replaceAll("-","/"));
    var amount_days_start = parseInt(day_segment_start.slice(1));
    var amount_days_end = parseInt(day_segment_end.slice(1));
    seed_time_start = new Date(seed_time_start);
    seed_time_end = new Date(seed_time_end);
    // TODO: remove duplicity
    if(day_segment_end.includes("+") || day_segment_start.includes("+")) {
        var start = new Date(seed_time_start.setDate(seed_time_start.getDate() + amount_days_end));
        var end = new Date(seed_time_end.setDate(seed_time_end.getDate() + amount_days_start));
        segment_start.value = start.getFullYear() + "-" + ("0" + (start.getMonth() + 1)).slice(-2) + "-" + ("0" + start.getDate()).slice(-2)
        segment_end.value = end.getFullYear() + "-" + ("0" + (end.getMonth() + 1)).slice(-2) + "-" + ("0" + end.getDate()).slice(-2)
    }else {
        var start = new Date(seed_time_start.setDate(seed_time_start.getDate() - amount_days_start));
        var end = new Date(seed_time_end.setDate(seed_time_end.getDate() - amount_days_end));
        segment_start.value = start.getFullYear() + "-" + ("0" + (start.getMonth() + 1)).slice(-2) + "-" + ("0" + start.getDate()).slice(-2)
        segment_end.value = end.getFullYear() + "-" + ("0" + (end.getMonth() + 1)).slice(-2) + "-" + ("0" + end.getDate()).slice(-2)
    }
    segment_start.disabled = true;
    segment_end.disabled = true;
    segment_start.classList.add("disabled");
    segment_end.classList.add("disabled");
    segment_start_value.value = segment_start.value;
    segment_end_value.value = segment_end.value;
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

