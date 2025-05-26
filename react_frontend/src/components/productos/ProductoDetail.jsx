import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';
import { useNotification } from '../../context/NotificationContext';

// Componentes PrimeReact
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';

const ProductoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await ProductoService.getProductoById(id);
        setProducto(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching producto details');
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const confirmDelete = () => {
    confirmDialog({
      message: '¿Estás seguro que deseas eliminar este producto?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: handleDelete
    });
  };

  const handleDelete = async () => {
    try {
      await ProductoService.deleteProducto(id);
      showSuccess('Producto eliminado exitosamente');
      navigate('/productos');
    } catch (err) {
      setError('Error deleting producto');
      showError('Error al eliminar el producto');
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

  if (!producto) return (
    <Message severity="warn" text="Producto no encontrado" />
  );

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Volver"
        icon="pi pi-arrow-left"
        className="p-button-text"
        onClick={() => navigate('/productos')}
      />
      <Button
        label="Editar"
        icon="pi pi-pencil"
        className="p-button-warning"
        onClick={() => navigate(`/productos/edit/${id}`)}
      />
      <Button
        label="Eliminar"
        icon="pi pi-trash"
        className="p-button-danger"
        onClick={confirmDelete}
      />
    </div>
  );

  return (
    <Card title="Detalle de Producto" subTitle="Información detallada del producto" footer={footer}>
      <ConfirmDialog />
      <div className="p-fluid">
        <Panel header="Información básica">
          <div className="grid">
            <div className="col-12 md:col-3">
              <h3>Nombre</h3>
            </div>
            <div className="col-12 md:col-9">
              <p>{producto.name}</p>
            </div>
          </div>
          <Divider />
          <div className="grid">
            <div className="col-12 md:col-3">
              <h3>Precio</h3>
            </div>
            <div className="col-12 md:col-9">
              <p>${producto.price.toFixed(2)}</p>
            </div>
          </div>
          <Divider />
        </Panel>
      </div>
    </Card>
  );
};

export default ProductoDetail;