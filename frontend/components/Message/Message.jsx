import React, { useEffect, useState } from 'react';
import styles from './Message.module.css';

const Message = ({ message, type = 'info', onClose }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className={`${styles.message} ${styles[type]}`}>
      <span>{message}</span>
      <button className={styles.close} onClick={() => {
        setVisible(false);
        onClose?.();
      }}>
        X
      </button>
    </div>
  );
};

export default Message;
