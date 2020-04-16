var ponder = [0.1, 0.1, 0.1, 0.1]

function parse(input) {
    if (input=="") return -2;
    value = parseFloat(input.replace(",","."));
    if ( value < 0 || value > 10 )
        return -1;
    else
        return value;
}

function parseTroncal(dom_id) {
    val = parse(document.getElementById(dom_id).value);
    if (val < 0)
        $(dom_id).addClass("is-invalid");
    else
        $(dom_id).removeClass("is-invalid");

    return val;
}

function parseEspecifica(dom_id) {
    val = parse(document.getElementById(dom_id).value);
    if (val == -1)
        $(dom_id).addClass("is-invalid");
    else
        $(dom_id).removeClass("is-invalid");

    return val;
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
