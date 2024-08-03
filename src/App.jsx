import React, { useState } from 'react';

function App() {
    const [data, setData] = useState([]);

    async function getData() {
        const ticker = document.getElementById('ticker').value;
        const tipo = document.getElementById('tipo').value;
        const time = document.getElementById('time').value;

        try {
            const response = await fetch(`http://localhost:5000/predict?ticker=${ticker}&time=${time}&tipo=${tipo}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.error('There was an error!', error);
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
        </>
    );
}

export default App;
