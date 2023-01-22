var inputResolt = false;
while(inputResolt == false){
    var num1 = prompt('Introdueix un primer número del 1 al 50');
    if(isNaN(num1)){
        alert('ERROR: El valor introduït no és un numero.');
    }else if(!rangValid(num1)){
        alert('ERROR: El numero introduït té que ser entre 1 i 50.');
    }else{
        inputResolt = true;
    }
}

inputResolt = false;
while(inputResolt == false){
    var num2 = prompt('Introdueix un segon número del 1 al 50');
    if(isNaN(num2)){
        alert('ERROR: El valor introduït no és un numero.');
    }else if(!rangValid(num2)){
        alert('ERROR: El numero introduït té que ser entre 1 i 50');
    }else{
        inputResolt = true;
    }
}

console.log('Imprimint resultat');

alert(mostrarResultat(parseInt(num1), parseInt(num2)));





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
function mostrarPrimers(num1, num2){
    if(calcularPrimer(num1) && calcularPrimer(num2)){
        return 'Tant el número ' + num1 + ' com el numero ' + num2 + ' son primers.';
    } else if (calcularPrimer(num1)){
        return 'El número ' + num1 + ' és primer. El número ' + num2 + ' NO és primer.';
    } else if (calcularPrimer(num2)){
        return 'El número ' + num1 + ' NO és primer. El número ' + num2 + ' és primer.'; 
    } else{
        return 'Ni el número ' + num1 + ' ni el numero ' + num2 + ' son primers.';
    }
}

/*Checks if the two input values are even numbers and returns a String
specifying which ones are and which are not.*/
function mostrarParells(num1, num2){
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
    for(i = num1 ; i <= num2; i++){
        if(i%2 == 0){
            seqParells.push(i);
        }
    }
    return seqParells;
}

//Returns an array with a seqüence of all odd numbers between two values.
function sequenciaImparells(num1, num2){
    let seqImparells = [];
    for (i = num1; i >= num2; i--){
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

//Sets all the results of the calculations on a string to be printed on screen
function mostrarResultat(num1, num2){
    let resultat = 'Els resultats son els següents: \n\n';
    resultat += 'La suma dels dos valors es: ' + parseInt(suma(num1, num2)) + '\n';

    if(num1 == num2){
        if(calcularPrimer(num1)){
            resultat += 'El número ' + num1 + ' és primer. \n';
        } else {
            resultat += 'El número ' + num1 + ' NO és primer. \n';
        }

        if(calcularParell(num1)){
            resultat += 'El número ' + num1 + ' és parell. \n';
        } else {
            resultat += 'El número ' + num1 + ' NO és parell. \n';
        }

        resultat += '\n\nEl rang és: \n' + num1;
    } else {
        resultat += mostrarPrimers(num1, num2) + '\n';
        resultat += mostrarParells(num1, num2) + '\n';

        if(num1 < num2){
            resultat += '\nEl rang de parells entre els dos numeros és: \n' + 
            sequenciaParells(num1, num2).join(' , ');
        } else if(num1 > num2){
            resultat += '\nEl rang de imparells entre els dos números és: \n' + 
            sequenciaImparells(num1, num2).join(' , ');
        } 
    }

    return resultat;
}
