// Scroll progress bar
window.onscroll = function () {
  updateProgressBar();
  // updateActiveNavLink();
};

function updateProgressBar() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
}

// Highlight active nav link based on current page
// function updateActiveNavLink() {
//   const sections = document.querySelectorAll("section");
//   const navLinks = document.querySelectorAll(".nav-links a");

//   let current = "";

//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop;
//     if (pageYOffset >= sectionTop - 200) {
//       current = section.getAttribute("id");
//     }
//   });

//   navLinks.forEach((link) => {
//     link.classList.remove("active");
//     if (link.getAttribute("href").includes(current)) {
//       link.classList.add("active");
//     }
//   });
// }

// Filter articles by tag
function filterArticles(tag) {
  const articles = document.querySelectorAll(".post-card");
  const tags = document.querySelectorAll(".tag");

  // Update active tag
  tags.forEach((t) => t.classList.remove("active"));
  event.target.classList.add("active");

  // Filter articles
  articles.forEach((article) => {
    const articleTags = article.getAttribute("data-tags").split(" ");
    if (tag === "all" || articleTags.includes(tag)) {
      article.style.display = "flex";
    } else {
      article.style.display = "none";
    }
  });
}

// Search functionality
function searchArticles() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const articles = document.querySelectorAll(".post-card");

  articles.forEach((article) => {
    const title = article
      .querySelector(".post-title")
      .textContent.toLowerCase();
    const excerpt = article
      .querySelector(".post-excerpt")
      .textContent.toLowerCase();

    if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
      article.style.display = "flex";
    } else {
      article.style.display = "none";
    }
  });
}

// Copy code to clipboard
function copyToClipboard(button) {
  const codeBlock = button.parentElement.nextElementSibling;
  const code = codeBlock.querySelector("code").textContent;

  navigator.clipboard.writeText(code).then(() => {
    button.textContent = "Copied!";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 2000);
  });
}

// Calculate reading time
function calculateReadingTime() {
  const article = document.querySelector(".article-content");
  if (!article) return;

  const text = article.textContent;
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

  const readingTimeElement = document.getElementById("reading-time");
  if (readingTimeElement) {
    readingTimeElement.textContent = `${readingTime} min read`;
  }
}

// Initialize functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize reading time calculation
  calculateReadingTime();

  // Add event listeners for search if on all-articles page
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", searchArticles);
  }

  // Add copy buttons to code blocks
  const codeContainers = document.querySelectorAll(".code-container");
  codeContainers.forEach((container) => {
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.textContent = "Copy";
    copyBtn.onclick = function () {
      copyToClipboard(this);
    };

    const header = document.createElement("div");
    header.className = "code-header";
    const language = container.getAttribute("data-language") || "javascript";
    header.innerHTML = `<span>${language}</span>`;
    header.appendChild(copyBtn);

    container.insertBefore(header, container.firstChild);
  });
});
