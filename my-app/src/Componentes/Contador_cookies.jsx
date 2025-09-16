import { useState, useEffect } from "react";
// Importa dos hooks de React:
// useState: permite crear un estado interno en el componente y actualizarlo.
// useEffect: permite ejecutar código secundario (side effects), por ejemplo leer o guardar datos, después de renderizar el componente.


// Funciones helper para cookies
const setCookie = (name, value, days = 7) => {
    // Función para guardar una cookie.
    // name: nombre de la cookie
    // value: valor a guardar
    // days: días hasta que expire la cookie, por defecto 7

    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    // Calcula la fecha de expiración sumando 'days' días a la fecha actual.
    // Date.now() devuelve milisegundos desde 1970-01-01.
    // 86400000 ms = 1 día
    // toUTCString convierte la fecha a un formato estándar HTTP para cookies

    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    // Asigna la cookie al navegador.
    // path=/ significa que la cookie es accesible desde toda la web.
};


const getCookie = (name) => {
    // Función para leer una cookie
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    // document.cookie devuelve todas las cookies visibles en un string, separadas por "; "
    // La expresión regular busca la cookie con el nombre 'name' y captura su valor.


    //2️⃣ new RegExp(...)
    //Se crea una expresión regular dinámica para buscar la cookie que te interesa (name).
    //'(^| )' + name + '=([^;]+)' se traduce así:
    //(^| ) → Busca el inicio de la cadena (^) o un espacio ( ) antes del nombre de la cookie.
    //Esto evita falsos positivos si un nombre de cookie es subcadena de otro.
    //name + '=' → El nombre de la cookie seguido de =.
    //Por ejemplo, si name es "contador", busca "contador=".
    //([^;]+) → Captura cualquier carácter que no sea ; (el valor de la cookie) hasta encontrar el próximo ; o el final.
    //([^;]+) es un grupo de captura, lo que luego podemos acceder con match[2].



    return match ? match[2] : null;
    // Si encuentra la cookie, devuelve su valor, si no, devuelve null
};


export default function Contador_Cookies() {
    // Declaración del componente funcional de React.
    // Se exporta como default, así puede importarse con cualquier nombre desde otros archivos.

    // Estado inicial: intenta leer de cookies
    const [count, setCount] = useState(() => {
        // Inicializa el estado count usando una función lazy.
        // Esto evita que se ejecute getCookie en cada render.
        const saved = getCookie("contador");
        // Intenta leer la cookie "contador"
        return saved ? JSON.parse(saved) : 0;
        // Si existe, parsea el valor (JSON.parse) y lo usa.
        // Si no, empieza en 0.
    });

    // Cada vez que cambie count, lo guardamos en cookie
    useEffect(() => {
        setCookie("contador", count, 7); // expira en 7 días
        // Hook que se ejecuta cada vez que 'count' cambia.
        // Actualiza la cookie automáticamente con el nuevo valor.
    }, [count]);
    // [count] es la dependencia: solo se ejecuta cuando count cambia


    const incrementar = () => setCount((prev) => prev + 1);
    // Función para incrementar el contador.
    // prev es el valor anterior, importante usarlo para evitar problemas de render asincrónico en React.

    const decrementar = () => setCount((prev) => prev - 1);
    // Función para decrementar el contador.
    // La variable 'prev' puede llamarse como quieras, solo representa el estado anterior.

    const resetear = () => setCount(0);
    // Función para reiniciar el contador a 0


    return (
        <div>
            <h1>Contador: {count}</h1>
            {/* Muestra el contador actual dentro de un elemento h1 */}

            <div >
                <button className="btn rojo" onClick={decrementar}>-1</button>
                <button className="btn verde" onClick={incrementar}>+1</button>
                <button className="btn blanco" onClick={resetear}>Reset</button>
            </div>

            <br></br><br></br>
            {/* Saltos de línea (aunque en React basta con <br />) */}

            <p><b>Ventajas de usar cookies:</b></p>
            <p>✔ Persisten aunque el usuario cierre el navegador (si se establece fecha de expiración).</p>
            <p>✔ Se envían automáticamente al servidor en cada petición HTTP, útil para sesiones de usuario y autenticación.</p>
            <p>✔ Soportadas por todos los navegadores desde hace décadas, muy estándar.</p>
            <p>✔ Permiten establecer alcance por dominio y ruta (<code>domain</code> y <code>path</code>).</p>
            <p>✔ Se pueden marcar como seguras (<code>Secure</code>) y solo accesibles por HTTP (<code>HttpOnly</code>), aumentando seguridad.</p>

            <br></br><br></br>

            <p><b>Desventajas de usar cookies:</b></p>
            <p>❌ Tamaño limitado, normalmente 4 KB por cookie.</p>
            <p>❌ Se envían en cada petición al servidor, lo que aumenta el tráfico si se abusa de ellas.</p>
            <p>❌ Se almacenan en texto plano por defecto, riesgo de robo si no se protegen con <code>Secure</code> y <code>HttpOnly</code>.</p>
            <p>❌ Gestionar muchas cookies puede ser engorroso y lento para el navegador.</p>
            <p>❌ No aptas para grandes volúmenes de datos ni datos muy dinámicos.</p>
        </div>
    );
}
