// src/Chart.js
import React, { useRef, useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';

// La estructura de datos de los datos en listaDatos es:
// [{
//     "Fecha": "01-08-2024",
//     "Precio": 417.1099853515625,
//     "Tipo": "Verdadero"
// },
// {
//     "Fecha": "02-08-2024",
//     "Precio": 408.489990234375,
//     "Tipo": "Verdadero"
// },
// {
//     "Fecha": "03-08-2024",
//     "Precio": 410.8152866270825,
//     "Tipo": "Prediccion"
// },
// {
//     "Fecha": "04-08-2024",
//     "Precio": 411.3835913171728,
//     "Tipo": "Prediccion"
// }]

function Chart({ listaDatos, ticker }) {
    const [data, setData] = useState(listaDatos);
    const chartContainerRef = useRef();
    const [chart, setChart] = useState(null);
    const [toolTip, setToolTip] = useState(null);

    // Función para parsear los datos en el formato requerido por Lightweight Charts
    function parseData(data) {
        return data.map((d) => ({
            time: d.Fecha.split("-").reverse().join("-"), // La fecha del dato
            value: d.Precio, // El precio del dato
        }));
    }
    function esPrediccion(fecha) {
        let fecha2 = fecha.split("-").reverse().join("-");
        return data.find(d => d.Fecha === fecha2 && d.Tipo === 'Prediccion') !== undefined;
    }

    useEffect(() => {
        const container = chartContainerRef.current;
        if (!container) return;

        // Crear un nuevo gráfico con opciones básicas
        const newChart = createChart(container, {
            layout: {
                textColor: 'black',
                background: { type: 'solid', color: 'white' },
            },
            crosshair: {
                horzLine: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    width: 1,
                    style: 1, // Línea punteada
                    labelVisible: true,
                },
                vertLine: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    width: 1,
                    style: 1, // Línea punteada
                    labelVisible: true,
                },
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { visible: false },
            },
        });

        // Agregar una serie de área al gráfico
        const series = newChart.addAreaSeries({
            topColor: 'rgba(38, 166, 154, 0.28)',
            bottomColor: 'rgba(38, 166, 154, 0.05)',
            lineColor: 'rgba(38, 166, 154, 1)',
            lineWidth: 2,
            crossHairMarkerVisible: false,
        });

        // Configurar los datos de la serie
        series.setData(parseData(data));

        // Crear y configurar el tooltip
        const toolTipDiv = document.createElement('div');
        toolTipDiv.style = `
            width: 96px; height: 80px; position: absolute; display: none;
            padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left;
            z-index: 100; top: 12px; left: 12px; pointer-events: none; border: 1px solid;
            border-radius: 2px; font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif;
            -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
            background: white; color: black; border-color: rgba(38, 166, 154, 1);
        `;
        container.appendChild(toolTipDiv);
        setToolTip(toolTipDiv);

        // Suscribirse al movimiento del crosshair para mostrar el tooltip
        newChart.subscribeCrosshairMove(param => {
            if (
                param.point === undefined ||
                !param.time ||
                param.point.x < 0 ||
                param.point.x > container.clientWidth ||
                param.point.y < 0 ||
                param.point.y > container.clientHeight
            ) {
                toolTipDiv.style.display = 'none';
            } else {
                const dateStr = param.time;
                toolTipDiv.style.display = 'block';
                const seriesData = param.seriesData.get(series);
                const price = seriesData?.value !== undefined ? seriesData.value : seriesData?.close;
                const textoTipoDatos = esPrediccion(dateStr) ? 'Predicción' : 'Real';
                toolTipDiv.innerHTML = `
                    <div style="color: rgba(38, 166, 154, 1)">${ticker}</div>
                    <div style="font-size: 24px; margin: 4px 0; color: black">
                        ${Math.round(100 * price) / 100} USD
                    </div>
                    <div style="color: black">
                        ${dateStr} 
                    </div>
                    <div style="color: grey">
                        ${textoTipoDatos} 
                    </div>
                `;

                // Ajustar la posición del tooltip
                const y = param.point.y;
                let left = param.point.x + 15;
                if (left > container.clientWidth - 80) {
                    left = param.point.x - 15 - 80;
                }

                let top = y + 15;
                if (top > container.clientHeight - 80) {
                    top = y - 80 - 15;
                }
                toolTipDiv.style.left = `${left}px`;
                toolTipDiv.style.top = `${top}px`;
            }
        });

        newChart.timeScale().fitContent();
        setChart(newChart);

        return () => {
            container.removeChild(toolTipDiv);
            newChart.remove();
        };
    }, [data]); // Dependencia de data para actualizar el gráfico cuando cambian los datos

    return (
        <div
            ref={chartContainerRef}
            style={{ position: 'relative', width: '100%', height: '500px' }}
        >
            {/* El tooltip se agrega directamente al contenedor del gráfico */}
        </div>
    );
}

export default Chart;
