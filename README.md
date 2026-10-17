# Amar Food Map • আমার ফুড ম্যাপ
> Explore authentic culinary heritage across all 64 districts of Bangladesh and track which foods you have tried.

![Amar Food Map Banner](https://images.unsplash.com/photo-1545247181-516773ca83e3?w=1200&auto=format&fit=crop&q=80)

---

## 🇧🇩 Overview
**Amar Food Map (আমার ফুড ম্যাপ)** is a modern, responsive, mobile-first web application designed to document, celebrate, and track regional culinary treasures across every single one of the **64 districts of Bangladesh**.

From the legendary GI-tagged **Bogurar Doi** and **Natore's Kachagolla**, to Chittagong's rich **Mezbani Gosht** and **Kala Bhuna**, Sylhet's wild **Satkora Beef**, Bhola's earthen pot **Buffalo Curd**, and Netrokona's giant **Balish Mishti**, this interactive map lets users explore local dishes with verified historical sources and mark foods they have tasted.

---

## ✨ Features

1. **Interactive 64-District Map of Bangladesh**:
   - Built with accurate, legally usable administrative boundaries derived from William & Mary GeoLab (`geoBoundaries` open data under CC-BY 4.0) and Bangladesh Bureau of Statistics (BBS).
   - Instant vector rendering with sub-pixel SVG path projection (`0 0 800 1000` canvas).
   - Dynamic coloration based on checklist progress:
     - 🟢 **Completed (সব খাবার চেখেছেন)**: Deep forest green with bright lime border.
     - 🟡 **In Progress (চলমান)**: Warm vibrant lime-amber fill.
     - ⚪ **Unexplored (অনাঘ্রাত)**: Warm parchment sand with subtle slate outlines.
   - Interactive zoom in/out, pan reset, district hover tooltips, and label toggling.

2. **Verified Culinary Dataset**:
   - Fully separate structured datasets (`src/data/districts.ts` and `src/data/foods.ts`).
   - Every food item documents:
     - Bengali and English names
     - Category (Sweet, Curry, Rice, Fish, Bakery, Fruit, Beverage, Snack)
     - Short authentic description and historical roots
     - Verification status: `GI Certified`, `Heritage Verified`, `Locally Verified`, or `Food data coming soon`
     - Exact source citations (e.g. Geographical Indication Registry of Bangladesh, BARI, District Administrations).

3. **Checklist & Milestone Tracking**:
   - Interactive "I've tried this! / খেয়েছি" toggle on every food card.
   - Celebratory confetti effects when checking items and completing whole districts.
   - Reversible (uncheck anytime).

4. **Progress Dashboard**:
   - Total foods tried / Total available foods.
   - Unique districts explored (at least 1 food tried) / 64 districts.
   - Districts fully conquered (100% of foods in that district tried) / 64 districts.
   - Dynamic progress bar and explorer rank titles:
     - 🥉 *নবীন রসনাবিলাসী (Foodie Novice)*
     - 🥈 *দেশভ্রমণ রসিক (District Explorer)*
     - 🥇 *স্বাদসন্ধানী পরিব্রাজক (Heritage Gastronome)*
     - 🏆 *বাংলার খাঁটি ভোজনরসিক (Master Taste Explorer)*
     - 👑 *স্বাদসম্রাট (Bengal Connoisseur)*
     - 🌟 *মহাভোজন মহারাজ (Grand Legend of Bengal)*

5. **Search & Multi-Level Filtering**:
   - Real-time search across English names, Bengali names, divisions, historical aliases (e.g., `Bogra`, `Chittagong`, `Comilla`), and food items.
   - Division pills: *All, Dhaka, Chattogram, Rajshahi, Khulna, Barishal, Sylhet, Rangpur, Mymensingh*.
   - Status filters: *All (64), Explored, In Progress, Unexplored*.

6. **Reliable Persistence & Corruption Safeguards**:
   - Persisted via `localStorage` with JSON schema versioning and validation.
   - Stale, malicious, or non-existent IDs are filtered out automatically.
   - Multi-tab synchronization using custom storage events.
   - **Reset Progress** with double-confirmation modal.
   - **Data Backup & Restore**: Export and import your progress via JSON.
   - Clean abstraction layer ready for Supabase backend sync.

7. **Design & UX**:
   - Palette: Warm off-white background (`#FAF8F5`), deep heritage forest green (`#0C382E`), and subtle fresh lime accents (`#84CC16`).
   - Mobile-first responsive layout with seamless Map/List tab switcher on mobile.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations / Celebrations**: Canvas Confetti
- **Geographic Projection**: D3-Geo (calibrated Mercator projection)
- **State & Storage**: Client-side localStorage service with schema sanitization

---

## 🚀 Setup and Run Instructions

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+ (tested on Node v24)
- **npm** or **pnpm**

### 2. Installation
Clone the repository or navigate to the project directory:
```bash
npm install
```

### 3. Run Development Server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 4. Run Automated Test Suite
To verify district boundaries, foods dataset integrity, state transitions, storage corruption recovery, and bilingual search:
```bash
node scripts/testApp.js
```

### 5. Production Build
To create an optimized production build:
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── public/
│   └── data/
│       └── bangladesh-districts.geojson   # Raw official GeoJSON for all 64 districts
├── scripts/
│   ├── buildMapData.js                    # GeoJSON processor & SVG path generator
│   └── testApp.js                         # Automated verification test suite
├── src/
│   ├── app/
│   │   ├── globals.css                    # Tailwind CSS variables & custom themes
│   │   ├── layout.tsx                     # Metadata, viewport, and font configuration
│   │   └── page.tsx                       # Main application page
│   ├── components/
│   │   ├── DashboardStats.tsx             # Stats summary cards & progress bar
│   │   ├── DistrictFoodPanel.tsx          # Selected district details & food cards
│   │   ├── DistrictList.tsx               # 64-district directory & filter grid
│   │   ├── FoodCard.tsx                   # Individual food card with interactive checklist
│   │   ├── Footer.tsx                     # Heritage attribution & open data citation
│   │   ├── Header.tsx                     # Sticky branded header & quick actions
│   │   ├── Hero.tsx                       # Homepage hero with quick search
│   │   ├── InteractiveMap.tsx             # Interactive 64-district SVG map
│   │   ├── ResetConfirmModal.tsx          # Safety confirmation dialog for reset
│   │   └── ShareModal.tsx                 # Milestone sharing & JSON backup/restore
│   ├── data/
│   │   ├── districts.ts                   # 64-district structured metadata
│   │   ├── foods.ts                       # Curated authentic traditional foods dataset
│   │   └── mapPaths.json                  # Projected 64-district SVG boundaries
│   ├── lib/
│   │   ├── confetti.ts                    # Celebration confetti trigger
│   │   ├── stats.ts                       # District and overall calculation algorithms
│   │   └── storage.ts                     # LocalStorage persistence & sanitization
│   └── types/
│       └── index.ts                       # TypeScript interfaces and types
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📝 Editing or Contributing Food Data
All culinary data is kept strictly decoupled from UI code in:
- [`src/data/foods.ts`](src/data/foods.ts)

To add or update dishes:
1. Ensure the item is an authentic, documented regional specialty of that district.
2. Provide the `districtId` matching the canonical district ID in [`src/data/districts.ts`](src/data/districts.ts).
3. Set the appropriate `verificationStatus` (`gi-certified`, `heritage-verified`, `locally-verified`, or `coming-soon`).
4. Include a valid source citation in `source`. Never invent or fabricate official claims.

---

## 📄 License
This project is open-source under the MIT License. Geographic boundary datasets are licensed under CC-BY 4.0 (William & Mary GeoLab / BBS).
