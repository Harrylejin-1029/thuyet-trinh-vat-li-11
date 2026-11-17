/**
 * Mô phỏng 3D WebGL tương tác Three.js — Bài 4: Biến điệu (AM & FM)
 * Mô hình Trái Đất 3D & Cơ chế phản xạ tầng điện ly (Ionosphere Wave Propagation)
 */

window.Sim3DBai4Manager = (function () {
    const activeSims = {};

    function createRendererAndCamera(container, camPos) {
        const width = container.clientWidth || 600;
        const height = container.clientHeight || 350;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x080C14, 0.02);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(camPos.x, camPos.y, camPos.z);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x080C14, 1);

        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.minDistance = 5;
        controls.maxDistance = 35;

        // Ánh sáng vũ trụ
        const ambient = new THREE.AmbientLight(0xFFFFFF, 0.6);
        scene.add(ambient);

        const sunLight = new THREE.DirectionalLight(0xFFF3C4, 1.2);
        sunLight.position.set(12, 8, 10);
        scene.add(sunLight);

        const rimLight = new THREE.DirectionalLight(0x00E5FF, 0.5);
        rimLight.position.set(-10, -5, -8);
        scene.add(rimLight);

        const ro = new ResizeObserver(() => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            if (w > 0 && h > 0) {
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            }
        });
        ro.observe(container);

        return { scene, camera, renderer, controls, cleanup: () => ro.disconnect() };
    }

    // =========================================================================
    // 3D IONOSPHERE & WAVE PROPAGATION SIMULATION
    // =========================================================================
    function initIonosphere3D(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const defaultCam = { x: 0, y: 5, z: 15 };
        const { scene, camera, renderer, controls, cleanup } = createRendererAndCamera(container, defaultCam);

        let running = true;
        let animId = null;
        let waveMode = 0; // 0: Cả hai, 1: Chỉ AM, 2: Chỉ FM

        // 1. Quả cầu Trái Đất (Earth Globe)
        const earthRadius = 4.0;
        const earthGeo = new THREE.SphereGeometry(earthRadius, 40, 40);
        const earthMat = new THREE.MeshPhongMaterial({
            color: 0x1E3A8A,
            emissive: 0x0A192F,
            specular: 0x38BDF8,
            shininess: 25,
            wireframe: false
        });
        const earthMesh = new THREE.Mesh(earthGeo, earthMat);
        scene.add(earthMesh);

        // Lưới kinh vĩ tuyến trên Trái Đất
        const gridGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(earthRadius + 0.02, 24, 16));
        const gridMat = new THREE.LineBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.18 });
        const gridLine = new THREE.LineSegments(gridGeo, gridMat);
        earthMesh.add(gridLine);

        // Các đốm lục địa tượng trưng
        const continentGroup = new THREE.Group();
        const contMat = new THREE.MeshBasicMaterial({ color: 0x10B981, transparent: true, opacity: 0.7 });
        for (let i = 0; i < 60; i++) {
            const phi = Math.random() * Math.PI;
            const theta = Math.random() * Math.PI * 2;
            const p = new THREE.Vector3().setFromSphericalCoords(earthRadius + 0.03, phi, theta);
            const patch = new THREE.Mesh(new THREE.CircleGeometry(0.3 + Math.random() * 0.4, 8), contMat);
            patch.position.copy(p);
            patch.lookAt(new THREE.Vector3(0, 0, 0));
            patch.rotation.y += Math.PI;
            continentGroup.add(patch);
        }
        earthMesh.add(continentGroup);

        // 2. Tầng điện ly (Ionosphere Outer Sphere)
        const ionoRadius = earthRadius * 1.35; // R = 5.4
        const ionoGeo = new THREE.SphereGeometry(ionoRadius, 36, 36);
        const ionoMat = new THREE.MeshBasicMaterial({
            color: 0xF59E0B,
            wireframe: true,
            transparent: true,
            opacity: 0.18
        });
        const ionoMesh = new THREE.Mesh(ionoGeo, ionoMat);
        scene.add(ionoMesh);

        // Hào quang khí quyển
        const glowGeo = new THREE.SphereGeometry(ionoRadius + 0.1, 32, 32);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0x00E5FF,
            transparent: true,
            opacity: 0.06,
            side: THREE.BackSide
        });
        const glowMesh = new THREE.Mesh(glowGeo, glowMat);
        scene.add(glowMesh);

        // 3. Tháp phát sóng (Radio Transmitter Tower)
        const towerGroup = new THREE.Group();
        const towerPos = new THREE.Vector3(0, earthRadius, 0); // Đỉnh cực bắc
        const towerGeo = new THREE.CylinderGeometry(0.04, 0.12, 0.6, 6);
        const towerMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 });
        const tower = new THREE.Mesh(towerGeo, towerMat);
        tower.position.set(0, earthRadius + 0.3, 0);
        towerGroup.add(tower);

        // Đèn chớp đỏ trên đỉnh tháp
        const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshBasicMaterial({ color: 0xFF0000 }));
        beacon.position.set(0, earthRadius + 0.65, 0);
        towerGroup.add(beacon);
        scene.add(towerGroup);

        // 4. Đường sóng AM phản xạ Zich-zắc (Amber Rays)
        // Tạo chuỗi điểm phản xạ dọc theo cung kinh tuyến
        const amPoints = [];
        const numBounces = 4;
        const towerTop = new THREE.Vector3(0, earthRadius + 0.6, 0);
        amPoints.push(towerTop);

        for (let b = 0; b < numBounces; b++) {
            // Điểm lên tầng điện ly
            const angleIono = 0.25 + b * 0.45;
            const ptIono = new THREE.Vector3(
                Math.sin(angleIono) * ionoRadius,
                Math.cos(angleIono) * ionoRadius,
                0
            );
            amPoints.push(ptIono);

            // Điểm dội xuống đất
            const angleGround = 0.45 + b * 0.45;
            const ptGround = new THREE.Vector3(
                Math.sin(angleGround) * earthRadius,
                Math.cos(angleGround) * earthRadius,
                0
            );
            amPoints.push(ptGround);
        }

        const amCurve = new THREE.CatmullRomCurve3(amPoints);
        const amGeo = new THREE.BufferGeometry().setFromPoints(amPoints);
        const amMat = new THREE.LineBasicMaterial({ color: 0xF59E0B, linewidth: 3 });
        const amLine = new THREE.Line(amGeo, amMat);
        scene.add(amLine);

        // Hạt photon AM chạy dọc theo đường phản xạ
        const amParticleGeo = new THREE.SphereGeometry(0.12, 8, 8);
        const amParticleMat = new THREE.MeshBasicMaterial({ color: 0xFFB703 });
        const amParticles = [];
        for (let i = 0; i < 5; i++) {
            const p = new THREE.Mesh(amParticleGeo, amParticleMat);
            scene.add(p);
            amParticles.push({ mesh: p, offset: i * 0.2 });
        }

        // 5. Đường sóng FM đâm xuyên tầng điện ly (Cyan Line)
        const fmPoints = [
            towerTop,
            new THREE.Vector3(3.5, earthRadius + 4.5, 0),
            new THREE.Vector3(7.0, earthRadius + 8.5, 0)
        ];
        const fmGeo = new THREE.BufferGeometry().setFromPoints(fmPoints);
        const fmMat = new THREE.LineDashedMaterial({
            color: 0x00E5FF,
            linewidth: 2.5,
            dashSize: 0.3,
            gapSize: 0.15
        });
        const fmLine = new THREE.Line(fmGeo, fmMat);
        fmLine.computeLineDistances();
        scene.add(fmLine);

        // Vùng phủ sóng FM cục bộ (Line of Sight Halo)
        const losGeo = new THREE.RingGeometry(0.1, 1.2, 32);
        const losMat = new THREE.MeshBasicMaterial({
            color: 0x00E5FF,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.35
        });
        const losMesh = new THREE.Mesh(losGeo, losMat);
        losMesh.position.set(0, earthRadius + 0.05, 0);
        losMesh.rotation.x = Math.PI / 2;
        scene.add(losMesh);

        // Vòng chữ HUD hiển thị chế độ sóng
        const modes = [
            "ĐANG HIỂN THỊ: CẢ HAI (AM Phản Xạ Tầng Điện Ly + FM Đâm Xuyên Vũ Trụ)",
            "ĐANG HIỂN THỊ: CHỈ SÓNG AM (Phản xạ zich-zắc truyền đi hàng nghìn km)",
            "ĐANG HIỂN THỊ: CHỈ SÓNG FM (Tần số rất cao đâm xuyên vũ trụ, chỉ thu cự ly gần)"
        ];

        function updateWaveVisibility() {
            if (waveMode === 0) {
                amLine.visible = true;
                amParticles.forEach(p => p.mesh.visible = true);
                fmLine.visible = true;
                losMesh.visible = true;
            } else if (waveMode === 1) {
                amLine.visible = true;
                amParticles.forEach(p => p.mesh.visible = true);
                fmLine.visible = false;
                losMesh.visible = false;
            } else {
                amLine.visible = false;
                amParticles.forEach(p => p.mesh.visible = false);
                fmLine.visible = true;
                losMesh.visible = true;
            }
        }

        // Animation Loop
        let clock = 0;
        function animate() {
            if (!running) return;
            animId = requestAnimationFrame(animate);

            clock += 0.015;

            // Xoay Trái Đất chầm chậm
            earthMesh.rotation.y += 0.002;
            ionoMesh.rotation.y -= 0.001;

            // Chớp đèn đỉnh tháp
            beacon.material.color.setHex((Math.floor(clock * 3) % 2 === 0) ? 0xFF0000 : 0x440000);

            // Cập nhật vị trí hạt sóng AM chạy dọc đường phản xạ
            if (amLine.visible) {
                amParticles.forEach(p => {
                    const progress = (clock * 0.25 + p.offset) % 1.0;
                    const pos = amCurve.getPoint(progress);
                    p.mesh.position.copy(pos);
                });
            }

            controls.update();
            renderer.render(scene, camera);
        }

        animate();

        const simInstance = {
            pause: () => { running = false; cancelAnimationFrame(animId); },
            resume: () => { if (!running) { running = true; animate(); } },
            resetView: () => {
                camera.position.set(defaultCam.x, defaultCam.y, defaultCam.z);
                controls.target.set(0, 0, 0);
            },
            toggleWaveMode: () => {
                waveMode = (waveMode + 1) % 3;
                updateWaveVisibility();
                if (window.showToast) window.showToast(modes[waveMode]);
            },
            cleanup: () => {
                running = false;
                cancelAnimationFrame(animId);
                cleanup();
                renderer.dispose();
            }
        };

        activeSims[containerId] = simInstance;
        return simInstance;
    }

    return {
        initHero3D: (id) => initIonosphere3D(id),
        get: (id) => activeSims[id],
        pauseAll: () => Object.values(activeSims).forEach(s => s.pause()),
        resumeAll: () => Object.values(activeSims).forEach(s => s.resume())
    };
})();
