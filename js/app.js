// app.js (type="module")
const postsUrl = "/data/posts.json";

async function fetchPosts() {
  try {
    const res = await fetch(postsUrl, { cache: "no-cache" });
    if (!res.ok) throw new Error("Error al traer posts");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

function createPostCard(post) {
  const article = document.createElement("article");
  article.className = "post-card";
  article.innerHTML = `
    <h2><a href="${post.url}">${post.title}</a></h2>
    <p class="meta">${new Date(post.date).toLocaleDateString()} · ${
    post.readTime || "—"
  } min</p>
    <p>${post.excerpt}</p>
  `;
  return article;
}

async function init() {
  const container = document.getElementById("posts");
  const posts = await fetchPosts();
  if (posts.length === 0) {
    container.innerHTML = "<p>No hay entradas por mostrar.</p>";
    return;
  }
  posts.forEach((p) => container.appendChild(createPostCard(p)));
}

document.addEventListener("DOMContentLoaded", init);
