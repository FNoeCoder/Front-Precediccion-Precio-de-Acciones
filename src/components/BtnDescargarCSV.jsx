

function BtnDescargarCSV({dataJSON, fileName}) {
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
    function descargarCSV() {
        const data = dataJSON;
        const csv = data.map(row => Object.values(row).join(',')).join('\n');
        // poner el nombre de las columnas
        const columnas = Object.keys(data[0]).join(',');
        const csvFinal = columnas + '\n' + csv;
        const blob = new Blob([csvFinal], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName + '.csv';
        a.click();
        window.URL.revokeObjectURL
    }
    return (
        <button onClick={descargarCSV} className="btnCSV">CSV</button>
    );
}

export default BtnDescargarCSV;