const inputString =  String.raw`\sat`;
const inputStack = inputString.split('');
const accSym = ['+', '-', '\\']

let outputStack = [];

for(let i = 0; i < inputStack.length; i++){
    let char = inputStack[i]

    //checks if the char is a number
    if (isNaN(Number(char)) !== true){ 
        outputStack.push(inputStack[i])
    } 
    //checks if the char is a letter
    else if (char.toUpperCase() != char.toLowerCase()){

        //if it is the first char in the string, no neet to add an asterix
        if(inputStack[i - 1] !== undefined){
            outputStack.push('*');
            outputStack.push(inputStack[i]);

        } else {
            outputStack.push(inputStack[i]);
        }
    } 
    //checks if the char is a symbol that won't break anything   
    else if(accSym.indexOf(char) !== -1){
        outputStack.push(inputStack[i])
    }
    //backslash command time!!!! (need to read searching algos)
    else if (char === '\\'){

        let lowVal = [inputStack.indexOf('\\', i), inputStack.indexOf('{', i)];
        let backslash = false;
        let bracket = false;
        let commandEnd
        let commandArr = [];

        if (lowVal[0] > lowVal[1] && lowVal[1] !== -1){
            backslash = true;
            commandEnd = lowVal[1]
        } else if (lowVal[0] !== -1){
            bracket = true;
            commandEnd = lowVal[0]
        }

        for(i; i < commandEnd; i++){
            commandArr.push(inputStack[i])
        }

        let cmd = commandArr.join('')

        console.log(cmd)


    
    }
}

console.log(outputStack.join(''))