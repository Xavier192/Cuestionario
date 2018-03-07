var formElement=null;
var respuestasTexto=[];
var respuestasSelect=[];
var respuestasMultiple=[];
var respuestasCheckbox=[];
var respuestaRadio=[];
var nota=0;
var url="https://rawgit.com/Xavier192/Formulario/master/xml/xml.xml"

window.onload=function(){
	formElement=document.getElementById("myForm");
	formElement.onsubmit=function(){
	inicializar();
    if(comprobar()){
    corregirText();
    saltoLinia();
    corregirSelect();
    saltoLinia();
    corregirSelectMultiple();
    saltoLinia();
    corregirCheckBox();
    saltoLinia();
    corregirRadioButton();
    saltoLinia();
    ponerNota();
    aparicionDivCorreccion();
    }
    return false;
}




var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
  // función personalizada que gestiona la respuesta a la petición de fichero
  gestionarXml(this); 
 }
};
xhttp.open("GET", url, true); //url del fichero
xhttp.send();


}

// función personalizada que gestiona la respuesta a la petición de fichero
function gestionarXml(dadesXml){
//Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
  var xmlDoc = dadesXml.responseXML;
  imprimirTitulos(xmlDoc);
  
  
  //preguntasTexto
  for(var answers=0 ; answers<2 ; answers++){
  respuestasTexto[answers] = xmlDoc.getElementsByTagName("question")[answers].getElementsByTagName("answer")[0].innerHTML;
  }
  
  
  //Selects

  var opcionesSelect=[];
  for(var preguntas=2 ; preguntas<4 ; preguntas++){
  var limite=xmlDoc.getElementsByTagName("question")[preguntas].getElementsByTagName('option').length;
  for(var j=0 ; j<limite ; j++){
	  opcionesSelect[j]=xmlDoc.getElementsByTagName("question")[preguntas].getElementsByTagName("option")[j].innerHTML;
  }
  ponerDatosHtml(opcionesSelect,preguntas);
  respuestasSelect[preguntas]=xmlDoc.getElementsByTagName("question")[preguntas].getElementsByTagName("answer")[0].innerHTML;
  }
  
  //Selects multiples
  var opcionesSelectMultiple= [];
  for(var preguntas=4 ; preguntas<6 ; preguntas++){
	  var limite=xmlDoc.getElementsByTagName("question")[preguntas].getElementsByTagName('option').length;
	  for(var j=0 ; j<limite ; j++){
		opcionesSelectMultiple[j]=xmlDoc.getElementsByTagName("question")[preguntas].getElementsByTagName("option")[j].innerHTML; 
	  }
	  ponerDatosHtml(opcionesSelectMultiple,preguntas);
	  var nres=xmlDoc.getElementsByTagName("question")[preguntas].getElementsByTagName('answer').length;
	  respuestasMultiple[preguntas]=[];
	  for(var n=0 ; n<nres ; n++){
	  	respuestasMultiple[preguntas][n]=xmlDoc.getElementsByTagName("question")[preguntas].getElementsByTagName("answer")[n].innerHTML;
	  }
  }
  //checkbox
  var opcionesCheckBox=[];
  for(var check=6 ; check<8 ; check++){
	  var limitecheck=xmlDoc.getElementsByTagName("question")[check].getElementsByTagName('option').length;
	  for(var i=0 ; i<limitecheck ; i++){
		  opcionesCheckBox[i]=xmlDoc.getElementsByTagName("question")[check].getElementsByTagName('option')[i].innerHTML;
	  }
	  var nres=xmlDoc.getElementsByTagName("question")[check].getElementsByTagName("answer").length;
	  ponerDatosCheckBox(opcionesCheckBox,check);
	  respuestasCheckbox[check]=[];
	  for(var i=0 ; i<nres ; i++){
	  	respuestasCheckbox[check][i]=xmlDoc.getElementsByTagName("question")[check].getElementsByTagName("answer")[i].innerHTML;
	  }
  }
  //radiobutton
  var opcionesRadioButton=[];
  for(var radioButton=8 ; radioButton<10 ; radioButton++){
	var limite=xmlDoc.getElementsByTagName("question")[radioButton].getElementsByTagName("option").length;
	for(var i=0 ; i<limite ; i++){
		opcionesRadioButton[i]=xmlDoc.getElementsByTagName("question")[radioButton].getElementsByTagName("option")[i].innerHTML;
	}
	ponerDatosRadioButton(opcionesRadioButton,radioButton);
	respuestaRadio[radioButton]=xmlDoc.getElementsByTagName("question")[radioButton].getElementsByTagName("answer")[0].innerHTML;
  }
}
//Select y select múltiple
function ponerDatosHtml(optSel,preguntas){
	var select=[];
	select[0]=document.getElementsByTagName("select")[0];//select simple
	select[1]=document.getElementsByTagName("select")[1];//select simple
	select[2]=document.getElementsByTagName("select")[2];//select múltiple
	select[3]=document.getElementsByTagName("select")[3];//select multiple
	
	for(var i=0 ; i<optSel.length;i++){
	var option=document.createElement("option");
	option.text=optSel[i];
	option.value=i+1;
	select[preguntas-2].options.add(option);
	}
}
//checkbox
function ponerDatosCheckBox(opt,contador){
	var checkboxContainer=[];
	checkboxContainer[0]=document.getElementsByTagName("div")[0];
	checkboxContainer[1]=document.getElementsByTagName("div")[1];
	var checkAsignado;
	if (contador==6){
     checkAsignado="seis";
    }
    else {
     checkAsignado="siete";
	}
	for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
	
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name=checkAsignado;
    input.id=checkAsignado+i;    
    checkboxContainer[contador-6].appendChild(input);
    checkboxContainer[contador-6].appendChild(label);

    
    checkboxContainer[contador-6].appendChild(document.createElement("br"));
    checkboxContainer[contador-6].appendChild(document.createElement("br"));
    checkboxContainer[contador-6].appendChild(document.createElement("br"));
    
    
 }
}

