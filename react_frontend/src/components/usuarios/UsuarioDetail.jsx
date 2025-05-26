import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
import { useNotification } from '../../context/NotificationContext';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';

const UsuarioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const data = await UsuarioService.getUsuarioById(id);
        setUsuario(data.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching usuario details');
        setLoading(false);
      }
    };
    fetchUsuario();
  }, [id]);

  const handleDelete = async () => {
    try {
      await UsuarioService.deleteUsuario(id);
      showSuccess('Usuario eliminado exitosamente');
      navigate('/usuarios');
    } catch (err) {
      setError('Error deleting usuario');
      showError('Error al eliminar el usuario');
    }
  };

  if (loading) return (
    <div className="flex justify-content-center align-items-center" style={{ height: '300px' }}>
      <ProgressSpinner />
    </div>
  );

  if (error) return (
    <Message severity="error" text={error} />
  );

  if (!usuario) return (
    <Message severity="warn" text="Usuario no encontrado" />
  );

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Volver"
        icon="pi pi-arrow-left"
        className="p-button-text"
        onClick={() => navigate('/usuarios')}
      />
      <Button
        label="Editar"
        icon="pi pi-pencil"
        className="p-button-warning"
        onClick={() => navigate(`/usuarios/edit/${id}`)}
      />
      <Button
        label="Eliminar"
        icon="pi pi-trash"
        className="p-button-danger"
        onClick={handleDelete}
      />
    </div>
  );

  return (
    <Card
      title="Detalle de Usuario"
      subTitle="Visualización de los datos del usuario"
      footer={footer}
    >
      <form className="p-fluid">
        <div className="grid">
          <div className="col-12 md:col-6 mb-4">
            <span className="p-float-label">
              <InputText
                id="name"
                name="name"
                value={usuario.name || ''}
                readOnly
              />
              <label htmlFor="name">Nombre</label>
            </span>
          </div>
          <div className="col-12 md:col-6 mb-4">
            <span className="p-float-label">
              <InputText
                id="email"
                name="email"
                value={usuario.email || ''}
                readOnly
              />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="col-12 md:col-6 mb-4">
            <span className="p-float-label">
              <InputText
                id="age"
                name="age"
                value={usuario.age || ''}
                readOnly
              />
              <label htmlFor="age">Edad</label>
            </span>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default UsuarioDetail;