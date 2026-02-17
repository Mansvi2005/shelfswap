const token = localStorage.getItem("id_token");

if (!token) {
  alert("Please login first");
  window.location.href = "index.html";
}

// Decode JWT
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}

const user = parseJwt(token);

// Show user email
document.getElementById("email").innerText = user.email || "";

// Load liked books
const liked = JSON.parse(localStorage.getItem("likedBooks")) || [];
const container = document.getElementById("likedBooks");

container.innerHTML = "";

liked.forEach(book => {
    container.innerHTML += `
        <div class="book-card">
            <h3>${book.title?.S || book.title}</h3>
            <p><strong>Author:</strong> ${book.author?.S || book.author}</p>
            <p><strong>Contact to:</strong> ${book.email?.S || book.email}</p>
            <p><strong>₹${book.price?.N || book.price}</strong></p>
            <img src="${book.imageUrl?.S || book.imageUrl}" width="200">
        </div>
    `;
});