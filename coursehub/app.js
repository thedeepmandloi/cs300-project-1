// ============================================
// STATE — One object holds ALL application data
// ============================================
const state = {
  currentView: "browse",
  searchResults: [],
  bookmarks: JSON.parse(localStorage.getItem("coursehub-bookmarks")) || [],
  isLoading: false,
  error: null,
  searchQuery: "",
};

function setState(updates) {
  Object.assign(state, updates);
  render();
}

// ============================================
// COMPONENTS — Functions that return HTML (like React components)
// ============================================
function createBookCard(book, isBookmarked) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://placehold.co/200x300/e2e8f0/64748b?text=No+Cover";

  return `
    <div class="card" data-key="${book.key}">
      <img src="${coverUrl}" alt="${book.title}" />
      <div class="card-body">
        <h3>${book.title}</h3>
        <p class="author">${book.author_name?.[0] || "Unknown Author"}</p>
        <p class="year">${book.first_publish_year || ""}</p>
        <button data-action="bookmark" data-key="${book.key}"
          class="btn ${isBookmarked ? "bookmarked" : ""}">
          ${isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
    </div>
  `;
}

function createSearchBar() {
  return `
    <form id="search-form" class="search-bar">
      <input type="text" name="query"
        placeholder="Search for books... (e.g., javascript, design)"
        value="${state.searchQuery}" />
      <button type="submit">Search</button>
    </form>
  `;
}

// ============================================
// VIEWS — Composed from components (like React pages)
// ============================================
function renderBrowseView() {
  let content = createSearchBar();

  if (state.isLoading) {
    content += '<p class="loading">Searching...</p>';
  } else if (state.error) {
    content += `<p class="error">${state.error}</p>`;
  } else if (state.searchResults.length > 0) {
    const cards = state.searchResults
      .map((book) => {
        const isBookmarked = state.bookmarks.some((b) => b.key === book.key);
        return createBookCard(book, isBookmarked);
      })
      .join("");
    content += `<div class="card-grid">${cards}</div>`;
  } else if (state.searchQuery) {
    content += `<p class="empty">No books found for "${state.searchQuery}"</p>`;
  } else {
    content += '<p class="initial">Search for books to get started!</p>';
  }

  return content;
}

function renderBookmarksView() {
  if (state.bookmarks.length === 0) {
    return '<p class="empty">No bookmarks yet. Browse and save some books!</p>';
  }
  const cards = state.bookmarks
    .map((book) => createBookCard(book, true))
    .join("");
  return `<h2>Your Bookmarks (${state.bookmarks.length})</h2>
    <div class="card-grid">${cards}</div>`;
}

function renderAboutView() {
  return `
    <div class="about">
      <h2>About CourseHub</h2>
      <p>A demo app built with vanilla JavaScript to demonstrate
         application architecture patterns.</p>
      <h3>Patterns Used</h3>
      <ul>
        <li>Component Functions</li>
        <li>Central State Management</li>
        <li>Props (Function Parameters)</li>
        <li>Event Delegation</li>
        <li>Hash-Based Routing</li>
        <li>Organized Project Structure</li>
      </ul>
      <p><strong>All of these patterns transfer directly to React!</strong></p>
    </div>
  `;
}

// ============================================
// RENDER — Reads state, updates the page
// ============================================
function render() {
  const app = document.querySelector("#app");

  const views = {
    browse: renderBrowseView,
    bookmarks: renderBookmarksView,
    about: renderAboutView,
  };

  const viewFn = views[state.currentView] || renderBrowseView;
  app.innerHTML = viewFn();

  // Update active nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === `#${state.currentView}`);
  });
}

// ============================================
// API — Fetch data and update state
// ============================================
async function searchBooks(query) {
  setState({ isLoading: true, error: null, searchQuery: query });

  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Search failed (${response.status})`);
    }

    const data = await response.json();
    setState({ searchResults: data.docs || [], isLoading: false });
  } catch (error) {
    setState({ error: error.message, isLoading: false, searchResults: [] });
  }
}

// ============================================
// EVENT HANDLERS — Delegated on #app
// ============================================
document.querySelector("#app").addEventListener("submit", async (e) => {
  if (e.target.id === "search-form") {
    e.preventDefault();
    const query = new FormData(e.target).get("query").trim();
    if (!query) return;
    searchBooks(query);
  }
});

document.querySelector("#app").addEventListener("click", (e) => {
  if (e.target.dataset.action === "bookmark") {
    const key = e.target.dataset.key;
    const book = [...state.searchResults, ...state.bookmarks].find(
      (b) => b.key === key,
    );
    if (!book) return;

    const exists = state.bookmarks.some((b) => b.key === key);
    const updatedBookmarks = exists
      ? state.bookmarks.filter((b) => b.key !== key)
      : [...state.bookmarks, book];

    localStorage.setItem(
      "coursehub-bookmarks",
      JSON.stringify(updatedBookmarks),
    );
    setState({ bookmarks: updatedBookmarks });
  }
});

// ============================================
// ROUTER — Hash changes drive view switching
// ============================================
window.addEventListener("hashchange", () => {
  const view = location.hash.slice(1) || "browse";
  setState({ currentView: view });
});

// ============================================
// INITIALIZE
// ============================================
const initialView = location.hash.slice(1) || "browse";
setState({ currentView: initialView });
