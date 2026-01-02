# 🎅 Santa Terrace Navigator

> **Mission Control for High-Altitude Gift Delivery Operations.**

![Banner](./assets/flightPath.jpeg)

**Warning:** This application is calibrated for **Tactical Sleigh Operations**. It utilizes real-time satellite LIDAR scanning, physics-based compass avionics, and high-contrast tactical displays.

---

### 🎁 Mission Brief

For centuries, the North Pole delivery infrastructure relied on "Visual Flight Rules" (VFR) and magic dust. In the modern era of high-rise urbanization, this antiquated approach resulted in missed terraces and inefficient routing.

**The Santa Terrace Navigator (STN)** is the digital transformation of Sleigh Ops. It provides a precision HUD (Heads-Up Display) that allows the pilot to:
1.  **Scan Sectors** for viable landing zones (flat concrete terraces).
2.  **Lock Routes** using advanced algorithm pathfinding.
3.  **Manage Payload** with a real-time digital inventory system.
4.  **Decide Tactics** via the "Spin the Wheel" gift allocation engine.

_"Modern problems require tactical solutions."_

---

### 🗺️ Operational Workflow

#### 1. 🛰️ LIDAR Sector Scan
**Intelligence Gathering.**
The STN links directly to the **Overpass API** satellite network. With a single click of the `SCAN SECTOR` button, the system:
*   Queries OpenStreetMap data within the compass visual range.
*   Filters targets for high-altitude viability (`building:levels > 3` and `roof:shape=flat`).
*   Auto-hides hazardous landing zones (tin/asbestos roofs).

#### 2. 🎯 Flight Path Optimization
**Route Lock.**
Once targets are identified, the onboard computer creates a **Dynamic Route**.
*   **Visuals**: Animated dashed lines indicate the optimal flight vector.
*   **HUD**: Connecting markers show the sequence of delivery (House #1 → House #2).
*   **Distance**: A real-time "Distance to Target" readout ensures precise approach timing.

#### 3. 🎒 Cargo & Inventory
**Payload Management.**
The Sleigh's cargo hold is digitized. 
*   **Add/Remove**: Quickly log new toys loaded from the workshop.
*   **Tracking**: Visual counters ensure you never run out of PS5s mid-flight.

#### 4. 🎡 The "Gift Spin" Engine
**Tactical Decision Making.**
When a child's "Naughty/Nice" value is ambiguous (NULL), the Navigator deploys the **Spin Wheel**.
*   **Physics-Based**: Uses a momentum-based friction simulation for true randomness.
*   **Inventory Linked**: The wheel only creates segments for items currently in the cargo hold.
*   **Auto-Decrement**: Creating a gift package automatically deducts it from the inventory.

---

### 🛠️ Tech Stack

This project leverages a lightweight, high-performance stack designed for low-latency operation in sub-zero environments.

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Core** | **Vanilla JS (ES6+)** | Zero-framework architecture for maximum speed. |
| **Engine** | **Vite** | Next-generation frontend tooling. |
| **Mapping** | **Leaflet.js** | Tactical map rendering engine. |
| **Tiles** | **CartoCDN Dark** | "Dark Matter" tiles for high-contrast night ops. |
| **Data** | **Overpass API** | Real-time OpenStreetMap querying. |
| **Styling** | **CSS3** | Glassmorphism, 3D Transforms, & CSS Variables. |

---

### 📸 Reconnaissance Imagery

| **LIDAR Scan Sector** | **Flight Path Locked** |
|:---:|:---:|
| <img src="./assets/flightPath.jpeg" width="300" /> | <img src="./assets/routeFixed.jpg" width="300" /> |
| *Identify targets via satellite* | *Optimized travel sequence* |

| **Gift Randomizer** | **Cargo Inventory** |
|:---:|:---:|
| <img src="./assets/spinWheel.jpeg" width="300" /> | <img src="./assets/giftInventory.jpeg" width="300" /> |
| *Physics-based decision engine* | *Real-time payload tracking* |

---

### 🚀 Deployment Instructions

Initialize the tactical environment on your local machine:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/mithul-mj/santa-app.git
    cd santa-app
    ```

2.  **Install Protocols (Dependencies)**
    ```bash
    npm install
    ```

3.  **Launch Mission Control (Dev Server)**
    ```bash
    npm run dev
    ```
    *Access the HUD at `http://localhost:5173`*

4.  **Compile for Field Use (Build)**
    ```bash
    npm run build
    ```

---

### ⚠️ Operational Notes

*   **Compass Calibration**: The compass overlay requires device orientation permissions on mobile devices. Ensure you allow sensor access for the full "Cockpit" experience.
*   **Scan Range**: The scanner is safety-limited to **Zoom Level 16+**. Attempting to scan a continent will result in a "Range too wide" override to protect the browser engine.

---

Hand-crafted with 🎄 by **Mithul MJ**, Lead Engineer, North Pole R&D.
