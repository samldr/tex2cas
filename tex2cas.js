// example equation
const inputString =  String.raw`\frac{3\cdot 5}{4x}\times \sqrt{2x+45}+4^{ex+2e}`;

function translate(inputString){
    const spaceArr = inputString.split('');
    const accSym = ['+', '-', '=', '(', ')', '*'];

    let inputQueue = [];
    let inputArr = [];
    let output = [];
    
    let bracketStack = [];
    let slashStack = [];

    // add spaces
    for (let i = 0; i < spaceArr.length; i++){
        if (spaceArr[i] === '{'){
            bracketStack.push('{');
        } else if(spaceArr[i] === '}'){
            bracketStack.pop()
        }

        if (spaceArr[i] === '\\'){
            slashStack.push('/')
        }

        if (spaceArr[i] === ' '){
            spaceArr[i] = '~';
        }
        
        if((spaceArr[i] === '\\' ||
        spaceArr[i] === '^') &&
        bracketStack.length === 0){

            inputArr.push(' ')
            inputArr.push(spaceArr[i])
            
        } else if(spaceArr[i] === '}' && 
        spaceArr[i + 1] !== undefined && 
        spaceArr[i + 1] !== '{' && 
        spaceArr[i + 1] !== '}'){

            inputArr.push(spaceArr[i])
            inputArr.push(' ')
        
        //need to change this so that it works when the command ends and not when it finds a number (ie a variable after the command)
        } else if (spaceArr[i] === '~' &&
        slashStack.length !== 0 &&
        bracketStack.length === 0){

            slashStack.pop()
            inputArr.push(' ')
        
        } else {
            inputArr.push(spaceArr[i])
        }
    }

    console.log('this one is inputarr')
    console.log(inputArr);
    inputArr = inputArr.join('').split(' ')    
    

    // this for loop sepatates every character into a new array element unless it is a command
    for(let i = 0; i < inputArr.length; i++){

        if(inputArr[i].charAt(0) === '\\' || inputArr[i].charAt(0) === '^'){

            inputQueue = inputQueue.concat(inputArr[i]);
            
        } else {

            inputQueue = inputQueue.concat(inputArr[i].split(''));

        }
    }

    console.log(inputQueue)

    for(let i = 0; i < inputQueue.length; i++){
        let char = inputQueue[i]
        
        //checks if the char is a number
        if (isNaN(Number(char)) !== true){ 
            if(inputQueue[i - 1] !== undefined && 
                inputQueue[i - 1].charAt(0) === '^'){
                output.push('*');
                output.push(inputQueue[i]);

            } else {
                output.push(inputQueue[i]);
            }
        }
        //backslash command time!
        else if (char.charAt(0) == '\\'){
        
            switch(char){
                //multiplication commands
                case char.match(/^\\cdot/)?.input:
                case char.match(/^\\times/)?.input:
                    output.push('*');
                    break;

                //fractions
                case char.match(/^\\frac/)?.input:

                    let components = char.slice(5).split('}{');
                    
                    let numerator = translate(components[0].slice(1));
                    let denominator = translate(components[1].slice(0,-1));

                    let fraction = '(' + numerator + ')/(' + denominator + ')';

                    output.push(fraction);
                    break;

                //sqrt (add toggle for fraction exponent instead of sqrt()?)
                case char.match(/^\\sqrt/)?.input:

                    let expression = translate(char.slice(6,-1));
                    let sqrt = 'sqrt(' + expression + ')';
                    
                    output.push(sqrt);
                    break;

                //\left and \right 
                case '\\left(':
                    output.push('(');
                    break;

                case '\\right)':
                    output.push(')');
                    break;
            } 

        } 
        //checks if the char is an exponent
        else if (char.charAt(0) == '^'){
            let exponent = translate(char.slice(2,-1));
            let ans = '^(' + exponent + ')'

            output.push(ans)
        }
        //checks if the char is a letter
        else if (char.toUpperCase() != char.toLowerCase()){

            //if it is the first char in the string, no neet to add an asterix
            if(inputQueue[i - 1] !== undefined &&
                (accSym.indexOf(output[output.length - 1 ]) !== -1 &&
                accSym.indexOf(output[output.length]) !== -1) ||
                isNaN(Number(inputQueue[i - 1])) !== true){

                output.push('*');
                output.push(inputQueue[i]);

            } else {
                output.push(inputQueue[i]);
            }
        } 
        //checks if the char is a symbol that won't break anything   
        else if(accSym.indexOf(char) !== -1){
            output.push(inputQueue[i]);
        }
    }
    return output.join('');
}

console.log(translate(inputString));