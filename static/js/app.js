var ponder_1 = 0.1;
var ponder_2 = 0.1;
var ponder_3 = 0.1;
var ponder_4 = 0.1;

function parse(input) {
    if (input=="") return -2;
    value = parseFloat(input.replace(",","."));
    if ( value < 0 || value > 10 )
        return -1;
    else
        return value;
}

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

document.getElementById("calcular").onclick = function () {
    calculate = true;
    
    media_bach = parse(document.getElementById("media-bach").value);
    if (media_bach < 0) {
        $("#media-bach").addClass("is-invalid");
        calculate = false;
    } else
        $("#media-bach").removeClass("is-invalid");
    
    troncales = 0
    if (parse(document.getElementById("troncal-1").value) < 0) {
        $("#troncal-1").addClass("is-invalid");
        calculate = false;
    } else
        $("#troncal-1").removeClass("is-invalid");
    troncales += (parse(document.getElementById("troncal-1").value))/4.0;
    if (parse(document.getElementById("troncal-2").value) < 0) {
        $("#troncal-2").addClass("is-invalid");
        calculate = false;
    } else
        $("#troncal-2").removeClass("is-invalid");
    troncales += (parse(document.getElementById("troncal-2").value))/4.0;
    if (parse(document.getElementById("troncal-3").value) < 0) {
        $("#troncal-3").addClass("is-invalid");
        calculate = false;
    } else
        $("#troncal-3").removeClass("is-invalid");
    troncales += (parse(document.getElementById("troncal-3").value))/4.0;
    if (parse(document.getElementById("troncal-4").value) < 0) {
        $("#troncal-4").addClass("is-invalid");
        calculate = false;
    } else
        $("#troncal-4").removeClass("is-invalid");
    troncales += (parse(document.getElementById("troncal-4").value))/4.0;

    if (parse(document.getElementById("especifica-1").value) == -1) {
        $("#especifica-1").addClass("is-invalid");
        calculate = false;
    } else
        $("#especifica-1").removeClass("is-invalid");
    if (parse(document.getElementById("especifica-2").value) == -1) {
        $("#especifica-2").addClass("is-invalid");
        calculate = false;
    } else
        $("#especifica-2").removeClass("is-invalid");
    if (parse(document.getElementById("especifica-3").value) == -1) {
        $("#especifica-3").addClass("is-invalid");
        calculate = false;
    } else
        $("#especifica-3").removeClass("is-invalid");
    if (parse(document.getElementById("especifica-4").value) == -1) {
        $("#especifica-4").addClass("is-invalid");
        calculate = false;
    } else
        $("#especifica-4").removeClass("is-invalid");

    especificas = []
    especificas.push(parse(document.getElementById("especifica-1").value)*ponder_1);
    especificas.push(parse(document.getElementById("especifica-2").value)*ponder_2);
    especificas.push(parse(document.getElementById("especifica-3").value)*ponder_3);
    especificas.push(parse(document.getElementById("especifica-4").value)*ponder_4);
    
    if (calculate) {
        nota = media_bach*0.4 + troncales*0.6 + getEspecificas(especificas);
        document.getElementById("nota-evau").innerHTML = nota.toFixed(3);
    }
}

document.getElementById("especifica-1-p1").onclick = function () {
    ponder_1 = 0.1;
    $("#especifica-1-p1").attr("class", "page-item active")
    $("#especifica-1-p2").attr("class", "page-item")
    $("#especifica-1-p3").attr("class", "page-item")
}

document.getElementById("especifica-1-p2").onclick = function () {
    ponder_1 = 0.15;
    $("#especifica-1-p1").attr("class", "page-item")
    $("#especifica-1-p2").attr("class", "page-item active")
    $("#especifica-1-p3").attr("class", "page-item")
}

document.getElementById("especifica-1-p3").onclick = function () {
    ponder_1 = 0.2;
    $("#especifica-1-p1").attr("class", "page-item")
    $("#especifica-1-p2").attr("class", "page-item")
    $("#especifica-1-p3").attr("class", "page-item active")
}

document.getElementById("especifica-2-p1").onclick = function () {
    ponder_2 = 0.1;
    $("#especifica-2-p1").attr("class", "page-item active")
    $("#especifica-2-p2").attr("class", "page-item")
    $("#especifica-2-p3").attr("class", "page-item")
}

document.getElementById("especifica-2-p2").onclick = function () {
    ponder_2 = 0.15;
    $("#especifica-2-p1").attr("class", "page-item")
    $("#especifica-2-p2").attr("class", "page-item active")
    $("#especifica-2-p3").attr("class", "page-item")
}

document.getElementById("especifica-2-p3").onclick = function () {
    ponder_2 = 0.2;
    $("#especifica-2-p1").attr("class", "page-item")
    $("#especifica-2-p2").attr("class", "page-item")
    $("#especifica-2-p3").attr("class", "page-item active")
}

document.getElementById("especifica-3-p1").onclick = function () {
    ponder_3 = 0.1;
    $("#especifica-3-p1").attr("class", "page-item active")
    $("#especifica-3-p2").attr("class", "page-item")
    $("#especifica-3-p3").attr("class", "page-item")
}

document.getElementById("especifica-3-p2").onclick = function () {
    ponder_3 = 0.15;
    $("#especifica-3-p1").attr("class", "page-item")
    $("#especifica-3-p2").attr("class", "page-item active")
    $("#especifica-3-p3").attr("class", "page-item")
}

document.getElementById("especifica-3-p3").onclick = function () {
    ponder_3 = 0.2;
    $("#especifica-3-p1").attr("class", "page-item")
    $("#especifica-3-p2").attr("class", "page-item")
    $("#especifica-3-p3").attr("class", "page-item active")
}

document.getElementById("especifica-4-p1").onclick = function () {
    ponder_4 = 0.1;
    $("#especifica-4-p1").attr("class", "page-item active")
    $("#especifica-4-p2").attr("class", "page-item")
    $("#especifica-4-p3").attr("class", "page-item")
}

document.getElementById("especifica-4-p2").onclick = function () {
    ponder_4 = 0.15;
    $("#especifica-4-p1").attr("class", "page-item")
    $("#especifica-4-p2").attr("class", "page-item active")
    $("#especifica-4-p3").attr("class", "page-item")
}

document.getElementById("especifica-4-p3").onclick = function () {
    ponder_4 = 0.2;
    $("#especifica-4-p1").attr("class", "page-item")
    $("#especifica-4-p2").attr("class", "page-item")
    $("#especifica-4-p3").attr("class", "page-item active")
}
