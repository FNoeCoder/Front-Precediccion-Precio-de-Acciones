import React, { useState } from 'react';
import Chart from './components/grafica';
import BtnDescargarJSON from './components/BtnDescargarJSON';
import BtnDescargarCSV from './components/BtnDescargarCSV';
import BtnDescargarXML from './components/BtnDescargarXML';
import VentanaError from './components/VentanaError';

function App() {
    const [data, setData] = useState([]);
    const [ticker, setTicker] = useState('');
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [error, setError] = useState('');

    function tipoCorrecto(tipo) {
        let tipos = ['Cierre', 'Apertura', 'Alto', 'Bajo'];
        return tipos.includes(tipo);
    }
    function timeCorrecto(time) {
        let times = ['inicioAño', '1', '2', '5', '10', '20', 'Maximo'];
        return times.includes(time);
    }
    function tickerCorrecto(ticker) {
        return ticker.length > 0;
    }
    function validarDatos() {
        const tickerI = document.getElementById('ticker').value;
        const tipo = document.getElementById('tipo').value;
        const time = document.getElementById('time').value;
        if (!tipoCorrecto(tipo)) {
            setError('Tipo incorrecto');
            return false;
        }
        if (!timeCorrecto(time)) {
            setError('Tiempo incorrecto');
            return false;
        }
        if (!tickerCorrecto(tickerI)) {
            setError('Ticker incorrecto');
            return false;
        }
        return true;
    }

    async function getData() {
        setData([]);
        const tickerI = document.getElementById('ticker').value;
        const tipo = document.getElementById('tipo').value;
        const time = document.getElementById('time').value;
        if (!validarDatos()) {
            return;
        }

        try {
            setNombreArchivo(tickerI+'_'+tipo+'_'+time);
            const response = await fetch(`http://localhost:5000/predict?ticker=${tickerI}&time=${time}&tipo=${tipo}`);
            if (!response.ok) {
                setError('Error en la petición');
                return;
            }
            const data = await response.json();
            setData(data.data);
            setTicker(tickerI);
            setError('');
            
        } catch (error) {
            setError('Error en la petición');
            setData([]);
            setNombreArchivo('');
            return;
        }
    }

    return (
        <>
            <input type="text" placeholder="BMV de la empresa" id="ticker" />
            <select id="tipo">
                <option value="Cierre">Cierre</option>
                <option value="Apertura">Apertura</option>
                <option value="Alto">Alto</option>
                <option value="Bajo">Bajo</option>
            </select>
            <select id="time">
                <option value="inicioAño">Desde el inicio del año</option>
                <option value="1">1 año</option>
                <option value="2">2 años</option>
                <option value="5">5 años</option>
                <option value="10">10 años</option>
                <option value="20">20 años</option>
                <option value="Maximo">Desde que está en bolsa</option>
            </select>
            <button onClick={getData}>Consultar</button>
            {data.length > 0 ? <Chart listaDatos={data} ticker={ticker} /> : null}
            {data.length > 0 ? <BtnDescargarJSON dataJSON={data} fileName={nombreArchivo} /> : null}
            {data.length > 0 ? <BtnDescargarCSV dataJSON={data} fileName={nombreArchivo} /> : null}
            {data.length > 0 ? <BtnDescargarXML dataJSON={data} fileName={nombreArchivo} /> : null}
            {error.length > 0 ? <VentanaError mensaje={error} /> : null}
        </>
    );
}

export default App;
