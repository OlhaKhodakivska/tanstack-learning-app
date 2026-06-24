import React from 'react';
import styles from './PostCard.module.css';

export function PostCard({ title, body, userId, id }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
      <div className={styles.meta}>
        <span>Post ID: {id}</span>
        <span>User ID: {userId}</span>
      </div>
    </div>
  );
}