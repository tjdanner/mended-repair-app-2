// src/components/Notification.jsx
import React from 'react';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const notificationStyle = {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    color: type === 'error' ? 'red' : 'green',
    backgroundColor: type === 'error' ? '#fdd' : '#dfd',
    border: `1px solid ${type === 'error' ? 'red' : 'green'}`,
  };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;