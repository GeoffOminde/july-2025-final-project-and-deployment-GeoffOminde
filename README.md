# Geoffrey Ominde — Personal Website

A clean, responsive three-page website built with semantic HTML5, modern CSS3, and a touch of vanilla JavaScript. The site presents Geoffrey Ominde’s professional profile as a Monitoring, Evaluation, and Learning (MEL) specialist based in Nakuru, Kenya.



## Overview

- **Pages:** Home, About, Contact
- **Tech:** HTML5, CSS3, JavaScript (no frameworks)
- **Features:** Responsive layout, accessible navigation, mobile menu toggle, contact form UX, neutral color theme
- **Use case:** Portfolio/resume website suitable for course submission and live deployment

---

## Live link

- Add once deployed (e.g., GitHub Pages, Netlify, or Vercel):
  - https://geoffominde.github.io

---

## Project structure

```
ominde-site/
├─ index.html              # Home: headline, tagline, quick competencies
├─ about.html              # About & detailed experience, education, skills
├─ contact.html            # Contact details + message form
├─ assets/
│  ├─ css/
│  │  └─ style.css         # Global styles, variables, responsive rules
│  ├─ js/
│  │  └─ main.js           # Footer year, mobile nav toggle, form UX
│  └─ images/
│     └─ headshot.jpg      # Profile image (replace with your own)
└─ README.md




## Page details

### Home (index.html)
- **Header:** Sticky navigation with site title and links to all pages.
- **Hero section:** Name, tagline, location, email, phone, and CTAs. Includes a circular profile image displayed beside the headline; stacks on mobile.
- **Highlights:** Three cards outlining MEL systems, analysis/storytelling, and partnerships.

### About (about.html)
- **Summary:** Brief biography and approach.
- **Core competencies:** Bullet list of key MEL skills and methods.
- **Experience:** Role-by-role highlights 
- **Education and skills:** Academic background, tools, languages.
- **Beyond work:** Personal note on teamwork.

### Contact (contact.html)
- **Contact details:** Email, phone, location, P.O. Box.
- **Form:** Name, email, message with basic validation/UX via JavaScript. Mailto fallback opens the default email client.



## Styling and responsiveness (assets/css/style.css)

- **CSS variables:** Centralized color palette, spacing, radius, and container width.
- **Layout:** Mobile-first design with fluid spacing, grid utilities, and readable line lengths.
- **Components:** Cards, buttons, focus-visible states, and accessible color contrast.
- **Responsive nav:** Converts to a toggleable menu under 720px.
- **Hero image layout:** Two-column grid for image + text; collapses to single-column on small screens.

To change colors, edit the variables in `:root`:
```css
:root{
  --bg: #f5f5f5;
  --surface: #ffffff;
  --text: #222222;
  --muted: #555555;
  --accent: #0077cc;
  --accent-dark: #005fa3;
  --ring: #cce4f7;
  --radius: 12px;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --maxw: 1100px;
}




## Interactivity (assets/js/main.js)

- **Footer year:** Auto-updates the copyright.
- **Mobile nav toggle:** ARIA-enabled button toggles the menu on small screens.
- **Contact form UX:** Validates required fields and opens a mailto link as a simple submission fallback.



## How to run locally

1. Download or clone the repository.
2. Open `index.html` in your browser (no build step needed).
3. Replace `assets/images/headshot.jpg` with your own image if desired.



## Deployment

Choose one of the following:

- **GitHub Pages**
  1. Push the project to a GitHub repository.
  2. In Repo Settings → Pages, set source to “Deploy from a branch” (main, root).
  3. Wait for the site to go live at `https://<username>.github.io/<repo>/`.

- **Netlify**
  1. Drag-and-drop the project folder (or connect the repo) in Netlify.
  2. Netlify auto-deploys and provides a live HTTPS URL.
  3. Optionally set a custom domain.

- **Vercel**
  1. Import the GitHub repo into Vercel.
  2. Framework preset: “Other”; no build command needed.
  3. Deploy for an instant HTTPS URL and preview deployments.



## Accessibility notes

- Semantic landmarks: header, nav, main, footer.
- Descriptive link text and alt text for the headshot image.
- Visible focus styles and adequate color contrast.
- ARIA attributes on the mobile nav toggle and form status messaging.



## Credits and license

- Content: © Geoffrey Okwach Ominde.
- Code: You may reuse and adapt for educational purposes. If publishing publicly, retain attribution or add your own.