//radioButton
function ponerDatosRadioButton(opt,numPregunta){
	var radioCont = document.getElementsByClassName('radioDiv')[numPregunta-8];
	 var radioAsignado;
    if (numPregunta==8){
     radioAsignado="ocho";
    }
    else {
     radioAsignado="nueve";
	}
	
    for (var i = 0; i < opt.length; i++) { 
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML=opt[i];
        input.type="radio";
        input.name=radioAsignado;
        input.value=i;    
        radioCont.appendChild(input);
        radioCont.appendChild(label);
        radioCont.appendChild(document.createElement("br"));
} 
}


//títulos
function imprimirTitulos(xmlDoc){
	var limite;
	limite=xmlDoc.getElementsByTagName("questions")[0].getElementsByTagName("question").length;
	for(var i=0 ; i<limite ; i++){
	var titulo=xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue;
	document.getElementsByTagName("h3")[i].innerHTML=titulo;
	}
	
}
function comprobar (){
var f=formElement;
var multRespondido=null;
//comprobar texto
 for(var numPreg=0;numPreg<2;numPreg++){
    if (f.elements[numPreg].value=="") {
    alert("Por favor, responde la pregunta "+(numPreg+1));
    f.elements[numPreg].focus();
    return false;
    }
}
//comprobar Select
for(var numPreg=2;numPreg<4;numPreg++){
    if (f.elements[numPreg].selectedIndex==0) {
    f.elements[numPreg].focus();
    alert("Por favor, selecciona una opcion en la pregunta "+(numPreg+1));
    return false;
    }
}
//comprobar select múltiple.
for(numPreg=4;numPreg<6;numPreg++){
       var mulSelecionado=false;
        for(numOpt=0;numOpt<(f.elements[numPreg].length);numOpt++){
            var opt=f.elements[numPreg].options[numOpt];
            if(opt.selected){
                mulSelecionado=true;
            }
        }
        if (!mulSelecionado) {
        f.elements[numPreg].focus();
        alert("Por favor, selecciona al menos una opcion en la pregunta "+(numPreg+1));
        return false;
        }
}
//comprobar checkbox
for(numPreg=6;numPreg<8;numPreg++){
        var checked=false;
        var nombre;
        if (numPreg==6){
            nombre=f.seis;
        } 
        else {
        nombre=f.siete;
        }
        for (i = 0; i < nombre.length; i++) {  
            if (nombre[i].checked) {
            checked=true;
             }
        }
        if (!checked) {
        nombre[0].focus();
        alert("Por favor, selecciona al menos una opcion en la pregunta "+(numPreg+1));
        return false;
        }
}
//comprobar radioButton
for(numPreg=8;numPreg<10;numPreg++){
       var nombreRadio;
        if (numPreg==8){
            nombreRadio=f.ocho;
        } else {
            nombreRadio=f.nueve;
        }
        if (nombreRadio.value=="") {
            nombreRadio[0].focus();
            alert("Por favor, responde la pregunta "+(numPreg+1));
            return false;
        }   
}
  return true;
}
function corregirText(){
	escribirDivCorreccion("Solución text (preguntas 1 y 2):");
for(var numPreg=0 ; numPreg<2 ; numPreg++){
textoInput=formElement.elements[numPreg].value;
textoXML=respuestasTexto[numPreg];
if(textoInput==textoXML){
escribirDivCorreccion("Pregunta tipo texto numero "+(numPreg+1)+": correcta");
nota++;
}	
else{
escribirDivCorreccion("Pregunta tipo texto numero "+(numPreg+1)+": incorrecta");
}	
}

}
function corregirSelect(){
	escribirDivCorreccion("Solución select (preguntas 3 y 4):");
for(var numPreg=2 ; numPreg<4 ; numPreg++){
	var sel=formElement.elements[numPreg];
	if((sel.selectedIndex-1)==respuestasSelect[numPreg]){
		escribirDivCorreccion("Pregunta tipo select numero "+(numPreg+1)+": correcta");
		nota++;
	}
	else{
		escribirDivCorreccion("Pregunta tipo select numero "+(numPreg+1)+": incorrecta");
	}
}
}
function corregirSelectMultiple(){
	escribirDivCorreccion("Solución select múltiple (preguntas 5 y 6):");
	for(var numPreg=4 ; numPreg<6 ; numPreg++){
	var sel=formElement.elements[numPreg];
	var escorrecta=[];
	var mal=false;
	for(var i=0 ; i<(sel.length); i++){
		var opt=sel.options[i];
		if(opt.selected){
			escorrecta[i]=false;
			for(var j=0 ; j<respuestasMultiple[numPreg].length ; j++){
				if((i)==respuestasMultiple[numPreg][j]) escorrecta[i]=true;
			}
			if(escorrecta[i]){
				nota+=1.0/respuestasMultiple[numPreg].length;
				escribirDivCorreccion("Pregunta numero "+(numPreg+1)+": opcion "+(i+1)+" correcta");
			}
			else{
				nota-=1.0/respuestasMultiple[numPreg].length;
				escribirDivCorreccion("Pregunta numero "+(numPreg+1)+": opcion "+(i+1)+" incorrecta");
				mal=true;
			}
		}
	}
	if(numPreg==4 && mal==true){
		escribirDivCorreccion("respuestas correctas pregunta "+(numPreg+1)+": d,e");
	}
	else if(numPreg==5 && mal==true){
		escribirDivCorreccion("respuesta correctas: a,b,c");
	}
  }
}
function corregirCheckBox(){
	escribirDivCorreccion("Solución checkbox (preguntas 7 y 8):");
var f=formElement;
var escorrecta=[];
for(var numPreg=6 ; numPreg<8 ; numPreg++){
	var nombre;
	var mal=false;
	if(numPreg==6){
		nombre=f.seis;
	}
	else{
		nombre=f.siete;
	}
	for(var i=0 ; i<nombre.length ; i++){
		if(nombre[i].checked){
			escorrecta[i]=false;
			for(var j=0 ; j<respuestasCheckbox[numPreg].length ; j++){
				if(i==respuestasCheckbox[numPreg][j]) escorrecta[i]=true;
			}
			if(escorrecta[i]){
				nota+=1.0/respuestasCheckbox[numPreg].length;
				escribirDivCorreccion("Pregunta "+(numPreg+1)+": opción "+(i+1)+" correcta");
			}
			else{
				nota-=1.0/respuestasCheckbox[numPreg].length;
				escribirDivCorreccion(" Pregunta "+(numPreg+1)+": opción "+(i+1)+" incorrecta");
				mal=true;
			}
		}
	}
	if(numPreg==6 && mal==true){
		escribirDivCorreccion("Respuestas correctas a la pregunta "+(numPreg+1)+": a,b,c ")
	}
	else if(numPreg==7 && mal==true){
		escribirDivCorreccion("Respuestas correctas a la pregunta "+(numPreg+1)+": c,d,e ");
	}
}	
}
function corregirRadioButton(){
	escribirDivCorreccion("Resultados preguntas radioButton (preguntas 9 y 10):");
var f=formElement;
for(var numPreg=8 ; numPreg<10 ; numPreg++){
	var nombreRadio;
	if(numPreg==8){
		nombreRadio=f.ocho;
	}
	else{
		nombreRadio=f.nueve;
	}
	if(nombreRadio.value==respuestaRadio[numPreg]){
		escribirDivCorreccion("Pregunta número "+(numPreg+1)+": Correcta");
		nota+=1;
	}
	else{
		escribirDivCorreccion("Pregunta número "+(numPreg+1)+": Incorrecta");
		if(numPreg==8){
		escribirDivCorreccion("Respuesta correcta a la pregunta numero "+(numPreg+1)+": a");
		}
		else{
		escribirDivCorreccion("Respuesta correcta a la pregunta numero "+(numPreg+1)+": b");

		}
	}
}
}
function escribirDivCorreccion(res){
	var p=document.createElement("p");
	var node=document.createTextNode(res);
	p.appendChild(node);
	document.getElementById("divCorreccion").appendChild(p);
}
function inicializar(){
document.getElementById('divCorreccion').innerHTML = "";
nota=0.0;	
}
function aparicionDivCorreccion(){
	document.getElementById("divCorreccion").style.display="block";
}
function saltoLinia(){
	var p=document.createElement("p");
	if(window.matchMedia("(max-width:960px;)").matches){
	var node=document.createTextNode("---------------------------------------------------------------");	
	}
	else{
	var node=document.createTextNode("------------------------------------");	
	}
	p.appendChild(node);
	document.getElementById("divCorreccion").appendChild(p);
}
function ponerNota(){
	var p=document.createElement("p");
	var node=document.createTextNode("Nota final: "+nota);
	p.appendChild(node);
	document.getElementById("divCorreccion").appendChild(p);
}





