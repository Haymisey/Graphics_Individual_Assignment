import { initScene } from './initScene.js';
import { createProduct } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { setupInteractions } from './interaction.js';
import { setupCameraAnimation } from './cameraAnimation.js';

// Main application
async function init() {
    // Initialize scene, camera, renderer
    const { scene, camera, renderer, controls } = initScene();
    
    // Create product
    // Create product and scene elements
    const { lamp, floor, keyLight, ambient } = createProduct();

    // Add them to the scene
    scene.add(lamp, floor, keyLight, ambient);

    // If your interaction system expects 'lamp' as the product:
    const product = lamp;
    // Add lighting
    // addLighting(scene);
    
    // Setup interactions
    const { infoPanel } = setupInteractions(scene, camera, renderer, product);
    
    // Setup camera animation
    setupCameraAnimation(camera, controls);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

init();