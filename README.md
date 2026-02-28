# Portfolio Website

A premium, animated personal portfolio website built with **React + Vite**, featuring cinematic scroll animations, a splash screen intro, glassmorphism design, and a CSS-driven hero panel.

## ✨ Features

- **Splash Screen** — Letter-by-letter word reveal with progress bar and slide-up exit transition
- **Animated Hero** — Word-by-word text reveal, cycling role titles, magnetic CTA buttons, floating skill pills, and a glowing CSS orb with orbit rings
- **Glassmorphism Navbar** — Scroll-aware blur + shrink, animated link underlines, mobile hamburger overlay
- **About Section** — Split-screen layout with glass education card, semester timeline, and stat counters
- **Skills Section** — Glass category cards + two infinite CSS marquee rows (opposite directions)
- **Projects Section** — Numbered cards (01/02/03) with ghost background numbers and hover-to-play video previews
- **Experience Timeline** — Vertical centered timeline with scroll-driven animated connector line
- **Footer** — Large gradient display headline with social icon row
- **Dark / Light Theme** — Full theme toggle with smooth color transitions
- **Grain Noise Overlay** — Cinematic film grain across the entire site
- **Cursor Glow** — Radial light follows the mouse

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 7 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Styling | Vanilla CSS (custom design system) |
| Fonts | Space Grotesk · DM Mono (Google Fonts) |

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Clone the repo
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / .css       # Glassmorphism navbar
│   ├── Hero.jsx / .css         # Hero with CSS decorative panel
│   ├── About.jsx / .css        # Split-screen about section
│   ├── Skills.jsx / .css       # Grid cards + infinite marquee
│   ├── Projects.jsx / .css     # Numbered project cards
│   ├── Experience.jsx / .css   # Animated vertical timeline
│   ├── Footer.jsx / .css       # Display headline + socials
│   └── SplashScreen.jsx / .css # Loading intro screen
├── App.jsx                     # Root with theme state + cursor glow
├── index.css                   # Global design system + tokens
└── main.jsx                    # React entry point
harmonized-palette.css          # OKLCH color palette definitions
```

## 🎨 Customization

1. **Your name** — Update `"Your Name"` in `Hero.jsx`
2. **University** — Update `"Your University Name"` in `About.jsx`
3. **Projects** — Edit the `projectData` array in `Projects.jsx`
4. **Experience** — Edit the `experienceData` array in `Experience.jsx`
5. **Social links** — Update `href` values in `Footer.jsx`
6. **Contact email** — Replace `email@example.com` in `Hero.jsx` and `Footer.jsx`
7. **Color palette** — Modify CSS variables in `src/index.css`

## 📄 License

MIT — feel free to use this as a base for your own portfolio.
