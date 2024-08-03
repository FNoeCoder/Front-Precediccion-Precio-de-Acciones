function BtnDescargarXML({dataJSON, fileName}) {
    // La estructura de datos de los datosJSON es la siguiente:
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
        function descargarXML() {
            const data = dataJSON;
            const xml = data.map(row => {
                return `<dato>
                            <Fecha>${row.Fecha}</Fecha>
                            <Precio>${row.Precio}</Precio>
                            <Tipo>${row.Tipo}</Tipo>
                        </dato>`;
            }).join('\n');
            const xmlFinal = `<datos>${xml}</datos>`;
            const blob = new Blob([xmlFinal], { type: 'text/xml' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName + '.xml';
            a.click();
            window.URL.revokeObjectURL

        }
        return (
            <button onClick={descargarXML}>Descargar XML</button>
        );
    }
    
    export default BtnDescargarXML;