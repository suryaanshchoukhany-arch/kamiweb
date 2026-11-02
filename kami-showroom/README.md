# KAMI Interactive Luxury Showroom Prototype

This is a functional prototype of a premium, cinematic 3D showroom for the KAMI luxury home décor brand.

## Overview
- **React** with **React‑Three‑Fiber** (R3F) for 3‑D rendering.
- A realistic‑looking interior (walls, floor, ceiling) built from simple primitives.
- Sophisticated camera controls: fixed central start, limited orbit rotation, smooth easing, and a reset button.
- Clickable placeholder products that highlight on hover, move the camera toward the product on click, and display a sleek product‑info panel.
- All animations are smooth and cinematic using `react-spring/three`.

> The code is deliberately modular so you can replace the placeholder geometries, textures and models with real KAMI assets later.

## Project Structure
```
kami-showroom/
├─ public/
│   └─ index.html
├─ src/
│   ├─ main.jsx          # React entry point
│   ├─ App.jsx           # Root component – sets up Canvas and UI
│   ├─ Room.jsx          # 3‑D interior (walls, floor, ceiling)
│   ├─ Product.jsx       # Placeholder product mesh + interaction logic
│   ├─ CameraControls.jsx# Custom limited OrbitControls
│   ├─ ProductPanel.jsx  # Overlay panel showing product details
│   └─ index.css         # Minimal styling
├─ package.json
├─ vite.config.js
└─ .gitignore
``` 

## Getting Started
1. **Open a terminal** in the `kami-showroom` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 (or the URL shown in the console) in a desktop browser.

You should see a centered room with a few geometric objects representing products. Click‑drag to rotate the view, click a product to zoom in and view its details, and use the reset button (top‑right) to return to the original central view.

---
### Customising the Showroom
- **Add real textures** – replace the plain material colors in `Room.jsx` with texture maps (e.g., imported with `useTexture`).
- **Replace products** – swap the placeholder `Box`/`Sphere` meshes in `Product.jsx` with GLTF models loaded via `useGLTF` from `@react-three/drei`.
- **Adjust camera limits** – modify `CameraControls.jsx` where `maxPolarAngle`, `minPolarAngle`, `maxAzimuthAngle`, and `minAzimuthAngle` are set.
- **Add more UI** – extend `ProductPanel.jsx` with richer styling or additional actions.

---
### Technical Notes
- The camera transition uses a spring animation (`react-spring/three`) for a cinematic feel.
- Hover highlighting is achieved by changing the material’s `emissive` color.
- The central reset button is a simple React component that restores the camera spring to its initial state.

Enjoy building the KAMI luxury experience!
