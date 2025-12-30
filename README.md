# 🎅 Santa Terrace Navigator

> **A tactical gift-delivery system for the modern age.**

This application assists Santa's operations team in identifying flat concrete terraces in urban environments, generating optimal flight paths, and managing gift inventory in real-time. Built with a "Cyberpunk/Tactical" aesthetic, it turns gift delivery into a precision mission.

---

## 📸 Screenshots

| **LIDAR Scan Sector** | **Flight Path Locked** |
|:---:|:---:|
| <img src="./assets/flightPath.jpeg" width="300" /> | <img src="./assets/routeFixed.jpg" width="300" /> |
| *Identify targets via satellite* | *Optimized travel sequence* |

| **Gift Randomizer** | **Cargo Inventory** |
|:---:|:---:|
| <img src="./assets/spinWheel.jpeg" width="300" /> | <img src="./assets/giftInventory.jpeg" width="300" /> |
| *Physics-based decision engine* | *Real-time payload tracking* |

---

## ✨ Features

*   **📡 Sector Scanning**: Utilizes the Overpass API to query OpenStreetMap data, filtering for buildings with >3 levels and flat roofs suitable for sleigh landing.
*   **🎯 Tactical Routing**: Implements a nearest-neighbor algorithm to create an efficient delivery path between identified houses.
*   **🎒 Inventory System**: Manage the sleigh's cargo (add/remove items).
*   **🎡 Spin Wheel**: A specialized UI for random gift selection when the "Naughty/Nice" status is ambiguous.
*   **📱 3D Responsive Design**: A premium landing page experience featuring 3D-slanted mobile mockups and glassmorphism UI.
*   **🧭 Navigation Tools**: Live compass, weather integration, and location search.

## 🛠️ Tech Stack

*   **Frontend**: Vanilla JavaScript (ES Modules).
*   **Styling**: CSS3 (Variables, Grid, Flexbox, 3D Transforms).
*   **Build Tool**: Vite.
*   **Mapping Engine**: Leaflet.js with CartoCDN Dark Mode tiles.
*   **APIs**:
    *   **Overpass API**: Building data.
    *   **Nominatim**: Geocoding/Search.
    *   **Open-Meteo**: Weather data.

## ⚙️ Setup Instructions

To run this project locally on your machine:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/mithul-mj/santa-app.git
    cd santa-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## 🚀 Live Demo

[View the Project](https://santa-app.vercel.app) *(Replace with your actual Vercel link)*

---
*Created by Mithul MJ*
