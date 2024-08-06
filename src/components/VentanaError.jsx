import "../CSS/VentanaError.css"

function VentanaError({ mensaje }) {
    return (
        <>
            <dialog open>
                <p>{mensaje}</p>
                <button onClick={() => document.querySelector('dialog').close()}>Cerrar</button>
            </dialog>
        </>
    );

}

export default VentanaError;