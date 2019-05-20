<!DOCTYPE html>
<meta charset = utf8>
<html>

<head>
    <title>Primer s potenciometrom</title>
</head>

<body onload="load()";>
    
<div>
<canvas id="canvas1" width ="200" height = "100" style="border: 1px dashed #00c3c3;"></canvas>    
</div>    
    
<div id="divZaIzpis"></div>    

<br>

<script type="text/javascript" src="/socket.io/socket.io.js"></script>
    
<script type="text/javascript">
"use strict"; // in order to use clasess

var divZaIzpis = document.getElementById("divZaIzpis"); // var za div el.
var štVrsticPredPomikom = 10;
var števecIzpisanihVrstic = 0;

var potVrednost1 = 0; // vrednost prvega potenciometra
var x1 = new Array(); // polje za x1
var y1 = new Array(); // polje za y1

var potVrednost2 = 0; // vrednost drugega potenciometra
var x2 = new Array(); // polje za x2
var y2 = new Array(); // polje za y2

var canvas1;
var ctx1;    
    
function log(sporočilo) {
    var node=document.createElement("tr"); // we create the variable node as the a table row (tr)
    var textnode=document.createTextNode(števecIzpisanihVrstic + " | " + sporočilo); // we create element with the text adding the counter
    node.appendChild(textnode); // adding text to "node", i.e. table row
    divZaIzpis.insertBefore(node, divZaIzpis.childNodes[0]); // inserting into variable node
    if (števecIzpisanihVrstic > štVrsticPredPomikom-1) { // if the lines are more than limit -> start with scroll
        divZaIzpis.removeChild(divZaIzpis.childNodes[štVrsticPredPomikom]); // we remove the oldest printout
    }
    števecIzpisanihVrstic++; // increasing the number of printouts
}
    
function load() { // funkcija ki se požene, ko odpremo stran
    canvas1 = document.getElementById("canvas1");
    ctx1 = canvas1.getContext("2d");

    // inicializacija prvega grafa s točkami
    ctx1.lineWidth = "1";
    ctx1.strokeStyle = "#ff0000";
    
    // izrišemo prvo časovno vrsto za inicializacijo
    for (var i=0; i<200; i++) {
        x1[i] = i; // x vrednosti so 0, 1, 2, ...
        y1[i] = 0; // y vrednosti so 0
    }
    
    // inicializacija drugega grafa s točkami
    ctx1.lineWidth = "1";
    ctx1.strokeStyle = "#00ff00";
    
    // izrišemo drugo časovno vrsto za inicializacijo
    for (var i=0; i<200; i++) {
        x2[i] = i; // x vrednosti so 0, 1, 2, ...
        y2[i] = 0; // y vrednosti so 0
    }
    
}

var socket = io.connect("192.168.1.124:8080"); // povezava preko "socket"

socket.on("sporočiloKlientu", function (spo) {
    log(spo); // dodamo sporočilo v div
});
    
socket.on("klientBeriVrednosti", function(vrednost) {
    potVrednost1 = vrednost.želenaVrednost;
    potVrednost2 = vrednost.dejanskaVrednost;
    
    // Izris 1. grafa *****************************************

    ctx1.lineWidth = "1";
    ctx1.strokeStyle = "#ff0000";
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height); // brišemo platno
    ctx1.beginPath(); // pričnemo z izrisom črte
    y1.splice(0, 1); // na poziciji 0 v polju y1 izbrišemo eno vrednost
    y1[199] = potVrednost1; // nova vrednost je dodana na koncu
    for (var i=0; i<200; i++) {
        ctx1.lineTo(x1[i], (100 - (y1[i] / 1023) * 100)); // 0,0 x,y koordinata je v zg. l. kotu
    }
    ctx1.stroke(); // za prikaz črte
    // Konec izrisa 1. grafa ***********************************
    
    // Izris 2. grafa *****************************************

    ctx1.lineWidth = "1";
    ctx1.strokeStyle = "#00ff00";
    ctx1.beginPath(); // pričnemo z izrisom črte
    y2.splice(0, 1); // na poziciji 0 v polju y1 izbrišemo eno vrednost
    y2[199] = potVrednost2; // nova vrednost je dodana na koncu
    for (var i=0; i<200; i++) {
        ctx1.lineTo(x2[i], (100 - (y2[i] / 1023) * 100)); // 0,0 x,y koordinata je v zg. l. kotu
    }
    ctx1.stroke(); // za prikaz črte
    // Konec izrisa 2. grafa ***********************************
    
    log(potVrednost1 + "|" + potVrednost2);
});

</script>
    
</body>
    
</html>