/*!
 * Calculadora Selectividad
 * https://github.com/mianfg/calculadora-sele
 *
 * Author: Miguel Ángel Fernández Gutiérrez (https://mianfg.me)
 *
 * Date: 2020-04-16
 */

$(document).ready(function () {
    showHelper(false);
});

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
function parseRequire(dom_id) {
    val = parse(document.getElementById(dom_id).value);
    if (val < 0)
        $("#"+dom_id).addClass("is-invalid");
    else
        $("#"+dom_id).removeClass("is-invalid");

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
function parseOptional(dom_id) {
    val = parse(document.getElementById(dom_id).value);
    if (val == -1)
        $("#"+dom_id).addClass("is-invalid");
    else
        $("#"+dom_id).removeClass("is-invalid");

    return val;
}

/**
 * Return sum of especificas
 * @param {Array[Float]} especificas all pondered scores
 * @return {Array[Float]} array of two biggest values of especificas
 */
function getEspecificas(especificas) {
    especificas.push(0.0);
    especificas.push(0.0);
    arr = []
    sum = 0.0;
    max = Math.max.apply(null, especificas);
    maxi = especificas.indexOf(max);
    if (maxi >= 0 && max > 0) { arr.push(max); especificas[maxi] = -Infinity; }
    max = Math.max.apply(null, especificas);
    maxi = especificas.indexOf(max);
    if (maxi >= 0 && max > 0) { arr.push(max); }

    return arr;
}

/**
 * Set data of helper dialogue
 * @param {Array[Array[Float]]} arr 
 */
function setHelper(arr) {
    document.getElementById("helper-3").innerHTML = '<p class="mb-1"><strong><i class="fa fa-search mr-2"></i>En tu caso:</strong></p>';
    document.getElementById("helper-4").innerHTML = '<p class="mb-1"><strong><i class="fa fa-search mr-2"></i>En tu caso:</strong></p>';
    document.getElementById("helper-5").innerHTML = '<p class="mb-1"><strong><i class="fa fa-search mr-2"></i>En tu caso:</strong></p>';
    document.getElementById("helper-6").innerHTML = '<p class="mb-1"><strong><i class="fa fa-search mr-2"></i>En tu caso:</strong></p>';
    
    over_five = []
    if ( arr.length == 0 )
        document.getElementById("helper-3").innerHTML += '<span>No te has evaluado de ninguna asignatura específica.</span>'
    for ( i = 0; i < arr.length; i++ ) {
        document.getElementById("helper-3").innerHTML += '<span class="badge badge-light">'+arr[i][0].toFixed(2).toString()+'</span>';
        if ( arr[i][0] >= 5 ) {
            over_five.push(arr[i])
        }
        if ( i < arr.length - 1 )
            document.getElementById("helper-3").innerHTML += '<span>, </span>';
    }

    esp = []
    if ( over_five.length == 0 ) {
        document.getElementById("helper-4").innerHTML += '<span>No tienes ninguna asignatura en fase específica con puntuación mayor o igual a 5, pero ¡no te preocupes! ¡El resto también cuenta y mucho! :)</span>'
        document.getElementById("helper-5").innerHTML += '<span>No tienes ninguna asignatura en fase específica con puntuación mayor o igual a 5, pero ¡no te preocupes! ¡El resto también cuenta y mucho! :)</span>'
        document.getElementById("helper-6").innerHTML += '<span>No tienes ninguna asignatura en fase específica con puntuación mayor o igual a 5, pero ¡no te preocupes! ¡El resto también cuenta y mucho! :)</span>'
    }
    for ( i = 0; i < over_five.length; i++ ) {
        document.getElementById("helper-4").innerHTML += '<span class="badge badge-light">'+over_five[i][0].toFixed(2).toString()+'</span>';
        document.getElementById("helper-5").innerHTML += '<span>' + over_five[i][0].toFixed(2).toString() + ' × ' + over_five[i][1].toFixed(2).toString() + ' = </span><span class="badge badge-light">'+(over_five[i][0]*over_five[i][1]).toFixed(3).toString()+'</span>' 
        if ( i < over_five.length - 1 ) {
            document.getElementById("helper-4").innerHTML += '<span>, </span>';
            document.getElementById("helper-5").innerHTML += '<span>, </span>';
        }
        esp.push(over_five[i][0]*over_five[i][1]);
    }

    max = getEspecificas(esp);
    if ( max.length > 0 )
        document.getElementById("helper-6").innerHTML += '<span class="badge badge-danger">'+max.reduce((a,b)=>a+b,0).toFixed(3).toString()+'</span><span> = </span>';
    for ( i = 0; i < max.length; i++ ) {
        document.getElementById("helper-6").innerHTML += '<span class="badge badge-light">'+max[i].toFixed(3).toString()+'</span>';
        if ( i < max.length - 1 )
            document.getElementById("helper-6").innerHTML += '<span> + </span>';
    }
}

/**
 * Hide or show helper of calculation dialogue
 * @param {Boolean} b true is show, false is hide
 */
function showHelper(b) {
    for ( i = 2; i <= 6; i++ ) {
        if (b) $("#helper-"+i.toString()).show();
        else $("#helper-"+i.toString()).hide();
    }
    if (b) document.getElementById("helper-1").innerHTML = '<p class="mb-1"><strong><i class="fa fa-search mr-2"></i>Comprobar nota:</strong> te explicaremos cómo hemos calculado tu nota, paso a paso.<br><span class="badge badge-success" id="helper-n">--.---</span><span> = 0.6 × </span><span class="badge badge-info" id="helper-mb">.</span><span> + 0.4 × </span><span class="badge badge-warning" id="helper-t0">.</span><span> + </span><span class="badge badge-danger" id="helper-e">Nota de la Fase Específica</span></p>';
    else document.getElementById("helper-1").innerHTML = '<strong><i class="fa fa-search mr-2"></i>Comprobar nota:</strong> Introduce tus notas y luego pulsa en el botón <strong>Calcular</strong>. Vuelve aquí para una explicación detallada de cómo la hemos obtenido con tus calificaciones.';
}

function calculateCall(b) {
    if (b) {
        document.getElementById("calculate-call").innerHTML = "COMPRUEBA TU NOTA";
        $("#comprobar").removeClass("disabled")
    } else {
        document.getElementById("calculate-call").innerHTML = "HAZLO POR TI MISMO";
        $("#comprobar").addClass("disabled")
    }
}

/**
 * Event listener for "Calcular" button (click event)
 * 
 * Calculates and modifies score if all input is OK
 */
document.getElementById("calcular").onclick = function () {
    showHelper(true);
    calculate = true;
    has_coof = false;
    
    media_bach = parseRequire("media-bach");
    if (media_bach < 0) calculate = false;

    document.getElementById("helper-mb").innerHTML = media_bach.toFixed(2);
    
    troncales = 0; n = 4.0;
    // comprobar primero si hay lengua cooficial
    coof = parseOptional("troncal-c");
    if ( coof != -2 ) {
        has_coof = true;
        n = 5.0;
        troncales += coof/n;
        document.getElementById("coof-n").innerHTML = " ) / 5";
        $("#helper-troncal-c").show()
        $("#sum-troncal-c").show()
        document.getElementById("helper-troncal-c").innerHTML = coof.toFixed(2).toString();
    } else {
        document.getElementById("coof-n").innerHTML = " ) / 4";
        $("#helper-troncal-c").hide()
        $("#sum-troncal-c").hide()
    }

    for ( i = 1; i <= 4; i++ ) {
        dom_id = "troncal-" + i.toString();
        if (i == 4) dom_id = "especifica-4";
        value = parseRequire(dom_id);
        document.getElementById("helper-"+dom_id).innerHTML = value.toFixed(2);
        if (value < 0) calculate = false;
        troncales += value/n;
    }

    document.getElementById("helper-t").innerHTML = troncales.toFixed(3);

    especificas = []
    especificas_helper = []
    for ( i = 1; i <= 4; i++ ) {
        dom_id = "especifica-" + i.toString();
        value = parseOptional(dom_id);
        if (i == 4) value = parseRequire(dom_id);
        if (value == -1) calculate = false;
        else if (value > 0) especificas_helper.push([value, ponder[i-1]])
        if (value >= 5) especificas.push(value*ponder[i-1]);
    }

    setHelper(especificas_helper);
    nota_especifica = getEspecificas(especificas).reduce((a,b)=>a+b,0);
    
    if (calculate) {
        showHelper(true);
        nota = media_bach*0.6 + troncales*0.4 + nota_especifica;
        document.getElementById("nota-evau").innerHTML = nota.toFixed(3);
        document.getElementById("helper-n").innerHTML = nota.toFixed(3);
        document.getElementById("helper-mb").innerHTML = media_bach.toFixed(2);
        document.getElementById("helper-e").innerHTML = nota_especifica.toFixed(3);
        document.getElementById("helper-t0").innerHTML = troncales.toFixed(3);
        calculateCall(true);
        window.scrollTo(0,0);
    } else {
        document.getElementById("nota-evau").innerHTML = "--.---";
        showHelper(false);
        calculateCall(false);
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
