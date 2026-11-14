/**
 * Detailed 3D WebGL Simulations using Three.js r128 + OrbitControls
 * All 4 simulations run offline and pause automatically when their slide is inactive.
 */

window.Sim3DManager = (function () {
    const activeSims = {};

    function createRendererAndCamera(container, camPos) {
        const width = container.clientWidth || 560;
        const height = container.clientHeight || 360;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0B1528, 0.022);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
        camera.position.set(camPos.x, camPos.y, camPos.z);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x0B1528, 1);

        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.minDistance = 4;
        controls.maxDistance = 45;

        // Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.55);
        scene.add(ambient);

        const dirLight1 = new THREE.DirectionalLight(0x32D5F2, 1.1);
        dirLight1.position.set(8, 12, 10);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0x397BFA, 0.8);
        dirLight2.position.set(-10, -5, -8);
        scene.add(dirLight2);

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

        return { scene, camera, renderer, controls };
    }

    // =========================================================================
    // 3D SIM 1: HERO WAVE TRANSITION (Slide 01)
    // =========================================================================
    function initHero3D(containerId) {
        const container = document.getElementById(containerId);
        if (!container || activeSims[containerId]) return;

        const { scene, camera, renderer, controls } = createRendererAndCamera(container, { x: 0, y: 4.5, z: 15.5 });

        // Floor Grid
        const grid = new THREE.GridHelper(32, 32, 0x32D5F2, 0x183B65);
        grid.position.y = -2.8;
        grid.material.opacity = 0.35;
        grid.material.transparent = true;
        scene.add(grid);

        // Central Axis Line
        const axisMat = new THREE.LineBasicMaterial({ color: 0xAAB7C8, transparent: true, opacity: 0.4 });
        const axisGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-12, 0, 0),
            new THREE.Vector3(12, 0, 0)
        ]);
        scene.add(new THREE.Line(axisGeo, axisMat));

        // Center ADC Ring Gate
        const ringGeo = new THREE.TorusGeometry(2.3, 0.12, 16, 64);
        const ringMat = new THREE.MeshStandardMaterial({
            color: 0xFF6B6B,
            emissive: 0xFF3B3B,
            emissiveIntensity: 0.6,
            metalness: 0.7,
            roughness: 0.2
        });
        const adcRing = new THREE.Mesh(ringGeo, ringMat);
        adcRing.rotation.y = Math.PI / 2;
        scene.add(adcRing);

        const outerRingGeo = new THREE.TorusGeometry(2.75, 0.05, 12, 64);
        const outerRingMat = new THREE.MeshBasicMaterial({ color: 0x32D5F2, transparent: true, opacity: 0.65 });
        const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
        outerRing.rotation.y = Math.PI / 2;
        scene.add(outerRing);

        // Analog E-field (vertical) & B-field (horizontal) points
        const analogPtsCount = 90;
        const ePoints = [];
        const bPoints = [];
        const eBars = [];
        const barMat = new THREE.MeshBasicMaterial({ color: 0x32D5F2, transparent: true, opacity: 0.35 });
        const bBarMat = new THREE.MeshBasicMaterial({ color: 0x397BFA, transparent: true, opacity: 0.35 });

        for (let i = 0; i < analogPtsCount; i++) {
            const x = -11 + (i / (analogPtsCount - 1)) * 10.8;
            ePoints.push(new THREE.Vector3(x, 0, 0));
            bPoints.push(new THREE.Vector3(x, 0, 0));
            if (i % 3 === 0) {
                const barGeo = new THREE.BoxGeometry(0.05, 1, 0.05);
                const eb = new THREE.Mesh(barGeo, barMat);
                eb.position.x = x;
                scene.add(eb);
                eBars.push({ mesh: eb, idx: i });

                const bb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 1), bBarMat);
                bb.position.x = x;
                scene.add(bb);
                eBars.push({ mesh: bb, idx: i, isB: true });
            }
        }

        const eLineGeo = new THREE.BufferGeometry().setFromPoints(ePoints);
        const eLine = new THREE.Line(eLineGeo, new THREE.LineBasicMaterial({ color: 0x32D5F2, linewidth: 2 }));
        scene.add(eLine);

        const bLineGeo = new THREE.BufferGeometry().setFromPoints(bPoints);
        const bLine = new THREE.Line(bLineGeo, new THREE.LineBasicMaterial({ color: 0x397BFA, linewidth: 2 }));
        scene.add(bLine);

        // Digital 3D Pulse Pillars (Right half: x from +0.6 to +11)
        const bitCount = 12;
        const bitPattern = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1];
        const pillars = [];
        for (let i = 0; i < bitCount; i++) {
            const bx = 0.9 + i * 0.85;
            const geo = new THREE.BoxGeometry(0.55, 1, 0.55);
            const isOne = bitPattern[i] === 1;
            const mat = new THREE.MeshStandardMaterial({
                color: isOne ? 0x32D5F2 : 0x183B65,
                emissive: isOne ? 0x1A8FA8 : 0x0A1A33,
                emissiveIntensity: isOne ? 0.65 : 0.2,
                metalness: 0.4,
                roughness: 0.25
            });
            const p = new THREE.Mesh(geo, mat);
            p.position.set(bx, 0, 0);
            scene.add(p);
            pillars.push({ mesh: p, baseX: bx, idx: i });
        }

        // Flying Bit Particles
        const particlesGeo = new THREE.BufferGeometry();
        const pCount = 80;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
            pPos[i * 3] = Math.random() * 12;
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 3.5;
            pPos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
        }
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pSystem = new THREE.Points(particlesGeo, new THREE.PointsMaterial({ color: 0x32D5F2, size: 0.14 }));
        scene.add(pSystem);

        let time = 0;
        let running = false;

        function animate() {
            if (!running) return;
            requestAnimationFrame(animate);
            time += 0.035;

            adcRing.rotation.z = time * 0.6;
            outerRing.rotation.z = -time * 0.9;

            // Update Analog E & B fields
            const eArr = eLineGeo.attributes.position.array;
            const bArr = bLineGeo.attributes.position.array;
            for (let i = 0; i < analogPtsCount; i++) {
                const x = -11 + (i / (analogPtsCount - 1)) * 10.8;
                const phase = x * 1.15 - time * 2.2;
                const ey = Math.sin(phase) * 1.75;
                const bz = Math.sin(phase) * 1.35;
                eArr[i * 3 + 1] = ey;
                bArr[i * 3 + 2] = bz;
            }
            eLineGeo.attributes.position.needsUpdate = true;
            bLineGeo.attributes.position.needsUpdate = true;

            for (const bar of eBars) {
                const x = bar.mesh.position.x;
                const val = Math.sin(x * 1.15 - time * 2.2);
                if (bar.isB) {
                    const len = Math.max(0.05, Math.abs(val * 1.35));
                    bar.mesh.scale.z = len;
                    bar.mesh.position.z = (val * 1.35) / 2;
                } else {
                    const len = Math.max(0.05, Math.abs(val * 1.75));
                    bar.mesh.scale.y = len;
                    bar.mesh.position.y = (val * 1.75) / 2;
                }
            }

            // Update Digital Pillars flowing rightward
            const shiftIdx = Math.floor(time * 2.5);
            for (const p of pillars) {
                const bit = bitPattern[(p.idx + shiftIdx) % bitPattern.length];
                const targetH = bit === 1 ? 2.4 : 0.25;
                p.mesh.scale.y += (targetH - p.mesh.scale.y) * 0.2;
                p.mesh.position.y = p.mesh.scale.y / 2 - 0.8;
                p.mesh.material.color.setHex(bit === 1 ? 0x32D5F2 : 0x1E4678);
                p.mesh.material.emissive.setHex(bit === 1 ? 0x1B9CB5 : 0x0B1E3D);
            }

            // Fly particles
            const arr = particlesGeo.attributes.position.array;
            for (let i = 0; i < pCount; i++) {
                arr[i * 3] += 0.08;
                if (arr[i * 3] > 11.5) arr[i * 3] = 0.2;
            }
            particlesGeo.attributes.position.needsUpdate = true;

            controls.update();
            renderer.render(scene, camera);
        }

        activeSims[containerId] = {
            start: () => { if (!running) { running = true; animate(); } },
            stop: () => { running = false; },
            resetView: () => { camera.position.set(0, 4.5, 15.5); controls.target.set(0, 0, 0); }
        };
    }

    // =========================================================================
    // 3D SIM 2: PHASOR & PERIOD T = 1/f WAVE PROPAGATION (Slide 05)
    // =========================================================================
    function initPhasor3D(containerId) {
        const container = document.getElementById(containerId);
        if (!container || activeSims[containerId]) return;

        const { scene, camera, renderer, controls } = createRendererAndCamera(container, { x: 2.5, y: 3.5, z: 13.5 });

        const grid = new THREE.GridHelper(24, 24, 0x397BFA, 0x183B65);
        grid.position.y = -3.0;
        grid.material.opacity = 0.3;
        grid.material.transparent = true;
        scene.add(grid);

        // Phasor Circle (at x = -5.5, YZ plane)
        const circleX = -5.5;
        const circleGeo = new THREE.TorusGeometry(2.0, 0.05, 12, 64);
        const circleMesh = new THREE.Mesh(circleGeo, new THREE.MeshBasicMaterial({ color: 0x397BFA }));
        circleMesh.rotation.y = Math.PI / 2;
        circleMesh.position.x = circleX;
        scene.add(circleMesh);

        // Phasor Arrow
        const phasorGroup = new THREE.Group();
        phasorGroup.position.set(circleX, 0, 0);
        const rod = new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.06, 2.0, 12),
            new THREE.MeshStandardMaterial({ color: 0xFF6B6B, emissive: 0xFF3333, emissiveIntensity: 0.6 })
        );
        rod.position.y = 1.0;
        phasorGroup.add(rod);
        const tip = new THREE.Mesh(
            new THREE.SphereGeometry(0.18, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0xFF6B6B, emissive: 0xFF6B6B, emissiveIntensity: 0.8 })
        );
        tip.position.y = 2.0;
        phasorGroup.add(tip);
        scene.add(phasorGroup);

        // Projection Connector Line
        const projGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(circleX, 0, 0),
            new THREE.Vector3(-2.5, 0, 0)
        ]);
        const projLine = new THREE.Line(projGeo, new THREE.LineBasicMaterial({ color: 0xFFC048 }));
        scene.add(projLine);

        // 3D Sine Wave Trace
        const wavePts = 120;
        const wavePositions = new Float32Array(wavePts * 3);
        const waveGeo = new THREE.BufferGeometry();
        waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
        const waveLine = new THREE.Line(waveGeo, new THREE.LineBasicMaterial({ color: 0x32D5F2, linewidth: 3 }));
        scene.add(waveLine);

        // Glowing spheres along wave crests
        const waveSpheres = [];
        for (let i = 0; i < 30; i++) {
            const sp = new THREE.Mesh(
                new THREE.SphereGeometry(0.09, 10, 10),
                new THREE.MeshBasicMaterial({ color: 0x32D5F2 })
            );
            scene.add(sp);
            waveSpheres.push(sp);
        }

        // Axis
        const axis = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2.5, 0, 0), new THREE.Vector3(8.5, 0, 0)]),
            new THREE.LineBasicMaterial({ color: 0xAAB7C8, transparent: true, opacity: 0.5 })
        );
        scene.add(axis);

        let freq = 50; // Hz
        let amp = 1.0; // normalized
        let theta = 0;
        let running = false;

        function animate() {
            if (!running) return;
            requestAnimationFrame(animate);

            const speedFactor = (freq / 50) * 0.055;
            theta += speedFactor;

            // Rotate phasor in YZ plane (around X axis)
            phasorGroup.rotation.x = -theta;
            phasorGroup.scale.set(1, amp, amp);
            circleMesh.scale.set(amp, amp, 1);

            const py = Math.cos(theta) * 2.0 * amp;
            const pz = -Math.sin(theta) * 2.0 * amp;

            // Projection line from tip to wave start (-2.5)
            const pArr = projGeo.attributes.position.array;
            pArr[0] = circleX; pArr[1] = py; pArr[2] = pz;
            pArr[3] = -2.5; pArr[4] = py; pArr[5] = 0;
            projGeo.attributes.position.needsUpdate = true;

            // Wave along X from -2.5 to +8.5
            const wArr = waveGeo.attributes.position.array;
            const k = (freq / 50) * 1.15;
            for (let i = 0; i < wavePts; i++) {
                const tFrac = i / (wavePts - 1);
                const x = -2.5 + tFrac * 11.0;
                const y = Math.cos(theta - (x + 2.5) * k) * 2.0 * amp;
                wArr[i * 3] = x;
                wArr[i * 3 + 1] = y;
                wArr[i * 3 + 2] = 0;
            }
            waveGeo.attributes.position.needsUpdate = true;

            for (let j = 0; j < waveSpheres.length; j++) {
                const idx = Math.floor((j / (waveSpheres.length - 1)) * (wavePts - 1));
                waveSpheres[j].position.set(wArr[idx * 3], wArr[idx * 3 + 1], 0);
            }

            controls.update();
            renderer.render(scene, camera);
        }

        activeSims[containerId] = {
            start: () => { if (!running) { running = true; animate(); } },
            stop: () => { running = false; },
            setParams: (f, a) => { freq = f; amp = a; },
            resetView: () => { camera.position.set(2.5, 3.5, 13.5); controls.target.set(1.5, 0, 0); }
        };
    }

    // =========================================================================
    // 3D SIM 3: ADC PCM QUANTIZATION CHAMBER (Slide 18)
    // =========================================================================
    function initADC3D(containerId) {
        const container = document.getElementById(containerId);
        if (!container || activeSims[containerId]) return;

        const { scene, camera, renderer, controls } = createRendererAndCamera(container, { x: 0, y: 4.5, z: 12.5 });

        const grid = new THREE.GridHelper(20, 20, 0x397BFA, 0x183B65);
        grid.position.y = -2.5;
        grid.material.opacity = 0.35;
        grid.material.transparent = true;
        scene.add(grid);

        let sampleCount = 16;
        let bitDepth = 3; // 2^3 = 8 levels
        let phase = 0;
        let running = false;

        const dynamicGroup = new THREE.Group();
        scene.add(dynamicGroup);

        // Smooth analog curve line
        const curvePts = 100;
        const curveArr = new Float32Array(curvePts * 3);
        const curveGeo = new THREE.BufferGeometry();
        curveGeo.setAttribute('position', new THREE.BufferAttribute(curveArr, 3));
        const curveLine = new THREE.Line(curveGeo, new THREE.LineBasicMaterial({ color: 0x32D5F2, linewidth: 3 }));
        scene.add(curveLine);

        // Quantization horizontal planes group
        const planesGroup = new THREE.Group();
        scene.add(planesGroup);

        // Sample pillars group
        const pillarsGroup = new THREE.Group();
        scene.add(pillarsGroup);

        function rebuildQuantizationPlanes() {
            while (planesGroup.children.length > 0) planesGroup.remove(planesGroup.children[0]);
            const levels = Math.pow(2, bitDepth);
            const planeGeo = new THREE.PlaneGeometry(13, 2.2);
            const planeMat = new THREE.MeshBasicMaterial({
                color: 0x397BFA,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.08
            });
            for (let i = 0; i < levels; i++) {
                const y = -2.0 + (i / (levels - 1)) * 4.0;
                const pl = new THREE.Mesh(planeGeo, planeMat);
                pl.rotation.x = Math.PI / 2;
                pl.position.y = y;
                planesGroup.add(pl);
            }
        }

        function rebuildSamplePillars() {
            while (pillarsGroup.children.length > 0) pillarsGroup.remove(pillarsGroup.children[0]);
            const levels = Math.pow(2, bitDepth);
            const boxW = Math.max(0.15, 9.5 / sampleCount);

            for (let i = 0; i < sampleCount; i++) {
                const x = -5.5 + (i / (sampleCount - 1)) * 11.0;
                const normVal = 0.5 + 0.42 * Math.sin((i / sampleCount) * Math.PI * 2 + phase);
                const quantIdx = Math.round(normVal * (levels - 1));
                const quantY = -2.0 + (quantIdx / (levels - 1)) * 4.0;
                const h = Math.max(0.1, quantY + 2.0);

                const colGeo = new THREE.BoxGeometry(boxW, h, 0.55);
                const colMat = new THREE.MeshStandardMaterial({
                    color: 0x2ED573,
                    emissive: 0x115E31,
                    emissiveIntensity: 0.55,
                    transparent: true,
                    opacity: 0.85
                });
                const colMesh = new THREE.Mesh(colGeo, colMat);
                colMesh.position.set(x, -2.0 + h / 2, 0);
                pillarsGroup.add(colMesh);

                // Laser sample dot on analog curve
                const realY = -2.0 + normVal * 4.0;
                const dot = new THREE.Mesh(
                    new THREE.SphereGeometry(0.11, 10, 10),
                    new THREE.MeshBasicMaterial({ color: 0xFF6B6B })
                );
                dot.position.set(x, realY, 0.45);
                pillarsGroup.add(dot);
            }
        }

        rebuildQuantizationPlanes();

        function animate() {
            if (!running) return;
            requestAnimationFrame(animate);
            phase += 0.02;

            // Update analog curve
            const arr = curveGeo.attributes.position.array;
            for (let i = 0; i < curvePts; i++) {
                const t = i / (curvePts - 1);
                const x = -5.5 + t * 11.0;
                const normVal = 0.5 + 0.42 * Math.sin(t * Math.PI * 2 + phase);
                arr[i * 3] = x;
                arr[i * 3 + 1] = -2.0 + normVal * 4.0;
                arr[i * 3 + 2] = 0.45;
            }
            curveGeo.attributes.position.needsUpdate = true;

            rebuildSamplePillars();

            controls.update();
            renderer.render(scene, camera);
        }

        activeSims[containerId] = {
            start: () => { if (!running) { running = true; animate(); } },
            stop: () => { running = false; },
            setParams: (samples, bits) => {
                sampleCount = samples;
                if (bitDepth !== bits) {
                    bitDepth = bits;
                    rebuildQuantizationPlanes();
                }
            },
            resetView: () => { camera.position.set(0, 4.5, 12.5); controls.target.set(0, 0, 0); }
        };
    }

    // =========================================================================
    // 3D SIM 4: FULL RF RADIO TRANSCEIVER SYSTEM (Slide 21 - Hình 5.7 SGK)
    // =========================================================================
    function initRadio3D(containerId) {
        const container = document.getElementById(containerId);
        if (!container || activeSims[containerId]) return;

        const { scene, camera, renderer, controls } = createRendererAndCamera(container, { x: 0, y: 7.5, z: 18.5 });

        // Ground Grid
        const grid = new THREE.GridHelper(36, 36, 0x397BFA, 0x183B65);
        grid.position.y = -2.0;
        grid.material.opacity = 0.35;
        grid.material.transparent = true;
        scene.add(grid);

        function createBoxBlock(x, y, z, w, h, d, colorHex, emissiveHex) {
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(w, h, d),
                new THREE.MeshStandardMaterial({
                    color: colorHex,
                    emissive: emissiveHex,
                    emissiveIntensity: 0.4,
                    metalness: 0.4,
                    roughness: 0.3
                })
            );
            mesh.position.set(x, y, z);
            scene.add(mesh);
            return mesh;
        }

        // --- TRANSMITTER SIDE (Left: x = -11 to -4) ---
        // 1. Studio Micro (-11)
        const micGroup = new THREE.Group();
        micGroup.position.set(-11, -0.5, 0);
        const micStand = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.25, 2.5, 16), new THREE.MeshStandardMaterial({ color: 0xAAB7C8 }));
        micStand.position.y = -0.25;
        micGroup.add(micStand);
        const micHead = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 20), new THREE.MeshStandardMaterial({ color: 0x32D5F2, emissive: 0x105566 }));
        micHead.position.y = 1.2;
        micGroup.add(micHead);
        scene.add(micGroup);

        // 2. ADC Chip (-8.2)
        const adcChip = createBoxBlock(-8.2, -1.2, 0, 1.5, 0.9, 1.5, 0x397BFA, 0x123278);

        // 3. Modulator (-5.8)
        const modBox = createBoxBlock(-5.8, -1.2, 0, 1.4, 1.1, 1.4, 0xFF6B6B, 0x6E1B1B);

        // 4. Tx Antenna Tower (-3.8)
        const txTower = new THREE.Mesh(
            new THREE.CylinderGeometry(0.12, 0.55, 5.2, 8),
            new THREE.MeshStandardMaterial({ color: 0xAAB7C8, wireframe: true })
        );
        txTower.position.set(-3.8, 0.6, 0);
        scene.add(txTower);
        const txBeacon = new THREE.Mesh(
            new THREE.SphereGeometry(0.28, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x32D5F2, emissive: 0x32D5F2, emissiveIntensity: 1.0 })
        );
        txBeacon.position.set(-3.8, 3.3, 0);
        scene.add(txBeacon);

        // --- RECEIVER SIDE (Right: x = +3.8 to +11) ---
        // 5. Rx Antenna Tower (+3.8)
        const rxTower = new THREE.Mesh(
            new THREE.CylinderGeometry(0.12, 0.55, 5.2, 8),
            new THREE.MeshStandardMaterial({ color: 0xAAB7C8, wireframe: true })
        );
        rxTower.position.set(3.8, 0.6, 0);
        scene.add(rxTower);
        const rxBeacon = new THREE.Mesh(
            new THREE.SphereGeometry(0.28, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x2ED573, emissive: 0x2ED573, emissiveIntensity: 1.0 })
        );
        rxBeacon.position.set(3.8, 3.3, 0);
        scene.add(rxBeacon);

        // 6. Demodulator (+5.8)
        const demodBox = createBoxBlock(5.8, -1.2, 0, 1.4, 1.1, 1.4, 0xFF6B6B, 0x6E1B1B);

        // 7. DAC Chip (+8.2)
        const dacChip = createBoxBlock(8.2, -1.2, 0, 1.5, 0.9, 1.5, 0x397BFA, 0x123278);

        // 8. 3D Speaker (+11)
        const spkCab = createBoxBlock(11, -0.4, 0, 1.8, 3.0, 1.8, 0x183B65, 0x0A1A33);
        const spkCone = new THREE.Mesh(
            new THREE.ConeGeometry(0.65, 0.5, 24),
            new THREE.MeshStandardMaterial({ color: 0x2ED573, emissive: 0x105E30 })
        );
        spkCone.rotation.z = Math.PI / 2;
        spkCone.position.set(10.0, -0.2, 0);
        scene.add(spkCone);

        // Connecting Cables on floor
        const txCable = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(-11, -1.5, 0),
                new THREE.Vector3(-3.8, -1.5, 0)
            ]),
            new THREE.LineBasicMaterial({ color: 0x32D5F2 })
        );
        scene.add(txCable);

        const rxCable = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(3.8, -1.5, 0),
                new THREE.Vector3(11, -1.5, 0)
            ]),
            new THREE.LineBasicMaterial({ color: 0x2ED573 })
        );
        scene.add(rxCable);

        // Carrier Waves flying from Tx (-3.8) to Rx (+3.8)
        const rfRings = [];
        for (let i = 0; i < 6; i++) {
            const rGeo = new THREE.TorusGeometry(0.6, 0.04, 10, 32);
            const rMat = new THREE.MeshBasicMaterial({ color: 0x32D5F2, transparent: true, opacity: 0.75 });
            const ring = new THREE.Mesh(rGeo, rMat);
            ring.rotation.y = Math.PI / 2;
            ring.position.set(-3.8, 3.3, 0);
            scene.add(ring);
            rfRings.push({ mesh: ring, offset: i / 6 });
        }

        // Travelling Data Packet Sphere (triggered by user or loop)
        const packet = new THREE.Mesh(
            new THREE.SphereGeometry(0.32, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0xFFC048, emissive: 0xFFA500, emissiveIntensity: 1.0 })
        );
        packet.visible = false;
        scene.add(packet);

        let packetProgress = -1;
        let time = 0;
        let running = false;
        let camTargetPos = null;
        let camTargetLook = null;

        function animate() {
            if (!running) return;
            requestAnimationFrame(animate);
            time += 0.03;

            // Blinking beacons
            const pulse = 0.6 + 0.4 * Math.sin(time * 4);
            txBeacon.scale.setScalar(0.9 + 0.25 * pulse);
            rxBeacon.scale.setScalar(0.9 + 0.25 * pulse);

            // RF Carrier Waves moving from Tx (-3.8) to Rx (+3.8)
            for (const rf of rfRings) {
                const prog = (time * 0.35 + rf.offset) % 1;
                const x = -3.8 + prog * 7.6;
                const scale = 0.5 + Math.sin(prog * Math.PI) * 1.8;
                rf.mesh.position.set(x, 3.3, 0);
                rf.mesh.scale.setScalar(scale);
                rf.mesh.material.opacity = Math.sin(prog * Math.PI) * 0.85;
            }

            // Speaker cone vibration
            const vib = Math.sin(time * 18) * 0.08;
            spkCone.position.x = 10.0 + vib;

            // Animate traveling packet
            if (packetProgress >= 0) {
                packet.visible = true;
                packetProgress += 0.008;
                if (packetProgress <= 0.3) {
                    // Tx path: -11 to -3.8
                    const u = packetProgress / 0.3;
                    packet.position.set(-11 + u * 7.2, -1.2 + (u > 0.8 ? (u - 0.8) * 22 : 0), 0);
                    packet.material.color.setHex(u < 0.4 ? 0x32D5F2 : 0x397BFA);
                } else if (packetProgress <= 0.7) {
                    // Air RF path: -3.8 to +3.8
                    const u = (packetProgress - 0.3) / 0.4;
                    packet.position.set(-3.8 + u * 7.6, 3.3 + Math.sin(u * 20) * 0.3, 0);
                    packet.material.color.setHex(0xFF6B6B);
                } else if (packetProgress <= 1.0) {
                    // Rx path: +3.8 to +11
                    const u = (packetProgress - 0.7) / 0.3;
                    packet.position.set(3.8 + u * 7.2, u < 0.2 ? 3.3 - u * 22 : -1.2, 0);
                    packet.material.color.setHex(u < 0.6 ? 0x397BFA : 0x2ED573);
                } else {
                    packetProgress = -1;
                    packet.visible = false;
                }
            }

            // Smooth camera preset transition
            if (camTargetPos && camTargetLook) {
                camera.position.lerp(camTargetPos, 0.08);
                controls.target.lerp(camTargetLook, 0.08);
                if (camera.position.distanceTo(camTargetPos) < 0.1) {
                    camTargetPos = null;
                    camTargetLook = null;
                }
            }

            controls.update();
            renderer.render(scene, camera);
        }

        activeSims[containerId] = {
            start: () => { if (!running) { running = true; animate(); } },
            stop: () => { running = false; },
            triggerPacket: () => { packetProgress = 0; },
            setCameraPreset: (preset) => {
                if (preset === 'overview') {
                    camTargetPos = new THREE.Vector3(0, 7.5, 18.5);
                    camTargetLook = new THREE.Vector3(0, 0, 0);
                } else if (preset === 'tx') {
                    camTargetPos = new THREE.Vector3(-7.5, 3.5, 9.5);
                    camTargetLook = new THREE.Vector3(-7.5, 0, 0);
                } else if (preset === 'air') {
                    camTargetPos = new THREE.Vector3(0, 4.5, 9.5);
                    camTargetLook = new THREE.Vector3(0, 2.5, 0);
                } else if (preset === 'rx') {
                    camTargetPos = new THREE.Vector3(7.5, 3.5, 9.5);
                    camTargetLook = new THREE.Vector3(7.5, 0, 0);
                }
            },
            resetView: () => {
                camTargetPos = new THREE.Vector3(0, 7.5, 18.5);
                camTargetLook = new THREE.Vector3(0, 0, 0);
            }
        };
    }

    return {
        initHero3D,
        initPhasor3D,
        initADC3D,
        initRadio3D,
        get: (id) => activeSims[id],
        pauseAll: () => {
            Object.values(activeSims).forEach(s => s.stop && s.stop());
        }
    };
})();
