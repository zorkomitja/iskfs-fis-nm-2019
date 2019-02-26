!DOCTYPE html>
<meta charset = utf8>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Primer z gumbi</title>

</head>


    
<button class="button" id="gumbPrižgi1" onClick="prižgi1()">Prižgi Z</button>
<button class="button" id="gumbUgasni1" onClick="ugasni1()">Ugasni Z</button>
<p></p>
<button class="button" id="gumbPrižgi2" onClick="prižgi2()">Prižgi R</button>
<button class="button" id="gumbUgasni2" onClick="ugasni2()">Ugasni R</button>
<p></p>
<button class="button" id="gumbPrižgi3" onClick="prižgi3()">Prižgi M</button>
<button class="button" id="gumbUgasni3" onClick="ugasni3()">Ugasni M</button>
<p></p>
<button class="button" id="gumbPrižgi4" onClick="prižgi4()">Prižgi O</button>
<button class="button" id="gumbUgasni4" onClick="ugasni4()">Ugasni O</button>
<p></p>
<button class="button" id="gumbUSE" onClick="prižgiUse()">Prižgi V </button>
<button class="button" id="gumbUSEUGASNI" onClick="ugasniUse()">Ugasni V </button>
<p></p>

<script type="text/javascript" src="/socket.io/socket.io.js"></script>

<script type="text/javascript">
var socket = io.connect("192.168.1.124:8080"); // povez. prek vtičnika
function prižgi1 () {
    socket.emit("ukazArduinu", 1); // na strežnik pošljem 1
}
function ugasni1 () {
    socket.emit("ukazArduinu", 0); // na strežnik pošljem 0
}
function prižgi2 () {
    socket.emit("ukazArduinu", 3); // na strežnik pošljem 1
}
function ugasni2 () {
    socket.emit("ukazArduinu", 2); // na strežnik pošljem 0
}
function prižgi3 () {
    socket.emit("ukazArduinu", 5); // na strežnik pošljem 1
}
function ugasni3 () {
    socket.emit("ukazArduinu", 4); // na strežnik pošljem 0
}
function prižgi4 () {
    socket.emit("ukazArduinu", 7); // na strežnik pošljem 1
}
function ugasni4 () {
    socket.emit("ukazArduinu", 6); // na strežnik pošljem 0
}
function prižgiUse () { // prižiganje vseh led diod
    prižgi1 ();
    prižgi2 ();
    prižgi3 ();
    prižgi4 ();
}
function ugasniUse () { // ugašanje vseh led diod na
    ugasni1 ();
    ugasni2 ();
    ugasni3 ();
    ugasni4 ();
}
</script>
    
</body>

</html>