 let nn;
 let training_data = [];
 let testing_data = [];
 let data;
 let testdata;
 let trainedtimes=0;
let who = [];
let wih = [];
let bho = [];
let bih = [];
let p ;
 function preload(){
   who=loadStrings("who.csv");
   wih=loadStrings("wih.csv");
   bho=loadStrings("bho.csv");
   bih=loadStrings("bih.csv");

 }

 function setup(){
   var submitbutton = createButton("SUBMIT");
   var clearbutton = createButton("CLEAR");
    p = createP();
    submitbutton.position(100,250);
    clearbutton.position(100,275);
    p.position(50,300);
   createCanvas(200,200);
   submitbutton.position(10,height+35);
   clearbutton.position(10,height+60);
   background(0);
   nn = new NN(784,200,10);
   for(let i=0; i<who.length-1; i++){
     who[i] = who[i].split(/,/);
     for(let j=0; j<who[i].length; j++){
       nn.weight_ho.data[i][j] = Number(who[i][j]);
     }
   }
   for(let i=0; i<wih.length-1; i++){
     wih[i] = wih[i].split(/,/);
     for(let j=0; j<wih[i].length; j++){
       nn.weight_ih.data[i][j] = Number(wih[i][j]);
     }
   }

   for(let i=0; i<bho.length-1; i++){
     nn.bias_ho.data[i] = [Number(bho[i])];
   }

   for(let i=0; i<bih.length-1; i++){
     nn.bias_ih.data[i] = [Number(bih[i])];
   }
   // for(let i=0; i<data.length; i++){
   //   training_data.push(data[i].split(/,/));
   // }
   // for(let i=0; i<testdata.length; i++){
   //   testing_data.push(testdata[i].split(/,/));
   // }
   submitbutton.mousePressed(function(){
     let inpt = [];
     let img = get();
     img.resize(28,28);
     img.loadPixels();
     for(let i=0; i < img.pixels.length; i+=4){
       inpt.push(img.pixels[i]/255);
     }
     //image(img,0,0);
     inpt = nn.predict(inpt);
     let z = inpt.indexOf(max(inpt));
     if(max(inpt) > 0.6){
       conf = '  High Confidience';
     }
     if(max(inpt) > 0.2 && max(inpt) <0.6){
       conf = '  Moderate Confidience';
     }
     if(max(inpt) < 0.2){
       conf = '  Low Confidience';
     }
     z = (z + 1)%10;
     console.log(z);
     p.html(z + conf);
   });
   clearbutton.mousePressed(function(){
     background(0);
   });
  }

 function draw(){
   strokeWeight(20);
   stroke(255);
   if(mouseIsPressed) line(pmouseX, pmouseY,mouseX, mouseY);
 }
