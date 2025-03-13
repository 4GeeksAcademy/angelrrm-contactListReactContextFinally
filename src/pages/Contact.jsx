import React, { useContext, useEffect } from "react";
import { ContactContext } from "../hooks/ContactContext";  
import ContactCard from "../components/ContactCard"; 
import "../index.css";
import { useNavigate } from "react-router-dom";


export const Contact = () => {
    const { state, getContacts } = useContext(ContactContext);  
    const navigate = useNavigate(); 
    useEffect(() => {
        getContacts();  
    }, [getContacts]);

    // Función para redirigir a la vista de edición
    const handleEdit = (id) => {
        navigate(`/edit-contact/${id}`);  // Redirigimos a la ruta de edición con el ID
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Lista de Contactos</h2>
            {state.message && (  // Mostrar mensaje de éxito/error
                <div className={`alert ${state.isError ? "alert-danger" : "alert-success"}`}>
                    {state.message}
                </div>
            )}
            <div className="d-flex justify-content-end mb-3">
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate("/add-contact")}  // Redirigir a la vista de agregar contacto
                >
                    Agregar Contacto
                </button>
            </div>
            <div className="row">
                {state.contacts.length > 0 ? (
                    state.contacts.map(contact => (
                        <div key={contact.id} className="col-md-4">
                            <ContactCard 
                                contact={contact} 
                                onEdit={handleEdit}  // Pasamos la función de edición
                            />  
                        </div>
                    ))
                ) : (
                    <p className="text-center">No hay contactos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default Contact;