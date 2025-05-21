import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';
import { useNotification } from '../../context/NotificationContext';

// Componentes PrimeReact
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';

const ProductoList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await ProductoService.getAllProductos();
        setProductos(data.products);
        setLoading(false);
      } catch (err) {
        setError('Error fetching productos');
        showError('No se pudieron cargar los productos');
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const confirmDeleteProducto = (id) => {
    confirmDialog({
      message: '¿Estás seguro que deseas eliminar este producto?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => handleDelete(id)
    });
  };

  const handleDelete = async (id) => {
    try {
      await ProductoService.deleteProducto(id);
      setProductos(productos.filter(producto => producto.id !== id));
      showSuccess('Producto eliminado exitosamente');
    } catch (err) {
      setError('Error deleting producto');
      showError('Error al eliminar el producto');
    }
  };

  const actionBodyTemplate = (rowData) => {
    console.log(rowData.id);
    return (
      <div className="flex gap-2">
        <Link to={`/productos/${rowData.id}`}>
          <Button icon="pi pi-eye" className="p-button-rounded p-button-info p-button-sm" />
        </Link>
        <Link to={`/productos/edit/${rowData.id}`}>
          <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-button-sm" />
        </Link>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-sm"
          onClick={() => confirmDeleteProducto(rowData.id)}
        />
      </div>
    );
  };

  const header = (
    <div className="flex justify-content-between align-items-center">
      <h2>Productos</h2>
      <Link to="/productos/new">
        <Button icon="pi pi-plus" label="Nuevo Producto" className="p-button-success" />
      </Link>
    </div>
  );

  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };

  const priceBodyTemplate = (rowData) => {
    return `$${rowData.price}`;
  };

  if (loading) return (
    <div className="flex justify-content-center align-items-center" style={{ height: '300px' }}>
      <ProgressSpinner />
    </div>
  );

  if (error) return (
    <Message severity="error" text={error} />
  );

  const emptyTemplate = () => (
    <div className="text-center p-5">
      <p className="mb-3">No hay productos disponibles</p>
      <Link to="/productos/new">
        <Button label="Agregar un producto" icon="pi pi-plus" />
      </Link>
    </div>
  );

  return (
    <>
      <ConfirmDialog />
      <DataTable
        value={productos}
        header={header}
        emptyMessage={emptyTemplate}
        responsiveLayout="scroll"
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column field="name" header="Nombre" sortable style={{ width: '50%' }} />
        <Column field="price" header="Precio" body={priceBodyTemplate} sortable style={{ width: '50%' }} />
        <Column body={actionBodyTemplate} style={{ width: '30%', textAlign: 'center' }} />
      </DataTable>
    </>
  );
};

export default ProductoList;