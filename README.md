<h1 align="center">
  <br>
  <img src="public/window.svg" alt="SpareHub" width="48" height="48">
  <br>
  SpareHub
  <br>
</h1>

<h4 align="center">A production-quality car spare parts platform for the Egyptian market.</h4>

<p align="center">
  <a href="#about-the-project">About the Project</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#tech-stack">Tech Stack</a>
</p>

## About the Project

**SpareHub** is an e-commerce prototype tailored specifically for automotive spare part suppliers in the Egyptian market. It features a complete shopping experience spanning from advanced search and vehicle-specific filtering to cart management and an authenticated checkout flow. 

Whether you need genuine OEM Toyota parts or imported performance components, SpareHub offers a seamless and responsive shopping experience styled with a modern, high-contrast dark theme.

## Key Features

- **Vehicle-Specific Filtering**: A 3-tier cascaded search (Brand → Model → Year) combined with sidebar facets to pinpoint exact parts.
- **Categorized Inventory**: Dynamic categorizations including Engine, Brakes, Lighting, Electrical, Cooling, and Suspension components.
- **Dynamic Cart State**: Fully functional cart management system using Context API with `localStorage` persistence.
- **Protected Routing**: Role-based modal gating that ensures users are authenticated before accessing the checkout flow.
- **Modern UI/UX**: Custom-designed dark mode with orange accents, glassmorphic headers, smooth CSS transitions, and pulse-loading skeletons.
- **Localized Experience**: Fully supports EGP (Egyptian Pound) pricing formats and Egyptian city-targeting within the checkout form.

## Tech Stack

SpareHub is built entirely with modern web technologies:

* **[Next.js 16 (App Router)](https://nextjs.org/)** — React framework for the frontend and API routes.
* **[Tailwind CSS v4](https://tailwindcss.com/)** — Completely utility-first styling with inline theme CSS.
* **[React Context API](https://reactjs.org/docs/context.html)** — Seamless, lightweight state management.
* **[TypeScript](https://www.typescriptlang.org/)** — 100% strictly typed codebase.

## Getting Started

To get a local development copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js installed (v18.17.0 or newer).

### Installation

1. Clone this repository directly to your machine:
   ```bash
   git clone https://github.com/marwan20051/SpareHub.git
   ```
2. Navigate into the project folder:
   ```bash
   cd SpareHub
   ```
3. Install the dependencies using npm:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Future Roadmap

- [ ] Integrate a real database (e.g., PostgreSQL or MongoDB)
- [ ] Connect a live payment gateway (Paymob / Stripe)
- [ ] Integrate JWT-based Authentication
- [ ] Admin dashboard for supplier inventory management

## License

Created for demonstration and portfolio purposes. All external resources and branding properties belong to their respective owners.
