const flute = document.getElementById('flute');
const img = document.getElementById('image');
img.style.resize='vertical';
img.height = window.innerHeight -60;
flute.height = img.height;
flute.width = img.width;
//$(window).resize()
console.log(flute);
console.log(img);




var W = flute.width;
var H = flute.height;

var numKeys = 16;
var bigKey = W/15;
var medKey = W/18
var smallKey = W/45;

const ctx = flute.getContext("2d"); //content
//body
ctx.beginPath();
ctx.fillStyle = '#a0a7a5';

//ctx.fillRect(W/4, H/20, W/2, H*9/10);


// Array di oggetti key
let keys = Array.from({ length: 15 }, () => ({ x: 0, y: 0, r: 0, set: 0 }));
//riferimenti spaziali
const center = W*(536/1000);
// Array di valori per inizializzare key.x
let valoriX = [536, 545, 591, 700, 469, 536, 517, 536, 517, 536, 420, 407, 457, 200, 182]; //in millesimi di Width
let valoriY = [333, 410, 448, 452, 552, 579, 604, 627, 653, 678, 710, 730, 740, 330, 357]; //in millesimi di Height
let valoriR = [medKey, bigKey, bigKey, smallKey, smallKey, bigKey, smallKey, bigKey, smallKey, bigKey, smallKey, smallKey, smallKey, medKey, smallKey];

// setKeys verrà passato da una altra parte di programma in base alla nota da eseguire
let setKeys = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

// Inizializzazione delle proprietà x di key con i valori specificati
keys.forEach((item, index) => {
    item.x = valoriX[index];
    item.y = valoriY[index];
    item.r = valoriR[index];
    item.set = setKeys[index]
});

// Verifica dei risultati
console.log(keys);

//draw keys
for(var i=0; i<15; i++){
    var currentKey = keys[i];
    x = W*currentKey.x/1000;
    y = H*currentKey.y/1000;
    ctx.beginPath();
    ctx.arc(x, y, currentKey.r, 0, 2 * Math.PI);
    if (currentKey.set == true){
        ctx.fillStyle = 'rgba(200, 0, 0, 0.8)';
    } else {
        ctx.fillStyle = 'rgba(200, 200, 300, 0.1)';
    }
    ctx.fill();
    ctx.stroke;
};

/*
ctx.beginPath();
ctx.arc(50, 100, 20, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill()
ctx.stroke();*/



