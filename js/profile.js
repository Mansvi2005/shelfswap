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

document.getElementById("name").innerText = user.name || "User";
document.getElementById("email").innerText = user.email || "";

// Load liked books
const liked = JSON.parse(localStorage.getItem("likedBooks")) || [];

const likedContainer = document.getElementById("likedBooks");

likedContainer.innerHTML = "";

liked.forEach(book => {
    container.innerHTML += `
        <div class="book-card">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>₹${book.price}</strong></p>
            <img src="${book.image}" width="200">
        </div>
    `;
    });