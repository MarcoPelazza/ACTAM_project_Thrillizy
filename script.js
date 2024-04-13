const img = document.getElementById('image');
const svg = document.getElementById('svgKeys');

//image and svg resizing
img.style.resize='vertical';
img.height = window.innerHeight;
H = img.height;
W = img.width;

//$(window).resize()
console.log(flute);
console.log(img);

svg.style.height = H;
svg.style.width = W;
//
names = ['key1','key2','key3','key4','key5','key6','key7','key8','key9','key10','key11','key12','key13','key14','key15'];
setting = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
//setting = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
for (var n=0; n<15; n++){
    const o = document.getElementById(names[n]);
    if (setting[n] == 1){
        o.style.fill = 'rgba(200, 100, 100, 0.8)';
    } else {
        if (setting[n] == 2){
            o.style.fill = 'rgba(200, 0, 0, 0.8)';
        }
        else {o.style.fill = 'rgba(200, 200, 300, 0.1)';
    }
}




