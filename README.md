3D Product Viewer
# Haymanot Abera UGR/9265/15

A simple, interactive 3D lamp viewer application built with Three.js and Vite.

## Features

-   Displays a 3D model of a lamp.
-   Allows user interaction with the model (e.g., rotation, zoom).
-   Includes basic lighting and a floor plane.
-   Camera animations to showcase the product.

## Technologies Used

-   [Three.js](https://threejs.org/) for 3D rendering.
-   [Vite](https://vitejs.dev/) as a build tool and development server.

## Setup and Usage

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Haymisey/Graphics_Individual_Assignment.git
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    or yarn:
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a `dist` directory with the optimized production build.

5.  **Preview the production build:**
    ```bash
    npm run preview
    ```

## Project Structure

```
.
├── index.html                # Main HTML file
├── package.json              # Project metadata and dependencies
├── vite.config.js            # Vite configuration
├── scripts/
│   ├── app.js                # Main application logic
│   ├── initScene.js          # Scene, camera, and renderer setup
│   ├── createProduct.js      # 3D product model creation
│   ├── addLighting.js        # Lighting setup
│   ├── interaction.js        # User interaction handling
│   └── cameraAnimation.js    # Camera animation setup
└── styles/
    └── style.css             # Application styles
```
