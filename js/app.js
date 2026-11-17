/**
 * Main Presentation Controller & Multi-Lesson Lifecycle Manager
 * Vật lí 11 – Chuyên đề II: Truyền thông tin bằng sóng vô tuyến
 * Hỗ trợ Bài 4 (Biến điệu AM/FM) & Bài 5 (Tín hiệu tương tự & số)
 */

(function () {
    let currentLesson = 'bai4'; // Mặc định mở Bài 4 theo yêu cầu
    let slides = [];
    let currentIndex = 0;
    let notesVisible = false;
    let overviewOpen = false;
    let laserActive = false;
    let currentZoom = parseFloat(localStorage.getItem('thuyettrinh_zoom') || '1.0');

    const initializedSims = new Set();
    const adc3dState = { samples: 16, bits: 3 };
    const pcm2dState = { samples: 14, bits: 3 };

    // =========================================================================
    // SIMULATION MAPPINGS FOR LESSON 4 AND LESSON 5
    // =========================================================================
    const SIM_MAP_BAI4 = {
        1:  { type: '3d-bai4', id: 'sim3d-ionosphere-hero', init: () => window.Sim3DBai4Manager?.initHero3D('sim3d-ionosphere-hero') },
        5:  { type: '2d-bai4', id: 'sim2d-am-wave',         init: () => window.Sim2DBai4Manager?.initAMWave('sim2d-am-wave') },
        10: { type: '2d-bai4', id: 'sim2d-fm-wave',         init: () => window.Sim2DBai4Manager?.initFMWave('sim2d-fm-wave') },
        15: { type: '2d-bai4', id: 'sim2d-noise-lab',       init: () => window.Sim2DBai4Manager?.initNoiseLab('sim2d-noise-lab') }
    };

    const SIM_MAP_BAI5 = {
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

    function getActiveSimMap() {
        return currentLesson === 'bai4' ? SIM_MAP_BAI4 : SIM_MAP_BAI5;
    }

    function pauseAllSimulations() {
        if (window.Sim3DBai4Manager) window.Sim3DBai4Manager.pauseAll();
        if (window.Sim2DBai4Manager) window.Sim2DBai4Manager.pauseAll();
        if (window.Sim3DManager) window.Sim3DManager.pauseAll();
        if (window.Sim2DManager) window.Sim2DManager.pauseAll();
    }

    function loadLessonData(lessonKey) {
        currentLesson = lessonKey;
        if (lessonKey === 'bai4') {
            slides = window.SLIDES_DATA_BAI4 || [];
        } else {
            slides = window.SLIDES_DATA || [];
        }
    }

    function renderDeck() {
        const deck = document.getElementById('deck');
        if (!deck) return;

        // Lưu giữ thanh progress-track
        const progressTrack = deck.querySelector('.progress-track');
        deck.innerHTML = '';
        if (progressTrack) deck.appendChild(progressTrack);

        slides.forEach((s, idx) => {
            const section = document.createElement('section');
            section.className = 'slide' + (idx === currentIndex ? ' active' : '');
            section.dataset.index = idx;

            const titleStyle = s.isCover
                ? (currentLesson === 'bai4'
                    ? 'font-size: clamp(1.45rem, 2.35vw, 2.05rem); background: linear-gradient(90deg, #F8FAFC, #F59E0B); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
                    : 'font-size: clamp(1.45rem, 2.35vw, 2.05rem); background: linear-gradient(90deg, #F4F7FB, #32D5F2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;')
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
        const titleEl = document.getElementById('overview-modal-title');
        if (titleEl) {
            titleEl.textContent = currentLesson === 'bai4'
                ? 'MỤC LỤC 22 SLIDE — BÀI 4: BIẾN ĐIỆU (AM & FM)'
                : 'MỤC LỤC 24 SLIDE — BÀI 5: TÍN HIỆU TƯƠNG TỰ VÀ TÍN HIỆU SỐ';
            titleEl.style.color = currentLesson === 'bai4' ? 'var(--amber)' : 'var(--cyan)';
        }

        if (!grid) return;
        grid.innerHTML = slides.map((s, idx) => `
            <div class="overview-item ${idx === currentIndex ? 'current' : ''}" data-idx="${idx}" onclick="goToSlide(${idx}); toggleOverview(false);">
                <div class="ov-num">SLIDE ${pad2(s.num)}</div>
                <div class="ov-title">${s.title}</div>
                ${s.simBadge ? `<span class="ov-badge" style="background:${currentLesson === 'bai4' ? 'rgba(245,158,11,0.2)' : 'rgba(50,213,242,0.2)'}; color:${currentLesson === 'bai4' ? '#FFB703' : 'var(--cyan)'};">⚡ ${s.simBadge}</span>` : ''}
            </div>
        `).join('');
    }

    function activateSlideSim(slideNum) {
        pauseAllSimulations();

        const activeMap = getActiveSimMap();
        const cfg = activeMap[slideNum];
        if (!cfg) return;

        let mgr = null;
        if (cfg.type === '3d-bai4') mgr = window.Sim3DBai4Manager;
        else if (cfg.type === '2d-bai4') mgr = window.Sim2DBai4Manager;
        else if (cfg.type === '3d') mgr = window.Sim3DManager;
        else if (cfg.type === '2d') mgr = window.Sim2DManager;

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
        if (ctrl && typeof ctrl.resume === 'function') {
            ctrl.resume();
        } else if (ctrl && typeof ctrl.start === 'function') {
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
        if (progressEl) {
            progressEl.style.width = `${pct}%`;
            progressEl.style.background = currentLesson === 'bai4'
                ? 'linear-gradient(90deg, #F59E0B, #FFB703)'
                : 'linear-gradient(90deg, #32D5F2, #397BFA)';
        }

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

    window.switchLesson = function (lessonKey) {
        if (currentLesson === lessonKey && slides.length > 0) return;

        pauseAllSimulations();
        loadLessonData(lessonKey);
        currentIndex = 0;

        // Cập nhật giao diện tab
        const tabBai4 = document.getElementById('tab-bai4');
        const tabBai5 = document.getElementById('tab-bai5');
        const dlLink = document.getElementById('link-pptx-download');

        if (tabBai4) tabBai4.classList.toggle('active', lessonKey === 'bai4');
        if (tabBai5) tabBai5.classList.toggle('active', lessonKey === 'bai5');

        if (dlLink) {
            if (lessonKey === 'bai4') {
                dlLink.href = 'Bai4_BienDieu_VatLi11.pptx';
                dlLink.innerHTML = '📥 Tải PPTX Bài 4';
                dlLink.style.borderColor = '#F59E0B';
                dlLink.style.color = '#FFB703';
            } else {
                dlLink.href = 'Bai5_TinHieuTuongTu_Va_TinHieuSo_VatLi11.pptx';
                dlLink.innerHTML = '📥 Tải PPTX Bài 5';
                dlLink.style.borderColor = 'var(--cyan)';
                dlLink.style.color = 'var(--cyan)';
            }
        }

        renderDeck();
        renderOverview();
        updateUI();

        const toastMsg = lessonKey === 'bai4'
            ? '📻 Đã chuyển sang Bài 4: Biến điệu (AM & FM) — 22 Slide'
            : '🔢 Đã chuyển sang Bài 5: Tín hiệu tương tự & số — 24 Slide';
        if (window.showToast) window.showToast(toastMsg);
    };

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

    window.zoomIn = function () { applyZoom(currentZoom + 0.1); };
    window.zoomOut = function () { applyZoom(currentZoom - 0.1); };
    window.resetZoom = function () { applyZoom(1.0); };

    // Recording Aliases
    window.startVideoRecording = function () { window.PresentationRecorder?.startVideoRecording(); };
    window.startAudioRecording = function () { window.PresentationRecorder?.startAudioRecording(); };
    window.togglePauseRecording = function () { window.PresentationRecorder?.togglePauseRecording(); };
    window.stopRecording = function () { window.PresentationRecorder?.stopRecording(); };
    window.closeReviewModal = function () { window.PresentationRecorder?.closeReviewModal(); };
    window.downloadRecordingAgain = function () { window.PresentationRecorder?.downloadAgain(); };

    // Toast Notification Utility
    window.showToast = function (msg, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type === 'error' ? 'toast-error' : (type === 'success' ? 'toast-success' : '')}`;
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 320);
        }, 3000);
    };

    // Helper for toggling active button groups cleanly
    function setActiveBtn(ids, activeId) {
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.classList.toggle('active', id === activeId);
        });
    }

    // =========================================================================
    // SLIDE CONTROLS CALLBACKS FOR BAI 5
    // =========================================================================
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

    window.updatePhasor3D = function () {
        const f = parseFloat(document.getElementById('phasor-freq')?.value || '50');
        const a = parseFloat(document.getElementById('phasor-amp')?.value || '1.0');
        const periodMs = (1000 / f).toFixed(1);
        const readout = document.getElementById('phasor-readout');
        if (readout) readout.textContent = `f = ${f} Hz → T = ${periodMs} ms`;
        window.Sim3DManager?.get('sim3d-phasor')?.setParams(f, a);
    };

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

    window.updateNoiseBattle = function () {
        const noise = parseFloat(document.getElementById('noise-lvl')?.value || '0.25');
        const gen = parseInt(document.getElementById('gen-lvl')?.value || '1', 10);
        const nEl = document.getElementById('noise-val');
        const gEl = document.getElementById('gen-val');
        if (nEl) nEl.textContent = `${Math.round(noise * 100)}%`;
        if (gEl) gEl.textContent = `${gen} lần`;
        window.Sim2DManager?.get('sim2d-noise')?.setParams(noise, gen);
    };

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

    window.setAudioMode = function (mode) {
        const map = { clean: 'btn-aud-clean', noisy: 'btn-aud-noisy', filtered: 'btn-aud-filtered', lowbit: 'btn-aud-lowbit' };
        setActiveBtn(Object.values(map), map[mode]);
        window.Sim2DManager?.get('sim2d-audio')?.setMode(mode);
    };

    // =========================================================================
    // KEYBOARD EVENT LISTENERS
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

    // Khởi động bài thuyết trình
    document.addEventListener('DOMContentLoaded', () => {
        loadLessonData('bai4');
        applyZoom(currentZoom);
        renderDeck();
        renderOverview();
        updateUI();
    });
})();
