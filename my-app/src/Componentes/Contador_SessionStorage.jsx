import { useState, useEffect } from "react";

export default function Contador_SessionStorage() {
    // Estado inicial: intenta leer de sessionStorage, si no hay, empieza en 0
    const [count, setCount] = useState(() => {
        const saved = sessionStorage.getItem("contador");
        return saved ? JSON.parse(saved) : 0;
    });


    useEffect(() => {
        sessionStorage.setItem("contador", JSON.stringify(count));
    }, [count]);

    const incrementar = () => setCount((prev) => prev + 1);
    const decrementar = () => setCount((prev) => prev - 1);
    const resetear = () => setCount(0);

    return (
        <>

            <h1 >Contador: {count}</h1>

            <button className="btn rojo" onClick={decrementar}>-1</button>
            <button className="btn verde" onClick={incrementar}>+1</button>
            <button className="btn blanco" onClick={resetear}>Reset</button>

            <br></br><br></br><br></br><br></br>

            <p><b>Ventajas de usar SessionStorage:</b></p>
            <p>✔ Fácil de usar con la API nativa: <code>sessionStorage.setItem()</code> y <code>sessionStorage.getItem()</code>.</p>
            <p>✔ Datos aislados por pestaña o ventana, evitando conflictos entre sesiones distintas del mismo sitio.</p>
            <p>✔ Persiste durante toda la sesión mientras la pestaña esté abierta, útil para formularios, wizards o estados temporales.</p>
            <p>✔ No requiere servidor ni backend para funcionar.</p>
            <p>✔ Evita almacenar datos permanentes innecesarios en el navegador, reduciendo riesgos de privacidad.</p>

            <br></br><br></br>

            <p><b>Limitaciones de SessionStorage para datos complejos o dinámicos:</b></p>
            <p>❌ Solo guarda pares clave–valor en formato texto, lo que obliga a usar <code>JSON.stringify()</code> y <code>JSON.parse()</code> para objetos o arrays.</p>
            <p>❌ Es síncrono: cada lectura o escritura bloquea el hilo principal, causando lentitud si se actualiza con frecuencia (ej. datos en tiempo real).</p>
            <p>❌ Capacidad reducida, normalmente unos ~5 MB por dominio.</p>
            <p>❌ No maneja bien concurrencia: si varias pestañas escriben a la vez, los datos se pisan.</p>
            <p>❌ No apto para grandes volúmenes de datos dinámicos, como chats, logs o colecciones que cambian constantemente.</p>

            <br></br><br></br>

            <p><b>Diferencia clave respecto a localStorage:</b></p>
            <p>✔ Los datos en SessionStorage solo duran mientras la pestaña o ventana esté abierta; al cerrarla, se borran automáticamente.</p>




        </>
    );
}
