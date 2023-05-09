function Gasto(tipo, nombre, monto) {
    this.tipo = tipo;
    this.nombre = nombre;
    this.monto = monto;
}

const btncalcular = document.querySelector("#btncalcular");
const btngasto = document.querySelector("#btngasto");
const btnborrar = document.getElementsByClassName("trash");
let tgastos = [];

function sumas(tipo) {
    let suma = 0;
    for (dato of tgastos) {
        if (dato.tipo == tipo) {
            suma += dato.monto;
        }
    }
    return suma;
}

function cambiaBarra(sumap, sumag) {
    let valor = document.querySelector("#valor");
    let gastos = document.querySelector("#gastos");
    let saldo = document.querySelector("#saldo");
    valor.innerHTML = "$ " + sumap;
    gastos.innerHTML = "$ " + sumag;
    if ((sumap - sumag) >= 0) {
        saldo.setAttribute('class', 'text-dark');
    } else {
        saldo.setAttribute('class', 'text-danger');
    }
    saldo.innerHTML = "$ " + (sumap - sumag);
}

function inPresupuesto() {
    let presupuesto = document.querySelector("#presupuesto");
    if (presupuesto.value != "" && parseInt(presupuesto.value) > 0) {
        let monto = parseInt(presupuesto.value);
        let dinero = new Gasto(0, "Presupuesto", monto);
        tgastos.push(dinero);
        let sumap = sumas(0);
        let sumag = sumas(1);
        cambiaBarra(sumap, sumag);
        presupuesto.value = "";
    } else {
        alert ("¡Error! No puede ingresar un presupuesto vacio o inferior o igual a 0.");
    }
    console.log(tgastos);
}

function agregarGasto(){
    let tablita = document.querySelector("#tablita");
    let html = "";
    for (let i = 0; i<tgastos.length; ++i){
        if (tgastos[i].tipo == 1){
            html += "<tr><td>" + tgastos[i].nombre + "</td>";
            html += "<td> $ " + tgastos[i].monto + "</td>"; 
            html += '<td class="trash" scope="'+ i + '" onclick="eliminar(this);"><i class="fa-solid fa-trash-can"></i></td></tr>';
        }
    }
    tablita.innerHTML = html;
}

function inGasto() {
    let gasto = document.querySelector("#gasto");
    let nombreg = document.querySelector("#nombreg");
    if (gasto.value != "" && nombreg.value != "") {
        let monto = parseInt(gasto.value);
        let dinero = new Gasto(1, nombreg.value, monto);
        tgastos.push(dinero);
        let sumap = sumas(0);
        let sumag = sumas(1);
        cambiaBarra(sumap, sumag);
        agregarGasto();
        gasto.value = "";
        nombreg.value = "";
    } else {
        alert ("¡Error! No puede ingresar valores vacios.");
    }
    console.log(tgastos);
}

function eliminar(esto){    
    let indice = parseInt(esto.getAttribute("scope"));    
    tgastos.splice(indice, 1);
    let sumap = sumas(0);
    let sumag = sumas(1);
    cambiaBarra(sumap, sumag);
    agregarGasto();
}

btncalcular.addEventListener('click', inPresupuesto);
btngasto.addEventListener('click', inGasto);