# EL CODE — Official Website App Blueprint

## Vision

EL CODE is not just a music artist website.
It is a futuristic urban digital universe inspired by:

- Nostalgia
- Artificial Intelligence
- Costa Rican identity
- Urban music
- Cyberpunk aesthetics
- Emotional futurism

The website must feel:

- Cinematic
- Premium
- Minimalistic
- Futuristic
- Emotional
- Dynamic
- Mobile-first
- Immersive

---

# Recommended Tech Stack

## Frontend

- Angular 20+
- Tailwind CSS
- GSAP (animations)
- Angular Animations
- TypeScript
- SCSS

## Hosting

Recommended:

- Vercel
- Netlify

## Domain

- elcodecr.com

---

# Visual Identity

## Main Colors

### Black

```css
#000000
#0B0B0B
#111111
```

### Neon Green

```css
#00FF9C
#00D084
#19FFB2
```

### Chrome / Silver

```css
#C0C0C0
#E5E5E5
#8F8F8F
```

---

# Design Style

## Main Design Direction

- Glassmorphism
- Futuristic UI
- Neon glow
- Chrome gradients
- Smooth animations
- Blur effects
- Minimal layouts
- Cinematic transitions
- Dark mode only

---

# Main Sections

## 1. HERO SECTION

Purpose:
Create immediate impact.

### Elements

- Animated EL CODE logo
- Fullscreen hero
- Dynamic futuristic background
- Neon glow
- Call-to-action buttons
- Floating particles
- AI visual atmosphere

### Suggested Motto Rotation

- "Sentimientos reales en un mundo artificial."
- "Costa Rica del futuro."
- "Programados para sentir."
- "El futuro suena latino."

### Buttons

- Escuchar ahora
- Último lanzamiento

---

## 2. WHAT IS EL CODE?

Purpose:
Create identity and emotional connection.

### Suggested Text

EL CODE es nostalgia, tecnología y música urbana costarricense.
Una frecuencia creada para quienes todavía sienten en una era artificial.

---

## 3. LATEST RELEASE

Purpose:
Highlight newest music release.

### Elements

- YouTube iframe
- Single cover art
- Spotify button
- Apple Music button
- Animated release card
- Neon hover effects

---

## 4. VISUAL EXPERIENCE

Purpose:
Show artistic identity.

### Content

- Cinematic photos
- AI visuals
- Behind the scenes
- Urban futuristic photography
- VHS / glitch effects

---

## 5. STREAMING PLATFORMS

### Platforms

- Spotify embed
- Apple Music embed

### Goal

Increase legitimacy and verification strength.

---

## 6. SOCIALS

### Platforms

- Instagram
- TikTok
- YouTube
- Facebook

### Visual Direction

- Glass cards
- Neon hover animations
- Chrome icons

---

## 7. FOOTER

### Content

- EL CODE logo
- Costa Rica
- Copyright
- Social links
- Motto

### Example

EL CODE © 2026
San José, Costa Rica
"Programados para sentir."

---

# Development Environment Setup

# STEP 1 — Install Node.js

Download Node.js LTS:

https://nodejs.org

Recommended version:

- Node.js 22+

Verify installation:

```bash
node -v
npm -v
```

---

# STEP 2 — Install Angular CLI

```bash
npm install -g @angular/cli
```

Verify:

```bash
ng version
```

---

# STEP 3 — Create Angular Project

```bash
ng new el-code-web
```

Select:

```bash
✔ CSS Preprocessor → SCSS
✔ Angular Routing → Yes
```

---

# STEP 4 — Open Project

```bash
cd el-code-web
```

---

# STEP 5 — Install Tailwind CSS

Install dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
```

Initialize:

```bash
npx tailwindcss init
```

---

# STEP 6 — Configure Tailwind

## tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        neon: '#00FF9C',
        darkbg: '#0B0B0B'
      }
    },
  },
  plugins: [],
}
```

---

# STEP 7 — Configure styles.scss

## src/styles.scss

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background: #000;
  color: white;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.neon-glow {
  box-shadow: 0 0 20px rgba(0,255,156,0.5);
}
```

---

# STEP 8 — Install Fonts

## Recommended Fonts

- Orbitron
- Space Grotesk
- Inter

Add to index.html:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Orbitron:wght@400;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
```

---

# STEP 9 — Install GSAP

```bash
npm install gsap
```

---

# Initial Folder Structure

```bash
src/
 ├── app/
 │   ├── core/
 │   ├── shared/
 │   ├── sections/
 │   │    ├── hero/
 │   │    ├── manifesto/
 │   │    ├── release/
 │   │    ├── gallery/
 │   │    ├── streaming/
 │   │    ├── socials/
 │   │    └── footer/
 │   ├── services/
 │   └── models/
```

---

# Hero Component Example

## Generate Component

```bash
ng generate component sections/hero
```

---

## hero.component.html

```html
<section class="relative h-screen flex items-center justify-center overflow-hidden bg-black">

  <div class="absolute inset-0 bg-gradient-to-b from-black via-[#0B0B0B] to-black opacity-90"></div>

  <div class="relative z-10 text-center px-6">

    <h1 class="text-6xl md:text-8xl font-bold tracking-widest text-white mb-6 font-[Orbitron]">
      EL CODE
    </h1>

    <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
      Sentimientos reales en un mundo artificial.
    </p>

    <div class="flex gap-4 justify-center flex-wrap">

      <button class="glass neon-glow px-8 py-4 rounded-full text-white hover:scale-105 transition duration-300">
        ESCUCHAR AHORA
      </button>

      <button class="border border-[#00FF9C] px-8 py-4 rounded-full hover:bg-[#00FF9C] hover:text-black transition duration-300">
        ÚLTIMO LANZAMIENTO
      </button>

    </div>

  </div>

</section>
```

---

# Responsive Strategy

## Mobile First

The website MUST prioritize:

- iPhone users
- TikTok traffic
- Instagram traffic
- Fast loading
- Fullscreen hero experience
- Vertical visual flow

---

# Future Features

## Phase 2 Ideas

### AI Visualizer

Music-reactive animations.

### Dynamic Releases

Admin dashboard for new songs.

### Visual AI Backgrounds

Interactive futuristic visuals.

### CMS Integration

- Firebase
- Supabase
- Sanity CMS

---

# Deployment

## Recommended Flow

```bash
GitHub → Vercel → elcodecr.com
```

---

# Important Branding Rule

EL CODE should NEVER feel:

- Generic
- Corporate
- Template-based
- Overcrowded

It should feel:

- Exclusive
- Emotional
- Futuristic
- Latin
- Artistic
- Cinematic

---

# Final Creative Direction

EL CODE is:

"The future of Costa Rican urban music."

A fusion between:

- emotion
- nostalgia
- AI aesthetics
- futuristic sound
- digital identity
- Latin urban culture

The website must transmit that feeling instantly.

