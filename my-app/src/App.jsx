import { useState } from "react";
import Contador_SinPermanencia from "./Componentes/Contador_SinPermanencia";
import Contador_LocalStorage from "./Componentes/Contador_LocalStorage";
import Contador_SessionStorage from "./Componentes/Contador_SessionStorage";
import Contador_cookies from "./Componentes/Contador_cookies";
import Contador_IndexDB from "./Componentes/Contador_IndexDB";



export default function App() {
  const [activo, setActivo] = useState("SinPermanencia");

  const renderComponente = () => {
    switch (activo) {
      case "SinPermanencia":
        return <Contador_SinPermanencia />;
      case "LocalStorage":
        return <Contador_LocalStorage />;
      case "SessionStorage":
        return <Contador_SessionStorage />;
      case "Cookies":
        return <Contador_cookies />;
      case "IndexedDB":
        return <Contador_IndexDB />;
      default:
        return "No ha cargado ningun componente";
    }
  };

  const estilosBoton = (nombre) => ({
    margin: "0.5rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "6px",
    backgroundColor: activo === nombre ? "#444" : "#DDD", // gris oscuro activo, gris claro inactivo
    color: activo === nombre ? "#fff" : "#999",
  });

  return (
    <>
      <div>
        <button style={estilosBoton("SinPermanencia")} onClick={() => setActivo("SinPermanencia")}>
          Sin Permanencia
        </button>
        <button style={estilosBoton("LocalStorage")} onClick={() => setActivo("LocalStorage")}>
          LocalStorage
        </button>
        <button style={estilosBoton("SessionStorage")} onClick={() => setActivo("SessionStorage")}>
          SessionStorage
        </button>
        <button style={estilosBoton("Cookies")} onClick={() => setActivo("Cookies")}>
          Cookies
        </button>
        <button style={estilosBoton("IndexedDB")} onClick={() => setActivo("IndexedDB")}>
          IndexDB
        </button>
      </div>

      <div>
        {renderComponente()}
      </div>
    </>
  );
}
