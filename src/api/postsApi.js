export async function fetchPosts(userId) {
  let url = 'https://jsonplaceholder.typicode.com/posts';
  if (userId) {
    url += `?userId=${userId}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch posts from server');
  }
  return response.json();
}