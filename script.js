let operaciones = [];
let operacionesNegativas = []; // Nueva variable para operaciones negativas
let operacionesBreakeven = []; // Nueva variable para operaciones breakeven
  //operaciones positivas
  document.getElementById("agregarOperacion").addEventListener("click", function() {
      const valor = parseFloat(document.getElementById("operacion").value);
      if (!isNaN(valor)) {
          operaciones.push(valor);
          document.getElementById("operacion").value = "";
          mostrarOperaciones();
      }
  });
  
  document.getElementById("formOperaciones").addEventListener("submit", function(e) {
      e.preventDefault();
      mostrarResumen();
  });
  
  // Nuevas funciones para operaciones negativas
  document.getElementById("agregarOperacionNegativa").addEventListener("click", function() {
    const valorNegativo = parseFloat(document.getElementById("operacionNegativa").value);
    if (!isNaN(valorNegativo)) {
        operacionesNegativas.push(valorNegativo < 0 ? valorNegativo : -valorNegativo);
        document.getElementById("operacionNegativa").value = "";
        mostrarOperacionesNegativas();
    }
});

document.getElementById("formOperacionesNegativas").addEventListener("submit", function(e) {
    e.preventDefault();
    mostrarResumenOperacionesNegativas();
});

// Nuevas funciones para operaciones breakeven
document.getElementById("agregarOperacionBreakeven").addEventListener("click", function() {
    const valor = parseFloat(document.getElementById("operacionBreakeven").value);
    if (!isNaN(valor)) {
        operacionesBreakeven.push(valor);
        document.getElementById("operacionBreakeven").value = "";
        mostrarOperacionesBreakeven();
    }
});

document.getElementById("formOperacionesBreakeven").addEventListener("submit", function(e) {
    e.preventDefault();
    mostrarOperacionesBreakeven();
});

function mostrarOperaciones() {
      document.getElementById("resumenOperaciones").innerHTML =
          "<b>Operaciones registradas:</b> " + operaciones.join(",  ");
  }

  function mostrarOperacionesNegativas() {
    document.getElementById("resumenOperacionesNegativas").innerHTML =
        "<b>Operaciones perdedoras registradas:</b> " + operacionesNegativas.join(",  ");
}

function mostrarOperacionesBreakeven() {
    if (operacionesBreakeven.length === 0) {
        document.getElementById("resumenOperacionesBreakeven").innerHTML = "No hay operaciones breakeven registradas.";
        return;
    }

    let html = `<b>Operaciones breakeven registradas:</b><br>`;
    operacionesBreakeven.forEach((op, i) => {
        html += `<div>#${i + 1}: ${op > 0 ? "+" : ""}${op.toFixed(2)}<br></div> `;
    });

    document.getElementById("resumenOperacionesBreakeven").innerHTML = html;
}


function mostrarResumen() {
    if (operaciones.length === 0) {
        document.getElementById("resumenOperaciones").innerHTML = "No hay operaciones registradas.";
        return;
    }
    const total = operaciones.reduce((a, b) => a + b, 0);
    const cantidad = operaciones.length;
    const totalOperacionesMes = operaciones.length + operacionesNegativas.length; // NUEVO
    // Calcula el aporte porcentual de cada operación
    const aportes = operaciones.map(op => ({
        valor: op,
        porcentaje: total !== 0 ? (op / total) * 100 : 0
    }));
    // Ordena de mayor a menor aporte
    let html = `Margen neto: ${total.toFixed(2)}<br>`;
html += `Cantidad de operaciones: ${cantidad}<br>`;
html += `Aporte individual (% sobre el total):<br>`;
aportes.forEach((a, i) => {
    html += `<div>#${i + 1}: ${a.valor > 0 ? "+" : ""}${a.valor.toFixed(2)} (${a.porcentaje.toFixed(2)}%)</div>`;
});

    document.getElementById("resumenOperaciones").innerHTML = html;
}

