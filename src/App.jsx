import React, { useState } from 'react';
import Chart from './components/grafica';

function App() {
    const [data, setData] = useState([]);
    const [ticker, setTicker] = useState('');

    async function getData() {
        setData([]);
        const tickerI = document.getElementById('ticker').value;
        const tipo = document.getElementById('tipo').value;
        const time = document.getElementById('time').value;

        try {
            const response = await fetch(`http://localhost:5000/predict?ticker=${tickerI}&time=${time}&tipo=${tipo}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data.data);
            setTicker(tickerI);
            
        } catch (error) {
            console.error('There was an error!', error);
            setData([]);
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
        </>
    );
}

export default App;
