	window.onload=function() {
	document.body.style.backgroundImage = "url('../imagini/background.jpg')";
	var i = '0';
	var input1, input2, buton,radiob1, radiob2, div, pg, pgf, sp, info, buton_log;
	var styleColor = "black";
	var rating = [];
	createForm("post");
	createTextArea();
	createFieldSet("categorie");
	createFieldSet("culoare");
	createCheckBox(input1, "experienta proprie");
	createCheckBox(input2, "teorie consacrata");
	
	buton = createSubmitButton("buton_postare", "Posteaza");
	document.body.appendChild(buton);
	
	radiob1 = createRadioButton("rosu");
	radiob2 = createRadioButton("albastru");

    // retrive items from local storage
	for( i = '0'; i < localStorage.length; i++) {
		// get text from local storage
		var txt = localStorage.getItem(i);
	
		i++;
		// get the color of the text
		var color = localStorage.getItem(i);
		
		var div = createDiv();
		
		pg = createParagraph(txt, color);
		div.appendChild(pg);
	
		pg.onmouseover = cursorDiv;
		pg.onmouseout = function() {div.style.display = "none";}
	
		rating[i] = createRatingInput();
		div.appendChild(rating[i]);

	}
	 
	buton.onclick = function(e) {
		if(txtarea.value != "") {
		 // Check browser support
         if (typeof(Storage) !== "undefined") {
            // Store
            localStorage.setItem(i, txtarea.value);
			i++;
			
			if (radiob1.checked) { 
				styleColor = "red";
				localStorage.setItem(i, "red");
			}
			else if (radiob2.checked) {
				styleColor = "blue";
				localStorage.setItem(i, "blue");
			} else 
			    localStorage.setItem(i, "black");
			
			i++;
			
			var div = createDiv();
			var tx = category();
			alert("Multumim ca ai impartasit cu noi o " + tx);
            pgf = createParagraph(txtarea.value, styleColor);
            div.appendChild(pgf);
			
			
			pgf.onmouseover = cursorDiv;
		    pgf.onmouseout = function() {div.style.display = "none";}
			
			rating = createRatingInput();
			div.appendChild(rating);
			
         } else {
            alert("Sorry, your browser does not support Web Storage...");
         }
		}
    }
	
	div = createInfoDiv();
	document.body.appendChild(div);

  setTimeout(function () {
	                      info = createSpan("Impartaseste experienta ta aici!");
                          document.body.insertBefore(info, txtarea);
						 }, 3000);
  setTimeout(function myStopFunction() {
                                         info.remove();
                                       }, 5000);
  sp = createSpan(" ");
  document.body.appendChild(sp);
  setInterval(updateSpan, 10000, sp);
 // localStorage.clear()
}

function cursorDiv() {
  var p = document.getElementById("cursor");
  p.style.display = "inline";
  document.addEventListener('mousemove',function(e){ 
														var x = event.clientX;
														var y = event.clientY;
													    p.style.top = y + 'px'; 
														p.style.left = x + 'px';
													});

}

function randInt(a,b){
	return Math.trunc(a+(b-a)*Math.random());
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

function updateSpan(sp) {
	var a = randInt(10, 100);
	sp.style.position = "absolute";
	sp.style.top = "200px";
	sp.style.left = "900px";
	sp.style.border = "1px solid black";
	sp.style.backgroundColor = "#DA2613";	
	sp.innerHTML = "inca " + a + " urmaresc acest subiect!";
}

function createForm(id) {
	frm = document.createElement("form");
	frm.id = id;
	frm.method =  "post";
	frm.enctype = "multipart/form-data";
    document.body.appendChild(frm);
	
}

function createTextArea() {
	txtarea = document.createElement("textarea");
	txtarea.rows = 10;
	txtarea.cols = 48;
	txtarea.id = "comments";	
	txtarea.required = "true";
	txtarea.style.display = "block";
	txtarea.style.marginTop = "30px";
	document.body.appendChild(txtarea);
}

function createCheckBox(input, inputTxt) {
	var label = document.createElement("label");
	input = document.createElement("input");
	input.type = "checkbox";
	label.innerHTML = inputTxt;
	label.innerHTML += "<br/>";
	var field = document.getElementById("categorie");
	field.appendChild(input);
	field.appendChild(label);
}

function createRadioButton(color) {
	var label = document.createElement("label");
	var radiobuton = document.createElement("input");
	radiobuton.type = "radio";
	radiobuton.name = "culoare";
	radiobuton.value = color;
	label.innerHTML = color;
	label.innerHTML += "<br/>";
	var field = document.getElementById("culoare");
	field.appendChild(radiobuton);
	field.appendChild(label);
	return radiobuton;
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

function createRatingInput() {
	var rating = document.createElement("input");
	rating.type = "range";
	rating.class = "rating";
	rating.min = "0";
	rating.max = "9";
	rating.step = "1";
	document.body.appendChild(rating);
	rating.onkeypress = function IsNumeric(e) {
													var keyCode = e.which ? e.which : e.keyCode
													var num = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
						                            if (num) 
														rating.value =  e.key;
														
												  }
	return rating;
}

function createInfoDiv() {
	var div = document.createElement("div");
	div.id = "cursor";
	var txt = document.createTextNode("Misca dreptunghiul sau selecteaza-l si apasa o tasta numerica pentru a evalua aceasta postare ");
	div.appendChild(txt);
	div.style.position = "absolute";
	div.style.width = "150px";
	div.style.height = "100px";
	div.style.border = "1px solid black";
	div.style.transition = "0.1s";
	div.style.transform = "translate(-50%,50%)";
	div.style.pointerEvents = "none";
	div.style.backgroundColor = "#6FC3C0";
	div.style.display = "none";
	return div;
}

function createParagraph(txt, color) {
	var pgf = document.createElement("p");
	var txt = document.createTextNode(txt);
	pgf.appendChild(txt);
	pgf.style.color = color;
	pgf.style.width = "600px";
	pgf.style.height = "50px";
	pgf.style.border = "1px solid black";
	pgf.style.marginLeft = "10px";
	pgf.style.marginRight = "10px";
	pgf.style.backgroundColor = "#DD7EDA";
	return pgf;
}

function createFieldSet(id) {
	var field = document.createElement("fieldset");
	field.id = id;
	field.style.borderRadius = "5px";
	field.style.width = "150px";
	field.style.display = "inline-block";
	field.style.marginTop = "30px";
	document.body.appendChild(field);
}

function createSpan (txt){ 
	var info = document.createElement("span")
    info.innerHTML = txt;
	return info;
}

function createDiv() {
	var div = document.createElement("div");
    div.style.border = "1px solid black";
	div.style.width = "620px";
	div.style.marginTop = "10px";
	var frm = document.getElementById("formular");
	document.body.insertBefore(div, txtarea);
	return div;
}

function category() {
	var field = document.getElementById("categorie");
    var children = field.children;
	var txt = " ";
	if (children[0].checked) 
		txt = "experienta proprie";
	else if (children[2].checked) 
	    txt = "teorie consacrata";
	return txt;

}