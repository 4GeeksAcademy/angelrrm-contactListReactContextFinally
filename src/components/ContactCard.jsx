import React, { useContext, useState } from "react";
import { ContactContext } from "../hooks/ContactContext";  

const ContactCard = ({ contact, onEdit }) => {
    const { deleteContact } = useContext(ContactContext);  // Función para eliminar contactos
    const [showModal, setShowModal] = useState(false);  // Estado para controlar el modal

    // Función para mostrar el modal
    const handleDeleteClick = () => {
        setShowModal(true);
    };

    // Función para confirmar la eliminación
    const confirmDelete = () => {
        deleteContact(contact.id);  // Elimina el contacto
        setShowModal(false);  // Cierra el modal
    };

    return (
        <div className="card p-3 m-2 shadow-sm">
            <h5>{contact.full_name}</h5>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Teléfono:</strong> {contact.phone}</p>
            <p><strong>Dirección:</strong> {contact.address}</p>
            <div className="d-flex justify-content-between">
                <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => onEdit(contact.id)}  // Botón para editar
                >
                    Editar
                </button>
                <button 
                    className="btn btn-danger btn-sm"
                    onClick={handleDeleteClick}  // Botón para abrir el modal
                >
                    Eliminar
                </button>
            </div>

            {/* Modal de Confirmación */}
            {showModal && (
                <div className="modal" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar Eliminación</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>¿Estás seguro de eliminar a {contact.full_name}?</p>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    onClick={confirmDelete}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactCard;