

function BtnDescargarJSON({dataJSON, fileName}) {
    function descargarJSON() {
        const data = JSON.stringify(dataJSON);
        const blob = new Blob([data], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName + '.json';
        a.click();
        window.URL.revokeObjectURL(url);
    }
    
    return (
        <button onClick={descargarJSON} className="btnJSON">JSON</button>
    );
}

export default BtnDescargarJSON;