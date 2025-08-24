import React, { useState, useEffect, useContext } from 'react';
import UsuarioService from '../../services/UsuarioService';
import { AuthContext } from '../../context/AuthContext';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';

const UserRoleManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user: currentUser } = useContext(AuthContext);
  
  const roleOptions = [
    { label: 'Usuario', value: 'user' },
    { label: 'Administrador', value: 'admin' }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UsuarioService.getAllUsuarios();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los usuarios');
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const handleRoleChange = (e, userId) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, role: e.value } : user
    );
    setUsers(updatedUsers);
  };

  const saveRoleChange = async (userId, newRole) => {
    try {
      await UsuarioService.updateUserRole(userId, { role: newRole });
      alert('Rol actualizado correctamente');
    } catch (err) {
      alert('Error al actualizar el rol');
    }
  };

  const roleBodyTemplate = (rowData) => {
    // Disable editing own role or if not admin
    const isDisabled = rowData.id === currentUser?.id || currentUser?.role !== 'admin';
    
    return (
      <Dropdown
        value={rowData.role || 'user'}
        options={roleOptions}
        onChange={(e) => handleRoleChange(e, rowData.id)}
        disabled={isDisabled}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    // Disable save button for own user or if not admin
    const isDisabled = rowData.id === currentUser?.id || currentUser?.role !== 'admin';
    
    return (
      <Button 
        label="Guardar" 
        icon="pi pi-save" 
        onClick={() => saveRoleChange(rowData.id, rowData.role || 'user')} 
        disabled={isDisabled}
        className="p-button-sm"
      />
    );
  };

  if (loading) return (
    <div className="flex justify-content-center align-items-center" style={{ height: '300px' }}>
      <ProgressSpinner />
    </div>
  );

  if (error) return (
    <Message severity="error" text={error} />
  );

  return (
    <Card title="Gestión de Roles de Usuario">
      <p className="mb-3">Desde esta sección puedes asignar roles a los usuarios. Solo los administradores pueden cambiar roles.</p>
      
      <DataTable
        value={users}
        responsiveLayout="scroll"
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column field="name" header="Nombre" sortable />
        <Column field="email" header="Email" sortable />
        <Column header="Rol" body={roleBodyTemplate} sortable sortField="role" />
        <Column body={actionBodyTemplate} style={{ width: '150px', textAlign: 'center' }} />
      </DataTable>
    </Card>
  );
};

export default UserRoleManagement;