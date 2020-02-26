window.onload=function() {
	document.body.style.backgroundImage = "url('../imagini/background.jpg')";
	createForm("login");
	var fr = document.getElementById("login");
	fr.onsubmit = function(e) {
		e.preventDefault();
	}
	createForm("post");
	createInput("text", "Username");
	createInput("password", "Parola");
	buton_log = createSubmitButton("buton_submit", "Login");
	frm.appendChild(buton_log);
}

function createInput(type, txtContent) {
	var fr = document.getElementById("post");
	var name = document.createElement("input");
	label = document.createElement("label");
	var txt = document.createTextNode(txtContent);
	label.style.marginTop = "10px";
	label.appendChild(txt);
	name.type = type;
	name.name = txtContent;
	name.style.marginTop = "10px";
	name.style.marginRight = "10px";
	fr.appendChild(label);
	fr.appendChild(name);
}
function createForm(id) {
	frm = document.createElement("form");
	frm.id = id;
	frm.method =  "post";
	frm.enctype = "multipart/form-data";
    document.body.appendChild(frm);
	
}

function createSubmitButton(id, innerhtml) {
	var buton = document.createElement("button");
	buton.type = "submit";
	buton.id = id;
	buton.style.width = "70px";
	buton.style.height = "30px";
	buton.form = "formular";
	buton.innerHTML = innerhtml;
	buton.style.display = "block";
	buton.style.marginTop = "20px";
	return buton;
}