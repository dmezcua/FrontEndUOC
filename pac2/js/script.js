//TO DO: Comprovar que els valors introduits per el usuari son numeros sencers i no decimals.
//TO DO: Comprovar que els valors introduits per el usuari NO son lletres, simbols, etc.

//Returns a boolean value depending if the input value is within the valid range of 1 to 50.
function rangValid(num){
    if(num >= 1 && num <= 50) return true;
    else return false;
}

//Adds two values and returns de result.
function suma(num1, num2){
    let result = num1 + num2;
    return result;
}

/*Checks if the two input values are prime numbers and returns a String
specifying which ones are and which are not*/
function primers(num1, num2){
    if(calcularPrimer(num1) && calcularPrimer(num2)){
        return 'Tant el número ' + num1 + ' com el numero ' + num2 + ' son primers.';
    } else if (calcularPrimer(num1)){
        return ' El número ' + num1 + ' és primer. El número ' + num2 + ' NO és primer.';
    } else if (calcularPrimer(num2)){
        return 'El número ' + num1 + ' NO és primer. El número ' + num2 + ' és primer.'; 
    } else{
        return 'Ni el número' + num1 + ' ni el numero ' + num2 + ' son primers.';
    }
}

/*Checks if the two input values are even numbers and returns a String
specifying which ones are and which are not.*/
function parells(num1, num2){
    if(calcularParell(num1) && calcularParell(num2)){
        return 'Tant el número ' + num1 + ' com el numero ' + num2 + ' son parells.';
    }else if (calcularParell(num1)) {
        return 'El número ' + num1 + ' és parell. El número ' +num2 + ' NO és parell.';
    }else if (calcularParell(num2)){
        return 'El número ' + num1 + ' NO és parell. El número ' + num2 + ' és parell.';
    } else {
        return 'Ni el número ' + num1 + ' ni el número ' + num2 + ' son parells.';
    }
}

//Returns an array with a seqüence of all even numbers between two values.
function sequenciaParells(num1, num2){
    let seqParells = [];
    for(i = num1 ; i < num2; i++){
        if(i%2 == 0){
            seqParells.push(i);
        }
    }
    return seqParells;
}

//Returns an array with a seqüence of all odd numbers between two values.
function sequenciaImparells(num1, num2){
    let seqImparells = [];
    for (i = num1; i > num2; i--){
        if(i%2 != 0){
            seqImparells.push(i);
        }
    }
    return seqImparells;
}

//Returns a boolean value depending if the input value is or is not a prime number.
function calcularPrimer(num){
    for(i = 2; i< num; i++){
        if(num%i == 0){
            return false;
        }
    }
    return true;
}

//Returns a boolean value depending if the input value is or is not an even number.
function calcularParell(num){
    if (num%2 == 0) 
        return true;
    else 
        return false;
}
