/**
 * Main Presentation Controller & Simulation Lifecycle Manager
 * Vật lí 11 – Chuyên đề II – Bài 5: Tín hiệu tương tự và Tín hiệu số
 */

(function () {
    const slides = window.SLIDES_DATA || [];
    let currentIndex = 0;
    let notesVisible = false;
    let overviewOpen = false;
    let laserActive = false;
    let currentZoom = parseFloat(localStorage.getItem('thuyettrinh_zoom') || '1.0');

    const initializedSims = new Set();
    const adc3dState = { samples: 16, bits: 3 };
    const pcm2dState = { samples: 14, bits: 3 };

    // Map slide number -> { type: '3d'|'2d', id: string, init: Function }
    const SLIDE_SIM_MAP = {
        1:  { type: '3d', id: 'sim3d-hero',       init: () => window.Sim3DManager?.initHero3D('sim3d-hero') },
        3:  { type: '2d', id: 'sim2d-analog',     init: () => window.Sim2DManager?.initAnalog2D('sim2d-analog') },
        5:  { type: '3d', id: 'sim3d-phasor',     init: () => window.Sim3DManager?.initPhasor3D('sim3d-phasor') },
        10: { type: '2d', id: 'sim2d-multilevel', init: () => window.Sim2DManager?.initMultiLevel2D('sim2d-multilevel') },
        15: { type: '2d', id: 'sim2d-noise',      init: () => window.Sim2DManager?.initNoiseBattle2D('sim2d-noise') },
        18: { type: '3d', id: 'sim3d-adc',        init: () => window.Sim3DManager?.initADC3D('sim3d-adc') },
        19: { type: '2d', id: 'sim2d-pcm',        init: () => window.Sim2DManager?.initPCM2D('sim2d-pcm') },
        20: { type: '2d', id: 'sim2d-audio',      init: () => window.Sim2DManager?.initAudioStudio2D('sim2d-audio') },
        21: { type: '3d', id: 'sim3d-rf',         init: () => window.Sim3DManager?.initRadio3D('sim3d-rf') }
    };

    function pad2(n) {
        return String(n).padStart(2, '0');
    }

    function renderDeck() {
        const deck = document.getElementById('deck');
        if (!deck) return;

        slides.forEach((s, idx) => {
            const section = document.createElement('section');
            section.className = 'slide' + (idx === 0 ? ' active' : '');
            section.dataset.index = idx;

            const titleStyle = s.isCover
                ? 'font-size: clamp(1.45rem, 2.35vw, 2.05rem); background: linear-gradient(90deg, #F4F7FB, #32D5F2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
                : '';

            const subtitleHtml = s.subtitle
                ? `<div style="color:#AAB7C8; font-size:0.9rem; margin-top:4px;">${s.subtitle}</div>`
                : '';

            section.innerHTML = `
                <header class="slide-header">
                    <div>
                        <div class="slide-tag">${s.tag || ''}</div>
                        <h1 class="slide-title" style="${titleStyle}">${s.title}</h1>
                        ${subtitleHtml}
                    </div>
                    <div class="slide-number">${pad2(s.num)} / ${pad2(slides.length)}</div>
                </header>
                <div class="slide-body">
                    ${s.content_html}
                </div>
            `;
            deck.appendChild(section);
        });
    }

    function renderOverview() {
        const grid = document.getElementById('overview-grid');
        if (!grid) return;

        grid.innerHTML = slides.map((s, idx) => `
            <div class="overview-item ${idx === currentIndex ? 'current' : ''}" data-idx="${idx}" onclick="goToSlide(${idx}); toggleOverview(false);">
                <div class="ov-num">SLIDE ${pad2(s.num)}</div>
                <div class="ov-title">${s.title}</div>
                ${s.simBadge ? `<span class="ov-badge">⚡ ${s.simBadge}</span>` : ''}
            </div>
        `).join('');
    }

    function activateSlideSim(slideNum) {
        if (window.Sim3DManager) window.Sim3DManager.pauseAll();
        if (window.Sim2DManager) window.Sim2DManager.pauseAll();

        const cfg = SLIDE_SIM_MAP[slideNum];
        if (!cfg) return;

        const mgr = cfg.type === '3d' ? window.Sim3DManager : window.Sim2DManager;
        if (!mgr) return;

        if (!initializedSims.has(cfg.id)) {
            try {
                cfg.init();
                initializedSims.add(cfg.id);
            } catch (err) {
                console.error('Lỗi khởi tạo mô phỏng:', cfg.id, err);
            }
        }

        const ctrl = mgr.get(cfg.id);
        if (ctrl && typeof ctrl.start === 'function') {
            ctrl.start();
        }
        requestAnimationFrame(() => {
            window.dispatchEvent(new Event('resize'));
        });
    }

    function updateUI() {
        const slideEls = document.querySelectorAll('.slide');
        slideEls.forEach((el, i) => el.classList.toggle('active', i === currentIndex));

        const s = slides[currentIndex];
        if (!s) return;

        const total = slides.length;
        const pct = ((currentIndex + 1) / total) * 100;

        const progressEl = document.getElementById('progress-fill');
        if (progressEl) progressEl.style.width = `${pct}%`;

        const counterEl = document.getElementById('slide-counter');
        if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${total}`;

        const notesLabel = document.getElementById('notes-slide-label');
        if (notesLabel) notesLabel.textContent = `Slide ${s.num} / ${total}`;

        const notesContent = document.getElementById('notes-content');
        if (notesContent) notesContent.textContent = s.notes || 'Không có ghi chú thêm cho slide này.';

        document.querySelectorAll('.overview-item').forEach((item, i) => {
            item.classList.toggle('current', i === currentIndex);
        });

        activateSlideSim(s.num);
    }

    window.goToSlide = function (index) {
        if (!slides.length) return;
        currentIndex = Math.max(0, Math.min(slides.length - 1, index));
        updateUI();
    };

    window.nextSlide = function () {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateUI();
        }
    };

    window.prevSlide = function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateUI();
        }
    };

    window.toggleNotes = function (forceState) {
        notesVisible = typeof forceState === 'boolean' ? forceState : !notesVisible;
        const drawer = document.getElementById('notes-drawer');
        const btn = document.getElementById('btn-notes');
        if (drawer) drawer.style.display = notesVisible ? 'block' : 'none';
        if (btn) btn.classList.toggle('active-toggle', notesVisible);
    };

    window.toggleOverview = function (forceState) {
        overviewOpen = typeof forceState === 'boolean' ? forceState : !overviewOpen;
        const modal = document.getElementById('overview-modal');
        const btn = document.getElementById('btn-overview');
        if (modal) modal.classList.toggle('open', overviewOpen);
        if (btn) btn.classList.toggle('active-toggle', overviewOpen);
    };

    window.toggleLaser = function (forceState) {
        laserActive = typeof forceState === 'boolean' ? forceState : !laserActive;
        document.body.classList.toggle('laser-active', laserActive);
        const btn = document.getElementById('btn-laser');
        if (btn) btn.classList.toggle('active-toggle', laserActive);
    };

    window.toggleFullscreen = function () {
        const deck = document.getElementById('deck');
        if (!deck) return;
        if (!document.fullscreenElement) {
            deck.requestFullscreen?.().catch(() => {});
        } else {
            document.exitFullscreen?.().catch(() => {});
        }
    };

    // Zoom Controls
    function applyZoom(val) {
        currentZoom = Math.max(0.75, Math.min(1.6, Math.round(val * 100) / 100));
        document.documentElement.style.setProperty('--content-zoom', currentZoom.toFixed(2));
        const pill = document.getElementById('zoom-val');
        if (pill) pill.textContent = Math.round(currentZoom * 100) + '%';
        try { localStorage.setItem('thuyettrinh_zoom', currentZoom.toFixed(2)); } catch (e) {}
        window.dispatchEvent(new Event('resize'));
    }

    window.zoomIn = function () {
        applyZoom(currentZoom + 0.1);
    };

    window.zoomOut = function () {
        applyZoom(currentZoom - 0.1);
    };

    window.resetZoom = function () {
        applyZoom(1.0);
    };

    // Recording Aliases
    window.startVideoRecording = function () {
        window.PresentationRecorder?.startVideoRecording();
    };

    window.startAudioRecording = function () {
        window.PresentationRecorder?.startAudioRecording();
    };

    window.togglePauseRecording = function () {
        window.PresentationRecorder?.togglePauseRecording();
    };

    window.stopRecording = function () {
        window.PresentationRecorder?.stopRecording();
    };

    window.closeReviewModal = function () {
        window.PresentationRecorder?.closeReviewModal();
    };

    window.downloadRecordingAgain = function () {
        window.PresentationRecorder?.downloadAgain();
    };

    // Helper for toggling active button groups cleanly
    function setActiveBtn(ids, activeId) {
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.classList.toggle('active', id === activeId);
        });
    }

    // =========================================================================
    // GLOBAL SIMULATION CALLBACKS USED BY INLINE SLIDE CONTROLS
    // =========================================================================

    // Slide 3: Analog 2D Explorer
    window.setAnalogMode = function (mode) {
        const map = { periodic: 'btn-analog-per', nonperiodic: 'btn-analog-non', draw: 'btn-analog-draw' };
        setActiveBtn(Object.values(map), map[mode]);
        window.Sim2DManager?.get('sim2d-analog')?.setMode(mode);
    };

    window.updateAnalogParams = function () {
        const f = parseFloat(document.getElementById('analog-freq')?.value || '2');
        const a = parseFloat(document.getElementById('analog-amp')?.value || '0.8');
        window.Sim2DManager?.get('sim2d-analog')?.setParams(f, a);
    };

    // Slide 5: Phasor 3D Simulation
    window.updatePhasor3D = function () {
        const f = parseFloat(document.getElementById('phasor-freq')?.value || '50');
        const a = parseFloat(document.getElementById('phasor-amp')?.value || '1.0');
        const periodMs = (1000 / f).toFixed(1);
        const readout = document.getElementById('phasor-readout');
        if (readout) readout.textContent = `f = ${f} Hz → T = ${periodMs} ms`;
        window.Sim3DManager?.get('sim3d-phasor')?.setParams(f, a);
    };

    // Slide 10: Multi-level 2D Simulation
    window.setMultiLevel = function (levels) {
        const map = { 2: 'btn-lvl-2', 4: 'btn-lvl-4', 8: 'btn-lvl-8' };
        setActiveBtn(Object.values(map), map[levels]);
        window.Sim2DManager?.get('sim2d-multilevel')?.setLevels(levels);
    };

    window.updateMultiBits = function () {
        const input = document.getElementById('multi-bits-input');
        if (!input) return;
        const clean = input.value.replace(/[^01]/g, '');
        if (clean !== input.value) input.value = clean;
        window.Sim2DManager?.get('sim2d-multilevel')?.setBits(clean || '10110001');
    };

    window.randomizeMultiBits = function () {
        let bits = '';
        for (let i = 0; i < 24; i++) bits += Math.random() > 0.5 ? '1' : '0';
        const input = document.getElementById('multi-bits-input');
        if (input) input.value = bits;
        window.Sim2DManager?.get('sim2d-multilevel')?.setBits(bits);
    };

    // Slide 15: Noise Battle 2D Lab
    window.updateNoiseBattle = function () {
        const noise = parseFloat(document.getElementById('noise-lvl')?.value || '0.25');
        const gen = parseInt(document.getElementById('gen-lvl')?.value || '1', 10);
        const nEl = document.getElementById('noise-val');
        const gEl = document.getElementById('gen-val');
        if (nEl) nEl.textContent = `${Math.round(noise * 100)}%`;
        if (gEl) gEl.textContent = `${gen} lần`;
        window.Sim2DManager?.get('sim2d-noise')?.setParams(noise, gen);
    };

    // Slide 18: ADC 3D Quantization Chamber
    window.updateADC3D = function () {
        const samples = parseInt(document.getElementById('adc3d-samples')?.value || '16', 10);
        adc3dState.samples = samples;
        const sEl = document.getElementById('adc3d-sval');
        if (sEl) sEl.textContent = String(samples);
        window.Sim3DManager?.get('sim3d-adc')?.setParams(adc3dState.samples, adc3dState.bits);
    };

    window.setADC3DBits = function (bits) {
        adc3dState.bits = bits;
        const map = { 2: 'btn-adc-2b', 3: 'btn-adc-3b', 4: 'btn-adc-4b' };
        setActiveBtn(Object.values(map), map[bits]);
        window.Sim3DManager?.get('sim3d-adc')?.setParams(adc3dState.samples, adc3dState.bits);
    };

    // Slide 19: DAC / PCM 2D Reconstruction
    function syncPCMReadout() {
        const el = document.getElementById('pcm-readout');
        if (el) {
            const levels = Math.pow(2, pcm2dState.bits);
            el.textContent = `${pcm2dState.bits}-bit (${levels} mức) | ${pcm2dState.samples} mẫu`;
        }
    }

    window.updatePCM2D = function () {
        pcm2dState.samples = parseInt(document.getElementById('pcm-samples')?.value || '14', 10);
        syncPCMReadout();
        window.Sim2DManager?.get('sim2d-pcm')?.setParams(pcm2dState.samples, pcm2dState.bits);
    };

    window.setPCMBits = function (bits) {
        pcm2dState.bits = bits;
        const map = { 2: 'btn-pcm-2b', 3: 'btn-pcm-3b', 4: 'btn-pcm-4b' };
        setActiveBtn(Object.values(map), map[bits]);
        syncPCMReadout();
        window.Sim2DManager?.get('sim2d-pcm')?.setParams(pcm2dState.samples, pcm2dState.bits);
    };

    // Slide 20: Audio Studio 2D
    window.setAudioMode = function (mode) {
        const map = {
            clean: 'btn-aud-clean',
            noisy: 'btn-aud-noisy',
            filtered: 'btn-aud-filtered',
            lowbit: 'btn-aud-lowbit'
        };
        setActiveBtn(Object.values(map), map[mode]);
        window.Sim2DManager?.get('sim2d-audio')?.setMode(mode);
    };

    // =========================================================================
    // KEYBOARD & MOUSE EVENT LISTENERS
    // =========================================================================

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overviewOpen) {
            toggleOverview(false);
            return;
        }

        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        switch (e.key) {
            case 'ArrowRight':
            case 'PageDown':
                e.preventDefault();
                nextSlide();
                break;
            case ' ':
                if (tag !== 'BUTTON') {
                    e.preventDefault();
                    nextSlide();
                }
                break;
            case 'ArrowLeft':
            case 'PageUp':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(slides.length - 1);
                break;
            case 's':
            case 'S':
                toggleNotes();
                break;
            case 'g':
            case 'G':
                toggleOverview();
                break;
            case 'f':
            case 'F':
                toggleFullscreen();
                break;
            case 'l':
            case 'L':
                toggleLaser();
                break;
            case '+':
            case '=':
                e.preventDefault();
                zoomIn();
                break;
            case '-':
            case '_':
                e.preventDefault();
                zoomOut();
                break;
            case '0':
                e.preventDefault();
                resetZoom();
                break;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!laserActive) return;
        const dot = document.getElementById('laser-dot');
        if (dot) {
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
        }
    });

    document.addEventListener('fullscreenchange', () => {
        setTimeout(() => window.dispatchEvent(new Event('resize')), 120);
    });

    // Boot presentation
    document.addEventListener('DOMContentLoaded', () => {
        applyZoom(currentZoom);
        renderDeck();
        renderOverview();
        updateUI();
    });
})();