function mostrarResumenOperacionesNegativas() {
    if (operacionesNegativas.length === 0) {
        document.getElementById("resumenOperacionesNegativas").innerHTML = "No hay operaciones perdedoras registradas.";
        return;
    }
    const totalNegativo = operacionesNegativas.reduce((a, b) => a + b, 0);
    const cantidadNegativa = operacionesNegativas.length;
    const totalOperacionesMes = operaciones.length + operacionesNegativas.length; // NUEVO
    // Calcula el aporte porcentual de cada operación negativa
    const aportesNegativos = operacionesNegativas.map(op => ({
        valor: op,
        porcentaje: totalNegativo !== 0 ? (op / totalNegativo) * 100 : 0
    }));
    // Ordena de mayor a menor aporte negativo
    aportesNegativos.sort((a, b) => Math.abs(b.porcentaje) - Math.abs(a.porcentaje));
   let html = `Margen neto negativo: -${Math.abs(totalNegativo).toFixed(2)}<br>`;
html += `Cantidad de operaciones perdedoras: ${cantidadNegativa}<br>`;
html += `Aporte individual (% sobre el total de pérdidas):<br>`;
aportesNegativos.forEach((a, i) => {
    html += `<div>#${i + 1}: -${Math.abs(a.valor).toFixed(2)} (${a.porcentaje.toFixed(2)}%)</div>`;
});


    document.getElementById("resumenOperacionesNegativas").innerHTML = html;
}
  
  document.getElementById("formSemanas").addEventListener("submit", function(event) {
    event.preventDefault();
    const semanas = document.getElementById("semanasOperadas").value;
    document.getElementById("resultado").textContent = `Semanas operadas este mes: ${semanas}`;
});
function agregarError() {
        const tipo = document.getElementById("tipo-error").value;
        const cantidad = document.getElementById("cantidad-error").value;
        const lista = document.getElementById("lista-errores");

        if (cantidad === "" || cantidad <= 0) {
            alert("Escribe un número válido.");
            return;
        }

        const textoVisible = document.querySelector(`#tipo-error option[value="${tipo}"]`).textContent;

        const li = document.createElement("li");
        li.textContent = `${textoVisible} — ${cantidad} operaciones.`;

        lista.appendChild(li);
    }

 
    //resumen final
    document.getElementById("generarResumenFinal").addEventListener("click", function() {
        const mes = document.getElementById("mes").value || "No especificado";
        const semanas = document.getElementById("semanasOperadas").value || "No especificado";
        // Obtén los valores seleccionados de los selects existentes
        const compresionTiempoReal = document.getElementById("comprension-en-tiempo-real").value || "No especificado";
        const compresionPostMercado = document.getElementById("comprension-pos-mercado").value || "No especificado";
        const ganadoras = operaciones.length;
        const perdedoras = operacionesNegativas.length;
        const breakeven = operacionesBreakeven.length;
        const totalOperaciones = ganadoras + perdedoras + breakeven;

        // Margen neto
        const margenGanadas = operaciones.reduce((a, b) => a + b, 0);
        const margenPerdidas = operacionesNegativas.reduce((a, b) => a + b, 0);
        const margenNetoTotal = margenGanadas + margenPerdidas;

        // Win rate
        const totalWinRate = ganadoras + perdedoras;

        // Aportes individuales ganadoras
        const aportesGanadoras = operaciones.map(op => ({
            valor: op,
            porcentaje: margenGanadas !== 0 ? (op / margenGanadas) * 100 : 0
        }));
        aportesGanadoras.sort((a, b) => Math.abs(b.valor) - Math.abs(a.valor));

        // Aportes individuales perdedoras
        const aportesPerdedoras = operacionesNegativas.map(op => ({
            valor: op,
            porcentaje: margenPerdidas !== 0 ? (op / margenPerdidas) * 100 : 0
        }));
        aportesPerdedoras.sort((a, b) => Math.abs(b.valor) - Math.abs(a.valor));

        // Breakeven orden original
        const listaBreakeven = operacionesBreakeven.map(op => `${op > 0 ? "+" : ""}${op.toFixed(2)}`);

        let resumen = `<h3>Resumen Final Mensual</h3>`;
        resumen += `<b>🗓️ Mes:</b> ${mes.charAt(0).toUpperCase() + mes.slice(1)}<br><br>`;
        resumen += `<b>📆 Semanas operadas:</b> ${semanas}<br><br>`;
        resumen += `<b>⏱️ Promedio de compresión del mercado en tiempo real de las semanas:</b> ${compresionTiempoReal}<br><br>`;
        resumen += `<b>📊 Promedio de compresión de las semanas post mercado:</b> ${compresionPostMercado}<br><br>`;
     

        // Ganadoras
        resumen += `<b>✅ Operaciones ganadoras (${ganadoras}):</b><div>`;
        aportesGanadoras.forEach((a, i) => {
            resumen += `<div>#${i + 1}: ${a.valor > 0 ?  "+" : ""}${a.valor.toFixed(2)}$ (${a.porcentaje.toFixed(2)}%)</div>`;
        });
        resumen += `</div>`;
        resumen += `<b>📈 Margen neto de ganadas:</b> ${margenGanadas >= 0 ? "+" : ""}${margenGanadas.toFixed(2)}$<br><br>`;

        // Perdedoras
        resumen += `<b>❌ Operaciones perdedoras (${perdedoras}):</b><div>`;
        aportesPerdedoras.forEach((a, i) => {
            resumen += `<div>#${i + 1}: -${Math.abs(a.valor).toFixed(2)}$ (${a.porcentaje.toFixed(2)}%)</div>`;
        });
        resumen += `</div>`;
        resumen += `<b>📉 Margen neto de perdidas:</b> -${Math.abs(margenPerdidas).toFixed(2)}$<br><br>`;

        // Breakeven
        resumen += `<b>⚖️ Operaciones breakeven (${breakeven}):</b><div>`;
        listaBreakeven.forEach((op, i) => {
            resumen += `<div>#${i + 1}: ${op}$</div>`;
        });

        resumen += `<b>📊 Total de operaciones:</b> ${totalOperaciones}<br>`;
        
        resumen += `</div><br>`;

        
        // Totales y winrate
        
        resumen += `<b>💰 Margen neto total:</b> ${margenNetoTotal > 0 ? "+" : ""}${margenNetoTotal.toFixed(2)}$<br><br>`;

        // Nueva métrica: operación ganadora con mayor beneficio
        if (operaciones.length > 0) {
            const mayorGanancia = Math.max(...operaciones);
            const porcentaje = margenGanadas !== 0 ? (mayorGanancia / margenGanadas) * 100 : 0;
            resumen += `<b>🥇 Operación ganadora con mayor beneficio:</b> +${mayorGanancia.toFixed(2)} (${porcentaje.toFixed(2)}%)<br>`;
        }

        // Nueva métrica: operación perdedora con mayor pérdida
        if (operacionesNegativas.length > 0) {
            const mayorPerdida = Math.min(...operacionesNegativas); // Más negativa
            const porcentaje = margenPerdidas !== 0 ? (mayorPerdida / margenPerdidas) * 100 : 0;
            resumen += `<b>🛑 Operación perdedora con mayor pérdida:</b> ${mayorPerdida.toFixed(2)} (${porcentaje.toFixed(2)}%)<br><br>`;
        }

        // Calcular Avg Win, Avg Loss y Ratio
let avgWin = 0;
let avgLoss = 0;
let ratio = "N/A";

if (operaciones.length > 0) {
    avgWin = operaciones.reduce((a, b) => a + b, 0) / operaciones.length;
}
if (operacionesNegativas.length > 0) {
    avgLoss = operacionesNegativas.reduce((a, b) => a + b, 0) / operacionesNegativas.length;
}
if (avgLoss !== 0) {
    ratio = Math.abs(avgWin / avgLoss).toFixed(2);
} else {
    ratio = "N/A";
}

resumen += `<b>📊 Avg Win</b> ${avgWin > 0 ? "+" : ""}${avgWin.toFixed(2)}$<br>`;
resumen += `<b>📉 Avg Loss</b> -${Math.abs(avgLoss).toFixed(2)}$<br>`;
resumen += `<b>⚖️ Ratio (Avg Win / Avg Loss)</b> ${ratio}<br><br>`;

// Calcula Win Rate y Loss Rate
const totalWinLoss = ganadoras + perdedoras;
const winRate = totalWinLoss === 0 ? 0 : (ganadoras / totalWinLoss) * 100;
const lossRate = totalWinLoss === 0 ? 0 : (perdedoras / totalWinLoss) * 100;

resumen += `<b>🎯 Win Rate</b> ${winRate.toFixed(2)}% &nbsp;&nbsp; <b>❌ Loss Rate</b> ${lossRate.toFixed(2)}% 
(${perdedoras} de ${totalWinLoss} operaciones)<br>`;

// Calcular Expectancy
let expectancy = 0;
if (operaciones.length > 0 || operacionesNegativas.length > 0) {
    const winRateDecimal = winRate / 100;
    const lossRateDecimal = lossRate / 100;
    expectancy = (winRateDecimal * avgWin) + (lossRateDecimal * avgLoss);
}
resumen += `<b>📈 Expectancy</b> ${expectancy >= 0 ? "+" : ""}${expectancy.toFixed(2)}$<br><br>`;

        document.getElementById("resumenFinal").innerHTML = resumen;

        // Reconstruir todasLasOperaciones
        todasLasOperaciones = [].concat(operaciones, operacionesNegativas);

        // Mostrar drawdown y capital final
        const drawdownTexto = calcularDrawdown();
        resumen += `${drawdownTexto}<br><br>`;

        // ---------- Inserta este bloque aquí ----------
        const capitalInicialVal = parseFloat(document.getElementById("capital-inicial").value);
        if (!isNaN(capitalInicialVal) && capitalInicialVal > 0) {
            const sumaOperaciones = todasLasOperaciones.reduce((a, b) => a + b, 0);
            const capitalFinal = capitalInicialVal + sumaOperaciones;
            const crecimientoDolares = capitalFinal - capitalInicialVal;
            const crecimientoPorcentaje = (crecimientoDolares / capitalInicialVal) * 100;

            resumen += `<b>📈 Crecimiento en dólares</b> ${crecimientoDolares >= 0 ? '+' : ''}$${crecimientoDolares.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}<br>`;
            resumen += `<b>📊 Crecimiento porcentual</b> ${crecimientoPorcentaje >= 0 ? '+' : ''}${crecimientoPorcentaje.toFixed(2)}%<br><br>`;
        } else {
            resumen += `<b>📈 Crecimiento en dólares</b> Capital inicial inválido.<br>`;
            resumen += `<b>📊 Crecimiento porcentual</b> Capital inicial inválido.<br><br>`;
        }
        // ---------- fin del bloque ----------

        // Tipos de errores
        const listaErrores = document.getElementById("lista-errores");
        if (listaErrores && listaErrores.children.length > 0) {
            resumen += `<b>Tipos de errores:</b><div>`;
            Array.from(listaErrores.children).forEach(li => {
                resumen += `<div>${li.textContent}</div>`;
            });
            resumen += `</div><br>`;
        } else {
            resumen += `<b>⚠️ Tipos de errores</b> Ninguno<br>`;
        }


        document.getElementById("resumenFinal").innerHTML = resumen;
    });


