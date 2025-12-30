import L from 'leaflet';
import './style.css';

// Initialize map centered on Bengaluru
const map = L.map('map', {
  zoomControl: false,
  attributionControl: false
}).setView([12.9716, 77.5946], 16);

L.control.zoom({ position: 'bottomright' }).addTo(map);

// Dark Matter Tile Layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &copy; CARTO',
  subdomains: 'abcd',
  maxZoom: 20
}).addTo(map);

/* --- DOM Elements --- */
const scanBtn = document.getElementById('scan-btn');
const statusMsg = document.getElementById('status-msg');
const searchToggle = document.getElementById('search-toggle');
const searchModal = document.getElementById('search-modal');
const searchInput = document.getElementById('search-input');
const searchExecuteBtn = document.getElementById('search-execute-btn');
const weatherWidget = document.getElementById('temp-value');
const landingPage = document.getElementById('landing-page');
const enterAppBtn = document.getElementById('enter-app-btn');
const appContainer = document.getElementById('app');
const routeSidebar = document.getElementById('route-sidebar');
const routeList = document.getElementById('route-list');
const closeSidebarBtn = document.getElementById('close-sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const locateBtn = document.getElementById('locate-btn');
const compassContainer = document.querySelector('.compass-container');

// Inventory & Wheel Elements
const inventoryToggle = document.getElementById('inventory-toggle');
const inventoryModal = document.getElementById('inventory-modal');
const inventoryListEl = document.getElementById('inventory-list');
const closeInventoryBtn = document.getElementById('close-inventory');
const addItemBtn = document.getElementById('add-item-btn');
const newItemName = document.getElementById('new-item-name');
const newItemCount = document.getElementById('new-item-count');

const wheelModal = document.getElementById('wheel-modal');
const wheelEl = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const spinResult = document.getElementById('spin-result');

/* --- State --- */
let candidateFeatures = [];
let activeRoute = [];
let isRouteActive = false;
const SCAN_RADIUS = 300;
let currentLayerGroup = L.layerGroup().addTo(map);

// Inventory State (Array of Objects)
let inventory = [
  { name: "🎁 Lego Set", count: 5 },
  { name: "🛴 Scooter", count: 2 },
  { name: "🎮 Console", count: 3 },
  { name: "🧸 Teddy Bear", count: 10 },
  { name: "⌚ Smart Watch", count: 4 }
];

let pendingDeliveryIndex = null; // Track which house we are spinning for

/* --- Initialization --- */
enterAppBtn.addEventListener('click', () => {
  landingPage.classList.add('fade-out');
  appContainer.classList.remove('hidden-app');
  setTimeout(() => {
    map.invalidateSize();
    updateWeather();
  }, 100);

  // Request Compass Permission (iOS 13+)
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') showStatus("Compass Calibrated.");
        else showStatus("Compass Permission Denied.", true);
      })
      .catch(console.error);
  }
});

/* --- Inventory & Wheel Logic --- */

// Toggle Inventory Modal
inventoryToggle.addEventListener('click', () => {
  renderInventory();
  inventoryModal.classList.remove('hidden-modal');
});
closeInventoryBtn.addEventListener('click', () => inventoryModal.classList.add('hidden-modal'));

// Add Item
addItemBtn.addEventListener('click', () => {
  const name = newItemName.value.trim();
  const count = parseInt(newItemCount.value);
  if (name && count > 0) {
    // Check if exists
    const existing = inventory.find(i => i.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      existing.count += count;
    } else {
      inventory.push({ name, count });
    }
    renderInventory();
    newItemName.value = '';
    newItemCount.value = 1;
    showStatus(`Added ${count} x ${name} to Sleigh!`);
  }
});

