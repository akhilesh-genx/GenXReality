# GenXReality Website: Detailed Technical Analysis

This report provides a deep dive into the architecture, technology stack, and interactive components of the **GenXReality** website.

---

## 1. Core Technology Stack

The website is built using a modern, high-performance web stack optimized for smooth animations and 3D rendering.

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router) — Utilizing the latest features like Server Components and optimized routing.
*   **Library**: [React 19](https://react.dev/) — For building reactive UI components.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) — Ensuring type safety and better developer experience.
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) — Used for a custom, utility-first design system with a heavy focus on **Glassmorphism**.
*   **Animations**: 
    *   [GSAP (GreenSock)](https://gsap.com/) with **ScrollTrigger** — Powering complex scroll-driven sequences and entrance animations.
    *   [Lenis](https://lenis.darkroom.engineering/) — Providing high-performance smooth scrolling.
*   **3D & Graphics**:
    *   [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — For 3D panoramas and particle fields.
    *   [Vanta.js](https://www.vantajs.com/) — For dynamic, interactive background effects.
*   **Icons**: [Lucide React](https://lucide.dev/) — Consistent, scalable vector icons.
*   **Database**: [Supabase](https://supabase.com/) — For dynamic content like news and articles.

---

## 2. Architecture & Operations

### How it Runs
The project is a standard Next.js application.
*   **Development**: Runs on `next dev -p 4000 -H 0.0.0.0`. The port is set to **4000** to avoid conflicts.
*   **Deployment**: Optimized for platforms like Netlify or Vercel, using `next build` to generate a production-ready bundle.
*   **Routing**: Uses the `app/` directory structure.
    *   `/about`: Company mission and vision.
    *   `/services`: Detailed breakdown of XR solutions.
    *   `/news`: Dynamic news portal fetching from Supabase.
    *   `/product`: Showcase of the GenXEdu hardware.

---

## 3. Key Widgets & "Premium" Components

The website stands out through its use of specialized "widgets" that create a premium feel.

### A. Hero Frame Animation (`components/ui/HeroFrameAnimation.tsx`)
This is the "crown jewel" of the landing page. 
*   **What it is**: A high-performance `<canvas>` based animation.
*   **How it works**: It preloads a sequence of ~300 high-quality image frames. As the user scrolls, GSAP maps the scroll position to the frame index, creating a cinematic "Apple-style" product reveal.
*   **Features**: Includes a "rack focus" blur effect and mouse-parallax depth tracking.

### B. 3D Panorama Viewer (`components/ui/PanoramaViewer.tsx`)
*   **Purpose**: Used for the "3D Virtual Tours" service.
*   **Technology**: Uses Three.js to project an equirectangular image onto a sphere, allowing users to "look around" in a 360-degree environment.

### C. Animated Background System (`components/ui/AnimatedBackground.tsx`)
*   **Technology**: Integrates Vanta.js (Clouds/Net) and custom Three.js shaders.
*   **Impact**: Creates a sense of depth and interactivity as the background reacts to mouse movements.

### D. Global Particle & Sparkle Effects
*   **Components**: `ParticleField.tsx`, `GlobalSparkle.tsx`.
*   **Purpose**: Adds subtle "micro-interactions" that make the page feel alive and futuristic.

### E. Custom Interactive Cursor (`components/ui/CustomCursor.tsx`)
*   **Functionality**: Replaces the default browser cursor with a branded, magnetic cursor that reacts to interactive elements (buttons, links).

### F. LinkedIn Integration (`app/page.tsx`)
*   **Widget**: Uses the **Fouita** LinkedIn Carousel widget to pull live company updates directly into the landing page.

---

## 4. Design System: Glassmorphism

The website follows a strict design aesthetic:
*   **Glass Cards**: Components use `backdrop-blur-md` with semi-transparent backgrounds and subtle borders (`border-white/10`).
*   **Typography**: Uses custom Google Fonts (Outfit/Montserrat) with wide letter spacing for a "tech-first" look.
*   **Color Palette**: Deep blacks (`#000`), brand-primary greens/cyans, and high-contrast white text.
*   **Heading Gradients**: Text headings use a multi-stop linear gradient clipped to the text for a premium metallic/glow effect.

---

## 5. Directory Structure Analysis

*   `app/`: Contains the page routes and layout.
    *   `api/`: Backend endpoints for frame sequences and logo generation.
*   `components/`:
    *   `3d/`: Core Three.js logic.
    *   `layout/`: Navbar, Footer, and SmoothScroll wrappers.
    *   `ui/`: The individual widgets and building blocks.
*   `lib/`:
    *   `supabase.ts`: Database client and queries.
    *   `cms.ts`: Local data storage for static content.
*   `public/`: Stores heavy assets including images, videos, and the frame sequences used in the hero section.

---

## 6. Performance & SEO

*   **Next/Image**: All images use the Next.js optimization component to ensure fast load times.
*   **Dynamic Metadata**: Each page has specific title and meta tags for better search engine ranking.
*   **Smooth Scroll**: Lenis ensures that the heavy GSAP animations don't feel jittery on different devices.

---
*Report Prepared by Antigravity AI Assistant.*
