// post.js
const postsUrl = "/data/posts.json";

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug");
}

async function fetchPost(slug) {
  const res = await fetch(postsUrl);
  const posts = await res.json();
  return posts.find((p) => p.slug === slug);
}

async function init() {
  const slug = getSlug();
  const post = await fetchPost(slug);

  const titleEl = document.getElementById("post-title");
  const metaEl = document.getElementById("post-meta");
  const contentEl = document.getElementById("post-content");
  const imgEl = document.getElementById("post-image");

  if (!post) {
    titleEl.textContent = "Post no encontrado";
    contentEl.innerHTML = "<p>Verifica el enlace o regresa al inicio.</p>";
    return;
  }

  document.title = `${post.title} — Mi Blog`;

  titleEl.textContent = post.title;
  metaEl.textContent = `${new Date(post.date).toLocaleDateString()}`;

  if (post.image) {
    imgEl.src = post.image;
    imgEl.alt = post.title;
    imgEl.hidden = false;
  }

  // Si el contenido viene en HTML o Markdown preprocesado
  contentEl.innerHTML = post.content;
}

document.addEventListener("DOMContentLoaded", init);
