import { useState } from "react";

export default function Contador_Simple() {

    const [count, setCount] = useState(0);

    const incrementar = () => setCount((prev) => prev + 1);
    const decrementar = () => setCount((prev) => prev - 1);
    const resetear = () => setCount(0);

    return (
        <>
            <h1 >Contador: {count}</h1>

            <button className="btn rojo" onClick={decrementar}>-1</button>
            <button className="btn verde" onClick={incrementar}>+1</button>
            <button className="btn blanco" onClick={resetear}>Reset</button>

            <p>Sin posibilidad de guardar</p>
        </>
    );
}
