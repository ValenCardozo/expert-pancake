import React, { createContext, useState, useContext } from 'react';
import Notification from '../components/Notification';

// Crear el contexto
const NotificationContext = createContext();

// Proveedor del contexto
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Añadir una nueva notificación
  const addNotification = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type, duration }]);
    return id;
  };

  // Eliminar una notificación
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Funciones de utilidad para diferentes tipos de notificaciones
  const showSuccess = (message, duration) => addNotification(message, 'success', duration);
  const showError = (message, duration) => addNotification(message, 'error', duration);
  const showWarning = (message, duration) => addNotification(message, 'warning', duration);
  const showInfo = (message, duration) => addNotification(message, 'info', duration);

  return (
    <NotificationContext.Provider
      value={{
        addNotification,
        removeNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo
      }}
    >
      {children}
      <div className="notification-container">
        {notifications.map(({ id, message, type, duration }) => (
          <Notification
            key={id}
            message={message}
            type={type}
            duration={duration}
            onClose={() => removeNotification(id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe ser usado dentro de un NotificationProvider');
  }
  return context;
};