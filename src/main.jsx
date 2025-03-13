import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";  
import { RouterProvider } from "react-router-dom"; 
import { router } from "./routes"; 
import { StoreProvider } from "./hooks/useGlobalReducer";  
import { ContactProvider } from "./hooks/ContactContext";  

const Main = () => {
    return (
        <React.StrictMode>  
            <StoreProvider>  {/* Proveedor global */}
                <ContactProvider>  {/* Contexto de contactos */}
                    <RouterProvider router={router} />  {/* Configuración de rutas */}
                </ContactProvider>
            </StoreProvider>
        </React.StrictMode>
    );
}

// Renderiza la aplicación en el elemento root
ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