// Render Inventory List
function renderInventory() {
  inventoryListEl.innerHTML = '';
  if (inventory.length === 0) {
    inventoryListEl.innerHTML = '<div style="text-align:center; color:#666;">Inventory Empty! Add gifts.</div>';
    return;
  }
  inventory.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'inv-item';
    div.innerHTML = `
      <span>${item.name}</span>
      <div>
        <span class="inv-count">x${item.count}</span>
        <span class="inv-remove" onclick="window.removeInvItem(${idx})">×</span>
      </div>
    `;
    inventoryListEl.appendChild(div);
  });
}

window.removeInvItem = function (idx) {
  inventory.splice(idx, 1);
  renderInventory();
};

/* --- Wheel Logic --- */
function openSpinWheel(houseIndex) {
  if (inventory.length === 0) {
    showStatus("Inventory Empty! Add Gifts First.", true);
    renderInventory();
    inventoryModal.classList.remove('hidden-modal');
    return;
  }

  pendingDeliveryIndex = houseIndex;
  spinResult.textContent = '';
  spinBtn.disabled = false;
  spinBtn.textContent = "SPIN THE WHEEL!";

  renderWheelSegments();
  wheelModal.classList.remove('hidden-modal');
}

function renderWheelSegments() {
  const items = inventory.filter(i => i.count > 0);
  if (items.length === 0) return;

  const step = 100 / items.length;
  let gradientStr = 'conic-gradient(';
  const colors = ['#FF3366', '#76E0F8', '#0084B0', '#FFB800', '#9C27B0', '#4CAF50'];

  items.forEach((item, i) => {
    const color = colors[i % colors.length];
    const start = i * step;
    const end = (i + 1) * step;
    gradientStr += `${color} ${start}% ${end}%,`;
  });

  gradientStr = gradientStr.slice(0, -1) + ')';
  wheelEl.style.background = gradientStr;
  wheelEl.style.transform = 'rotate(0deg)';
}

spinBtn.addEventListener('click', () => {
  const items = inventory.filter(i => i.count > 0);
  if (items.length === 0) { spinResult.textContent = "Out of Gifts!"; return; }

  spinBtn.disabled = true;
  spinBtn.textContent = "SPINNING...";

  const winningIdx = Math.floor(Math.random() * items.length);
  const segmentAngle = 360 / items.length;
  const stopAngle = 360 * 5 + (360 - (winningIdx * segmentAngle + segmentAngle / 2));

  wheelEl.style.transition = 'transform 3s cubic-bezier(0.1, 0, 0.2, 1)';
  wheelEl.style.transform = `rotate(${stopAngle}deg)`;

  setTimeout(() => {
    const winner = items[winningIdx];
    winner.count--;
    if (winner.count <= 0) {
      const realIdx = inventory.indexOf(winner);
      if (realIdx > -1) inventory.splice(realIdx, 1);
    }

    spinResult.textContent = `Won: ${winner.name}!`;
    showStatus(`Selected: ${winner.name}`);

    setTimeout(() => {
      wheelModal.classList.add('hidden-modal');
      finalizeDelivery(pendingDeliveryIndex, winner.name);
    }, 1500);

  }, 3000);
});

function finalizeDelivery(index, giftName) {
  if (index === null) return;
  activeRoute[index].delivered = true;
  activeRoute[index].gift = giftName;

  showStatus(`DELIVERED: ${giftName} to House #${index + 1}!`);
  renderRoute();
  updateSidebar();
  updateDistanceStatus();
}

/* --- Sidebar Toggle Logic --- */
if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    routeSidebar.classList.remove('hidden-sidebar');
  });
}
closeSidebarBtn.addEventListener('click', () => routeSidebar.classList.add('hidden-sidebar'));

/* --- Compass Logic (Instant) --- */
if (window.DeviceOrientationEvent) {
  const eventName = 'ondeviceorientationabsolute' in window ? 'deviceorientationabsolute' : 'deviceorientation';
  window.addEventListener(eventName, (event) => {
    let rotation = 0;
    if (event.webkitCompassHeading) rotation = -event.webkitCompassHeading;
    else if (event.alpha !== null) rotation = event.alpha;
    if (compassContainer) compassContainer.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  });
}

