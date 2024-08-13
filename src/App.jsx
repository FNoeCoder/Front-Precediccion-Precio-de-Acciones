import React, { useState } from 'react';
import Chart from './components/grafica';
import BtnDescargarJSON from './components/BtnDescargarJSON';
import BtnDescargarCSV from './components/BtnDescargarCSV';
import BtnDescargarXML from './components/BtnDescargarXML';
import BtnDescargarSQL from './components/BtnDescargarSQL';
import BtnDescargarIMG from './components/BtnDescargarIMG';
import BtnDescargarEDA from './components/BtnDescargarEDA';
import VentanaError from './components/VentanaError';
import Header from './components/Header';
import Main from './components/Main';

function App() {
    const [data, setData] = useState([]);
    const [dataIMG, setDataIMG] = useState("");
    const [dataIMGEDA, setDataIMGEDA] = useState("");
    const [ticker, setTicker] = useState('');
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [error, setError] = useState('');

    function tipoCorrecto(tipo) {
        let tipos = ['Cierre', 'Apertura', 'Alto', 'Bajo'];
        return tipos.includes(tipo);
    }
    function timeCorrecto(time) {
        let times = ['inicioAño', '1', '2', '5', '10', 'Maximo'];
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
        // bloquear el botón mientras se hace la petición
        document.getElementById('btnConsultar').disabled = true;
        setError("")
        setData([]);
        setDataIMG("");
        setDataIMGEDA("");
        const tickerI = document.getElementById('ticker').value;
        const tipo = document.getElementById('tipo').value;
        const time = document.getElementById('time').value;
        if (!validarDatos()) {
            document.getElementById('btnConsultar').disabled = false;
            return;
        }

        try {
            setNombreArchivo(tickerI+'_'+tipo+'_'+time);
            const response = await fetch(`http://localhost:5000/predict?ticker=${tickerI}&time=${time}&tipo=${tipo}`);
            if (!response.ok) {
                setError('Error en la petición');
                setData([]);
                setNombreArchivo('');
                setDataIMG("");
                setDataIMGEDA("");
            }else{
                const data = await response.json();
                if (data.data){
                    setData(data.data);
                    setTicker(tickerI);
                    setError('');    
                    setDataIMG(data.grafico);                 
                    setDataIMGEDA(data.graficoEDA);  
                }
                else{
                    setData([])
                    setTicker(ticker)
                    setDataIMG("");
                    setError("Error en la conexión");
                    setDataIMGEDA("");
                }
                   
            }
        } catch (error) {
            setError('Error en la petición');
            setData([]);
            setNombreArchivo('');
            setDataIMG("");
            setDataIMGEDA("");
        }
        document.getElementById('btnConsultar').disabled = false;
    }

    return (
        <>
            <Header />
            <Main>
                <div className='datos'>

                    <section className='formulario'>
                        <h2>Consultar precio de una acción</h2>
                        <input type="text" placeholder="BMV de la empresa" id="ticker" />
                        <select id="tipo" name='tipo'>
                            <option value="Cierre">Cierre</option>
                            <option value="Apertura">Apertura</option>
                            <option value="Alto">Alto</option>
                            <option value="Bajo">Bajo</option>
                        </select>

                        <select id="time" name='time'>
                            <option value="inicioAño">Desde el inicio del año</option>
                            <option value="1">1 año</option>
                            <option value="2">2 años</option>
                            <option value="5">5 años</option>
                            <option value="10">10 años</option>
                            <option value="Maximo">Desde que está en bolsa</option>
                        </select>
    
                        <button onClick={getData} id='btnConsultar'>Consultar</button>
                    </section>
                    {
                        data.length > 0 ? 
                            <section className='grafica'>
                                <Chart listaDatos={data} ticker={ticker} />
                            </section>                        
                        : 
                            null
                    }
                    {
                        data.length > 0 ?
                            <section className="botonesDescargas">
                                <BtnDescargarJSON dataJSON={data} fileName={nombreArchivo} />
                                <BtnDescargarCSV dataJSON={data} fileName={nombreArchivo} />
                                <BtnDescargarXML dataJSON={data} fileName={nombreArchivo} />
                                <BtnDescargarSQL dataJSON={data} fileName={nombreArchivo} />
                                <BtnDescargarIMG ImgBase64={dataIMG} fileName={nombreArchivo} />
                                <BtnDescargarEDA ImgBase64={dataIMGEDA} fileName={nombreArchivo} />
                            </section>
                        :
                            null
                    }
                </div>
                {error.length > 0 ? <VentanaError mensaje={error} /> : null}                
            </Main>
        </>
    );
}

export default App;
