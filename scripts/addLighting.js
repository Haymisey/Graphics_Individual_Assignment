import { 
    AmbientLight, 
    DirectionalLight,
    HemisphereLight
} from 'three';

export function addLighting(scene) {
    // Ambient light for general illumination
    const ambientLight = new AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    // Hemisphere light for more natural outdoor-like lighting
    const hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 0.6);
    scene.add(hemisphereLight);
    
    // Directional light for shadows and highlights
    const directionalLight = new DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Fill light to reduce harsh shadows
    const fillLight = new DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, 5);
    scene.add(fillLight);

    const rimLight = new DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);
}