/* --- Locate Me Logic --- */
if (locateBtn) {
  locateBtn.addEventListener('click', () => {
    showStatus("Acquiring Satellite Fix...");
    // Increased Timeout to 60s
    map.locate({
      setView: true,
      maxZoom: 18,
      watch: true,
      enableHighAccuracy: true,
      timeout: 60000
    });
  });
}

map.on('locationfound', (e) => {
  const radius = e.accuracy;
  L.circle(e.latlng, radius, { color: '#0084B0', fillOpacity: 0.1, weight: 1 }).addTo(currentLayerGroup);
  L.circleMarker(e.latlng, { radius: 6, color: 'white', fillColor: '#0084B0', fillOpacity: 1 }).addTo(currentLayerGroup);
  showStatus(`Position Corrected. Acc: ${radius.toFixed(0)}m`);
  updateWeather();
});
map.on('locationerror', (e) => showStatus(`GPS Error: ${e.message}`, true));

async function updateWeather() {
  try {
    const center = map.getCenter();
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${center.lat}&longitude=${center.lng}&current_weather=true`);
    const data = await res.json();
    if (data.current_weather) weatherWidget.textContent = `${data.current_weather.temperature}°C`;
  } catch (e) { weatherWidget.textContent = "--°C"; }
}
let moveTimeout;
map.on('moveend', () => { clearTimeout(moveTimeout); moveTimeout = setTimeout(updateWeather, 2000); });

/* --- Search Logic --- */
searchToggle.addEventListener('click', (e) => { e.stopPropagation(); searchModal.classList.toggle('hidden-modal'); if (!searchModal.classList.contains('hidden-modal')) searchInput.focus(); });
document.addEventListener('click', (e) => { if (!searchModal.classList.contains('hidden-modal') && !searchModal.contains(e.target) && e.target !== searchToggle) searchModal.classList.add('hidden-modal'); });
searchExecuteBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSearch(); });

async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;
  searchExecuteBtn.textContent = '...';
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
    const results = await res.json();
    if (results.length > 0) {
      const { lat, lon } = results[0];
      map.setView([lat, lon], 16);
      showStatus(`Moved to: ${results[0].display_name.split(',')[0]}`);
      searchInput.value = '';
      searchModal.classList.add('hidden-modal');
    } else { showStatus('Location not found.', true); }
  } catch (err) { showStatus('Search Error.', true); } finally { searchExecuteBtn.textContent = 'GO'; }
}

/* --- Scan Logic --- */
scanBtn.addEventListener('click', async () => {
  setLoading(true);
  try {
    const center = map.getCenter();
    const buildings = await fetchBuildings(center, SCAN_RADIUS);
    renderBuildings(buildings);
    if (buildings.features.length === 0) showStatus('No targets found in sector.', true);
    else showStatus(`Scan complete. ${buildings.features.length} targets identified.`);
  } catch (err) { setLoading(false); showStatus(err.message, true); }
  finally { setLoading(false); }
});

function setLoading(isLoading) {
  if (isLoading) { scanBtn.classList.add('scanning'); scanBtn.innerHTML = 'SCANNING...'; scanBtn.disabled = true; }
  else { scanBtn.classList.remove('scanning'); scanBtn.innerHTML = '<span class="icon">📡</span> SCAN SECTOR'; scanBtn.disabled = false; }
}

function showStatus(msg, isError = false) {
  statusMsg.textContent = msg; statusMsg.classList.remove('hidden', 'error');
  if (isError) statusMsg.classList.add('error');
  if (statusMsg.timeout) clearTimeout(statusMsg.timeout);
  statusMsg.timeout = setTimeout(() => { statusMsg.classList.add('hidden'); }, 4000);
}

/* --- Utilities & Routing --- */
async function fetchBuildings(center, radius) {
  const query = `[out:json][timeout:25];(way["building"](around:${radius},${center.lat},${center.lng});relation["building"](around:${radius},${center.lat},${center.lng}););out geom;`;
  const res = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: query });
  if (!res.ok) throw new Error('Scan failed. Try zooming in.');
  return osmtogeojson(await res.json());
}
function osmtogeojson(data) {
  const features = [];
  for (const el of data.elements) {
    if (el.type === 'way' && el.geometry) {
      const coords = el.geometry.map(p => [p.lon, p.lat]);
      features.push({ type: 'Feature', properties: el.tags || {}, geometry: { type: 'Polygon', coordinates: [coords] } });
    }
  }
  return { type: 'FeatureCollection', features };
}

function renderBuildings(geoJson) {
  currentLayerGroup.clearLayers();
  candidateFeatures = []; activeRoute = []; isRouteActive = false;
  routeSidebar.classList.add('hidden-sidebar');

  const validFeatures = geoJson.features;
  candidateFeatures = validFeatures.map((f, i) => {
    const coords = f.geometry.coordinates[0];
    const lat = coords.reduce((sum, p) => sum + p[1], 0) / coords.length;
    const lng = coords.reduce((sum, p) => sum + p[0], 0) / coords.length;
    return { id: i, feature: f, centroid: L.latLng(lat, lng), visited: false };
  });

  candidateFeatures.forEach(c => {
    L.geoJSON(c.feature, {
      style: { color: '#0084B0', weight: 1, dashArray: '4,4', fillOpacity: 0.1, fillColor: '#0084B0' },
      onEachFeature: (f, l) => { l.on('click', () => handleCandidateClick(c)); l.bindTooltip("Start Route Here", { direction: 'top' }); }
    }).addTo(currentLayerGroup);
  });
}

function handleCandidateClick(startNode) {
  if (isRouteActive) return;
  isRouteActive = true;
  routeSidebar.classList.remove('hidden-sidebar');

  const route = [startNode]; startNode.visited = true;
  candidateFeatures.forEach(c => c._algoVisited = (c === startNode));
  while (route.length < candidateFeatures.length) {
    let current = route[route.length - 1]; let nextNode = null; let minDist = Infinity;
    candidateFeatures.forEach(node => { if (!node._algoVisited) { const d = current.centroid.distanceTo(node.centroid); if (d < minDist) { minDist = d; nextNode = node; } } });
    if (nextNode) { nextNode._algoVisited = true; route.push(nextNode); } else break;
  }
  activeRoute = route.map(n => ({ ...n, delivered: false }));
  renderRoute(); updateSidebar(); updateDistanceStatus();
}

function renderRoute() {
  currentLayerGroup.clearLayers();
  if (activeRoute.length > 1) {
    const latLngs = activeRoute.map(n => n.centroid);
    L.polyline(latLngs, { color: '#76E0F8', weight: 3, className: 'animated-route-line', opacity: 0.8 }).addTo(currentLayerGroup);
  }
  activeRoute.forEach((node, idx) => {
    const isNext = !node.delivered && isNextTarget(idx);
    let color = '#0084B0'; if (node.delivered) color = '#555'; if (isNext) color = '#76E0F8';

    L.geoJSON(node.feature, {
      style: { color: color, weight: isNext ? 3 : 1, fillColor: color, fillOpacity: node.delivered ? 0.2 : 0.4 },
      onEachFeature: (f, l) => l.on('click', () => toggleDelivery(idx))
    }).addTo(currentLayerGroup);

    const iconHtml = node.delivered ? '✓' : (idx + 1);
    const icon = L.divIcon({
      className: 'custom-map-icon',
      html: `<div style="background: ${color}; color: ${node.delivered ? '#ccc' : '#000'}; border: 2px solid ${isNext ? '#fff' : 'rgba(255,255,255,0.5)'}; width: 24px; height: 24px; border-radius: 50%; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px; box-shadow: 0 0 ${isNext ? '20px' : '10px'} ${color}; transform: ${isNext ? 'scale(1.2)' : 'scale(1)'}; transition: all 0.3s;">${iconHtml}</div>`
    });
    L.marker(node.centroid, { icon }).addTo(currentLayerGroup);
  });
}

function isNextTarget(idx) { return idx === activeRoute.findIndex(n => !n.delivered); }

window.toggleDelivery = function (index) {
  if (index > 0 && !activeRoute[index - 1].delivered) {
    showStatus(`SEQ ERROR: Deliver to House #${index} first!`, true);
    return;
  }
  if (activeRoute[index].delivered) {
    if (index < activeRoute.length - 1 && activeRoute[index + 1].delivered) {
      showStatus(`SEQ ERROR: Cannot undo while route in progress.`, true);
      return;
    }
    activeRoute[index].delivered = false;
    activeRoute[index].gift = null;
    showStatus(`Delivery Undone for House #${index + 1}.`);
    renderRoute();
    updateSidebar();
    updateDistanceStatus();
  } else {
    openSpinWheel(index);
  }
};

