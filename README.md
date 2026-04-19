# The Syntax Sage - Portfolio Website Documentation

## Project Overview
This repository hosts the personal portfolio website for **The Syntax Sage**, a Full Stack Developer & Cyber Security Enthusiast. The project is currently in a transition phase, evolving from a standard static HTML/CSS/JS site into a robust, scalable static site generated with **Zola**.

## Why This Evolution? (The "Need")
building a portfolio is critical for showcasing skills, but maintaining it can become cumbersome with raw HTML.
- **Scalability**: As blog posts and project entries grow, manually duplicating HTML pages becomes error-prone and tedious.
- **Performance**: Zola is written in Rust and is incredibly fast, ensuring high performance for end-users.
- **Maintainability**: By separating content (Markdown) from logic (Templates), we can update the look and feel of the entire site without touching every single page.
- **Modern Aesthetics**: The migration includes adopting the **Zap** theme, known for its clean, minimal, and fast design, while aiming to retain the custom "Space/Terminal" aesthetics of the original site.

## Steps Taken So Far

### 1. Initial Static Implementation
*   **Core Structure**: Created foundational HTML files (`index.html`, `blogs.html`, `connect.html`, `projects.html`).
*   **Styling**: Implemented a responsive design using **Tailwind CSS** (via CDN) and custom CSS (`style.css`) for specific overrides.
*   **Interactivity**: Developed `script.js` to handle:
    *   Smooth scrolling navigation.
    *   Scroll-driven animations (IntersectionObserver).
    *   A custom **Space & Terminal Canvas Animation** to reflect the "Cyber Security" theme.
    *   Magnetic button micro-interactions.

### 2. Migration to Zola (In Progress)
*   **Installation & Setup**: Initialize a new Zola project structure (`config.toml`, `content/`, `templates/`, `themes/`).
*   **Theme Integration**: Installed the **Zap** theme to provide a solid structural foundation.
*   **Configuration**: Configured `config.toml` with site metadata:
    *   Base URL, Title ("The Syntax Sage"), and Description.
    *   Navigation menu setup mimicking the original links (Home, Blogs, Projects, Connect).
*   **Content Migration**:
    *   Converted blog posts to Markdown (`content/posts/`).
    *   Created `content/connect.md` to replicate the contact page functionality.
    *   Set up Section definitions (`_index.md`) for proper routing.

## Current Project Structure
The workspace currently contains both the legacy static files and the new Zola structure:
- **Legacy**: `index.html`, `blogs.html`, `script.js` (Root directory)
- **New (Zola)**:
    - `config.toml`: Main configuration.
    - `content/`: Markdown sources for pages and blogs.
    - `themes/zap/`: The active Zola theme.

## Next Steps
- [ ] **Complete Migration**: Fully port the "Space Canvas" and custom Tailwind styles into the Zola templates (`base.html` overrides).
- [ ] **Cleanup**: Remove legacy HTML files once the Zola build is verified to replica the original design functionality.
- [ ] **Resolve Errors**: Debug pending template rendering issues (e.g., pagination or tag errors).
