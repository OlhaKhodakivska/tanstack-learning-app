import React from 'react';
import styles from './Input.module.css';

export function Input({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.input}
    />
  );
}