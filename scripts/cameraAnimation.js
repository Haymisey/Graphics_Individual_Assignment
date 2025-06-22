export function setupCameraAnimation(camera, controls) {
    // Enable auto-rotation through OrbitControls
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0; // You can tweak this for faster/slower rotation

    // Pause auto-rotate when user starts interacting
    controls.addEventListener('start', () => {
        controls.autoRotate = false;
    });

    // Resume auto-rotate after a delay when user stops
    controls.addEventListener('end', () => {
        setTimeout(() => {
            controls.autoRotate = true;
        }, 3000); // Wait 3 seconds after user stops
    });

    // Animation loop (OrbitControls handles rotation internally)
    function animateCamera() {
        requestAnimationFrame(animateCamera);
        controls.update(); // This handles auto-rotation + damping
    }

    animateCamera(); // Start loop
}
