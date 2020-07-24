function main(){
    add_events("click",document.querySelectorAll("[rel='addProperty']"),dashf.bind(this, addProperty));
    add_events("click",document.querySelectorAll("[rel='listProperties']"),dashf.bind(this, listProperties));
    add_events("click",document.querySelectorAll("[rel='addUser']"),dashf.bind(this, addUser));
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

