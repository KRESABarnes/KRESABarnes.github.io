


    let wordLength = 7

    const primes = [2,3,5,7,11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89,97]

    const glyphText =document.getElementById("glyphText")
    let input= glyphText.value
    let textLength = document.getElementById("glyphTextLengthCheck")
    const customGlyphLength = document.getElementById('customNumber')
    const primeCheck = document.getElementById("primeCheck")
    let forcePrimes = true
    const glyphFullLength = document.querySelectorAll("input[name='glyphLength']");




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
  newImg.id = "newImg"
  const url= URL.createObjectURL(blob)
  newImg.src = url
  document.body.appendChild(newImg)
  
})

}
    
function getGlyphArray() {
let wordNumbers = [...input]
let charNumbers = wordNumbers.map((char)=>{
    return char.codePointAt(0)
})
charNumbers.sort((a,b)=> a-b)

charNumbers = [... new Set(charNumbers)]
//console.log(charNumbers)

function necklaceMaker(input) {
    input = Array.from(input)
    let index = 1
    let output = []

const ALPHABET = "01";
let LENGTH = 29;


function* necklaces() {
    const state = new Array(LENGTH + 1).fill(0);
    const render = new Array(LENGTH).fill(ALPHABET[0]);
    yield* _generate(state, render, 1, 1);
}


function* _generate(state, render, depth, period) {
    if (depth > LENGTH) {
        if (LENGTH % period === 0) {
            yield render.join("");
        }
        return;
    }


    const prevValue = state[depth - period];
    state[depth] = prevValue;
    render[depth - 1] = ALPHABET[prevValue];
    yield* _generate(state, render, depth + 1, period);


    for (let bit = prevValue + 1; bit < ALPHABET.length; bit++) {
        state[depth] = bit;
        render[depth - 1] = ALPHABET[bit];
        yield* _generate(state, render, depth + 1, depth);
    }
}

    for (const necklace of necklaces()) {
        if(index == input[0]){
            output.push(necklace)
            input.shift()
        }
        if(input.length == 0){
            break
        }
        index++
        
        
    }
    return(output)
}


    let sortArray = Array.from(charNumbers)
        //console.log(sortArray)
    let binaryArray = necklaceMaker(sortArray)
    let printedArray = []

    wordNumbers.map((letter)=>{
        if (letter == ''){

        printedArray.push('0'.repeat(glyphLength))
        }

        else{

            let output = sortArray.indexOf(letter.codePointAt(0))
            printedArray.push(binaryArray[output])
        }
    })
    //printedArray.map((item)=>{console.log(item)})
    return(printedArray)
    }
makeGlyph()

let typingTimer; 
const waitTime = 200;

const glyphWipe = () =>{
    forcePrimes= primeCheck.checked
    const canvas = document.getElementById('glyph');
    const ctx = canvas.getContext('2d');
    const oldImg=document.getElementById('newImg')
    oldImg.remove()
    ctx.reset()
    makeGlyph()
}

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
customGlyphLength.addEventListener("change",function(){
    wordLength=customGlyphLength.value
    glyphWipe()
})
primeCheck.addEventListener("change", function(){
    forcePrimes= primeCheck.checked
    glyphWipe()
})