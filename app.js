
    let wordLength = 7

    const primes = [2,3,5,7,11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89,97]

    const glyphText =document.getElementById("glyphText")
    let input= glyphText.value
    let textLength = document.getElementById("glyphTextLengthCheck")
    const customGlyphLength = document.getElementById('customNumber')
    const primeCheck = document.getElementById("primeCheck")
    let forcePrimes = true
    const glyphFullLength = document.querySelectorAll("input[name='glyphLength']");
    const colorButton = document.querySelectorAll("input[name='Color']");
    const rainbowOffset = document.getElementById("rainbowOffset")
    const customColor = document.getElementById("customColor")
    let rainbowAngle = 270
    let colorMode = 0
    let colorChoice = '#000000'
    let backgroundColor = '#FFFFFF'



function makeGlyph(){
    input=glyphText.value
let glyphLength = wordLength*2 +1
if (forcePrimes){
for( const i in primes){
    if( glyphLength <= primes[i]){
        glyphLength = Number(primes[i])
        break
    }
}
}

testArray = getGlyphArray(input)


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

let pivotAngle = (360/glyphLength)*Math.PI/180

ctx.fillStyle = 'black'
ctx.beginPath();

ctx.arc(center, center-radius, dotRad, 0, 2 * Math.PI); //inital circle
ctx.stroke()
ctx.beginPath()
for(let i = 1; i<glyphLength;i++){
    let angle = (i*pivotAngle+1.5*Math.PI)
    let x = getXCoord(center,radius,angle)
    let y = getYCoord(center,radius,angle)
    ctx.moveTo(x,y)
    ctx.arc(x,y,dotRad,0,2*Math.PI)
}

ctx.fill()
ctx.stroke();

for(let i = 0;i<testArray.length;i++){
    if (colorMode){
        ctx.strokeStyle = colorChoice
    }
    else{
        ctx.strokeStyle= `hsl(${rainbowAngle+(360/testArray.length)*(i+1)}, 100%, 40%)`
    }
    let initialAngle =1.5*Math.PI
    let moveAngle = (i+1)*pivotAngle;
    
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
  newImg.id = "newImg"
  const url= URL.createObjectURL(blob)
  newImg.src = url
  document.getElementById("CPanel").appendChild(newImg)
  
})

}
    
function getGlyphArray(input){
let charNumbers = [...input].map((char)=>{
    return char.codePointAt(0)
})
let glyphArray = []
    charNumbers = charNumbers.map((char)=>{
        if(char > 0){
         glyphArray.push((char*2-3).toString(2))
        }
        else{
            glyphArray.push(0)
        }
    })
return glyphArray
}
makeGlyph()



const glyphWipe = () =>{
    forcePrimes= primeCheck.checked
    const canvas = document.getElementById('glyph');
    const ctx = canvas.getContext('2d');
    const oldImg=document.getElementById('newImg')
    oldImg.remove()
    ctx.reset()
    makeGlyph()
}

    
//event listeners
let typingTimer; 
const waitTime = 400;
glyphText.addEventListener("keyup",function (){ //Text Input

    textLength.innerText = `Length: ${this.value.length}`
    clearTimeout(typingTimer); 
    typingTimer = setTimeout(glyphWipe, waitTime);
})

for(const button of glyphFullLength){  //Length Radio Buttons
button.addEventListener("change",function(){
    if(this.value ==-1){
        document.getElementById('customLengthSettings').style.display='block'
        wordLength = 7
    }
    else{
    document.getElementById('customLengthSettings').style.display='none'
    primeCheck.checked = true
    wordLength = this.value
    }
   glyphWipe()
})}
customGlyphLength.addEventListener("change",function(){ //custom glyph length box
    wordLength=customGlyphLength.value
    glyphWipe()
})
primeCheck.addEventListener("change", function(){ //update forcing primes
    forcePrimes= primeCheck.checked
    glyphWipe()
})
for(const button of colorButton){  //Length Radio Buttons
button.addEventListener("change",function(){
    if(this.value == 1){
        document.getElementById('customColorPicker').style.display='block'
        document.getElementById('rainbowShifter').style.display='none'
        colorMode = 1
    }
    else{
        document.getElementById('customColorPicker').style.display='none'
        document.getElementById('rainbowShifter').style.display='block'
        colorMode = 0
    }
   clearTimeout(typingTimer); 
    typingTimer = setTimeout(glyphWipe, 20);
})}
rainbowOffset.addEventListener('change', function(){
    rainbowAngle=this.value
    clearTimeout(typingTimer); 
    typingTimer = setTimeout(glyphWipe, 50);
})
customColor.addEventListener('change', function(){
    colorChoice = `${this.value}`
    clearTimeout(typingTimer); 
    typingTimer = setTimeout(glyphWipe, 50);
})