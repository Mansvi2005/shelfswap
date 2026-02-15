function login() {
    // MOCK LOGIN (replace with Cognito later)
    const email = document.getElementById("email").value;

    // Fake token for demo
    localStorage.setItem("token", "demo-jwt-token");
    localStorage.setItem("userId", email);

    alert("Login successful");
    window.location.href = "books.html";
}
