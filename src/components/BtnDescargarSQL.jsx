function BtnDescargarSQL({ dataJSON, fileName }) {
    function DescargarSQL() {
        const data = formatearTextoASQL(dataJSON, fileName);
        const blob = new Blob([data], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName + '.sql';
        a.click();
        window.URL.revokeObjectURL(url);
    }
  
    function formatearTextoASQL(dataJSON, nombre) {
        let texto = "";
        texto += `CREATE DATABASE ${nombre};\n`;
        texto += `CREATE TABLE PreciosAcciones (\n\tid INT PRIMARY KEY,\ttipo VARCHAR(10),\n\tfecha VARCHAR(10),\n\tprecio DECIMAL(5,20)\n); \n`;
        texto += obtenerInserts(dataJSON);
        return texto;
    }
  
    function obtenerInserts(dataJSON) {
        let texto = `INSERT INTO PreciosAcciones (tipo, fecha, precio) VALUES\n`;
        for (let i = 0; i < dataJSON.length; i++) { 
            const fila = dataJSON[i];
            texto += `\t('${fila.Tipo}', '${fila.Fecha}', ${fila.Precio}),\n`;
        }
        texto = texto.slice(0, -2); 
        texto += `;\n`; 
        return texto;
    }
  
    return (
        <button onClick={DescargarSQL} className="btnSQL">SQL</button>
    );
  }
  
  export default BtnDescargarSQL;
  