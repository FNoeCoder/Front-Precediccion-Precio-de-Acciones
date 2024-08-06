import '../CSS/Main.css';

function Main({children}) {
    return (
        <main>
            {children}
            <div className="informacion">
                <section>
                    <h2>¿Qué es esto?</h2>
                    <p>
                        Este es un proyecto que utiliza un modelo de machine learning para predecir el precio de una acción en la bolsa de valores.
                    </p>
                </section>
                <section>
                    <h2>¿Por qué es útil?</h2>
                    <p>
                        La predicción del precio de una acción puede ser útil para los inversores que desean tomar decisiones informadas sobre sus inversiones. 
                        Al predecir el precio de una acción en el futuro, los inversores pueden tener una mejor idea de cuándo comprar o vender una acción, 
                        lo que puede ayudarles a maximizar sus ganancias y minimizar sus pérdidas.
                    </p>
                </section>
                <section>
                    <h2>¿Cómo funciona?</h2>
                    <p>
                        El modelo de machine learning utiliza datos históricos de la acción, así como otros datos relevantes, para hacer la predicción del precio
                        de la acción en el futuro. El modelo se entrena con datos históricos y luego se utiliza para hacer la predicción.
                    </p>
                </section>
                <section>
                    <h2>¿Qué datos se utilizan?</h2>
                    <p>
                        El modelo utiliza una variedad de datos, incluidos los precios históricos de la acción, los volúmenes de negociación, los indicadores 
                        técnicos y otros datos relevantes. Estos datos se utilizan para entrenar el modelo y hacer la predicción.
                    </p>
                </section>
                <section>
                    <h2>¿Qué tan preciso es el modelo?</h2>
                    <p>
                        La precisión del modelo puede variar dependiendo de varios factores, incluidos los datos utilizados para entrenar el modelo, la 
                        calidad de los datos y otros factores. En general, el modelo puede proporcionar una buena indicación del precio de la acción en el futuro, 
                        pero no es infalible.
                    </p>
                </section>
                <section>
                    <h2>¿Cómo puedo usar este proyecto?</h2>
                    <p>
                        Para usar este proyecto, simplemente ingrese el símbolo de la acción en la bolsa de valores que desea predecir, seleccione el tipo de 
                        precio que desea predecir (cierre, apertura, alto o bajo) y seleccione el período de tiempo para el que desea hacer la predicción. 
                        Luego haga clic en el botón "Consultar" para obtener la predicción del precio de la acción.
                    </p>
                </section>
                
            </div>
        </main>
    );
}

export default Main;