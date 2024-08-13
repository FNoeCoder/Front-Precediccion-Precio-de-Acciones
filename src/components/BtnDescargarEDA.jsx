import React from 'react';

function BtnDescargarEDA({ ImgBase64, fileName }) {

    function descargarEDA() {
        // Crear un enlace temporal para la descarga
        const a = document.createElement('a');
        // Establecer el href del enlace con el contenido base64
        a.href = `data:image/png;base64,${ImgBase64}`;
        // Establecer el nombre del archivo para la descarga
        a.download = fileName + '.png';
        // Simular un clic en el enlace para iniciar la descarga
        a.click();
    }

    return (
        <button onClick={descargarEDA} className="btnDescargarEDA">Analisis EDA</button>
    );
}

export default BtnDescargarEDA;
