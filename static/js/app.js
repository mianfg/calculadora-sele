/*!
 * Calculadora Selectividad
 * https://github.com/mianfg/calculadora-sele
 *
 * Author: Miguel Ángel Fernández Gutiérrez (https://mianfg.me)
 *
 * Date: 2020-04-16
 */

/**
 * Parse from number input
 * @param {String} input input as string
 * @return {Float} input as float, with the following error outputs:
 *      -1 if after parsing input < 0 || input > 10
 *      -2 if input is empty
 */
function parse(input) {
    if (input=="") return -2;
    value = parseFloat(input.replace(",","."));
    if ( value < 0 || value > 10 )
        return -1;
    else
        return value;
}

/**
 * Return parsed input as troncal
 * @param {String} dom_id id of DOM element
 * @return {Float} input from DOM element as float
 * @note Depending on the resulting value, is-invalid feedback will be provided:
 *      - if input is empty or input < 0 || input > 10:
 *          - add is-invalid class to DOM of input
 */
function parseTroncal(dom_id) {
    val = parse(document.getElementById(dom_id).value);
    if (val < 0)
        $(dom_id).addClass("is-invalid");
    else
        $(dom_id).removeClass("is-invalid");

    return val;
}

/**
 * Return parsed input as especifica
 * @param {String} dom_id id of DOM element
 * @return {Float} input from DOM element as float
 * @note Depending on the resulting value, is-invalid feedback will be provided:
 *      - if input < 0 || input > 10:
 *          - add is-invalid class to DOM of input
 */
function parseEspecifica(dom_id) {
    val = parse(document.getElementById(dom_id).value);
    if (val == -1)
        $(dom_id).addClass("is-invalid");
    else
        $(dom_id).removeClass("is-invalid");

    return val;
}

/**
 * Return sum of especificas
 * @param {Array[Float]} especificas all pondered scores
 * @return {Float} sum of two biggest values of especificas
 * @note some cases:
 *      - if especificas.length == 0
 *          - returns 0.0
 *      - if especificas.length == 1
 *          - returns the only element
 */
function getEspecificas(especificas) {
    especificas.push(0.0);
    especificas.push(0.0);
    sum = 0.0;
    max = Math.max.apply(null, especificas);
    maxi = especificas.indexOf(max);
    if (maxi >= 0) { sum += max; especificas[maxi] = -Infinity; }
    max = Math.max.apply(null, especificas);
    maxi = especificas.indexOf(max);
    if (maxi >= 0 ) { sum += max; }

    return sum;
}

/**
 * Event listener for "Calcular" button (click event)
 * 
 * Calculates and modifies score if all input is OK
 */
document.getElementById("calcular").onclick = function () {
    calculate = true;
    
    media_bach = parseTroncal("media-bach");
    if (media_bach < 0) calculate = false;
    
    troncales = 0;
    for ( i = 1; i <= 4; i++ ) {
        dom_id = "troncal-" + i.toString();
        value = parseTroncal(dom_id);
        if (value < 0) calculate = false;
        troncales += value/4.0;
    }

    especificas = []
    for ( i = 1; i <= 4; i++ ) {
        dom_id = "especifica-" + i.toString();
        value = parseEspecifica(dom_id);
        if (value == -1) calculate = false;
        especificas.push(value*ponder[i-1]);
    }
    
    if (calculate) {
        nota = media_bach*0.6 + troncales*0.4 + getEspecificas(especificas);
        document.getElementById("nota-evau").innerHTML = nota.toFixed(3);
    }
}

// ponder[i] is the ponderation of especifica of index i+1
var ponder = [0.1, 0.1, 0.1, 0.1]

// generate pondering button listeners for click event
for ( var i = 1; i <= 4; i++ ) {
    let local_i = i;
    for ( var j = 1; j <= 3; j++ ) {
        let local_j = j;
        let dom_id = "especifica-"+i.toString()+"-p"+j.toString();
        document.getElementById(dom_id).onclick = function() {
            ponder[local_i-1] = 0.1 + 0.05*(local_j-1);
            $("#"+dom_id).addClass("active");
            for ( k = 1; k <= 3; k++ )
                if (k != local_j)
                    $("#especifica-"+local_i.toString()+"-p"+k.toString()).removeClass("active");
        }
    }
}
