// Handle Cognito redirect
window.onload = function () {
  const hash = window.location.hash;

  if (hash.includes("id_token")) {
    const params = new URLSearchParams(hash.substring(1));
    const idToken = params.get("id_token");

    localStorage.setItem("id_token", idToken);

    // Clean URL (remove token from address bar)
    window.history.replaceState({}, document.title, "books.html");
  }
};

document.addEventListener("DOMContentLoaded", loadBooks);

const API_URL =
  "https://zj91wchzu2.execute-api.ap-south-1.amazonaws.com/prod/books";

  function likeBook(book) {
  let liked = JSON.parse(localStorage.getItem("likedBooks")) || [];

  const exists = liked.find(b => b.title === book.title);

  if (!exists) {
    liked.push(book);
    localStorage.setItem("likedBooks", JSON.stringify(liked));
    alert("Book liked ❤️");
  } else {
    alert("Already liked!");
  }
}

async function loadBooks() {
  const container = document.querySelector(".container");

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    console.log("API RAW:", data);

    const books = JSON.parse(data.body);
    console.log("BOOK ARRAY:", books);

    container.innerHTML = "";

    books.forEach(book => {
      const title  = book.title?.S ?? "N/A";
      const author = book.author?.S ?? "N/A";
      const seller = book.seller?.S ?? "N/A";
      const price  = book.price?.N ?? "0";
      const email  = book.email?.S ?? "N/A";
      const imageUrl = book.imageUrl?.S ?? null;

      const card = document.createElement("div");
      card.className = "book-card";

      card.innerHTML = `
        
        <h2>${title}</h2>
        <p><strong>Author:</strong> ${author}</p>
        <p class="price">₹${price}</p>
        <p class="seller">Seller: ${seller}</p>
        <p class="email">Email: ${email}</p>
        <img src="${imageUrl}" class="book-image" alt="Book image" />
        <button onclick='likeBook(${JSON.stringify(book)})'>❤️ Like</button>
      
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("❌ Error loading books:", err);
    container.innerHTML = "<p>Error loading books</p>";
  }
}
