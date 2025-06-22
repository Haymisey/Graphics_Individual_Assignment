import { 
    Raycaster, 
    Vector2,
    Color
} from 'three';

export function setupInteractions(scene, camera, renderer, product) {
    const raycaster = new Raycaster();
    const mouse = new Vector2();
    const infoPanel = document.getElementById('info-panel');
    
    // Store original materials to revert after click
    const originalMaterials = {};
    product.traverse(child => {
        if (child.isMesh) {
            originalMaterials[child.name] = child.material.clone();
        }
    });
    
    function onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Update the raycaster
        raycaster.setFromCamera(mouse, camera);
        
        // Find intersections
        const intersects = raycaster.intersectObject(product, true);
        
        // Reset all materials to original
        product.traverse(child => {
            if (child.isMesh && originalMaterials[child.name]) {
                child.material = originalMaterials[child.name];
            }
        });
        
        // Highlight hovered object
        if (intersects.length > 0) {
            const object = intersects[0].object;
            const highlightColor = new Color(0x00ff00);
            object.material.color.lerp(highlightColor, 0.3);
        }
    }
    
    function onClick(event) {
        // Calculate mouse position
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Update the raycaster
        raycaster.setFromCamera(mouse, camera);
        
        // Find intersections
        const intersects = raycaster.intersectObject(product, true);
        
        if (intersects.length > 0) {
            const object = intersects[0].object;
            
            // Show info panel
            infoPanel.textContent = `Clicked: ${object.name}`;
            infoPanel.style.display = 'block';
            
            // Highlight clicked object
            const highlightColor = new Color(0xff0000);
            object.material.color.lerp(highlightColor, 0.5);
            
            // Animate scale
            const originalScale = originalScales[object.name];
            object.scale.set(
                originalScale.x * 1.1,
                originalScale.y * 1.1,
                originalScale.z * 1.1
            );
            setTimeout(() => {
                object.scale.copy(originalScale);
            }, 300);
            
            // Hide info panel after 3 seconds
            setTimeout(() => {
                infoPanel.style.display = 'none';
            }, 3000);
        }
    }
    
    // Add event listeners
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('click', onClick, false);
    
    return { infoPanel };
}