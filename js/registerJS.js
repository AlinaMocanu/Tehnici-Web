window.onload = function () {
	document.body.style.backgroundImage = "url('../imagini/background.jpg')";
	createDiv();
	createForm();
	createInput("text", "Username");
	createInput("password", "Parola");
	createBr(label);
	createInput("email", "Email");
	createBr(label);
	createSelectTag();
	createBr(selct);
	createInput("submit", "");
	createBr(label);
	createInput("reset", "");
	info = createSpan("Register");
	frm.insertBefore(info, frm.firstChild);
	mandatoryField();
		
}

function createForm() {
	frm = document.createElement("form");
	frm.id = "formular";
	frm.method = "post";
	frm.enctype = "application/x-www-form-urlencoded";
    div.appendChild(frm);
}

function createBr(node) {
	var br = document.createElement("br");
	frm.insertBefore(br, node);
}

function createInput(type, txtContent) {
	var name = document.createElement("input");
	label = document.createElement("label");
	var txt = document.createTextNode(txtContent);
	label.style.marginTop = "10px";
	label.appendChild(txt);
	name.type = type;
	name.style.marginTop = "10px";
	name.style.marginRight = "10px";
	name.name = txtContent;
	frm.appendChild(label);
	frm.appendChild(name);
}

function createSelectTag() {
    selct = document.createElement("select");
	selct.style.marginTop = "10px";
	frm.appendChild(selct);
	createOption("male");
	createOption("female");
}
 
function createOption(txt) {
	var gender = document.createElement("option");
	var genderTxt = document.createTextNode(txt);
	gender.appendChild(genderTxt);
	selct.appendChild(gender);
}

function createDiv() {
	div = document.createElement("div");
    div.style.border = "1px solid black";
	div.style.borderRadius = "25px";
	div.style.width = "350px";
	div.style.height = "250px";
	div.style.backgroundColor = "#4593BB";
	div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
	div.style.margin = "auto";
	document.body.appendChild(div);
	return div;
}

function createSpan (txt){ 
	var info = document.createElement("span")
    info.innerHTML = txt;
	info.style.display = "block";
	info.style.textAlign = "center";
	return info;
}

function mandatoryField() {
	var type = frm.lastElementChild.previousElementSibling.previousElementSibling;
	type.onclick = function(e) {
		var user = frm.firstChild.nextElementSibling.nextElementSibling.value;
		var pass = frm.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value;
		if ( user == "" || pass == "") {
			 alert("Required field");
			 e.preventDefault();
		 }
	}
}