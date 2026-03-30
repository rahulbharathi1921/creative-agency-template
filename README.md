# DeCoders - Creative Digital Agency

A modern, production-ready landing page for a creative digital agency built with vanilla HTML, CSS, and JavaScript. Features dark mode, smooth animations, mobile-first design, and modular architecture.

![DeCoders Preview](https://via.placeholder.com/1200x630/000000/FFFFFF?text=DeCoders+Digital+Agency)

## ✨ Features

### Design & UX
- 🎨 **Dark Mode** - Sleek dark theme (default) with light mode toggle
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ✨ **Smooth Animations** - CSS animations and JavaScript-powered transitions
- 🎯 **Interactive Elements** - Hover effects, scroll animations
- 🌙 **Page Transitions** - Smooth navigation between sections

### Sections
- 🏠 **Hero Section** - Eye-catching introduction with call-to-action
- 👥 **About Us** - Company story, mission, and stats
- 💼 **Services** - Four service offerings with icons
- 🖼️ **Projects** - Portfolio showcase with hover overlays
- 📧 **Contact** - Functional contact form with validation

### Technical
- ⚡ **Performance Optimized** - Fast loading with minimal dependencies
- ♿ **Accessible** - Semantic HTML and ARIA labels
- 🔍 **SEO Ready** - Meta tags and structured data
- 📦 **Modular Code** - Separated concerns for maintainability

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES6+)** - Interactive functionality

### Tools & Libraries
- **Inter Font** - Modern typography
- **CSS Grid & Flexbox** - Layout system
- **Intersection Observer API** - Scroll animations
- **CSS Custom Properties** - Theming system

## 🚀 Quick Start

### Open in Browser
Simply open `index.html` in any modern browser:

```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

### Using a Local Server (Recommended)
```bash
# Python 3
python -m http.server 8000

# Node.js (if http-server installed)
npx http-server -p 8000
```

Then visit `http://localhost:8000`

## 📁 Project Structure

```
DeCoders/
├── index.html                    # Main entry point
├── public/                       # Public assets
│   ├── favicon.svg              # Site favicon
│   ├── robots.txt               # SEO robots file
│   └── sitemap.xml              # XML sitemap
└── src/
    ├── assets/
    │   ├── icons/               # Icon assets
    │   └── images/              # Image assets
    ├── pages/
    │   ├── 404.html             # Custom 404 error page
    │   ├── 500.html             # Custom 500 error page
    │   └── settings.html        # Settings/Profile page
    ├── scripts/
    │   ├── main.js              # Main entry point
    │   ├── navigation.js        # Navigation module
    │   ├── animations.js        # Animations module
    │   ├── form-handler.js     # Form handling module
    │   └── utils.js             # Utility functions
    └── styles/
        ├── main.css             # Main stylesheet
        ├── _variables.css       # CSS custom properties
        ├── _reset.css           # CSS reset & base
        ├── _components.css      # Reusable components
        ├── _animations.css      # Animations & transitions
        └── _responsive.css      # Responsive styles
```

## 🎨 Customization

### Colors
Edit CSS custom properties in `src/styles/_variables.css`:

```css
:root {
    --color-accent: #0066ff;
    --color-background: #000000;
    --color-surface: #111111;
}
```

### Dark/Light Mode
The theme toggle is in the navigation bar. Click to switch between dark (default) and light modes.

## 📞 Contact

**DeCoders Digital Agency**

- **Website**: [decoders.dev](https://decoders.dev)
- **Email**: hello@decoders.dev
- **GitHub**: [@decoders](https://github.com/decoders)

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ by DeCoders Team © 2025
