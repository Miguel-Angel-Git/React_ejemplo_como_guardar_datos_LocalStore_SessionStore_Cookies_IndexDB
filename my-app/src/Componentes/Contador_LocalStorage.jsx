import { useState, useEffect } from "react";


export default function Contador_LocalStorage() {
    // Estado inicial: intenta leer de localStorage, si no hay, empieza en 0
    const [count, setCount] = useState(() => {
        const saved = localStorage.getItem("contador");
        return saved ? JSON.parse(saved) : 0;
    });

    // Cada vez que cambie count, lo guardamos
    useEffect(() => {
        localStorage.setItem("contador", JSON.stringify(count));
    }, [count]);

    const incrementar = () => setCount((prev) => prev + 1);//prev es el valor anterior pero si se hace asi --setCount(count + 1);-- se puede tener problemas de asincronismo si React agrupa renders

    const decrementar = () => setCount((X) => X - 1); //se puede asignar cualquier nombre a la variable
    const resetear = () => setCount(0);

    return (
        <>
            <h1>Contador: {count}</h1>

            <button className="btn rojo" onClick={decrementar}>-1</button>
            <button className="btn verde" onClick={incrementar}>+1</button>
            <button className="btn blanco" onClick={resetear}>Reset</button>

            <br></br><br></br>
            <br></br><br></br>

            <p><b>Ventajas de usar localStorage:</b></p>
            <p>✔ Persiste los datos incluso si el usuario cierra el navegador o reinicia el PC.</p>
            <p>✔ Fácil de usar con la API nativa: <code>localStorage.setItem()</code> y <code>localStorage.getItem()</code>.</p>
            <p>✔ No caduca automáticamente (a diferencia de sessionStorage o cookies).</p>
            <p>✔ Útil para configuraciones del usuario, modo oscuro, idioma, etc.</p>
            <p>✔ No requiere servidor ni backend para funcionar.</p>

            <br></br><br></br>

            <p><b>Desventajas de usar localStorage:</b></p>
            <p>❌ Capacidad limitada (aprox. 5 MB por dominio, varía según navegador).</p>
            <p>❌ Todo se guarda en texto plano, sin cifrado: riesgo de seguridad si almacenas datos sensibles.</p>
            <p>❌ Bloquea el hilo principal en operaciones grandes porque es síncrono.</p>
            <p>❌ No es accesible desde otros navegadores o dispositivos (solo local al navegador actual).</p>
            <p>❌ No es apto para datos complejos o dinámicos que cambian constantemente.Por tamaño max 5 Mb y por ser Sincrono </p>
        </>
    );
}