

function VentanaError({ mensaje }) {
    return (
        <>
            <dialog open>
                <p>{mensaje}</p>
                <button onClick={() => window.location.reload()}>Cerrar</button>
            </dialog>
        </>
    );

}

export default VentanaError;