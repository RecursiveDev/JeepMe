# JeepMe 🚐

**JeepMe** is a modern, responsive web application designed to help commuters find the best jeepney routes across Metro Cebu, Philippines. By simply pinning an origin and destination on the map, users can instantly discover the right jeepney code, estimate their fare, and see the route drawn on the map.

## ✨ Features

- **Interactive Route Finder:** Drop pins for origin and destination to find matching jeepney routes using Haversine-based proximity matching.
- **Fare Estimation:** Calculates base fare and per-kilometer add-ons (following LTFRB minimum fare guidelines).
- **Street Snapping:** Integrates with OSRM (Open Source Routing Machine) to snap jeepney routes to actual streets for realistic map paths.
- **Geocoding & Search:** Search for landmarks or reverse-geocode map clicks using Nominatim (OpenStreetMap).
- **Comprehensive Route Data:** Includes a detailed library of over 55 Metro Cebu jeepney routes (e.g., 13C, 01K, 04L) with exact stop coordinates.
- **"All Routes" Guide:** A dedicated page to explore the full Metro Cebu transport network and available jeepney lines.
- **Modern UI/UX:** Built with a glassmorphic dark theme, smooth GSAP micro-animations, and a mobile-first bottom-sheet design.

## 🛠️ Technology Stack

- **Framework:** Next.js 16.1 (App Router)
- **UI & Styling:** React 19.2, Tailwind CSS 4, daisyUI 5.5
- **Maps:** Leaflet & React-Leaflet
- **Animations:** GSAP 3.14 & @gsap/react
- **Language:** TypeScript

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## 📁 Project Structure

- `src/app/`: Next.js pages, layouts, and global styles (`page.tsx` is the interactive map, `routes/page.tsx` is the route catalog).
- `src/components/`: UI components like the `SearchCard`, `BottomSheet` for route results, and `MapView`/`MapWrapper` for the Leaflet integration.
- `src/lib/`: Core business logic:
  - `route-service.ts`: Matching engine to find the best routes based on distance and direction.
  - `geo-utils.ts`: Distance calculation (Haversine), polyline segments, and bounds handling.
  - `geocoding-service.ts`: Nominatim-powered place search.
  - `osrm-service.ts`: Route street snapping with parallel staggering.
  - `routes-data.ts`: The static database of coordinates and jeepney routes.

## 📝 Disclaimer

*Route data is approximate and based on commonly known jeepney paths. Actual routes may vary depending on traffic rerouting or driver decisions. Fare information is calculated based on standard distance formulas and may not perfectly reflect actual collections.*
