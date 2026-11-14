/**
 * Presentation Recorder (Screen Video + Microphone Audio & Pure Voice Recording)
 * Vật lí 11 – Chuyên đề II – Bài 5: Tín hiệu tương tự và Tín hiệu số
 */

window.PresentationRecorder = (function () {
    let mediaRecorder = null;
    let recordedChunks = [];
    let currentMode = null; // 'video' | 'audio' | null
    let activeStream = null;
    let micStream = null;
    let displayStream = null;
    let audioContext = null;

    let timerInterval = null;
    let secondsElapsed = 0;
    let isPaused = false;
    let lastBlob = null;
    let lastBlobUrl = null;
    let lastFilename = '';

    function showToast(message, type = 'info', durationMs = 3800) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : ''}`;
        toast.innerHTML = `<span>${type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}</span> <span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s';
            setTimeout(() => toast.remove(), 320);
        }, durationMs);
    }

    function formatTime(totalSeconds) {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function formatBytes(bytes) {
        if (!bytes || bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function updateHud() {
        const hud = document.getElementById('recording-hud');
        const timerEl = document.getElementById('rec-timer-display');
        const labelEl = document.getElementById('rec-status-label');
        const pauseBtn = document.getElementById('btn-rec-pause');

        if (!currentMode) {
            if (hud) hud.style.display = 'none';
            return;
        }

        if (hud) hud.style.display = 'flex';
        if (timerEl) timerEl.textContent = formatTime(secondsElapsed);
        if (labelEl) {
            labelEl.textContent = currentMode === 'video'
                ? (isPaused ? 'TẠM DỪNG VIDEO' : 'ĐANG QUAY VIDEO')
                : (isPaused ? 'TẠM DỪNG GHI ÂM' : 'ĐANG GHI ÂM');
        }
        if (pauseBtn) {
            pauseBtn.textContent = isPaused ? '▶ Tiếp tục' : '⏸ Tạm dừng';
        }

        const btnVid = document.getElementById('btn-record-video');
        const btnAud = document.getElementById('btn-record-audio');
        if (btnVid) btnVid.classList.toggle('recording-active', currentMode === 'video');
        if (btnAud) btnAud.classList.toggle('recording-active', currentMode === 'audio');
    }

    function startTimer() {
        clearInterval(timerInterval);
        secondsElapsed = 0;
        isPaused = false;
        updateHud();
        timerInterval = setInterval(() => {
            if (!isPaused) {
                secondsElapsed++;
                const timerEl = document.getElementById('rec-timer-display');
                if (timerEl) timerEl.textContent = formatTime(secondsElapsed);
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    function cleanupStreams() {
        if (displayStream) {
            displayStream.getTracks().forEach(t => t.stop());
            displayStream = null;
        }
        if (micStream) {
            micStream.getTracks().forEach(t => t.stop());
            micStream = null;
        }
        if (activeStream) {
            activeStream.getTracks().forEach(t => t.stop());
            activeStream = null;
        }
        if (audioContext && audioContext.state !== 'closed') {
            try { audioContext.close(); } catch (e) {}
            audioContext = null;
        }
    }

    async function startVideoRecording() {
        if (currentMode) {
            showToast('Đang có phiên ghi hình/ghi âm hoạt động!', 'error');
            return;
        }

        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
            showToast(
                'Trình duyệt cần quyền quay màn hình. Nếu đang mở trực tiếp file://, hãy bấm đúp chạy file CHAY_TRINH_CHIEU.bat trong thư mục để mở qua Localhost an toàn!',
                'error',
                8000
            );
            return;
        }

        try {
            // 1. Get Screen Stream (with tab audio if available)
            displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: 'always',
                    displaySurface: 'browser'
                },
                audio: true
            });
        } catch (err) {
            if (err.name !== 'AbortError' && err.name !== 'NotAllowedError') {
                showToast(`Không thể chọn màn hình quay: ${err.message}`, 'error');
            }
            return;
        }

        // 2. Request microphone audio for narration
        try {
            micStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
            showToast('Đã kết nối Microphone để thu giọng nói thuyết trình!', 'success', 3000);
        } catch (err) {
            console.warn('Microphone không được cấp quyền, tiếp tục chỉ quay màn hình:', err);
            showToast('Microphone chưa bật: Hệ thống sẽ quay màn hình không kèm mic ngoài.', 'info', 4000);
        }

        // 3. Audio Mixing
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const dest = audioContext.createMediaStreamDestination();
            let hasAudioTracks = false;

            if (displayStream.getAudioTracks().length > 0) {
                const sysSource = audioContext.createMediaStreamSource(new MediaStream([displayStream.getAudioTracks()[0]]));
                sysSource.connect(dest);
                hasAudioTracks = true;
            }
            if (micStream && micStream.getAudioTracks().length > 0) {
                const micSource = audioContext.createMediaStreamSource(micStream);
                micSource.connect(dest);
                hasAudioTracks = true;
            }

            const videoTrack = displayStream.getVideoTracks()[0];
            const tracks = [videoTrack];
            if (hasAudioTracks) {
                tracks.push(...dest.stream.getAudioTracks());
            }
            activeStream = new MediaStream(tracks);

            // Handle browser native "Stop Sharing" button
            videoTrack.onended = () => {
                if (currentMode) {
                    stopRecording();
                }
            };
        } catch (e) {
            console.warn('Lỗi trộn âm thanh, dùng displayStream gốc:', e);
            activeStream = displayStream;
        }

        // 4. Select best supported codec
        const preferredTypes = [
            'video/webm;codecs=vp9,opus',
            'video/webm;codecs=vp8,opus',
            'video/webm',
            'video/mp4'
        ];
        let chosenType = preferredTypes.find(t => window.MediaRecorder && MediaRecorder.isTypeSupported(t)) || '';

        try {
            recordedChunks = [];
            mediaRecorder = new MediaRecorder(activeStream, chosenType ? { mimeType: chosenType } : {});
        } catch (e) {
            showToast(`Lỗi khởi tạo MediaRecorder: ${e.message}`, 'error');
            cleanupStreams();
            return;
        }

        mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            handleRecordingComplete('video', chosenType);
        };

        mediaRecorder.start(1000); // 1-second chunks for safety
        currentMode = 'video';
        startTimer();
        showToast('🔴 BẮT ĐẦU QUAY VIDEO THUYẾT TRÌNH! Nhấn F để toàn màn hình.', 'success', 4000);
    }

    async function startAudioRecording() {
        if (currentMode) {
            showToast('Đang có phiên ghi hình/ghi âm hoạt động!', 'error');
            return;
        }

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            showToast('Trình duyệt chưa hỗ trợ ghi âm Micro trong môi trường hiện tại!', 'error');
            return;
        }

        try {
            micStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
            activeStream = micStream;
        } catch (err) {
            showToast('Vui lòng cho phép truy cập Microphone để ghi âm!', 'error');
            return;
        }

        const preferredAudioTypes = [
            'audio/webm;codecs=opus',
            'audio/webm',
            'audio/ogg;codecs=opus',
            'audio/mp4'
        ];
        let chosenType = preferredAudioTypes.find(t => window.MediaRecorder && MediaRecorder.isTypeSupported(t)) || '';

        try {
            recordedChunks = [];
            mediaRecorder = new MediaRecorder(activeStream, chosenType ? { mimeType: chosenType } : {});
        } catch (e) {
            showToast(`Lỗi khởi tạo ghi âm: ${e.message}`, 'error');
            cleanupStreams();
            return;
        }

        mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            handleRecordingComplete('audio', chosenType);
        };

        mediaRecorder.start(1000);
        currentMode = 'audio';
        startTimer();
        showToast('🎙️ BẮT ĐẦU GHI ÂM BÀI THUYẾT TRÌNH!', 'success', 3500);
    }

    function togglePauseRecording() {
        if (!mediaRecorder || !currentMode) return;

        if (mediaRecorder.state === 'recording') {
            mediaRecorder.pause();
            isPaused = true;
            updateHud();
            showToast('Đã tạm dừng bản ghi.', 'info', 2000);
        } else if (mediaRecorder.state === 'paused') {
            mediaRecorder.resume();
            isPaused = false;
            updateHud();
            showToast('Tiếp tục ghi...', 'info', 2000);
        }
    }

    function stopRecording() {
        if (!mediaRecorder || !currentMode) return;
        stopTimer();
        const mode = currentMode;
        currentMode = null;
        updateHud();

        if (mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
        cleanupStreams();
    }

    function handleRecordingComplete(type, mimeType) {
        const extension = type === 'video'
            ? (mimeType.includes('mp4') ? 'mp4' : 'webm')
            : (mimeType.includes('ogg') ? 'ogg' : (mimeType.includes('mp4') ? 'mp4' : 'webm'));

        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
        lastFilename = `ThuyetTrinh_VatLi11_Bai5_${type === 'video' ? 'Video' : 'GhiAm'}_${stamp}.${extension}`;

        const blobType = mimeType || (type === 'video' ? 'video/webm' : 'audio/webm');
        lastBlob = new Blob(recordedChunks, { type: blobType });
        if (lastBlobUrl) URL.revokeObjectURL(lastBlobUrl);
        lastBlobUrl = URL.createObjectURL(lastBlob);

        // Auto trigger download
        triggerDownload(lastBlobUrl, lastFilename);
        showToast(`Đã lưu tệp ${lastFilename} vào máy!`, 'success', 4500);

        // Show review modal
        showReviewModal(type, lastBlobUrl, lastFilename, lastBlob.size, secondsElapsed);
    }

    function triggerDownload(url, filename) {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => a.remove(), 200);
    }

    function showReviewModal(type, url, filename, sizeBytes, durationSecs) {
        const modal = document.getElementById('record-modal');
        const titleEl = document.getElementById('record-modal-title');
        const previewWrap = document.getElementById('record-preview-container');
        const metaEl = document.getElementById('record-meta-info');

        if (!modal || !previewWrap) return;

        if (titleEl) {
            titleEl.textContent = type === 'video'
                ? '🎬 BẢN QUAY VIDEO THUYẾT TRÌNH ĐÃ HOÀN TẤT!'
                : '🎙️ BẢN GHI ÂM THUYẾT TRÌNH ĐÃ HOÀN TẤT!';
        }

        if (type === 'video') {
            previewWrap.innerHTML = `<video controls autoplay playsinline src="${url}"></video>`;
        } else {
            previewWrap.innerHTML = `
                <div style="text-align:center; padding: 20px; width: 100%;">
                    <div style="font-size: 2.2rem; margin-bottom: 10px;">🎙️</div>
                    <audio controls autoplay src="${url}"></audio>
                </div>
            `;
        }

        if (metaEl) {
            metaEl.innerHTML = `
                <div><b>Tên tệp:</b> <code>${filename}</code></div>
                <div><b>Thời lượng:</b> ${formatTime(durationSecs)} &nbsp;•&nbsp; <b>Dung lượng:</b> ${formatBytes(sizeBytes)}</div>
                <div style="color: #2ED573; margin-top: 4px;">✅ Tệp đã được tự động tải về thư mục Downloads của bạn. Bạn có thể bấm nút dưới để tải lại nếu cần.</div>
            `;
        }

        modal.classList.add('open');
    }

    function closeReviewModal() {
        const modal = document.getElementById('record-modal');
        if (modal) modal.classList.remove('open');
        const previewWrap = document.getElementById('record-preview-container');
        if (previewWrap) previewWrap.innerHTML = '';
    }

    function downloadAgain() {
        if (lastBlobUrl && lastFilename) {
            triggerDownload(lastBlobUrl, lastFilename);
        }
    }

    return {
        startVideoRecording,
        startAudioRecording,
        togglePauseRecording,
        stopRecording,
        closeReviewModal,
        downloadAgain,
        showToast,
        isRecording: () => !!currentMode
    };
})();
