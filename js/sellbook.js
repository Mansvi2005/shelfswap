const API_BASE =
  "https://zj91wchzu2.execute-api.ap-south-1.amazonaws.com/prod";

document.getElementById("sellForm").addEventListener("submit", submitBook);

async function submitBook(e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const price = document.getElementById("price").value.trim();
  const seller = document.getElementById("seller").value.trim();
  const email = document.getElementById("email").value.trim();
  const imageFile = document.getElementById("image").files[0];

  if (!imageFile) {
    alert("Please select an image");
    return;
  }

  try {
    // 1️⃣ GET presigned upload URL (FIXED PATH)
    const uploadRes = await fetch(`${API_BASE}/upload-url`);
    if (!uploadRes.ok) throw new Error("Failed to get upload URL");

    const { uploadUrl, imageUrl } = await uploadRes.json();

    // 2️⃣ Upload image to S3
    const putRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": imageFile.type
      },
      body: imageFile
    });

    if (!putRes.ok) throw new Error("Image upload failed");

    // 3️⃣ Save book details to DynamoDB
    const token = localStorage.getItem("idToken");
    const saveRes = await fetch(`${API_BASE}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" ,
        "Authorization": token 
      },
      body: JSON.stringify({
        title,
        author,
        price,
        seller,
        email,
        imageUrl
      })
    });

    if (!saveRes.ok) throw new Error("Failed to save book");

    alert("✅ Book added successfully!");
    window.location.href = "books.html";

  } catch (err) {
    console.error("❌ ERROR:", err);
    alert("❌ Failed to add book");
  }
}
