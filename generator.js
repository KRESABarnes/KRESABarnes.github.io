import * as fs from 'node:fs'
import * as readline from 'node:readline';
let wordLength = 14

let input = "Brandon Barnes"

let wordNumbers = [...input]
let charNumbers = wordNumbers.map((char)=>{
    return char.codePointAt(0)
})
charNumbers.sort((a,b)=> a-b)
charNumbers = [... new Set(charNumbers)]

async function getChars(filePath, lineNumbers) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity // Considers \r\n as a single newline
    });
    let lineArray = []
    let currentLine = -1;
    for await (const line of rl) {
        //console.log(currentLine)
        if(lineNumbers.find((number)=> number ==currentLine)){
            //console.log(currentLine)
            lineArray.push(line)
        }
        if (currentLine === lineNumbers[lineNumbers.length-1]) {
            rl.close(); // Stop reading the file
            fileStream.destroy(); // Close the stream
            return lineArray;
        }
        currentLine++;
    }
    return undefined; // Line number not found
}
let glyphArray = []
 
async function getGlyphArray() {
    glyphArray =await getChars('Dictionary.txt', charNumbers)
    const glyphDict = {}
    for(let i = 0; i<glyphArray.length;i++){
        glyphDict[String.fromCodePoint(charNumbers[i])] = glyphArray[i]
    }
   //console.log(Object.keys(glyphDict))
   let printedArray = []
   wordNumbers.map((letter)=>{
    if (letter == ''){
      printedArray.push('0'.repeat(wordLength))
    }
    else{
      printedArray.push(glyphDict[letter])
    }
   })
   //printedArray.map((item)=>{console.log(item)})
   console.log(printedArray)

}
getGlyphArray()


