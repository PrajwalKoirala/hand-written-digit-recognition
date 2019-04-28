var data;
var images=[];
function preload(){
  data=loadStrings("https://raw.githubusercontent.com/makeyourownneuralnetwork/makeyourownneuralnetwork/master/mnist_dataset/mnist_train_100.csv");
}
 function setup(){
   createCanvas(280,280);
   //pixelDensity = 0.1;
   for(let i=0; i<data.length; i++){
     images.push(data[i].split(/,/));
   }
 }
 function draw(){
   background(0);
   loadPixels();
   for(let count = 0; count<100; count++){
     for(let i=0; i<28; i++){
       for(let j=0; j<28; j++){
         let index = 280 * 28 * floor(count/10) + ((count%10)*28+(i*width+j));
         pixels[index*4] = images[count][i*28+j+1];
         pixels[index*4 + 1] = images[count][i*28+j+1];
         pixels[index*4 + 2] = images[count][i*28+j+1];
         pixels[index*4 + 3] = 255;
       }
     }
   }
   updatePixels();
 }
