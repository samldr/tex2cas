// example equation
const inputString =  String.raw`x \cdot \left( \frac{\sqrt{2x+4}}{3+2} \right) ^{3x+2} 2x = 12x`;

function translate(inputString){
    const inputArr = inputString.split(' ');
    const accSym = ['+', '-', '=', '(', ')', '*'];

    let inputQueue = [];


    // this for loop sepatates every character into a new array element unless it is a command
    for(let i = 0; i < inputArr.length; i++){

        if(inputArr[i].charAt(0) === '\\' || inputArr[i].charAt(0) === '^'){

            inputQueue = inputQueue.concat(inputArr[i]);
            
        } else {

            inputQueue = inputQueue.concat(inputArr[i].split(''));

        }
    }

    let output = [];

    for(let i = 0; i < inputQueue.length; i++){
        let char = inputQueue[i]
        
        //checks if the char is a number
        if (isNaN(Number(char)) !== true){ 
            if(inputQueue[i - 1] !== undefined && inputQueue[i - 1].charAt(0) === '^'){
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
                case '\\cdot':
                case '\\times':
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

                    let expression = translate(char.slice(5,-1));
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
            if(inputQueue[i - 1] !== undefined){
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