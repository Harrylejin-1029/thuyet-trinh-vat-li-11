/**
 * Mô phỏng 2D Canvas tương tác — Bài 4: Biến điệu (AM & FM)
 * Vật lí 11 — Chuyên đề II: Truyền thông tin bằng sóng vô tuyến
 */

window.Sim2DBai4Manager = (function () {
    const instances = {};

    class BaseSim {
        constructor(containerId) {
            this.containerId = containerId;
            this.container = document.getElementById(containerId);
            this.canvas = null;
            this.ctx = null;
            this.animId = null;
            this.running = true;
            this.time = 0;
            this.speed = 1.0;
            this.width = 600;
            this.height = 300;
        }

        setupCanvas() {
            if (!this.container) return false;
            this.container.innerHTML = '';
            this.canvas = document.createElement('canvas');
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.style.display = 'block';
            this.container.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            window.addEventListener('resize', () => this.resize());
            return true;
        }

        resize() {
            if (!this.container || !this.canvas) return;
            const rect = this.container.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            this.width = rect.width || 600;
            this.height = rect.height || 280;
            this.canvas.width = this.width * dpr;
            this.canvas.height = this.height * dpr;
            this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        start() {
            this.running = true;
            const loop = () => {
                if (this.running) {
                    this.update();
                    this.draw();
                }
                this.animId = requestAnimationFrame(loop);
            };
            loop();
        }

        pause() {
            this.running = false;
            if (this.animId) cancelAnimationFrame(this.animId);
        }

        resume() {
            if (!this.running) {
                this.running = true;
            }
        }

        togglePlay() {
            this.running = !this.running;
        }

        update() {
            this.time += 0.016 * this.speed;
        }

        draw() {}
    }

    // =========================================================================
    // 1. LAB DẠNG SÓNG AM (AM WAVEFORM LAB) - SLIDE 5
    // =========================================================================
    class AMWaveSim extends BaseSim {
        constructor(id) {
            super(id);
            this.fm = 2.0;      // Tần số âm tần
            this.fc = 25.0;     // Tần số sóng mang
            this.m = 0.7;       // Hệ số điều chế
            this.showEnvelope = true;
        }

        init() {
            if (!this.setupCanvas()) return;
            this.start();
        }

        setFm(v) { this.fm = parseFloat(v); }
        setFc(v) { this.fc = parseFloat(v); }
        setM(v) { this.m = parseFloat(v); }
        toggleEnvelope() { this.showEnvelope = !this.showEnvelope; }

        draw() {
            const ctx = this.ctx;
            const w = this.width;
            const h = this.height;

            ctx.clearRect(0, 0, w, h);

            // Nền tối với lưới kỹ thuật
            ctx.fillStyle = '#080C14';
            ctx.fillRect(0, 0, w, h);

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            for (let x = 0; x < w; x += 40) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
            }

            const laneH = h / 3;

            // Đường trục tọa độ
            [laneH * 0.5, laneH * 1.5, laneH * 2.5].forEach((cy, idx) => {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
                ctx.setLineDash([4, 4]);
                ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
                ctx.setLineDash([]);

                // Nhãn kênh
                ctx.fillStyle = idx === 0 ? '#F59E0B' : (idx === 1 ? '#00E5FF' : '#A855F7');
                ctx.font = 'bold 11px sans-serif';
                const label = idx === 0 ? '1. Tín hiệu âm tần s(t) [fm]' :
                              idx === 1 ? '2. Sóng mang cao tần c(t) [fc]' :
                              `3. Sóng điều chế AM: s_AM(t) (m = ${this.m.toFixed(1)})`;
                ctx.fillText(label, 14, cy - laneH * 0.35);
            });

            // 1. Vẽ sóng âm tần s(t) (Lane 1)
            const cy1 = laneH * 0.5;
            const amp1 = laneH * 0.35;
            ctx.strokeStyle = '#F59E0B';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            for (let x = 0; x < w; x++) {
                const t = this.time + (x / w) * 2;
                const y = cy1 - Math.sin(2 * Math.PI * this.fm * t) * amp1;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // 2. Vẽ sóng mang c(t) (Lane 2)
            const cy2 = laneH * 1.5;
            const amp2 = laneH * 0.35;
            ctx.strokeStyle = '#00E5FF';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let x = 0; x < w; x++) {
                const t = this.time + (x / w) * 2;
                const y = cy2 - Math.sin(2 * Math.PI * this.fc * t) * amp2;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // 3. Vẽ sóng điều chế AM s_AM(t) (Lane 3)
            const cy3 = laneH * 2.5;
            const amp3 = laneH * 0.32;

            // Đường bao (Envelope)
            if (this.showEnvelope) {
                ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
                ctx.lineWidth = 1.8;
                ctx.setLineDash([3, 3]);

                // Đường bao trên
                ctx.beginPath();
                for (let x = 0; x < w; x++) {
                    const t = this.time + (x / w) * 2;
                    const audio = Math.sin(2 * Math.PI * this.fm * t);
                    const env = (1 + this.m * audio) * amp3;
                    const y = cy3 - env;
                    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.stroke();

                // Đường bao dưới
                ctx.beginPath();
                for (let x = 0; x < w; x++) {
                    const t = this.time + (x / w) * 2;
                    const audio = Math.sin(2 * Math.PI * this.fm * t);
                    const env = (1 + this.m * audio) * amp3;
                    const y = cy3 + env;
                    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Sóng AM thực tế
            ctx.strokeStyle = '#A855F7';
            ctx.lineWidth = 2.0;
            ctx.beginPath();
            for (let x = 0; x < w; x++) {
                const t = this.time + (x / w) * 2;
                const audio = Math.sin(2 * Math.PI * this.fm * t);
                const carrier = Math.sin(2 * Math.PI * this.fc * t);
                const am = (1 + this.m * audio) * amp3 * carrier;
                const y = cy3 - am;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Cảnh báo nếu m > 1 (quá điều chế)
            if (this.m > 1.0) {
                ctx.fillStyle = '#EF4444';
                ctx.font = 'bold 12px sans-serif';
                ctx.fillText(`⚠️ CẢNH BÁO: QUÁ BIẾN ĐIỆU (m = ${this.m.toFixed(1)} > 1.0) — ĐƯỜNG BAO BỊ GIAO CẮT GÂY MÉO TIẾNG!`, 20, h - 14);
            }
        }
    }

    // =========================================================================
    // 2. LAB DẠNG SÓNG FM (FM WAVEFORM LAB) - SLIDE 10
    // =========================================================================
    class FMWaveSim extends BaseSim {
        constructor(id) {
            super(id);
            this.fm = 1.5;
            this.fc = 28.0;
            this.deltaF = 12.0;
        }

        init() {
            if (!this.setupCanvas()) return;
            this.start();
        }

        setFm(v) { this.fm = parseFloat(v); }
        setFc(v) { this.fc = parseFloat(v); }
        setDeltaF(v) { this.deltaF = parseFloat(v); }

        draw() {
            const ctx = this.ctx;
            const w = this.width;
            const h = this.height;

            ctx.clearRect(0, 0, w, h);

            ctx.fillStyle = '#080C14';
            ctx.fillRect(0, 0, w, h);

            const laneH = h / 3;

            // Đường trục
            [laneH * 0.5, laneH * 1.5, laneH * 2.5].forEach((cy, idx) => {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
                ctx.setLineDash([4, 4]);
                ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = idx === 0 ? '#F59E0B' : (idx === 1 ? '#00E5FF' : '#38BDF8');
                ctx.font = 'bold 11px sans-serif';
                const label = idx === 0 ? '1. Tín hiệu âm tần điều khiển v(t) [Điện áp]' :
                              idx === 1 ? '2. Sóng mang không điều chế c(t) [fc]' :
                              `3. Sóng điều chế FM: Biên độ phẳng tuyệt đối — Tần số co giãn (Δf = ${this.deltaF.toFixed(0)})`;
                ctx.fillText(label, 14, cy - laneH * 0.35);
            });

            // 1. Sóng âm tần (Lane 1)
            const cy1 = laneH * 0.5;
            const amp1 = laneH * 0.35;
            ctx.strokeStyle = '#F59E0B';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            for (let x = 0; x < w; x++) {
                const t = this.time + (x / w) * 2;
                const y = cy1 - Math.sin(2 * Math.PI * this.fm * t) * amp1;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // 2. Sóng mang gốc (Lane 2)
            const cy2 = laneH * 1.5;
            const amp2 = laneH * 0.35;
            ctx.strokeStyle = '#00E5FF';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let x = 0; x < w; x++) {
                const t = this.time + (x / w) * 2;
                const y = cy2 - Math.sin(2 * Math.PI * this.fc * t) * amp2;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // 3. Sóng FM (Lane 3)
            const cy3 = laneH * 2.5;
            const amp3 = laneH * 0.35;

            // Kẻ 2 vạch biên độ đỉnh phẳng
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 4]);
            ctx.beginPath(); ctx.moveTo(0, cy3 - amp3); ctx.lineTo(w, cy3 - amp3); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, cy3 + amp3); ctx.lineTo(w, cy3 + amp3); ctx.stroke();
            ctx.setLineDash([]);

            // Tính tích phân pha để vẽ sóng FM: s_FM(t) = A * cos(2*pi*fc*t + beta*sin(2*pi*fm*t))
            const beta = (this.deltaF / this.fm) * 0.4;
            ctx.strokeStyle = '#38BDF8';
            ctx.lineWidth = 2.0;
            ctx.beginPath();
            for (let x = 0; x < w; x++) {
                const t = this.time + (x / w) * 2;
                const phase = 2 * Math.PI * this.fc * t - beta * Math.cos(2 * Math.PI * this.fm * t);
                const y = cy3 - Math.sin(phase) * amp3;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Hiển thị chú thích trực quan vùng dày/thưa
            ctx.fillStyle = '#94A3B8';
            ctx.font = '10px sans-serif';
            ctx.fillText('← Vùng tần số cao (sóng ép sát) | Vùng tần số thấp (sóng giãn rộng) →', w * 0.5 - 150, h - 8);
        }
    }

    // =========================================================================
    // 3. LAB ĐỐI ĐẦU KHÁNG NHIỄU AM VS FM (NOISE BATTLE) - SLIDE 15
    // =========================================================================
    class NoiseBattleSim extends BaseSim {
        constructor(id) {
            super(id);
            this.noiseEnabled = true;
            this.noiseSeeds = [];
            for (let i = 0; i < 40; i++) {
                this.noiseSeeds.push({ x: Math.random(), val: (Math.random() - 0.5) * 1.8 });
            }
        }

        init() {
            if (!this.setupCanvas()) return;
            this.start();
        }

        toggleNoise() {
            this.noiseEnabled = !this.noiseEnabled;
            const btn = document.getElementById('btn-toggle-noise');
            if (btn) {
                if (this.noiseEnabled) {
                    btn.classList.add('sim-btn-active');
                    btn.innerText = '⚡ TẮT NHIỄU BIÊN ĐỘ';
                } else {
                    btn.classList.remove('sim-btn-active');
                    btn.innerText = '⚡ BẬT NHIỄU BIÊN ĐỘ';
                }
            }
        }

        draw() {
            const ctx = this.ctx;
            const w = this.width;
            const h = this.height;

            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#0A0F1A';
            ctx.fillRect(0, 0, w, h);

            const laneH = h / 2;

            // Kênh 1: AM khi bị nhiễu
            const cy1 = laneH * 0.5;
            const amp1 = laneH * 0.32;
            ctx.fillStyle = '#F59E0B';
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText('📻 SÓNG AM DƯỚI TÁC ĐỘNG CỦA NHIỄU SẤM SÉT (ĐƯỜNG BAO BỊ MÉO MÓ NGHIÊM TRỌNG)', 14, 24);

            // Kênh 2: FM khi có mạch Limiter cắt gọt nhiễu
            const cy2 = laneH * 1.5;
            const amp2 = laneH * 0.32;
            ctx.fillStyle = '#00E5FF';
            ctx.fillText('📡 SÓNG FM ĐƯỢC MẠCH LIMITER GỌT PHẲNG NHIỄU (TẦN SỐ NGUYÊN VẸN 100%)', 14, laneH + 24);

            // Sinh nhiễu sấm sét ngẫu nhiên
            const getNoise = (x) => {
                if (!this.noiseEnabled) return 0;
                let n = 0;
                // Thỉnh thoảng có xung sét cực mạnh
                const phase = (this.time * 2 + x / w) % 1;
                if (Math.abs(phase - 0.3) < 0.015 || Math.abs(phase - 0.7) < 0.012) {
                    n = (Math.random() - 0.5) * 1.6;
                }
                return n;
            };

            // Vẽ sóng AM
            ctx.strokeStyle = '#F59E0B';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            for (let x = 0; x < w; x++) {
                const t = this.time + (x / w) * 2;
                const audio = Math.sin(2 * Math.PI * 1.8 * t);
                const carrier = Math.sin(2 * Math.PI * 22 * t);
                const noise = getNoise(x);
                const am = (1 + 0.65 * audio + noise) * amp1 * carrier;
                const y = cy1 - am;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Vẽ sóng FM qua mạch Limiter
            ctx.strokeStyle = '#00E5FF';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            for (let x = 0; x < w; x++) {
                const t = this.time + (x / w) * 2;
                const phase = 2 * Math.PI * 24 * t - 3.5 * Math.cos(2 * Math.PI * 1.8 * t);
                const noise = getNoise(x);
                let fm = Math.sin(phase) + noise * 0.4;
                // Mạch Limiter gọt bằng biên độ ở [-1, 1]
                if (fm > 1.0) fm = 1.0;
                if (fm < -1.0) fm = -1.0;
                const y = cy2 - fm * amp2;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Hiển thị trạng thái âm thanh
            if (this.noiseEnabled) {
                ctx.fillStyle = '#EF4444';
                ctx.font = 'bold 11px sans-serif';
                ctx.fillText('🔊 Âm thanh AM: Tiếng nổ lẹt đẹt, rè rẹt chói tai!', w - 310, cy1 + amp1 + 18);
                ctx.fillStyle = '#10B981';
                ctx.fillText('🎵 Âm thanh FM: Trong trẻo, mượt mà, không tiếng rè!', w - 310, cy2 + amp2 + 18);
            }
        }
    }

    return {
        initAMWave: (id) => {
            if (!instances[id]) instances[id] = new AMWaveSim(id);
            instances[id].init();
            return instances[id];
        },
        initFMWave: (id) => {
            if (!instances[id]) instances[id] = new FMWaveSim(id);
            instances[id].init();
            return instances[id];
        },
        initNoiseLab: (id) => {
            if (!instances[id]) instances[id] = new NoiseBattleSim(id);
            instances[id].init();
            return instances[id];
        },
        get: (id) => instances[id],
        pauseAll: () => {
            Object.values(instances).forEach(sim => sim.pause());
        },
        resumeAll: () => {
            Object.values(instances).forEach(sim => sim.resume());
        }
    };
})();