function updateDistanceStatus() {
  const nextIdx = activeRoute.findIndex(n => !n.delivered);
  if (nextIdx === -1) { showStatus("MISSION COMPLETE. all packages delivered."); if (compassContainer) compassContainer.style.transform = `translate(-50%, -50%) rotate(0deg)`; return; }
  const target = activeRoute[nextIdx];
  let fromLoc = (nextIdx === 0) ? map.getCenter() : activeRoute[nextIdx - 1].centroid;
  const dist = fromLoc.distanceTo(target.centroid).toFixed(0);
  showStatus(`NEXT: House #${nextIdx + 1} — RANGE: ${dist}m`);
}

function updateSidebar() {
  routeList.innerHTML = '';
  activeRoute.forEach((node, i) => {
    const isNext = isNextTarget(i);
    const item = document.createElement('div');
    item.className = `route-item ${node.delivered ? 'visited' : ''} ${isNext ? 'active-target' : ''}`;
    item.onclick = () => { map.flyTo(node.centroid, 18); };
    const levels = node.feature.properties['building:levels'] || '?';
    const btnText = node.delivered ? 'UNDO' : 'GIVE GIFT';
    const btnClass = node.delivered ? 'undo' : 'done';
    let giftHtml = '';
    if (node.delivered && node.gift) giftHtml = `<div style="color: var(--accent-cyan); font-size: 0.8rem; margin-top:2px;">Sent: ${node.gift}</div>`;
    item.innerHTML = `
      <div class="route-number">${node.delivered ? '✓' : i + 1}</div>
      <div class="route-info"><h4>House #${i + 1}</h4><p>Levels: ${levels}</p>${giftHtml}</div>
      <button class="visit-btn ${btnClass}" onclick="event.stopPropagation(); window.toggleDelivery(${i})">${btnText}</button>
    `;
    routeList.appendChild(item);
  });
}

// Robust Compass Rotation
const handleOrientation = (event) => {
  let heading = 0;

  // 1. Base Heading (CW from North)
  if (event.webkitCompassHeading) {
    heading = event.webkitCompassHeading;
  } else if (event.alpha !== null) {
    // Android: Use alpha directly (Inverting logic based on user feedback)
    heading = event.alpha;
  }

  // 2. Compensate for Screen Orientation
  // If holding landscape, "Top" of phone is rotated.
  if (screen.orientation && screen.orientation.angle) {
    heading += screen.orientation.angle;
  } else if (typeof window.orientation !== "undefined") {
    heading += window.orientation;
  }

  // 3. Rotate Compass Ring (Opposite to Heading)
  // Example: Heading 90 (East) -> Rotate -90 (Left) -> N points North.
  if (compassContainer) {
    compassContainer.style.transform = `translate(-50%, -50%) rotate(${-heading}deg)`;
  }
};

// Listen for absolute orientation (Android) or standard (iOS fallback)
if ('ondeviceorientationabsolute' in window) {
  window.addEventListener('deviceorientationabsolute', handleOrientation, true);
} else if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', handleOrientation, true);
}
