# Artixain - Multi-Platform Luxury Gemstone Studio & E-Commerce Ecosystem

## Overview
**Artixain** is an interactive custom jewelry studio and e-commerce web/mobile ecosystem. It empowers customers to craft bespoke natural crystal bracelets, browse curated celestial collections, and access comprehensive mineralogical encyclopedias with real-time wrist sizing calibration, multi-tier volume pricing, and automated physical atelier fulfillment.

---

## Architectural Highlights

- **Celestial Material You UI/UX**: Minimalist, harmonious, and effortless design system featuring 100% 50% boundary radius (`rounded-full`) pill buttons, expressive vector SVG iconography, Cormorant Garamond + Lexend typography, and spring physics micro-interactions.
- **6-Layer Procedural Mineral Canvas Engine**: Realistic rendering of natural mineral banding, pyrite flecks, chatoyancy, adularescent sheens, and cursor-responsive specular luster on HTML5 2D Canvas (Web) and Flutter 120 FPS `CustomPainter` (Mobile).
- **Single-Admin Atelier Workbench (`/admin`)**: Interactive physical assembly workbench rendering numbered bead sequences, exact millimeter diameters, cord cutting length with +4.5cm knot allowance, and 1-click printable work orders with barcodes.
- **5-Stage Order Fulfillment Pipeline**: `[1] Placed` -> `[2] Assembling` -> `[3] QC Passed & Certificate Minted` -> `[4] Shipped (Auto-email with Courier Tracking)` -> `[5] Delivered`.
- **Zero-Cost Infrastructure ($0.00/mo)**: Next.js 15 App Router + React 19 + Flutter 3 (Riverpod 2) + Supabase Auth + MongoDB Atlas (Mongoose ORM) + Resend Email API.

---

## Monorepo Structure

```
Artixain/
├── apps/
│   ├── web/           # Next.js 15 Web Storefront & /admin Atelier Workbench
│   └── mobile/        # Flutter 3 iOS/Android Mobile Application
├── packages/
│   └── shared/        # Shared Domain Math, 32 Gemstone Specs, & Serializers
└── docs/              # Master Specifications (SRS.md, ARCHITECTURE.md, BRD.md)
```

---

## Quickstart & Local Development

### 1. Web Storefront & Admin Portal (`apps/web`)
```bash
# Navigate to web application
cd apps/web

# Install dependencies
npm install

# Configure environment variables (.env.local)
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# MONGODB_URI=mongodb+srv://...
# RESEND_API_KEY=re_...
# ADMIN_EMAIL=admin@artixain.com

# Start development server
npm run dev
# Web Storefront: http://localhost:3000
# Admin Atelier:  http://localhost:3000/admin
```

### 2. Flutter Mobile Application (`apps/mobile`)
```bash
# Navigate to mobile application
cd apps/mobile

# Get Flutter packages
flutter pub get

# Run on connected device / emulator
flutter run
```

---

## Governance & Team Directives
- **Zero-Emoji Law**: Strictly enforced across all code, UI labels, terminal outputs, and documentation.
- **Clean Documentation**: Conforms to IEEE Std 830-1998; clean of academic/supervisor metadata.
- **Master Kanban Telemetry**: Tracked under CARD-177 in `Master Kanban.md`.
