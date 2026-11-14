/**
 * Interactive 2D HTML5 Canvas Simulations + Web Audio API Sound Demo
 */

window.Sim2DManager = (function () {
    const sims = {};

    function fitCanvas(canvas) {
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(300, Math.floor(rect.width));
        const h = Math.max(160, Math.floor(rect.height));
        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
        }
        const ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { ctx, w, h };
    }

    function drawGrid(ctx, w, h, padL = 42, padB = 26, padT = 18, padR = 14) {
        ctx.strokeStyle = 'rgba(170, 183, 200, 0.12)';
        ctx.lineWidth = 1;
        const plotW = w - padL - padR;
        const plotH = h - padT - padB;
        for (let i = 0; i <= 8; i++) {
            const x = padL + (i / 8) * plotW;
            ctx.beginPath(); ctx.moveTo(x, padT); ctx.lineTo(x, h - padB); ctx.stroke();
        }
        for (let j = 0; j <= 4; j++) {
            const y = padT + (j / 4) * plotH;
            ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
        }
        // Axes
        ctx.strokeStyle = '#AAB7C8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(padL, padT);
        ctx.lineTo(padL, h - padB);
        ctx.lineTo(w - padR, h - padB);
        ctx.stroke();

        // Zero center line
        const midY = padT + plotH / 2;
        ctx.strokeStyle = 'rgba(255,255,255,0.22)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(padL, midY); ctx.lineTo(w - padR, midY); ctx.stroke();
        ctx.setLineDash([]);
        return { padL, padB, padT, padR, plotW, plotH, midY };
    }

    // =========================================================================
    // 2D SIM 1: ANALOG WAVEFORM EXPLORER (Slide 03 / 04)
    // =========================================================================
    function initAnalog2D(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || sims[canvasId]) return;

        let mode = 'periodic'; // 'periodic' | 'nonperiodic' | 'draw'
        let freq = 2.0;
        let amp = 0.8;
        let phase = 0;
        let running = false;
        let mousePos = null;
        let drawnPoints = [];
        let isDrawing = false;

        function evalAnalog(normX) {
            if (mode === 'periodic') {
                return amp * Math.sin(normX * Math.PI * 2 * freq - phase);
            } else if (mode === 'nonperiodic') {
                const t = normX * 4 - phase * 0.35;
                return amp * (
                    0.52 * Math.sin(t * 2.1) +
                    0.32 * Math.sin(t * 5.7 + 1.1) +
                    0.22 * Math.cos(t * 9.3)
                ) * Math.exp(-0.08 * Math.pow(normX * 4 - 2, 2));
            } else {
                if (drawnPoints.length < 2) return 0;
                const idx = Math.min(drawnPoints.length - 1, Math.max(0, Math.floor(normX * (drawnPoints.length - 1))));
                return drawnPoints[idx];
            }
        }

        // Init drawn buffer
        for (let i = 0; i < 160; i++) {
            drawnPoints.push(0.6 * Math.sin((i / 160) * Math.PI * 4));
        }

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            mousePos = { x: mx, y: my };
            if (isDrawing && mode === 'draw') {
                const padL = 42, padR = 14, padT = 18, padB = 26;
                const plotW = rect.width - padL - padR;
                const plotH = rect.height - padT - padB;
                const normX = (mx - padL) / plotW;
                const val = -((my - (padT + plotH / 2)) / (plotH * 0.44));
                if (normX >= 0 && normX <= 1) {
                    const idx = Math.floor(normX * (drawnPoints.length - 1));
                    for (let k = -2; k <= 2; k++) {
                        if (idx + k >= 0 && idx + k < drawnPoints.length) {
                            drawnPoints[idx + k] = Math.max(-1, Math.min(1, val));
                        }
                    }
                }
            }
        });
        canvas.addEventListener('mousedown', () => { isDrawing = true; });
        window.addEventListener('mouseup', () => { isDrawing = false; });
        canvas.addEventListener('mouseleave', () => { mousePos = null; });

        function render() {
            if (!running) return;
            requestAnimationFrame(render);
            if (mode !== 'draw') phase += 0.03;

            const { ctx, w, h } = fitCanvas(canvas);
            ctx.clearRect(0, 0, w, h);
            const { padL, padB, padT, padR, plotW, plotH, midY } = drawGrid(ctx, w, h);

            // Labels
            ctx.fillStyle = '#AAB7C8';
            ctx.font = '11px Segoe UI';
            ctx.fillText('u (V)', 8, padT + 10);
            ctx.fillText('Thời gian t (s)', w - 85, h - 7);
            ctx.fillText('0', 28, midY + 4);

            // Plot smooth curve
            ctx.strokeStyle = '#32D5F2';
            ctx.lineWidth = 3;
            ctx.shadowColor = 'rgba(50, 213, 242, 0.5)';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            const steps = 240;
            for (let i = 0; i <= steps; i++) {
                const normX = i / steps;
                const x = padL + normX * plotW;
                const y = midY - evalAnalog(normX) * (plotH * 0.42);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Hover crosshair
            if (mousePos && mousePos.x >= padL && mousePos.x <= w - padR) {
                const normX = (mousePos.x - padL) / plotW;
                const val = evalAnalog(normX);
                const py = midY - val * (plotH * 0.42);

                ctx.strokeStyle = 'rgba(255, 107, 107, 0.65)';
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 3]);
                ctx.beginPath(); ctx.moveTo(mousePos.x, padT); ctx.lineTo(mousePos.x, h - padB); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(padL, py); ctx.lineTo(w - padR, py); ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = '#FF6B6B';
                ctx.beginPath(); ctx.arc(mousePos.x, py, 5, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = '#101C35';
                ctx.fillRect(mousePos.x + 8, py - 24, 132, 22);
                ctx.strokeStyle = '#FF6B6B';
                ctx.strokeRect(mousePos.x + 8, py - 24, 132, 22);
                ctx.fillStyle = '#F4F7FB';
                ctx.font = 'bold 11px Consolas';
                ctx.fillText(`t=${(normX * 2).toFixed(2)}s | u=${(val * 5).toFixed(2)}V`, mousePos.x + 13, py - 9);
            }
        }

        sims[canvasId] = {
            start: () => { if (!running) { running = true; render(); } },
            stop: () => { running = false; },
            setMode: (m) => { mode = m; },
            setParams: (f, a) => { freq = f; amp = a; }
        };
    }

    // =========================================================================
    // 2D SIM 2: MULTI-LEVEL BIT RATE SIMULATOR (Slide 10 - Hình 5.3 SGK)
    // =========================================================================
    function initMultiLevel2D(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || sims[canvasId]) return;

        let levels = 2; // 2, 4, or 8
        let bitString = '101100011001011011001010';
        let running = false;

        function renderOnce() {
            const { ctx, w, h } = fitCanvas(canvas);
            ctx.clearRect(0, 0, w, h);
            const padL = 56, padR = 20, padT = 26, padB = 34;
            const plotW = w - padL - padR;
            const plotH = h - padT - padB;

            // Level grid lines
            const bitsPerSymbol = Math.log2(levels);
            const numSymbols = 8; // fixed 8 symbol slots in 1 second!
            ctx.font = '11px Segoe UI';

            for (let lv = 0; lv < levels; lv++) {
                const y = h - padB - (lv / (levels - 1)) * plotH * 0.85 - 10;
                ctx.strokeStyle = 'rgba(50, 213, 242, 0.16)';
                ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
                ctx.fillStyle = '#AAB7C8';
                ctx.fillText(`Mức ${lv + 1}`, 8, y + 4);
            }

            // Axes
            ctx.strokeStyle = '#AAB7C8';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(padL, padT);
            ctx.lineTo(padL, h - padB);
            ctx.lineTo(w - padR, h - padB);
            ctx.stroke();

            // 1s Marker
            ctx.strokeStyle = '#FF6B6B';
            ctx.setLineDash([4, 4]);
            ctx.beginPath(); ctx.moveTo(w - padR - 10, padT); ctx.lineTo(w - padR - 10, h - padB); ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#FF6B6B';
            ctx.font = 'bold 11px Segoe UI';
            ctx.fillText('1s', w - padR - 16, h - 12);

            // Pad bitstring if needed
            const neededBits = numSymbols * bitsPerSymbol;
            let padded = bitString.replace(/[^01]/g, '');
            if (!padded) padded = '10110001';
            while (padded.length < neededBits) padded += padded;
            const activeBits = padded.slice(0, neededBits);

            // Slot separators first (so beginPath does not reset waveform path)
            const symW = (plotW - 10) / numSymbols;
            ctx.strokeStyle = 'rgba(255,255,255,0.08)';
            ctx.lineWidth = 1;
            for (let i = 0; i < numSymbols; i++) {
                const x2 = padL + (i + 1) * symW;
                ctx.beginPath(); ctx.moveTo(x2, padT); ctx.lineTo(x2, h - padB); ctx.stroke();
            }

            // Draw step waveform
            ctx.strokeStyle = levels === 2 ? '#32D5F2' : (levels === 4 ? '#397BFA' : '#2ED573');
            ctx.lineWidth = 3;
            ctx.beginPath();

            for (let i = 0; i < numSymbols; i++) {
                const chunk = activeBits.slice(i * bitsPerSymbol, (i + 1) * bitsPerSymbol);
                const lvIdx = parseInt(chunk, 2);
                const y = h - padB - (lvIdx / (levels - 1)) * plotH * 0.85 - 10;
                const x1 = padL + i * symW;
                const x2 = padL + (i + 1) * symW;

                if (i === 0) ctx.moveTo(x1, y);
                else ctx.lineTo(x1, y);
                ctx.lineTo(x2, y);
            }
            ctx.stroke();

            // Draw bit chunk labels on top of each step
            for (let i = 0; i < numSymbols; i++) {
                const chunk = activeBits.slice(i * bitsPerSymbol, (i + 1) * bitsPerSymbol);
                const lvIdx = parseInt(chunk, 2);
                const y = h - padB - (lvIdx / (levels - 1)) * plotH * 0.85 - 10;
                const cx = padL + (i + 0.5) * symW;

                ctx.fillStyle = '#F4F7FB';
                ctx.font = 'bold 12px Consolas';
                ctx.textAlign = 'center';
                ctx.fillText(chunk, cx, y - 8);
            }
            ctx.textAlign = 'left';

            // Update readout element if present
            const readout = document.getElementById('multilevel-readout');
            if (readout) {
                readout.innerText = `${levels} mức (${bitsPerSymbol} bit/mức) | 8 xung/s → Tốc độ = ${numSymbols * bitsPerSymbol} bit/s`;
            }
        }

        sims[canvasId] = {
            start: () => { running = true; renderOnce(); },
            stop: () => { running = false; },
            setLevels: (lv) => { levels = lv; renderOnce(); },
            setBits: (str) => { bitString = str; renderOnce(); },
            refresh: renderOnce
        };
    }

    // =========================================================================
    // 2D SIM 3: ANALOG VS DIGITAL NOISE BATTLE LAB (Slide 15 / 16)
    // =========================================================================
    function initNoiseBattle2D(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || sims[canvasId]) return;

        let noiseLevel = 0.25; // 0 to 1
        let generations = 1;   // 1 to 10
        let running = false;
        let tick = 0;

        // Pseudo-random deterministic noise table so it shimmers smoothly
        const noiseSeeds = Array.from({ length: 240 }, () => (Math.random() - 0.5) * 2);

        function render() {
            if (!running) return;
            requestAnimationFrame(render);
            tick += 0.04;

            const { ctx, w, h } = fitCanvas(canvas);
            ctx.clearRect(0, 0, w, h);

            const halfH = h / 2;
            const padL = 18, padR = 18;
            const plotW = w - padL - padR;

            // Cumulative distortion factor for Analog
            const analogNoiseMag = noiseLevel * (0.35 + generations * 0.12);

            // --- TOP TRACK: ANALOG ---
            const aMidY = halfH * 0.54;
            const aAmp = halfH * 0.30;

            ctx.fillStyle = '#32D5F2';
            ctx.font = 'bold 12px Segoe UI';
            ctx.fillText(`ANALOG (Tương tự) — Nhiễu tích tụ sau ${generations} lần truyền/sao chép:`, padL, 18);

            // Clean reference dashed
            ctx.strokeStyle = 'rgba(170, 183, 200, 0.35)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            for (let i = 0; i <= 200; i++) {
                const nx = i / 200;
                const x = padL + nx * plotW;
                const y = aMidY - Math.sin(nx * Math.PI * 4 - tick) * aAmp;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.setLineDash([]);

            // Corrupted analog wave
            ctx.strokeStyle = '#FF6B6B';
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            for (let i = 0; i <= 200; i++) {
                const nx = i / 200;
                const x = padL + nx * plotW;
                const nVal = noiseSeeds[i] * Math.sin(tick * 3 + i * 0.7) * analogNoiseMag;
                const y = aMidY - (Math.sin(nx * Math.PI * 4 - tick) * aAmp + nVal * aAmp * 1.4);
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Divider
            ctx.strokeStyle = 'rgba(57, 123, 250, 0.45)';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(0, halfH); ctx.lineTo(w, halfH); ctx.stroke();

            // --- BOTTOM TRACK: DIGITAL ---
            const dTop = halfH + 28;
            const dLowY = h - 20;
            const dHighY = dTop + 14;
            const dThreshY = (dHighY + dLowY) / 2;

            const bits = [1, 0, 1, 1, 0, 0, 1, 0, 1, 0];
            const slotW = plotW / bits.length;

            // Threshold Line
            ctx.strokeStyle = '#FFC048';
            ctx.setLineDash([5, 4]);
            ctx.beginPath(); ctx.moveTo(padL, dThreshY); ctx.lineTo(w - padR, dThreshY); ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#FFC048';
            ctx.font = '10px Segoe UI';
            ctx.fillText('Ngưỡng phân định (2.5V)', w - 140, dThreshY - 4);

            // Noisy received signal before threshold regeneration
            ctx.strokeStyle = 'rgba(255, 107, 107, 0.55)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let i = 0; i <= 200; i++) {
                const nx = i / 200;
                const bitIdx = Math.min(bits.length - 1, Math.floor(nx * bits.length));
                const baseY = bits[bitIdx] === 1 ? dHighY : dLowY;
                const jitter = noiseSeeds[(i + 50) % 240] * Math.cos(tick * 4 + i) * noiseLevel * (dLowY - dHighY) * 0.78;
                const x = padL + nx * plotW;
                const y = Math.max(dTop, Math.min(h - 6, baseY + jitter));
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Regenerated Digital Output
            let errors = 0;
            ctx.strokeStyle = '#2ED573';
            ctx.lineWidth = 2.8;
            ctx.beginPath();
            for (let b = 0; b < bits.length; b++) {
                // Check sample at midpoint of slot
                const midSampleIdx = Math.floor(((b + 0.5) / bits.length) * 200);
                const baseY = bits[b] === 1 ? dHighY : dLowY;
                const jitter = noiseSeeds[(midSampleIdx + 50) % 240] * Math.cos(tick * 4 + midSampleIdx) * noiseLevel * (dLowY - dHighY) * 0.78;
                const sampledY = baseY + jitter;
                const detectedBit = sampledY < dThreshY ? 1 : 0;
                if (detectedBit !== bits[b]) errors++;

                const outY = detectedBit === 1 ? dHighY : dLowY;
                const x1 = padL + b * slotW;
                const x2 = padL + (b + 1) * slotW;
                if (b === 0) ctx.moveTo(x1, outY); else ctx.lineTo(x1, outY);
                ctx.lineTo(x2, outY);

                // Bit status tag
                ctx.fillStyle = detectedBit === bits[b] ? '#2ED573' : '#FF3B3B';
                ctx.font = 'bold 11px Consolas';
                ctx.fillText(detectedBit, (x1 + x2) / 2 - 4, outY + (detectedBit === 1 ? -4 : 12));
            }
            ctx.stroke();

            ctx.fillStyle = errors === 0 ? '#2ED573' : '#FF6B6B';
            ctx.font = 'bold 12px Segoe UI';
            ctx.fillText(
                errors === 0
                    ? `DIGITAL (Số) — Khôi phục hoàn hảo 100% (0 lỗi bit dù sao chép ${generations} lần!)`
                    : `DIGITAL (Số) — Nhiễu cực đại vượt ngưỡng! Phát hiện ${errors} bit lỗi`,
                padL, halfH + 18
            );
        }

        sims[canvasId] = {
            start: () => { if (!running) { running = true; render(); } },
            stop: () => { running = false; },
            setParams: (n, g) => { noiseLevel = n; generations = g; }
        };
    }

    // =========================================================================
    // 2D SIM 4: PCM SAMPLING & DAC RECONSTRUCTION LAB (Slide 19)
    // =========================================================================
    function initPCM2D(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || sims[canvasId]) return;

        let samples = 14;
        let bits = 3; // 2, 3, 4
        let running = false;

        function renderOnce() {
            const { ctx, w, h } = fitCanvas(canvas);
            ctx.clearRect(0, 0, w, h);
            const { padL, padB, padT, padR, plotW, plotH, midY } = drawGrid(ctx, w, h, 46, 30, 22, 16);

            const levels = Math.pow(2, bits);
            const ampPx = plotH * 0.42;

            // Draw quantization grid lines
            ctx.strokeStyle = 'rgba(57, 123, 250, 0.14)';
            ctx.lineWidth = 1;
            for (let lv = 0; lv < levels; lv++) {
                const normY = (lv / (levels - 1)) * 2 - 1;
                const y = midY - normY * ampPx;
                ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
            }

            // 1. Original Analog Sine
            ctx.strokeStyle = 'rgba(50, 213, 242, 0.45)';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            for (let i = 0; i <= 200; i++) {
                const t = i / 200;
                const val = Math.sin(t * Math.PI * 2);
                const x = padL + t * plotW;
                const y = midY - val * ampPx;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.setLineDash([]);

            // 2. Quantized Staircase (DAC raw output)
            let totalErr = 0;
            const quantPts = [];
            const bitStream = [];

            ctx.strokeStyle = '#FFC048';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            const stepW = plotW / samples;
            for (let s = 0; s < samples; s++) {
                const t = (s + 0.5) / samples;
                const realVal = Math.sin(t * Math.PI * 2);
                const norm01 = (realVal + 1) / 2;
                const qIdx = Math.round(norm01 * (levels - 1));
                const qVal = (qIdx / (levels - 1)) * 2 - 1;
                totalErr += Math.abs(realVal - qVal);
                bitStream.push(qIdx.toString(2).padStart(bits, '0'));

                const x1 = padL + s * stepW;
                const x2 = padL + (s + 1) * stepW;
                const qy = midY - qVal * ampPx;
                quantPts.push({ x: (x1 + x2) / 2, y: qy });

                if (s === 0) ctx.moveTo(x1, qy); else ctx.lineTo(x1, qy);
                ctx.lineTo(x2, qy);
            }
            ctx.stroke();

            // 3. DAC Smoothed Curve (Green)
            ctx.strokeStyle = '#2ED573';
            ctx.lineWidth = 2.8;
            ctx.beginPath();
            for (let i = 0; i < quantPts.length; i++) {
                const p = quantPts[i];
                if (i === 0) {
                    ctx.moveTo(p.x, p.y);
                } else {
                    const prev = quantPts[i - 1];
                    const cx = (prev.x + p.x) / 2;
                    ctx.quadraticCurveTo(prev.x, prev.y, cx, (prev.y + p.y) / 2);
                    if (i === quantPts.length - 1) ctx.lineTo(p.x, p.y);
                }
            }
            ctx.stroke();

            // Sample dots
            ctx.fillStyle = '#FF6B6B';
            for (const p of quantPts) {
                ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill();
            }

            // Legend
            ctx.font = 'bold 11px Segoe UI';
            ctx.fillStyle = '#32D5F2'; ctx.fillText('-- Gốc Analog', padL + 8, 15);
            ctx.fillStyle = '#FFC048'; ctx.fillText('▬ Bậc thang DAC', padL + 100, 15);
            ctx.fillStyle = '#2ED573'; ctx.fillText('▬ Sau lọc làm mịn', padL + 215, 15);

            const avgErrPct = ((totalErr / samples) * 50).toFixed(1);
            const readout = document.getElementById('pcm-readout');
            if (readout) {
                readout.innerText = `${bits}-bit (${levels} mức) | ${samples} mẫu | Sai số lượng tử: ${avgErrPct}% | Bits: ${bitStream.slice(0, 5).join(' ')}...`;
            }
        }

        sims[canvasId] = {
            start: () => { running = true; renderOnce(); },
            stop: () => { running = false; },
            setParams: (s, b) => { samples = s; bits = b; renderOnce(); },
            refresh: renderOnce
        };
    }

    // =========================================================================
    // 2D SIM 5: AUDIO STUDIO CHAIN + WEB AUDIO API SOUND DEMO (Slide 20)
    // =========================================================================
    function initAudioStudio2D(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || sims[canvasId]) return;

        let effectMode = 'clean'; // 'clean' | 'noisy' | 'filtered' | 'lowbit'
        let running = false;
        let phase = 0;

        function render() {
            if (!running) return;
            requestAnimationFrame(render);
            phase += 0.05;

            const { ctx, w, h } = fitCanvas(canvas);
            ctx.clearRect(0, 0, w, h);

            // Draw 5 blocks pipeline at top + live waveform at bottom
            const blocks = [
                { label: '1. MICRO', sub: 'Analog', col: '#32D5F2' },
                { label: '2. ADC', sub: 'Số hóa', col: '#397BFA' },
                { label: '3. DSP', sub: effectMode.toUpperCase(), col: '#FFC048' },
                { label: '4. DAC', sub: 'Giải mã', col: '#397BFA' },
                { label: '5. LOA', sub: 'Âm thanh', col: '#2ED573' }
            ];
            const bw = (w - 60) / 5;
            for (let i = 0; i < blocks.length; i++) {
                const bx = 12 + i * (bw + 9);
                const by = 12;
                ctx.fillStyle = '#183B65';
                ctx.strokeStyle = blocks[i].col;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.roundRect ? ctx.roundRect(bx, by, bw, 46, 6) : ctx.rect(bx, by, bw, 46);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#F4F7FB';
                ctx.font = 'bold 11px Segoe UI';
                ctx.textAlign = 'center';
                ctx.fillText(blocks[i].label, bx + bw / 2, by + 20);
                ctx.fillStyle = blocks[i].col;
                ctx.font = '10px Consolas';
                ctx.fillText(blocks[i].sub, bx + bw / 2, by + 36);

                if (i < 4) {
                    ctx.fillStyle = '#AAB7C8';
                    ctx.fillText('→', bx + bw + 4.5, by + 28);
                }
            }
            ctx.textAlign = 'left';

            // Animated travelling dot along blocks
            const pulseX = 12 + ((phase * 30) % (w - 24));
            ctx.fillStyle = '#32D5F2';
            ctx.beginPath(); ctx.arc(pulseX, 66, 4, 0, Math.PI * 2); ctx.fill();

            // Output waveform at bottom
            const midY = (h + 74) / 2;
            const amp = (h - 90) * 0.42;
            ctx.strokeStyle = effectMode === 'noisy' ? '#FF6B6B' : (effectMode === 'lowbit' ? '#FFC048' : '#2ED573');
            ctx.lineWidth = 2.6;
            ctx.beginPath();
            for (let i = 0; i <= 200; i++) {
                const t = i / 200;
                const x = 16 + t * (w - 32);
                let val = Math.sin(t * Math.PI * 6 - phase);
                if (effectMode === 'noisy') {
                    val += (Math.sin(t * 97 + phase * 5) * 0.35);
                } else if (effectMode === 'lowbit') {
                    // 2-bit severe quantization
                    val = Math.round(((val + 1) / 2) * 3) / 3 * 2 - 1;
                }
                const y = midY - val * amp;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        function playTone() {
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (!AudioCtx) return;
                const actx = new AudioCtx();
                const duration = 1.2;
                const sampleRate = actx.sampleRate;
                const buffer = actx.createBuffer(1, sampleRate * duration, sampleRate);
                const data = buffer.getChannelData(0);

                for (let i = 0; i < data.length; i++) {
                    const t = i / sampleRate;
                    // Smooth fade in/out envelope
                    const env = Math.min(1, t * 10) * Math.min(1, (duration - t) * 10);
                    let v = 0.28 * Math.sin(2 * Math.PI * 440 * t); // A4 musical note
                    if (effectMode === 'noisy') {
                        v += (Math.random() - 0.5) * 0.25;
                    } else if (effectMode === 'lowbit') {
                        // harsh 2-bit staircase quantization audible buzz
                        v = (Math.round(((v / 0.28 + 1) / 2) * 3) / 3 * 2 - 1) * 0.28;
                    }
                    data[i] = v * env;
                }
                const src = actx.createBufferSource();
                src.buffer = buffer;
                src.connect(actx.destination);
                src.start();
            } catch (e) {
                console.warn('Web Audio API unavailable:', e);
            }
        }

        sims[canvasId] = {
            start: () => { if (!running) { running = true; render(); } },
            stop: () => { running = false; },
            setMode: (m) => { effectMode = m; },
            playSound: playTone
        };
    }

    return {
        initAnalog2D,
        initMultiLevel2D,
        initNoiseBattle2D,
        initPCM2D,
        initAudioStudio2D,
        get: (id) => sims[id],
        pauseAll: () => {
            Object.values(sims).forEach(s => s.stop && s.stop());
        }
    };
})();
