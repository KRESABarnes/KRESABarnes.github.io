//import { generateGlyph } from "./generator.js";


function makeGlyph(){
testArray = ['00000000000000000000010011001', '00000000000000000000011010011', '00000000000000000000011011101', '00000000000000000000011001001', '00000000000000000000011100111', '00000000000000000000011000011', '00000000000000000000011110011', '00000000000000000000001000001', '00000000000000000000010000101', '00000000000000000000011000011', '00000000000000000000011100101', '00000000000000000000011011101', '00000000000000000000011001011', '00000000000000000000011100111']
//testArray = ['11111111111111111111111111111','11111111111111111111111111111','11111111111111111111111111111','11111111111111111111111111111','11111111111111111111111111111','11111111111111111111111111111','11111111111111111111111111111','11111111111111111111111111111','11111111111111111111111111111','11111111111111111111111111111','11111111111111111111111111111','11111111111111111111111111111','11111111111111111111111111111','11111111111111111111111111111']
let wordLength = 29
//testArray = new Array(Math.floor(wordLength/2)).fill('1'.repeat(wordLength),0,wordLength-1)
console.log(testArray)
const canvas = document.getElementById('glyph');


const ctx = canvas.getContext('2d');
ctx.fillStyle = 'black'
//ctx.fillRect(0,0,canvas.width,canvas.width)
let center = canvas.width/2
let radius = (canvas.width/2)-10
//ctx.fillRect(0,0,(radius+10)*2,(radius+10)*2)
let dotRad = 5
function getXCoord(center,radius,angle){
  return Math.floor(center+radius*Math.cos(angle))
}
function getYCoord(center,radius,angle){
  return  Math.floor(center+radius*Math.sin(angle))
}

let pivotAngle = (360/wordLength)*Math.PI/180

ctx.fillStyle = 'black'

ctx.beginPath();

ctx.arc(center, center-radius, dotRad, 0, 2 * Math.PI); //inital circle
ctx.stroke()
ctx.beginPath()
for(let i = 1; i<wordLength;i++){
    let angle = (i*pivotAngle+1.5*Math.PI)
    let x = getXCoord(center,radius,angle)
    let y = getYCoord(center,radius,angle)
    ctx.moveTo(x,y)
    ctx.arc(x,y,dotRad,0,2*Math.PI)
}
ctx.fill()
ctx.stroke();

for(let i = 0;i<testArray.length;i++){
    
    let initialAngle =1.5*Math.PI
    let moveAngle = (i+1)*pivotAngle
    ctx.strokeStyle= `hsl(${270+(360/testArray.length)*(i+1)}, 100%, 40%)`
    ctx.beginPath()
    ctx.moveTo(center,center-radius)
    let firstOne = testArray[i].indexOf(1)-1
    for(let j = testArray[i].length-1;j>firstOne;j--){
        initialAngle+= moveAngle
        let x = getXCoord(center,radius,initialAngle)
        let y = getYCoord(center,radius,initialAngle)
        if(testArray[i][j]=='1'){
            ctx.lineTo(x,y)
        }
        else{
            ctx.moveTo(x,y)
        }
        
    }
    ctx.stroke()
}


canvas.toBlob((blob)=>{
  const newImg = document.createElement('img')
  const url= URL.createObjectURL(blob)
  newImg.src = url
  document.body.appendChild(newImg)
  
})
}
makeGlyph()