function generarImagen() {
    const resumen = document.getElementById("resumenFinal");
    const mes = document.getElementById("mes").value;

    html2canvas(resumen, {
        scale: 3,        // ⬆️ Aumenta la resolución
        useCORS: true    // ⬅️ Para evitar errores con recursos externos (si los hay)
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = `resumen_mes_${mes}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

function calcularDrawdown() {
    const capitalInicial = parseFloat(document.getElementById("capital-inicial").value);
    if (isNaN(capitalInicial) || capitalInicial <= 0) {
        return "Capital inicial inválido.";
    }

    let capital = capitalInicial;
    let maxCapital = capitalInicial;
    let minCapitalDespuesDelPico = capitalInicial;
    let maxDrawdown = 0;

    // Variables para guardar el drawdown máximo y sus valores asociados
    let drawdownPico = capitalInicial;
    let drawdownValle = capitalInicial;

    for (let i = 0; i < todasLasOperaciones.length; i++) {
        capital += todasLasOperaciones[i];
        if (capital > maxCapital) {
            maxCapital = capital;
            minCapitalDespuesDelPico = capital; // reinicia el mínimo después de un nuevo pico
        }
        if (capital < minCapitalDespuesDelPico) {
            minCapitalDespuesDelPico = capital;
        }
        const drawdownActual = maxCapital - capital;
        if (drawdownActual > maxDrawdown) {
            maxDrawdown = drawdownActual;
            drawdownPico = maxCapital;
            drawdownValle = capital;
        }
    }

    const drawdownPorcentaje = drawdownPico > 0 ? (maxDrawdown / drawdownPico) * 100 : 0;

    // NUEVO: Mostrar el capital final
    return (
        `<b>💰 Capital inicial: </b>$${capitalInicial.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n` +
        `<b>📈 Pico máximo:</b> $${maxCapital.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n` +
        `<b>📉 Capital mínimo después del pico:</b> $${drawdownValle.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n` +
        `<b>🛑 Drawdown en dólares:</b> $${maxDrawdown.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n` +
        `<b>🛑 Drawdown en porcentaje:</b> ${drawdownPorcentaje.toFixed(2)}%\n` +
        `<b>💵 Capital final:</b> $${capital.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
    );
}

// Reconstruir todasLasOperaciones con las operaciones actuales (en orden: ganadoras, luego perdedoras)
let todasLasOperaciones = [];
todasLasOperaciones = todasLasOperaciones.concat(operaciones, operacionesNegativas);



