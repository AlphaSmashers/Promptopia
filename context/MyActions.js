export const fetchPosts = async () => {
  const response = await fetch("/api/prompt");
  const data = await response.json();
  return data;
};
