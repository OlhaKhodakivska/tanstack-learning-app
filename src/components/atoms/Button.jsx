import React from 'react';
import styles from './Button.module.css';

export function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button onClick={onClick} className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}