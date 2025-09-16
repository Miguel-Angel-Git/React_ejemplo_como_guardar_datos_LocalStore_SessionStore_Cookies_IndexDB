import { useState, useEffect } from "react"; // importamos hooks de React para estado y efectos
import { openDB } from "idb"; // importamos función para manejar IndexedDB de forma más sencilla

export default function Contador_IndexDB() {
  const [count, setCount] = useState(0); // estado del contador, inicia en 0

  useEffect(() => {
    let isMounted = true; // variable de control para no actualizar estado si el componente se desmonta
    const initDB = async () => { // función asíncrona para inicializar la DB
      const db = await openDB("miDB", 1, { // abre o crea la base de datos "miDB" versión 1
        upgrade(db) { // se ejecuta si la DB es nueva o hay un cambio de versión
          if (!db.objectStoreNames.contains("contador")) { // si no existe el store "contador"
            db.createObjectStore("contador"); // lo crea
          }
        },
      });
      const saved = await db.get("contador", "valor"); // lee la clave "valor" del store "contador"
      if (saved !== undefined && isMounted) setCount(saved); // si existe y el componente sigue montado, actualiza estado
    };


    initDB(); // ejecuta la función para inicializar la DB
    return () => { isMounted = false; }; // al desmontarse el componente, evitamos actualizar estado
  }, []); // se ejecuta solo la primera vez que se monta el componente

  useEffect(() => {
    let ignore = false; // variable de control para ignorar escritura si el componente se desmonta
    const saveDB = async () => { // función asíncrona para guardar el valor en la DB
      try {
        const db = await openDB("miDB", 1); // abre la DB
        if (!ignore) await db.put("contador", count, "valor"); // guarda "count" bajo la clave "valor"
      } catch (err) {
        console.error("Error guardando en IndexedDB:", err); // captura errores de escritura
      }
    };

    saveDB(); // ejecuta la función de guardado

    return () => { ignore = true; }; // si se desmonta el componente, evitamos guardar
  }, [count]); // se ejecuta cada vez que cambia "count"

  const incrementar = () => setCount(prev => prev + 1);
  const decrementar = () => setCount(prev => prev - 1);
  const resetear = () => setCount(0);

  return (
    <div >

      <h1>Contador: {count}</h1> {/* muestra el valor actual del contador */}

      <button className="btn rojo" onClick={decrementar}>-1</button>
      <button className="btn verde" onClick={incrementar}>+1</button>
      <button className="btn blanco" onClick={resetear}>Reset</button>


      <br></br><br></br><br></br>
      <p><b>Ventajas de usar IndexedDB:</b></p>


      <p>✔ permite guardar objetos muy complejos</p>
      <p>✔ Permite almacenar grandes volúmenes de datos, mucho más que localStorage o cookies.</p>
      <p>✔ Es asíncrono, por lo que no bloquea el hilo principal al leer o escribir datos.</p>
      <p>✔ Puede manejar datos complejos como objetos, arrays y archivos binarios (Blob, ArrayBuffer).</p>
      <p>✔ Soporta transacciones y consultas indexadas, útil para bases de datos locales completas.</p>
      <p>✔ Accesible solo desde el navegador, sin necesidad de servidor, pero permite aplicaciones offline robustas.</p>
      <br></br>

      {/* Información de desventajas */}
      <p><b>Desventajas de usar IndexedDB:</b></p>

      <p>❌ API más compleja y verbosa, requiere más código que localStorage o sessionStorage.</p>
      <p>❌ No es tan intuitivo para principiantes; a veces conviene usar librerías wrapper como <code>idb</code> para simplificar.</p>
      <p>❌ Persistencia depende del navegador y puede ser eliminada si el usuario borra datos del sitio.</p>
      <p>❌ No se comparte automáticamente con el servidor (no como cookies), por lo que hay que sincronizar manualmente si se necesita.</p>

    </div>
  );
}
