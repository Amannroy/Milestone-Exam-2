// Elements
const addBlogBtn = document.getElementById("addBlogBtn");
const addBlogModal = document.getElementById("addBlogModal");
const closeModal = document.querySelector(".close");
const addBlogForm = document.getElementById("addBlogForm");
const mainContent = document.getElementById("mainContent");

// Blog data
const blogData = [];

// Function to render blog posts
function renderBlogPosts() {
     // Clear the main content element
    mainContent.innerHTML = "";
    // Loop through the blog data array
    blogData.forEach((blog, index) => {
        // Create a new HTML element for the blog post
        const blogBox = document.createElement("div");
        blogBox.classList.add("blog-box");
        // Add the image, title, description, and read more button to the blog box
        blogBox.innerHTML = `
            <img src="${blog.image}" alt="${blog.title}">
            <h2>${blog.title}</h2>
            <p>${blog.description}</p>
            <button class="read-more" data-index="${index}">Read</button>
        `;
        // Append the blog box to the main content element
        mainContent.appendChild(blogBox);
    });
}

// Event listeners
addBlogBtn.addEventListener("click", () => {
    addBlogModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    addBlogModal.style.display = "none";
    addBlogForm.reset();
});

addBlogForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("blogTitle").value;
    // For demonstration purposes, add sample data:
    const image = "image-placeholder.jpg";
    const description = "This is a sample description.";
    blogData.push({ title, image, description });
    renderBlogPosts();
    addBlogModal.style.display = "none";
    addBlogForm.reset();
});

mainContent.addEventListener("click", (event) => {
    if (event.target.classList.contains("read-more")) {
        const index = event.target.getAttribute("data-index");
        const blog = blogData[index];
        // For demonstration, you can alert the content:
        alert(`Title: ${blog.title}\nDescription: ${blog.description}`);
    }
});

// Initialize the app
function init() {
    // Load blog data from LocalStorage if available
    const storedBlogData = localStorage.getItem("blogData");
    if (storedBlogData) {
        blogData.push(...JSON.parse(storedBlogData));
        renderBlogPosts();
    }
}

init();

