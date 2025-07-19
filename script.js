let operaciones = [];
let operacionesNegativas = []; // Nueva variable para operaciones negativas
let operacionesBreakeven = []; // Nueva variable para operaciones breakeven
  
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
          "<b>Operaciones registradas:</b> " + operaciones.join(", ");
  }

  function mostrarOperacionesNegativas() {
    document.getElementById("resumenOperacionesNegativas").innerHTML =
        "<b>Operaciones perdedoras registradas:</b> " + operacionesNegativas.join(", ");
}

function mostrarOperacionesBreakeven() {
    if (operacionesBreakeven.length === 0) {
        document.getElementById("resumenOperacionesBreakeven").innerHTML = "No hay operaciones breakeven registradas.";
        return;
    }
    let html = `<b>Operaciones breakeven registradas:</b><br><ol>`;
    operacionesBreakeven.forEach(op =>
        html += `<li>${op > 0 ? "+" : ""}${op.toFixed(2)}</li>`
    );
    html += "</ol>";
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
    aportes.sort((a, b) => Math.abs(b.porcentaje) - Math.abs(a.porcentaje));
    let html = `<b>Margen neto:</b> ${total.toFixed(2)}<br>`;
    html += `<b>Cantidad de operaciones:</b> ${cantidad}<br>`;
    html += `<b>Aporte individual (% sobre el total):</b><br><ol>`;
    aportes.forEach(a =>
        html += `<li>${a.valor > 0 ? "+" : ""}${a.valor.toFixed(2)} (${a.porcentaje.toFixed(2)}%)</li>`
    );
    html += "</ol>";
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
    let html = `<b>Margen neto negativo:</b> -${Math.abs(totalNegativo).toFixed(2)}<br>`;
    html += `<b>Cantidad de operaciones perdedoras:</b> ${cantidadNegativa}<br>`;
    html += `<b>Aporte individual (% sobre el total de pérdidas):</b><br><ol>`;
    aportesNegativos.forEach(a =>
        html += `<li>-${Math.abs(a.valor).toFixed(2)} (${a.porcentaje.toFixed(2)}%)</li>`
    );
    html += "</ol>";
    html += `<b>Total de operaciones del mes:</b> ${totalOperacionesMes}<br>`; // Ahora al final
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
        const lista = document.getElementById("⚠️ lista-errores");

        if (cantidad === "" || cantidad <= 0) {
            alert("Escribe un número válido.");
            return;
        }

        const textoVisible = document.querySelector(`#tipo-error option[value="${tipo}"]`).textContent;

        const li = document.createElement("li");
        li.textContent = `${textoVisible} — ${cantidad} operaciones.`;

        lista.appendChild(li);
    }

    document.getElementById("calcularWinRate").addEventListener("click", function() {
        const ganadoras = operaciones.length;
        const perdedoras = operacionesNegativas.length;
        const total = ganadoras + perdedoras;
        let resultado = "";
        if (total === 0) {
            resultado = "No hay suficientes operaciones para calcular el win rate.";
        } else {
            const winRate = (ganadoras / total) * 100;
            resultado = `<b>Win Rate:</b> ${winRate.toFixed(2)}% (${ganadoras} de ${total} operaciones)`;
        }
        document.getElementById("resultadoWinRate").innerHTML = resultado;
    });

    document.getElementById("calcularMargenNetoTotal").addEventListener("click", function() {
        const margenGanadas = operaciones.reduce((a, b) => a + b, 0);
        const margenPerdidas = operacionesNegativas.reduce((a, b) => a + b, 0);
        const margenNetoTotal = margenGanadas + margenPerdidas;

        let resultado = "";
        resultado += `<b>Margen neto total:</b> ${margenNetoTotal > 0 ? "+" : ""}${margenNetoTotal.toFixed(2)}`;
        document.getElementById("resultadoMargenNetoTotal").innerHTML = resultado;
    });

    document.getElementById("generarResumenFinal").addEventListener("click", function() {
        const mes = document.getElementById("mes").value || "No especificado";
        const semanas = document.getElementById("semanasOperadas").value || "No especificado";
        // Obtén los valores seleccionados de los selects existentes
        const compresionTiempoReal = document.getElementById("🎯 comprension-en-tiempo-real").value || "No especificado";
        const compresionPostMercado = document.getElementById("📊 comprension-pos-mercado").value || "No especificado";
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
        const winRate = totalWinRate === 0 ? 0 : (ganadoras / totalWinRate) * 100;

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

        let resumen = `<h3>Resumen Final</h3>`;
        resumen += `<b>Mes:</b> ${mes.charAt(0).toUpperCase() + mes.slice(1)}<br>`;
        resumen += `<b>Semanas operadas:</b> ${semanas}<br>`;
        resumen += `<b>Promedio de compresión del mercado en tiempo real de las semanas:</b> ${compresionTiempoReal}<br>`;
        resumen += `<b>Promedio de compresión de las semanas post mercado:</b> ${compresionPostMercado}<br>`;
     

        // Ganadoras
        resumen += `<b>Operaciones ganadoras (${ganadoras}):</b><ol>`;
        aportesGanadoras.forEach((a, i) => {
            resumen += `<li>${a.valor > 0 ? "+" : ""}${a.valor.toFixed(2)} (${a.porcentaje.toFixed(2)}%)</li>`;
        });
        resumen += `</ol>`;
        resumen += `<b>Margen neto de ganadas:</b> ${margenGanadas >= 0 ? "+" : ""}${margenGanadas.toFixed(2)}<br><br>`;

        // Perdedoras
        resumen += `<b>Operaciones perdedoras (${perdedoras}):</b><ol>`;
        aportesPerdedoras.forEach((a, i) => {
            resumen += `<li>-${Math.abs(a.valor).toFixed(2)} (${a.porcentaje.toFixed(2)}%)</li>`;
        });
        resumen += `</ol>`;
        resumen += `<b>Margen neto de perdidas:</b> -${Math.abs(margenPerdidas).toFixed(2)}<br><br>`;

        // Breakeven
        resumen += `<b>Operaciones breakeven (${breakeven}):</b><ol>`;
        listaBreakeven.forEach((op, i) => {
            resumen += `<li>${op}</li>`;
        });

        resumen += `<b>Total de operaciones:</b> ${totalOperaciones}<br><br>`;
        
        resumen += `</ol><br>`;

        // Tipos de errores
        const listaErrores = document.getElementById("⚠️ lista-errores");
        if (listaErrores && listaErrores.children.length > 0) {
            resumen += `<b>Tipos de errores:</b><ul>`;
            Array.from(listaErrores.children).forEach(li => {
                resumen += `<li>${li.textContent}</li>`;
            });
            resumen += `</ul><br>`;
        } else {
            resumen += `<b>Tipos de errores:</b> Ninguno<br>`;
        }

        // Totales y winrate
        
        resumen += `<b>Margen neto total:</b> ${margenNetoTotal > 0 ? "+" : ""}${margenNetoTotal.toFixed(2)}<br>`;

        // Nueva métrica: operación ganadora con mayor beneficio
        if (operaciones.length > 0) {
            const mayorGanancia = Math.max(...operaciones);
            const porcentaje = margenGanadas !== 0 ? (mayorGanancia / margenGanadas) * 100 : 0;
            resumen += `<b>Operación ganadora con mayor beneficio:</b> +${mayorGanancia.toFixed(2)} (${porcentaje.toFixed(2)}%)<br>`;
        }

        // Nueva métrica: operación perdedora con mayor pérdida
        if (operacionesNegativas.length > 0) {
            const mayorPerdida = Math.min(...operacionesNegativas); // Más negativa
            const porcentaje = margenPerdidas !== 0 ? (mayorPerdida / margenPerdidas) * 100 : 0;
            resumen += `<b>Operación perdedora con mayor pérdida:</b> ${mayorPerdida.toFixed(2)} (${porcentaje.toFixed(2)}%)<br>`;
        }

        resumen += `<b>Win Rate:</b> ${winRate.toFixed(2)}% (${ganadoras} de ${totalWinRate} operaciones)<br>`;

        document.getElementById("resumenFinal").innerHTML = resumen;
    });