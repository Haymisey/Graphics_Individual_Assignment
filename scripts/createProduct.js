import {
    Mesh,
    SphereGeometry,
    CylinderGeometry,
    PlaneGeometry,
    MeshStandardMaterial,
    MeshPhysicalMaterial,
    Group,
    PointLight,
    DirectionalLight,
    AmbientLight,
    DoubleSide
} from 'three';

export function createProduct() {
    const lamp = new Group();
    lamp.name = "deskLamp";

    // === Base (smooth sphere shaped like a vase) ===
    const baseGeometry = new SphereGeometry(0.5, 32, 32);
    const baseMaterial = new MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.7,
        metalness: 0.3
    });
    const base = new Mesh(baseGeometry, baseMaterial);
    base.scale.set(1, 1.2, 1); // squash for vase-like shape
    base.name = "base";
    base.position.y = 0.6;
    base.castShadow = true;
    lamp.add(base);

    // === Pole (metal cylinder) ===
    const poleGeometry = new CylinderGeometry(0.05, 0.05, 1.5, 32);
    const poleMaterial = new MeshStandardMaterial({
        color: 0x555555,
        roughness: 0.5,
        metalness: 0.5
    });
    const pole = new Mesh(poleGeometry, poleMaterial);
    pole.name = "pole";
    pole.position.y = base.position.y + 0.75;
    pole.castShadow = true;
    lamp.add(pole);

    // === Lamp Shade (translucent cone) ===
    const headHeight = 1.2;
    const headGeometry = new CylinderGeometry(0.3, 1, 1, 32, 1, true);
    const headMaterial = new MeshPhysicalMaterial({
        color: 0xffffcc,
        roughness: 0.8,
        transmission: 0.95,
        transparent: true,
        thickness: 0.01,
        side: DoubleSide
    });

    const head = new Mesh(headGeometry, headMaterial);
    head.name = "lampHead";

    // Flip the cone upside down
    head.rotation.y = Math.PI;

    // Position the shade so its wide base (now at the bottom) connects to the connector
    const connectorTopY = pole.position.y + 0.75;
    head.position.set(0, connectorTopY + headHeight / 2, 0); // raise it by half its height
    head.castShadow = true;

    lamp.add(head);

    // === Bulb ===
    const bulbGeometry = new SphereGeometry(0.15, 32, 32);
    const bulbMaterial = new MeshStandardMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 0.8
    });
    const bulb = new Mesh(bulbGeometry, bulbMaterial);
    bulb.name = "bulb";
    bulb.position.set(0, head.position.y - 0.3, 0);
    bulb.castShadow = false;
    lamp.add(bulb);

    // === Bulb Light ===
    const bulbLight = new PointLight(0xffffcc, 1.2, 3);
    bulbLight.position.copy(bulb.position);
    bulbLight.castShadow = true;
    bulbLight.decay = 2;
    bulbLight.distance = 4;
    bulbLight.shadow.radius = 5;
    bulbLight.shadow.bias = -0.005;
    bulbLight.shadow.mapSize.width = 1024;
    bulbLight.shadow.mapSize.height = 1024;
    lamp.add(bulbLight);

    // === Connector (pole to shade) ===
    const connectorGeometry = new CylinderGeometry(0.08, 0.08, 0.1, 32);
    const connector = new Mesh(connectorGeometry, poleMaterial);
    connector.name = "connector";
    connector.position.set(0, pole.position.y + 0.75, 0);
    lamp.add(connector);

    // === Chain links ===
    const chainLinkGeometry = new SphereGeometry(0.03, 16, 16);
    for (let i = 0; i < 5; i++) {
        const link = new Mesh(chainLinkGeometry, poleMaterial);
        link.name = `chainLink-${i}`;
        link.position.set(0, pole.position.y - i * 0.1, 0);
        lamp.add(link);
    }

    // === Scene Enhancements (to be added manually to scene) ===

    const floorGeo = new PlaneGeometry(10, 10);
    const floorMat = new MeshStandardMaterial({ color: 0x888888 });
    const floor = new Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;

    const keyLight = new DirectionalLight(0xffffff, 0.5);
    keyLight.position.set(20, 15, 2);
    keyLight.castShadow = true;

    const ambient = new AmbientLight(0xffffff, 0.3);

    return {
        lamp,
        floor,
        keyLight,
        ambient
    };
}
