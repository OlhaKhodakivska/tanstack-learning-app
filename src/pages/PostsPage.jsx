import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/postsApi';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { PostCard } from '../components/molecules/PostCard';
import styles from './PostsPage.module.css';

export function PostsPage() {
  // --- CLIENT-STATE (Managed locally in browser) ---
  const [showList, setShowList] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(''); // "" means all users

  // --- SERVER-STATE (Managed by TanStack Query) ---
  // The Query Key changes when selectedUserId changes, forcing a dynamic fetch or cache lookup.
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['posts', selectedUserId],
    queryFn: () => fetchPosts(selectedUserId),
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>TanStack Query Learning App</h1>
      </header>

      {/* State Visualization Section */}
      <section className={styles.stateDashboard}>
        <div>
          <h3>🟢 Client-State</h3>
          <p>Visible: {showList ? 'Yes' : 'No'} | Filter User ID: {selectedUserId || 'All'}</p>
        </div>
        <div>
          <h3>🌐 Server-State Status</h3>
          <p>{isPending ? 'Loading...' : isError ? 'Error!' : `Loaded ${data?.length || 0} items`}</p>
        </div>
      </section>

      {/* Controls */}
      <div className={styles.controls}>
        <Button onClick={() => setShowList(!showList)}>
          {showList ? 'Hide Posts List' : 'Show Posts List'}
        </Button>

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Local search by title..."
        />

        <div className={styles.filterGroup}>
          <Button variant={selectedUserId === '' ? 'accent' : 'primary'} onClick={() => setSelectedUserId('')}>
            All Users
          </Button>
          <Button variant={selectedUserId === '1' ? 'accent' : 'primary'} onClick={() => setSelectedUserId('1')}>
            User 1
          </Button>
          <Button variant={selectedUserId === '2' ? 'accent' : 'primary'} onClick={() => setSelectedUserId('2')}>
            User 2
          </Button>
        </div>

        <Button variant="accent" onClick={() => refetch()}>Manual Refetch</Button>
      </div>

      {/* Data Render */}
      {showList && (
        <main className={styles.main}>
          {isPending && <p className={styles.info}>Loading posts from server...</p>}
          {isError && <p className={styles.error}>Error: {error.message}</p>}

          {data && (
            <div className={styles.list}>
              {data
                .filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
                .slice(0, 10) // Display first 10 for simplicity
                .map(post => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    body={post.body}
                    userId={post.userId}
                  />
                ))}
            </div>
          )}
        </main>
      )}

      {/* Cache Observations Summary */}
      <footer className={styles.footer}>
        <h3>📋 Cache Observations:</h3>
        <ul>
          <li>When switching between 'User 1' and 'User 2' repeatedly, data appears instantly without loading states because it is pulled directly from the Cache.</li>
          <li>The Query Key array `['posts', selectedUserId]` serves as a unique cache address for each specific filter state.</li>
        </ul>
      </footer>
    </div>
  );
}