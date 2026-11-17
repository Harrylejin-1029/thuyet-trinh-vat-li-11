/**
 * Dữ liệu 22 Slide thuyết trình chuyên sâu: Bài 4: Biến điệu (Modulation)
 * Vật lí 11 — Chuyên đề II: Truyền thông tin bằng sóng vô tuyến
 * Bộ sách Kết nối tri thức với cuộc sống (Trang 27 – 33)
 * Phong cách: Telecom Vintage & Modern (Deep Slate, Amber & Electric Blue)
 */

window.SLIDES_DATA_BAI4 = [
    // =========================================================================
    // SLIDE 01: TRANG BÌA (3D IONOSPHERE HERO)
    // =========================================================================
    {
        num: 1,
        isCover: true,
        simBadge: "3D Tầng Điện Ly",
        tag: "CHUYÊN ĐỀ HỌC TẬP VẬT LÍ 11 • BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG",
        title: "BÀI 4: BIẾN ĐIỆU (MODULATION)",
        subtitle: "Chuyên đề II: Truyền thông tin bằng sóng vô tuyến • Báo cáo Khoa học Học thuật",
        content_html: `
            <div class="sim-box" style="flex:1; margin-top:12px;">
                <div class="sim-topbar">
                    <span><span class="badge badge-amber">MÔ PHỎNG 3D WEBGL</span> Quả Cầu Trái Đất & Cơ Chế Phản Xạ Sóng Vô Tuyến Qua Tầng Điện Ly</span>
                    <div style="display:flex; gap:8px;">
                        <button class="sim-btn" onclick="Sim3DBai4Manager.get('sim3d-ionosphere-hero')?.toggleWaveMode()">📡 Chuyển chế độ AM / FM</button>
                        <button class="sim-btn" onclick="Sim3DBai4Manager.get('sim3d-ionosphere-hero')?.resetView()">↺ Đặt lại góc nhìn</button>
                    </div>
                </div>
                <div class="sim-canvas-wrap" id="sim3d-ionosphere-hero"></div>
                <div class="sim-hint">🖱️ Kéo chuột xoay Trái Đất 3D • Cuộn phóng to • Quan sát tia sóng AM màu hổ phách phản xạ tầng điện ly vs tia FM xanh xuyên thẳng</div>
            </div>
        `,
        notes: `Kính thưa quý thầy cô và các bạn học sinh!
Hôm nay nhóm chúng em xin trình bày bài báo cáo học thuật thuộc Chuyên đề Vật lí 11 – Bài 4: "Biến điệu" (Modulation).
Trên màn hình trang bìa là mô hình không gian 3D của Trái Đất và tầng điện ly: thầy cô và các bạn có thể thấy tia sóng AM màu hổ phách nảy phản xạ liên tục giữa tầng điện ly và bề mặt đất để truyền đi vòng quanh địa cầu hàng ngàn kilômét, trong khi tia sóng FM màu xanh điện tử tần số rất cao lại đâm xuyên qua tầng điện ly ra ngoài vũ trụ.
Bài thuyết trình hôm nay sẽ giải mã toàn bộ bản chất vật lí, các phương pháp biến điệu biên độ (AM), biến điệu tần số (FM), băng thông và quy hoạch phổ tần số vô tuyến điện trong đời sống.`
    },

    // =========================================================================
    // SLIDE 02: THÁCH THỨC CỦA TRUYỀN THÔNG ĐI XA
    // =========================================================================
    {
        num: 2,
        tag: "PHẦN MỞ ĐẦU • ĐẶT VẤN ĐỀ",
        title: "Thách Thức Khi Truyền Tín Hiệu Âm Thanh Đi Xa",
        subtitle: "Tại sao giọng nói và âm nhạc không thể tự truyền qua không gian?",
        content_html: `
            <div class="grid-2col" style="flex:1; gap:24px;">
                <div class="card card-vintage">
                    <div class="card-badge badge-amber">BẢN CHẤT TÍN HIỆU ÂM TẦN (AUDIO)</div>
                    <h3 style="color:var(--amber); margin-top:8px;">Tín hiệu chứa thông tin gốc:</h3>
                    <ul class="styled-list" style="margin-top:12px;">
                        <li><strong>Dải tần số thấp:</strong> Tiếng nói, âm nhạc chỉ nằm trong khoảng <strong>20 Hz đến 20.000 Hz</strong>.</li>
                        <li><strong>Bước sóng rất lớn:</strong> Theo công thức $\\lambda = \\frac{c}{f}$, với $f = 1000\\text{ Hz}$, bước sóng lên tới:
                            <div class="math-banner">$$\\lambda = \\frac{3 \\times 10^8\\text{ m/s}}{1000\\text{ Hz}} = 300.000\\text{ m} = 300\\text{ km}!$$</div>
                        </li>
                        <li><strong>Năng lượng yếu:</strong> Sóng điện từ tần số thấp có năng lượng phát xạ rất nhỏ ($W \\propto f^4$), nhanh chóng bị suy giảm và triệt tiêu trong khí quyển.</li>
                    </ul>
                </div>
                <div class="card card-modern">
                    <div class="card-badge badge-blue">NGHỊCH LÝ KÍCH THƯỚC ANTEN</div>
                    <h3 style="color:var(--cyan); margin-top:8px;">Yêu cầu kĩ thuật không khả thi:</h3>
                    <ul class="styled-list" style="margin-top:12px;">
                        <li>Để bức xạ sóng điện từ hiệu quả, kích thước anten tối thiểu phải bằng một phần tư bước sóng:
                            <div class="math-banner">$$L_{\\text{anten}} \\ge \\frac{\\lambda}{4} = \\frac{300\\text{ km}}{4} = 75\\text{ km}!$$</div>
                        </li>
                        <li>Không thể chế tạo cột anten cao hàng chục kilômét trong thực tế.</li>
                        <li><strong>Giao thoa chồng lấn:</strong> Nếu ai cũng phát trực tiếp sóng âm thanh ra không gian, tất cả tín hiệu sẽ hòa lẫn vào nhau tạo thành mớ âm thanh hỗn tạp không thể tách rời.</li>
                    </ul>
                    <div class="alert-box" style="margin-top:16px;">
                        💡 <strong>Câu hỏi cốt lõi:</strong> Làm cách nào để đóng gói âm thanh tần số thấp này vào một phương tiện truyền dẫn tần số cao để truyền đi xa?
                    </div>
                </div>
            </div>
        `,
        notes: `Để mở đầu bài học, chúng ta hãy đặt câu hỏi: Tại sao chúng ta không thể trực tiếp phát giọng nói qua anten vô tuyến?
Lý do nằm ở 3 rào cản vật lí:
Thứ nhất, tín hiệu âm thanh có tần số rất thấp, từ 20 Hz đến 20 kHz.
Thứ hai, bước sóng của nó khổng lồ: một âm thanh 1 kHz có bước sóng lên tới 300 km! Để anten bức xạ hiệu quả, chiều dài cột anten tối thiểu phải bằng lambda chia 4, tức là 75 km – điều hoàn toàn bất khả thi.
Thứ ba, sóng tần số thấp bị môi trường hấp thụ năng lượng cực nhanh.
Vì vậy, nhân loại phải tìm ra một giải pháp mang tính cách mạng: sử dụng sóng mang cao tần, dẫn tới khái niệm Biến điệu.`
    },

    // =========================================================================
    // SLIDE 03: KHÁI NIỆM BIẾN ĐIỆU (MODULATION)
    // =========================================================================
    {
        num: 3,
        tag: "PHẦN MỞ ĐẦU • BẢN CHẤT VẬT LÍ",
        title: "Bản Chất Của Quá Trình Biến Điệu",
        subtitle: "Định nghĩa chuẩn SGK Vật lí 11 — Chuyên đề II, Trang 27",
        content_html: `
            <div style="display:flex; flex-direction:column; gap:18px; flex:1;">
                <div class="quote-box" style="border-left-color: var(--amber);">
                    <div style="font-size:1.15rem; font-weight:600; color:var(--amber); line-height:1.6;">
                        "Để truyền tín hiệu đi xa, chúng ta phải biến đổi nó thành sóng điện từ có tần số cao bằng cách 
                        <span style="color:#FFF; text-decoration:underline;">trộn tín hiệu cần truyền với sóng điện từ có tần số cao</span>. 
                        Quá trình này được gọi là <span style="color:var(--cyan); font-weight:700;">BIẾN ĐIỆU</span>."
                    </div>
                </div>
                <div class="grid-3col" style="flex:1; gap:16px;">
                    <div class="card" style="text-align:center;">
                        <div style="font-size:2rem; margin-bottom:6px;">🎙️</div>
                        <h4 style="color:var(--amber);">1. Tín hiệu âm tần (Modulating Signal)</h4>
                        <p style="font-size:0.9rem; color:#AAB7C8; margin-top:8px;">Tín hiệu chứa thông tin (giọng nói, bài hát, dữ liệu). Tần số thấp ($f_m$), biên độ biến thiên theo thời gian.</p>
                    </div>
                    <div class="card" style="text-align:center;">
                        <div style="font-size:2rem; margin-bottom:6px;">⚡</div>
                        <h4 style="color:var(--cyan);">2. Sóng mang cao tần (Carrier Wave)</h4>
                        <p style="font-size:0.9rem; color:#AAB7C8; margin-top:8px;">Sóng điện từ hình sin do mạch tạo dao động phát ra. Tần số rất cao ($f_c \\gg f_m$), năng lượng mạnh, truyền đi xa.</p>
                    </div>
                    <div class="card" style="text-align:center;">
                        <div style="font-size:2rem; margin-bottom:6px;">📡</div>
                        <h4 style="color:#A855F7;">3. Sóng sau biến điệu (Modulated Wave)</h4>
                        <p style="font-size:0.9rem; color:#AAB7C8; margin-top:8px;">Sóng mang đã được "gắn" thông tin âm tần. Mang năng lượng cao truyền qua không gian tới anten máy thu.</p>
                    </div>
                </div>
                <div class="card" style="background:rgba(255,255,255,0.03); padding:12px 18px;">
                    <strong>Các phương pháp biến điệu chính:</strong> 
                    <span class="badge badge-amber" style="margin-left:8px;">AM — Biến điệu biên độ</span>
                    <span class="badge badge-blue" style="margin-left:8px;">FM — Biến điệu tần số</span>
                    <span class="badge" style="margin-left:8px; background:rgba(168,85,247,0.2); color:#C084FC;">PM — Biến điệu pha</span>
                </div>
            </div>
        `,
        notes: `Theo định nghĩa tại trang 27 SGK: Biến điệu là quá trình sử dụng sóng điện từ có tần số cao – gọi là sóng mang – để mang hoặc phát các tín hiệu có tần số thấp – gọi là sóng âm tần.
Một hình ảnh ẩn dụ rất dễ nhớ: Sóng âm tần giống như bức thư mà chúng ta muốn gửi đi, nhưng bức thư không thể tự bay qua đại dương. Sóng mang cao tần chính là chiếc máy bay vận tải phản lực mang bức thư đó bay qua hàng ngàn kilômét.
Khi tới nơi, máy thu chỉ việc tách bức thư ra khỏi máy bay. Đó là toàn bộ nguyên lí của phát thanh truyền hình.`
    },

    // =========================================================================
    // SLIDE 04: BIẾN ĐIỆU BIÊN ĐỘ (AM) - ĐỊNH NGHĨA
    // =========================================================================
    {
        num: 4,
        tag: "PHẦN I • BIẾN ĐIỆU BIÊN ĐỘ (AM)",
        title: "Biến Điệu Biên Độ (AM — Amplitude Modulation)",
        subtitle: "Phương pháp điều chế nền tảng của phát thanh vô tuyến đầu thế kỷ 20",
        content_html: `
            <div class="grid-2col" style="flex:1; gap:20px;">
                <div class="card card-vintage" style="display:flex; flex-direction:column; justify-content:center;">
                    <div class="card-badge badge-amber">ĐỊNH NGHĨA CHUẨN SGK TRANG 27</div>
                    <div style="margin-top:14px; font-size:1.1rem; line-height:1.7;">
                        Biến điệu biên độ (AM) là kĩ thuật được sử dụng để truyền thông tin qua một sóng mang, trong đó:
                    </div>
                    <ul class="styled-list" style="margin-top:14px;">
                        <li><span style="color:var(--amber); font-weight:700;">BIÊN ĐỘ</span> của sóng mang: <strong>Thay đổi theo biên độ của sóng âm tần</strong> theo thời gian.</li>
                        <li><span style="color:var(--cyan); font-weight:700;">TẦN SỐ</span> của sóng mang: <strong>Được giữ nguyên không đổi ($f = f_c$)</strong>.</li>
                        <li><span style="color:#A855F7; font-weight:700;">PHA BAN ĐẦU</span> của sóng mang: <strong>Được giữ nguyên không đổi ($\\varphi = \\text{const}$)</strong>.</li>
                    </ul>
                </div>
                <div class="card" style="display:flex; flex-direction:column; justify-content:center; background:rgba(0,0,0,0.35);">
                    <div class="card-badge badge-blue">ĐẶC ĐIỂM HÌNH HỌC CỦA SÓNG AM</div>
                    <div style="margin-top:12px; font-size:0.95rem; line-height:1.6; color:#CBD5E1;">
                        <p>🔹 <strong>Đường bao (Envelope):</strong> Đường nối liền các đỉnh dao động của sóng mang sau điều chế có hình dạng trùng khớp hoàn toàn với đường cong dao động của sóng âm tần ban đầu.</p>
                        <p style="margin-top:10px;">🔹 <strong>Hệ số điều chế ($m$):</strong>
                            $$m = \\frac{A_m}{A_c} = \\frac{A_{\\max} - A_{\\min}}{A_{\\max} + A_{\\min}}$$
                            Để không bị méo tín hiệu ở đầu thu, kĩ thuật đòi hỏi $0 < m \\le 1$. Nếu $m > 1$, sóng bị hiện tượng <em>quá biến điệu</em> làm gãy sóng âm thanh.
                        </p>
                    </div>
                </div>
            </div>
        `,
        notes: `Chúng ta bước vào phần I: Biến điệu biên độ, viết tắt là AM.
Khái niệm cốt lõi nhất cần nhớ: trong biến điệu AM, tần số và pha của sóng mang được giữ cố định tuyệt đối. Chỉ duy nhất biên độ của sóng mang nhấp nhô tăng giảm ăn khớp theo nhịp điệu của âm thanh.
Nếu ta nối tất cả các đỉnh dao động của sóng AM lại, ta sẽ thu được một đường bao biên độ mang hình dáng chính xác của giọng nói gốc.
Hệ số điều chế m lý tưởng nhất nằm trong khoảng từ 0 đến 1; nếu vượt quá 1, đường bao sẽ bị cắt ngang gây méo tiếng nghiêm trọng.`
    },

    // =========================================================================
    // SLIDE 05: ĐỒ THỊ VÀ MÔ PHỎNG DẠNG SÓNG AM (INTERACTIVE 2D)
    // =========================================================================
    {
        num: 5,
        tag: "PHẦN I • PHÂN TÍCH ĐỒ THỊ SÓNG AM",
        simBadge: "Lab 2D Thời Gian Thực",
        title: "Phân Tích Dạng Sóng Biến Điệu AM",
        subtitle: "Quan sát trực tiếp sự hình thành đường bao biên độ (Hình 4.1 SGK)",
        content_html: `
            <div class="sim-box" style="flex:1;">
                <div class="sim-topbar">
                    <span><span class="badge badge-amber">LAB THỜI GIAN THỰC</span> Tín Hiệu Âm Tần $s(t)$ + Sóng Mang Cao Tần $c(t) \\to$ Sóng Điều Chế AM $s_{AM}(t)$</span>
                    <div style="display:flex; gap:8px;">
                        <button class="sim-btn" onclick="Sim2DBai4Manager.get('sim2d-am-wave')?.toggleEnvelope()">Toggle Đường bao</button>
                        <button class="sim-btn" onclick="Sim2DBai4Manager.get('sim2d-am-wave')?.togglePlay()">⏯ Dừng / Chạy</button>
                    </div>
                </div>
                <div class="sim-canvas-wrap" id="sim2d-am-wave" style="min-height:280px;"></div>
                <div class="sim-hint">Kéo thanh trượt bên dưới để đổi Tần số âm tần $f_m$, Tần số sóng mang $f_c$ và Biên độ $A_m$:</div>
                <div class="sim-ctrl-row" style="padding:8px 16px; background:rgba(0,0,0,0.4); display:flex; gap:16px; align-items:center;">
                    <label style="font-size:0.85rem; color:var(--amber);">Tần số âm tần $f_m$: <input type="range" id="am-ctrl-fm" min="1" max="5" step="0.5" value="2" oninput="Sim2DBai4Manager.get('sim2d-am-wave')?.setFm(this.value)"></label>
                    <label style="font-size:0.85rem; color:var(--cyan);">Sóng mang $f_c$: <input type="range" id="am-ctrl-fc" min="15" max="45" step="1" value="25" oninput="Sim2DBai4Manager.get('sim2d-am-wave')?.setFc(this.value)"></label>
                    <label style="font-size:0.85rem; color:#A855F7;">Độ sâu $m$: <input type="range" id="am-ctrl-m" min="0.2" max="1.2" step="0.1" value="0.7" oninput="Sim2DBai4Manager.get('sim2d-am-wave')?.setM(this.value)"></label>
                </div>
            </div>
        `,
        notes: `Trên slide 5, chúng ta có phòng thí nghiệm trực quan tái hiện chính xác Hình 4.1 trong sách giáo khoa:
Đồ thị trên cùng là tín hiệu âm tần biến thiên chậm, tần số thấp fm.
Đồ thị thứ hai là sóng mang cao tần fc biến thiên cực nhanh và đều đặn.
Đồ thị thứ ba là kết quả của phép nhân: sóng mang bị bóp nghẹt ở những đoạn âm tần mang giá trị âm, và phình to ở những đoạn âm tần mang giá trị dương.
Các bạn có thể thử kéo thanh trượt độ sâu m lên trên 1.0 để thấy hiện tượng giao thoa đường bao gây méo tín hiệu âm thanh.`
    },

    // =========================================================================
    // SLIDE 06: SƠ ĐỒ NGUYÊN LÝ BỘ NHÂN BIẾN ĐIỆU AM
    // =========================================================================
    {
        num: 6,
        tag: "PHẦN I • NGUYÊN LÝ MẠCH ĐIỆN TỬ",
        title: "Sơ Đồ Khối Nguyên Lý Biến Điệu AM",
        subtitle: "Phân tích cấu trúc mạch nhân theo Hình 4.2 SGK Trang 27",
        content_html: `
            <div class="grid-2col" style="flex:1; gap:24px; align-items:center;">
                <div class="card" style="text-align:center; padding:20px; background:rgba(15,23,42,0.85);">
                    <div style="font-weight:700; color:var(--amber); margin-bottom:12px;">SƠ ĐỒ NGUYÊN LÝ BIẾN ĐIỆU BIÊN ĐỘ (HÌNH 4.2 SGK)</div>
                    <!-- SVG Sơ đồ khối nguyên lý mạch AM -->
                    <svg viewBox="0 0 460 260" style="width:100%; max-height:230px;">
                        <!-- Sóng âm tần vào -->
                        <path d="M 20 80 Q 40 50 60 80 T 100 80" fill="none" stroke="#F59E0B" stroke-width="3"/>
                        <text x="60" y="40" fill="#F59E0B" font-size="12" text-anchor="middle" font-weight="bold">Sóng âm tần</text>
                        <line x1="100" y1="80" x2="160" y2="80" stroke="#F59E0B" stroke-width="2.5" marker-end="url(#arrow)"/>

                        <!-- Bộ nhân -->
                        <circle cx="190" cy="80" r="30" fill="#1E293B" stroke="#00E5FF" stroke-width="3"/>
                        <text x="190" y="90" fill="#00E5FF" font-size="28" text-anchor="middle" font-weight="bold">✕</text>
                        <text x="190" y="130" fill="#E2E8F0" font-size="13" text-anchor="middle" font-weight="600">Bộ nhân</text>

                        <!-- Bộ tạo dao động sóng mang -->
                        <rect x="140" y="180" width="100" height="45" rx="6" fill="#1E293B" stroke="#F59E0B" stroke-width="2"/>
                        <text x="190" y="200" fill="#F8FAFC" font-size="11" text-anchor="middle" font-weight="bold">Bộ tạo</text>
                        <text x="190" y="215" fill="#F8FAFC" font-size="11" text-anchor="middle" font-weight="bold">dao động</text>
                        <line x1="190" y1="180" x2="190" y2="110" stroke="#00E5FF" stroke-width="2.5" marker-end="url(#arrow)"/>
                        <text x="215" y="150" fill="#00E5FF" font-size="12" font-weight="bold">fc</text>

                        <!-- Tín hiệu sau biến điệu ra -->
                        <line x1="220" y1="80" x2="290" y2="80" stroke="#00E5FF" stroke-width="2.5" marker-end="url(#arrow)"/>
                        <text x="375" y="40" fill="#00E5FF" font-size="12" text-anchor="middle" font-weight="bold">Tín hiệu sau biến điệu</text>
                        <!-- Biểu diễn sóng AM đầu ra -->
                        <path d="M 290 80 Q 305 60 320 80 T 350 80 Q 370 45 390 80 T 420 80 Q 435 65 450 80" fill="none" stroke="#00E5FF" stroke-width="2"/>
                    </svg>
                </div>
                <div class="card card-modern">
                    <div class="card-badge badge-blue">CƠ CHẾ HOẠT ĐỘNG CỦA BỘ NHÂN</div>
                    <ul class="styled-list" style="margin-top:14px;">
                        <li><strong>Nguyên lí toán học:</strong> Bộ nhân thực hiện nhân hai tín hiệu tương tự đầu vào:
                            <div class="math-banner">$$s_{AM}(t) = [A_c + s(t)] \\times \\cos(2\\pi f_c t)$$</div>
                        </li>
                        <li><strong>Biên độ đầu ra:</strong> Tỉ lệ trực tiếp với tích biên độ tức thời của hai tín hiệu đầu vào.</li>
                        <li><strong>Nguồn tạo sóng:</strong>
                            <br>• Tín hiệu âm tần lấy từ Micro $\\to$ qua mạch khuếch đại âm tần.
                            <br>• Sóng mang tạo bởi mạch dao động thạch anh cao tần ($>30\\text{ kHz}$).
                        </li>
                    </ul>
                </div>
            </div>
        `,
        notes: `Về mặt kĩ thuật mạch điện tử (Hình 4.2 trang 27 SGK), biến điệu AM được thực hiện bởi một linh kiện gọi là Bộ nhân (Analog Multiplier).
Bộ nhân nhận hai đầu vào:
Đầu vào thứ nhất là sóng âm tần từ micro đã qua khuếch đại.
Đầu vào thứ hai là sóng mang cao tần fc từ bộ tạo dao động.
Tín hiệu điện áp ở đầu ra chính là tích số của hai đại lượng này, tạo nên một tín hiệu cao tần có biên độ nhấp nhô sẵn sàng đưa ra tầng khuếch đại công suất và anten phát.`
    },

    // =========================================================================
    // SLIDE 07: BĂNG THÔNG CỦA TÍN HIỆU BIẾN ĐIỆU AM
    // =========================================================================
    {
        num: 7,
        tag: "PHẦN I • PHÂN TÍCH PHỔ TẦN SỐ",
        title: "Băng Thông Của Tín Hiệu AM ($B_{AM}$)",
        subtitle: "Quy luật chiếm dụng tần số vô tuyến theo Hình 4.3 SGK Trang 28",
        content_html: `
            <div class="grid-2col" style="flex:1; gap:24px;">
                <div class="card card-vintage">
                    <div class="card-badge badge-amber">CÔNG THỨC SGK TRANG 28</div>
                    <div class="math-banner" style="font-size:1.4rem; margin:16px 0;">
                        $$B_{AM} = 2f_m$$
                    </div>
                    <ul class="styled-list">
                        <li><strong>$B_{AM}$ (Bandwidth):</strong> Độ rộng băng thông của kênh phát thanh AM, đo bằng Hertz (Hz) hoặc kiloHertz (kHz).</li>
                        <li><strong>$f_m$:</strong> Tần số cao nhất của tín hiệu âm tần đưa vào điều chế.</li>
                        <li><strong>Kết luận cốt lõi:</strong> Băng thông của tín hiệu AM luôn luôn <strong>gấp hai lần</strong> tần số cao nhất của tín hiệu âm thanh!</li>
                    </ul>
                </div>
                <div class="card" style="background:rgba(0,0,0,0.35); display:flex; flex-direction:column; justify-content:center;">
                    <div class="card-badge badge-blue">CẤU TRÚC PHỔ TẦN SỐ AM</div>
                    <div style="text-align:center; margin:16px 0;">
                        <!-- SVG Phổ tần số AM -->
                        <svg viewBox="0 0 380 140" style="width:100%; max-height:130px;">
                            <line x1="20" y1="110" x2="360" y2="110" stroke="#64748B" stroke-width="2"/>
                            <!-- Sóng mang fc -->
                            <line x1="190" y1="110" x2="190" y2="20" stroke="#00E5FF" stroke-width="3"/>
                            <text x="190" y="128" fill="#00E5FF" font-size="12" text-anchor="middle" font-weight="bold">fc (sóng mang)</text>
                            <!-- Dải biên dưới LSB -->
                            <polygon points="90,110 190,110 190,50" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="1.5"/>
                            <text x="135" y="128" fill="#F59E0B" font-size="10" text-anchor="middle">fc - fm</text>
                            <!-- Dải biên trên USB -->
                            <polygon points="190,110 290,110 190,50" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="1.5"/>
                            <text x="245" y="128" fill="#F59E0B" font-size="10" text-anchor="middle">fc + fm</text>
                            <!-- Mũi tên băng thông -->
                            <line x1="90" y1="40" x2="290" y2="40" stroke="#E2E8F0" stroke-width="1.5" marker-start="url(#arrow-rev)" marker-end="url(#arrow)"/>
                            <text x="190" y="32" fill="#E2E8F0" font-size="11" text-anchor="middle" font-weight="bold">B_AM = 2.fm</text>
                        </svg>
                    </div>
                    <p style="font-size:0.88rem; color:#CBD5E1; line-height:1.6;">
                        Phổ tín hiệu AM gồm tần số sóng mang trung tâm $f_c$ và hai dải biên đối xứng: <em>dải biên dưới (LSB: $f_c - f_m$)</em> và <em>dải biên trên (USB: $f_c + f_m$)</em>.
                    </p>
                </div>
            </div>
        `,
        notes: `Từ phép nhân lượng giác: cos(A) * cos(B) = 1/2 [cos(A-B) + cos(A+B)], tín hiệu AM tạo ra hai tần số mới nằm đối xứng hai bên sóng mang: fc trừ fm và fc cộng fm.
Vì thế, băng thông của tín hiệu AM luôn bằng 2 lần fm.
Ví dụ: nếu muốn truyền tiếng nói với dải tần tới 4,5 kHz thì kênh phát thanh AM bắt buộc phải chiếm một khoảng phổ rộng ít nhất là 2 nhân 4,5 = 9 kHz.`
    },

    // =========================================================================
    // SLIDE 08: PHÂN BỔ BĂNG TẦN & KHOẢNG CÁCH KÊNH AM
    // =========================================================================
    {
        num: 8,
        tag: "PHẦN I • QUY HOẠCH PHÁT THANH AM",
        title: "Phân Bổ Kênh Phát Thanh AM Thế Giới & Việt Nam",
        subtitle: "Quy chuẩn khoảng cách kênh theo Hình 4.4 SGK Trang 28",
        content_html: `
            <div style="display:flex; flex-direction:column; gap:16px; flex:1;">
                <div class="grid-2col" style="gap:18px;">
                    <div class="card card-vintage">
                        <div class="card-badge badge-amber">CHÂU ÂU, CHÂU Á & VIỆT NAM</div>
                        <div style="font-size:1.2rem; font-weight:700; color:#FFF; margin-top:8px;">526,5 kHz đến 1606,5 kHz</div>
                        <p style="margin-top:8px; color:var(--amber); font-weight:600;">Khoảng cách kênh chuẩn: 9 kHz</p>
                        <p style="font-size:0.88rem; color:#AAB7C8; margin-top:6px;">Băng thông audio giới hạn ở 4,5 kHz $\\to$ Phù hợp tin tức thời sự, tiếng nói, không tối ưu cho hòa nhạc stereo.</p>
                    </div>
                    <div class="card card-modern">
                        <div class="card-badge badge-blue">CHÂU MỸ (BẮC MỸ & NAM MỸ)</div>
                        <div style="font-size:1.2rem; font-weight:700; color:#FFF; margin-top:8px;">525 kHz đến 1705 kHz</div>
                        <p style="margin-top:8px; color:var(--cyan); font-weight:600;">Khoảng cách kênh chuẩn: 10 kHz</p>
                        <p style="font-size:0.88rem; color:#AAB7C8; margin-top:6px;">Băng thông audio giới hạn ở 5 kHz $\\to$ Băng rộng hơn một chút, ít bị nhiễu chéo kênh lân cận.</p>
                    </div>
                </div>
                <div class="card" style="background:rgba(245,158,11,0.08); border-left:4px solid var(--amber);">
                    <div style="font-weight:700; color:var(--amber);">❓ CÂU HỎI THẢO LUẬN SGK (TRANG 29):</div>
                    <div style="margin-top:8px; font-size:0.95rem; line-height:1.6; color:#F8FAFC;">
                        <em>"Trong dải tần số từ 526,5 kHz đến 1606,5 kHz có thể chia được tối đa bao nhiêu kênh phát thanh AM cách nhau 9 kHz? Tại cùng một thời điểm ở một địa phương, có được phép phát tất cả các kênh liền kề nhau không?"</em>
                        <br><span style="color:#AAB7C8; font-size:0.88rem; margin-top:4px; display:inline-block;">👉 Gợi mở tư duy: Số kênh lý thuyết là $(1606,5 - 526,5) / 9 = 120$ kênh. Tuy nhiên, ở cùng một địa phương, các kênh phải nằm cách nhật (xen kẽ) để tránh hiện tượng can nhiễu dải biên lân cận.</span>
                    </div>
                </div>
            </div>
        `,
        notes: `Trang 28 SGK phân tích rất rõ việc phân bổ băng tần trên thế giới:
Châu Âu, Châu Á và Việt Nam sử dụng bước nhảy kênh là 9 kHz trong dải từ 526,5 đến 1606,5 kHz. Trong khi Châu Mỹ dùng bước 10 kHz.
Câu hỏi thảo luận SGK hỏi có bao nhiêu kênh: Về mặt toán học, dải rộng 1080 kHz chia cho 9 kHz sẽ được 120 kênh.
Nhưng trên thực tế, tại cùng một vùng phát sóng, không bao giờ được cấp phép hai đài phát nằm sát cạnh nhau từng 9 kHz một, vì đuôi dải biên sẽ lấn sang nhau gây tiếng rít và lẫn tiếng của hai đài.`
    },

    // =========================================================================
    // SLIDE 09: BIẾN ĐIỆU TẦN SỐ (FM) - ĐỊNH NGHĨA
    // =========================================================================
    {
        num: 9,
        tag: "PHẦN II • BIẾN ĐIỆU TẦN SỐ (FM)",
        title: "Biến Điệu Tần Số (FM — Frequency Modulation)",
        subtitle: "Đột phá công nghệ mang lại âm thanh trung thực và kháng nhiễu vượt trội",
        content_html: `
            <div class="grid-2col" style="flex:1; gap:20px;">
                <div class="card card-modern" style="display:flex; flex-direction:column; justify-content:center;">
                    <div class="card-badge badge-blue">ĐỊNH NGHĨA CHUẨN SGK TRANG 29</div>
                    <div style="margin-top:14px; font-size:1.1rem; line-height:1.7;">
                        Biến điệu tần số (FM) là kĩ thuật được sử dụng để truyền thông tin qua một sóng mang, trong đó:
                    </div>
                    <ul class="styled-list" style="margin-top:14px;">
                        <li><span style="color:var(--cyan); font-weight:700;">TẦN SỐ</span> của sóng mang: <strong>Thay đổi theo biên độ của sóng âm tần</strong> theo thời gian.</li>
                        <li><span style="color:var(--amber); font-weight:700;">BIÊN ĐỘ ĐỈNH</span> của sóng mang: <strong>Được giữ nguyên không đổi ($A = A_c = \\text{const}$)</strong>.</li>
                        <li><span style="color:#A855F7; font-weight:700;">PHA</span> của sóng mang: <strong>Được giữ nguyên không thay đổi</strong>.</li>
                    </ul>
                </div>
                <div class="card" style="display:flex; flex-direction:column; justify-content:center; background:rgba(0,0,0,0.35);">
                    <div class="card-badge badge-purple">ĐỘ LỆCH TẦN SỐ (FREQUENCY DEVIATION)</div>
                    <div style="margin-top:12px; font-size:0.95rem; line-height:1.7; color:#CBD5E1;">
                        <p>🔹 <strong>Nguyên tắc co giãn bước sóng:</strong>
                            <br>• Khi điện áp âm tần đạt <strong>cực đại dương</strong>: Tần số sóng mang tăng vọt lên mức cao nhất $f_{\\max}$ (sóng co lại dày đặc).
                            <br>• Khi điện áp âm tần bằng <strong>không</strong>: Tần số bằng đúng sóng mang trung tâm $f_c$.
                            <br>• Khi điện áp âm tần đạt <strong>cực tiểu âm</strong>: Tần số sóng mang giảm xuống mức thấp nhất $f_{\\min}$ (sóng giãn ra thưa thớt).
                        </p>
                        <p style="margin-top:12px;">🔹 Độ lệch tần số cực đại: $\\Delta f = |f_{\\max} - f_c|$.</p>
                    </div>
                </div>
            </div>
        `,
        notes: `Chúng ta chuyển sang Phần II: Biến điệu tần số, viết tắt là FM.
Trái ngược hoàn toàn với AM: Trong biến điệu FM, biên độ đỉnh của sóng mang được giữ phẳng lì và cố định tuyệt đối!
Thay vào đó, thông tin âm thanh được mã hóa vào tốc độ dao động – tức là tần số của sóng mang.
Khi ca sĩ hát to ở nốt cao, điện áp dương lớn $\\to$ sóng mang rung cực nhanh, các chu kì ép sát vào nhau. Khi âm thanh tắt dần, các chu kì giãn rộng ra.
Chính đặc tính biên độ không đổi này là chìa khóa vàng giúp FM tiêu diệt hoàn toàn mọi loại nhiễu sấm sét trong tự nhiên.`
    },

    // =========================================================================
    // SLIDE 10: ĐỒ THỊ DẠNG SÓNG BIẾN ĐIỆU FM (INTERACTIVE 2D)
    // =========================================================================
    {
        num: 10,
        tag: "PHẦN II • PHÂN TÍCH ĐỒ THỊ SÓNG FM",
        simBadge: "Lab 2D Thời Gian Thực",
        title: "Phân Tích Dạng Sóng Biến Điệu FM",
        subtitle: "Quan sát trực tiếp sự co giãn tần số theo nhịp điệu âm thanh (Hình 4.5 SGK)",
        content_html: `
            <div class="sim-box" style="flex:1;">
                <div class="sim-topbar">
                    <span><span class="badge badge-blue">LAB THỜI GIAN THỰC</span> Sự Biến Đổi Tần Số: Dày Đặc (Điện Áp Dương) $\\longleftrightarrow$ Thưa Thớt (Điện Áp Âm)</span>
                    <div style="display:flex; gap:8px;">
                        <button class="sim-btn" onclick="Sim2DBai4Manager.get('sim2d-fm-wave')?.togglePlay()">⏯ Dừng / Chạy</button>
                    </div>
                </div>
                <div class="sim-canvas-wrap" id="sim2d-fm-wave" style="min-height:280px;"></div>
                <div class="sim-hint">Kéo thanh trượt để thay đổi Tần số âm tần và Độ lệch tần số $\\Delta f$:</div>
                <div class="sim-ctrl-row" style="padding:8px 16px; background:rgba(0,0,0,0.4); display:flex; gap:16px; align-items:center;">
                    <label style="font-size:0.85rem; color:var(--amber);">Tần số âm tần $f_m$: <input type="range" id="fm-ctrl-fm" min="1" max="4" step="0.5" value="1.5" oninput="Sim2DBai4Manager.get('sim2d-fm-wave')?.setFm(this.value)"></label>
                    <label style="font-size:0.85rem; color:var(--cyan);">Sóng mang $f_c$: <input type="range" id="fm-ctrl-fc" min="20" max="40" step="1" value="28" oninput="Sim2DBai4Manager.get('sim2d-fm-wave')?.setFc(this.value)"></label>
                    <label style="font-size:0.85rem; color:#A855F7;">Độ lệch tần $\\Delta f$: <input type="range" id="fm-ctrl-df" min="5" max="18" step="1" value="12" oninput="Sim2DBai4Manager.get('sim2d-fm-wave')?.setDeltaF(this.value)"></label>
                </div>
            </div>
        `,
        notes: `Trên slide 10 là mô phỏng động 2D của Hình 4.5 trong SGK:
Quan sát đồ thị thứ ba – sóng FM: Các bạn hãy chú ý rằng biên độ chiều cao của sóng luôn luôn bằng nhau từ đầu đến cuối.
Nhưng hãy nhìn vào mật độ các vạch sóng:
Khi sóng âm tần màu vàng ở trên đỉnh cao nhất, các vạch sóng FM bên dưới dồn lại dày đặc (tần số cao).
Khi sóng âm tần rơi xuống đáy sâu nhất, các vạch sóng FM giãn rộng thưa thớt (tần số thấp).
Thông tin âm thanh được lưu trữ hoàn toàn trong khoảng cách giữa các vạch sóng này.`
    },

    // =========================================================================
    // SLIDE 11: NGUYÊN LÝ MẠCH VCO (VOLTAGE CONTROLLED OSCILLATOR)
    // =========================================================================
    {
        num: 11,
        tag: "PHẦN II • NGUYÊN LÝ MẠCH ĐIỆN TỬ",
        title: "Sơ Đồ Khối Nguyên Lý Biến Điệu FM (VCO)",
        subtitle: "Bộ dao động điều khiển bằng điện áp theo Hình 4.6 SGK Trang 29",
        content_html: `
            <div class="grid-2col" style="flex:1; gap:24px; align-items:center;">
                <div class="card" style="text-align:center; padding:20px; background:rgba(15,23,42,0.85);">
                    <div style="font-weight:700; color:var(--cyan); margin-bottom:12px;">SƠ ĐỒ NGUYÊN LÝ BIẾN ĐIỆU FM (HÌNH 4.6 SGK)</div>
                    <!-- SVG Sơ đồ khối nguyên lý VCO -->
                    <svg viewBox="0 0 460 220" style="width:100%; max-height:200px;">
                        <!-- Sóng âm tần vào -->
                        <path d="M 20 80 Q 45 45 70 80 T 120 80" fill="none" stroke="#F59E0B" stroke-width="3"/>
                        <text x="70" y="35" fill="#F59E0B" font-size="12" text-anchor="middle" font-weight="bold">Sóng âm tần (Điện áp v(t))</text>
                        <line x1="120" y1="80" x2="180" y2="80" stroke="#F59E0B" stroke-width="2.5" marker-end="url(#arrow)"/>

                        <!-- Hộp VCO -->
                        <rect x="180" y="45" width="120" height="70" rx="8" fill="#1E293B" stroke="#00E5FF" stroke-width="3"/>
                        <text x="240" y="75" fill="#00E5FF" font-size="20" text-anchor="middle" font-weight="bold">VCO</text>
                        <text x="240" y="98" fill="#E2E8F0" font-size="10" text-anchor="middle">Bộ DĐ điều khiển bằng điện áp</text>

                        <!-- Sóng FM ra -->
                        <line x1="300" y1="80" x2="350" y2="80" stroke="#00E5FF" stroke-width="2.5" marker-end="url(#arrow)"/>
                        <text x="400" y="35" fill="#00E5FF" font-size="12" text-anchor="middle" font-weight="bold">Tín hiệu sau biến điệu FM</text>
                        <path d="M 350 80 Q 355 60 360 80 T 370 80 Q 373 60 376 80 T 382 80 Q 392 60 402 80 T 422 80 Q 437 60 452 80" fill="none" stroke="#00E5FF" stroke-width="2"/>
                    </svg>
                </div>
                <div class="card card-modern">
                    <div class="card-badge badge-blue">CƠ CHẾ HOẠT ĐỘNG CỦA MẠCH VCO</div>
                    <ul class="styled-list" style="margin-top:14px;">
                        <li><strong>VCO (Voltage Controlled Oscillator):</strong> Là mạch dao động điện tử có tần số phát ra tỉ lệ thuận với điện áp đưa vào ngõ điều khiển.</li>
                        <li><strong>Linh kiện then chốt:</strong> Thường sử dụng <strong>Diode biến dung (Varicap / Varactor)</strong> gắn trong mạch cộng hưởng LC.</li>
                        <li><strong>Cơ chế biến đổi:</strong> Điện áp âm tần thay đổi làm thay đổi điện dung $C$ của diode $\\to$ thay đổi tần số cộng hưởng $f = \\frac{1}{2\\pi\\sqrt{LC}}$ của mạch dao động $\\to$ tạo ra sóng FM hoàn chỉnh.</li>
                    </ul>
                </div>
            </div>
        `,
        notes: `Để tạo ra sóng FM, người ta không dùng bộ nhân như AM mà sử dụng một mạch điện tử gọi là VCO – Bộ dao động điều khiển bằng điện áp (Hình 4.6 trang 29 SGK).
Trái tim của VCO là diode biến dung Varactor. Khi điện áp giọng nói đặt vào chân diode thay đổi, điện dung của nó thay đổi theo.
Mạch dao động LC lập tức đổi tần số tương ứng. Kết quả là điện áp âm tần đầu vào được biến đổi trực tiếp thành sự co giãn tần số ở đầu ra mà biên độ không hề bị ảnh hưởng.`
    },

    // =========================================================================
    // SLIDE 12: BĂNG THÔNG FM VÀ QUY TẮC CARSON
    // =========================================================================
    {
        num: 12,
        tag: "PHẦN II • PHÂN TÍCH PHỔ TẦN SỐ",
        title: "Băng Thông Của Tín Hiệu FM ($B_{FM}$)",
        subtitle: "Công thức thực nghiệm Carson theo Hình 4.7 SGK Trang 29",
        content_html: `
            <div class="grid-2col" style="flex:1; gap:24px;">
                <div class="card card-modern">
                    <div class="card-badge badge-blue">CÔNG THỨC THỰC NGHIỆM CARSON (SGK TRANG 29)</div>
                    <div class="math-banner" style="font-size:1.4rem; margin:16px 0;">
                        $$B_{FM} = 2(1 + b)B$$
                    </div>
                    <ul class="styled-list">
                        <li><strong>$B$:</strong> Băng thông của tín hiệu âm tần cần truyền.</li>
                        <li><strong>$b$:</strong> Hệ số điều chế tần số (phụ thuộc vào kĩ thuật phát thanh và độ lệch tần $\\Delta f$).</li>
                        <li><strong>Đặc điểm:</strong> Băng thông FM thực tế <strong>gấp nhiều lần</strong> băng thông âm tần ($B_{FM} \\gg B_{AM}$).</li>
                    </ul>
                </div>
                <div class="card" style="background:rgba(0,0,0,0.35); display:flex; flex-direction:column; justify-content:center;">
                    <div class="card-badge badge-purple">HI-FI STEREO VÀ BĂNG THÔNG ÂM THANH</div>
                    <div style="font-size:0.92rem; line-height:1.7; color:#CBD5E1; margin-top:10px;">
                        <p>🔹 Trong phát thanh FM âm thanh nổi (Stereo), dải tần âm thanh truyền đi bao phủ trọn vẹn từ <strong>50 Hz đến 15.000 Hz (15 kHz)</strong> — bao trọn dải thính giác tinh tế của con người.</p>
                        <p style="margin-top:10px;">🔹 Với $B = 15\\text{ kHz}$ và hệ số $b \\approx 5$, độ rộng kênh FM chiếm dụng lên tới:
                            <div class="math-banner">$$B_{FM} \\approx 2(1 + 5) \\times 15 = 180\\text{ kHz} \\approx 200\\text{ kHz}!$$</div>
                        </p>
                        <p style="font-size:0.85rem; color:#94A3B8;">👉 Rộng gấp 20 lần so với kênh AM ($9\\text{ kHz}$)!</p>
                    </div>
                </div>
            </div>
        `,
        notes: `Khác với AM chỉ có đúng hai dải biên, phổ tần số của FM sinh ra vô số vạch hài biên (theo hàm Bessel).
Theo quy tắc thực nghiệm Carson trong SGK trang 29: B_FM = 2(1 + b)B.
Nhờ băng thông kênh FM rất rộng – lên tới gần 200 kHz, các đài phát FM có thể truyền toàn bộ dải âm thanh từ tiếng bass trầm 50 Hz đến tiếng treble cao vút 15 kHz, truyền cả hai kênh trái phải Stereo, tạo ra chất lượng âm thanh sống động như nghe đĩa CD.`
    },

    // =========================================================================
    // SLIDE 13: BĂNG TẦN PHÁT THANH FM (VHF 88 - 108 MHz)
    // =========================================================================
    {
        num: 13,
        tag: "PHẦN II • QUY HOẠCH PHÁT THANH FM",
        title: "Dải Tần Phát Sóng FM (VHF 88 — 108 MHz)",
        subtitle: "Quy chuẩn cấp phát băng tần theo Hình 4.8 SGK Trang 30",
        content_html: `
            <div style="display:flex; flex-direction:column; gap:16px; flex:1;">
                <div class="grid-2col" style="gap:18px;">
                    <div class="card card-modern">
                        <div class="card-badge badge-blue">DẢI TẦN SÓNG RẤT CAO (VHF)</div>
                        <div style="font-size:1.25rem; font-weight:700; color:#FFF; margin-top:8px;">87,5 MHz đến 108 MHz (thường gọi 88–108 MHz)</div>
                        <p style="margin-top:8px; color:var(--cyan); font-weight:600;">Tổng bề rộng dải tần: 20 MHz</p>
                        <p style="font-size:0.88rem; color:#AAB7C8; margin-top:6px;">Tần số rất cao mang lại dung lượng kênh cực lớn và truyền dữ liệu kèm theo (RDS - hiện tên bài hát trên xe hơi).</p>
                    </div>
                    <div class="card card-vintage">
                        <div class="card-badge badge-amber">QUY ĐỊNH KHOẢNG CÁCH KÊNH TẠI VIỆT NAM</div>
                        <div style="font-size:1.25rem; font-weight:700; color:#FFF; margin-top:8px;">Khoảng cách kênh: 100 kHz (0,1 MHz)</div>
                        <p style="margin-top:8px; color:var(--amber); font-weight:600;">Dung lượng tối đa: ~200 kênh trong dải</p>
                        <p style="font-size:0.88rem; color:#AAB7C8; margin-top:6px;">Ở các nước khác dùng bước 200 kHz (0,2 MHz). Quy tắc cách kênh bảo đảm không có hiện tượng nhiễu dải biên.</p>
                    </div>
                </div>
                <div class="card" style="background:rgba(0,229,255,0.08); border-left:4px solid var(--cyan);">
                    <div style="font-weight:700; color:var(--cyan);">❓ CÂU HỎI THẢO LUẬN SGK (TRANG 30):</div>
                    <div style="margin-top:8px; font-size:0.95rem; line-height:1.6; color:#F8FAFC;">
                        <em>"Trong Hình 4.8, nếu khoảng cách kênh là 0,2 MHz thì có bao nhiêu kênh FM trong dải từ 88 MHz đến 108 MHz? Và tại cùng một thời điểm có bao nhiêu kênh FM được phép hoạt động?"</em>
                        <br><span style="color:#AAB7C8; font-size:0.88rem; margin-top:4px; display:inline-block;">👉 Gợi mở tư duy: Với bước 0,2 MHz, số kênh lý thuyết là $(108 - 88) / 0,2 = 100$ kênh. Nhưng tại cùng một vùng phát sóng, để tránh can nhiễu, các trạm phải cách nhau ít nhất một kênh trống ("Không sử dụng" như Hình 4.8), do đó tối đa chỉ khoảng 50 kênh có thể đồng thời hoạt động tại một khu vực.</span>
                    </div>
                </div>
            </div>
        `,
        notes: `Dải tần FM quen thuộc trên radio ô tô và điện thoại là dải sóng cực ngắn VHF từ 88 đến 108 MHz (Hình 4.8 trang 30 SGK).
Tổng dải rộng 20 MHz. Tại Việt Nam, khoảng cách kênh chuẩn là 100 kHz, chứa tối đa 200 kênh.
Trả lời câu hỏi thảo luận: nếu khoảng cách là 0,2 MHz thì có 100 kênh lý thuyết. Tuy nhiên, như hình vẽ chỉ rõ, cứ giữa hai kênh phát sóng bắt buộc phải có một dải tần đệm "Không sử dụng" để tránh chồng lấn, nghĩa là số trạm phát đồng thời trong một đô thị chỉ bằng một nửa số kênh lý thuyết.`
    },

    // =========================================================================
    // SLIDE 14: SO SÁNH TOÀN DIỆN AM VÀ FM (BẢNG 6 TIÊU CHÍ)
    // =========================================================================
    {
        num: 14,
        tag: "PHẦN III • SO SÁNH ĐỐI ĐẦU AM vs FM",
        title: "Bảng So Sánh Toàn Diện Biến Điệu AM và FM",
        subtitle: "Tổng hợp 6 tiêu chí cốt lõi chuẩn kiến thức SGK Vật lí 11 Trang 30",
        content_html: `
            <div style="flex:1; overflow-x:auto;">
                <table class="academic-table" style="font-size:0.88rem; width:100%;">
                    <thead>
                        <tr>
                            <th style="width:18%;">Tiêu chí so sánh</th>
                            <th style="width:41%; color:var(--amber);">📻 BIẾN ĐIỆU BIÊN ĐỘ (AM)</th>
                            <th style="width:41%; color:var(--cyan);">📡 BIẾN ĐIỆU TẦN SỐ (FM)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1. Cách mang thông tin</strong></td>
                            <td>Biên độ sóng mang thay đổi; tần số và pha giữ nguyên</td>
                            <td>Tần số sóng mang thay đổi; biên độ đỉnh và pha giữ nguyên</td>
                        </tr>
                        <tr>
                            <td><strong>2. Dải tần sử dụng</strong></td>
                            <td>Sóng trung & sóng ngắn: <strong>526,5 – 1606,5 kHz</strong></td>
                            <td>Sóng rất cao (VHF): <strong>87,5 – 108 MHz</strong></td>
                        </tr>
                        <tr>
                            <td><strong>3. Băng thông / Độ rộng kênh</strong></td>
                            <td>Hẹp: <strong>$9\\text{ kHz}$ hoặc $10\\text{ kHz}$</strong> ($B_{AM} = 2f_m$)</td>
                            <td>Rộng: <strong>$100\\text{ kHz}$ đến $200\\text{ kHz}$</strong> ($B_{FM} = 2(1+b)B$)</td>
                        </tr>
                        <tr>
                            <td><strong>4. Chất lượng âm thanh</strong></td>
                            <td>Trung bình / Mono (dải âm thanh hẹp $\\le 5\\text{ kHz}$)</td>
                            <td>Rất cao / Hi-Fi Stereo (dải âm rộng tới $15\\text{ kHz}$)</td>
                        </tr>
                        <tr>
                            <td><strong>5. Khả năng chống nhiễu</strong></td>
                            <td>Kém: Rất dễ bị biến dạng do sấm sét, tia lửa điện động cơ</td>
                            <td>Xuất sắc: Hầu như miễn nhiễm hoàn toàn với nhiễu biên độ</td>
                        </tr>
                        <tr>
                            <td><strong>6. Phạm vi phát sóng</strong></td>
                            <td>Rất xa: <strong>Hàng ngàn km</strong> (phản xạ tầng điện li)</td>
                            <td>Ngắn: <strong>Vài chục đến trăm km</strong> (tầm nhìn thẳng Line-of-Sight)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,
        notes: `Slide 14 là bảng tổng hợp quan trọng nhất trong toàn bộ bài học, đúc kết 6 tiêu chí theo đúng câu hỏi thảo luận trang 30 SGK.
Mỗi phương pháp đều có điểm mạnh và hạn chế bù trừ hoàn hảo cho nhau:
AM có băng thông hẹp nên tiết kiệm dải tần, lại truyền được rất xa hàng ngàn cây số, nhưng chất lượng âm thanh chỉ ở mức trung bình và rất dễ bị rè khi trời mưa sấm sét.
Ngược lại, FM mang lại âm thanh Stereo trong trẻo tuyệt đối, không hề sợ sấm sét, nhưng lại tốn băng thông và sóng chỉ đi được trong tầm nhìn thẳng vài chục kilômét.`
    },

    // =========================================================================
    // SLIDE 15: THÍ NGHIỆM CHỐNG NHIỄU AM VS FM (INTERACTIVE LAB)
    // =========================================================================
    {
        num: 15,
        tag: "PHẦN III • THỰC NGHIỆM VẬT LÍ",
        simBadge: "Lab Kháng Nhiễu 2D",
        title: "Bản Chất Chống Nhiễu: Tại Sao FM Vượt Trội AM?",
        subtitle: "Cơ chế mạch xén biên độ (Limiter) triệt tiêu hoàn toàn nhiễu sấm sét",
        content_html: `
            <div class="sim-box" style="flex:1;">
                <div class="sim-topbar">
                    <span><span class="badge badge-purple">THÍ NGHIỆM BƠM NHIỄU</span> Bơm Xung Gai Nhiễu Biên Độ (Noise Spikes) Vào Sóng AM Và FM</span>
                    <div style="display:flex; gap:8px;">
                        <button class="sim-btn sim-btn-active" id="btn-toggle-noise" onclick="Sim2DBai4Manager.get('sim2d-noise-lab')?.toggleNoise()">⚡ BẬT / TẮT NHIỄU BIÊN ĐỘ</button>
                    </div>
                </div>
                <div class="sim-canvas-wrap" id="sim2d-noise-lab" style="min-height:280px;"></div>
                <div class="sim-hint">Khi có sét đánh: Sóng AM bị méo đường bao $\\to$ Tiếng rẹt rẹt! Sóng FM dùng mạch Limiter gọt phẳng đỉnh biên độ $\\to$ Tần số không đổi $\\to$ Âm thanh trong veo!</div>
            </div>
        `,
        notes: `Để chứng minh tại sao FM không bị rè như AM, chúng ta cùng quan sát phòng thí nghiệm trên slide 15:
Khi các bạn nhấn nút "BẬT NHIỄU BIÊN ĐỘ" – mô phỏng một tia sét đánh hoặc tia lửa từ bugi xe máy phóng ra:
Các xung gai điện áp lập tức cộng dồn vào biên độ sóng.
Đối với AM: Vì thông tin nằm ở chính biên độ, đường bao bị gai nhọn đâm méo mó $\\to$ đầu thu giải mã ra những tiếng nổ lẹt đẹt chói tai.
Đối với FM: Máy thu chỉ cần cho tín hiệu qua một mạch cắt biên độ (Limiter) để gọt bằng tất cả các đỉnh gai nhọn. Sau khi gọt, khoảng cách các đỉnh sóng – tức tần số chứa thông tin – vẫn còn nguyên vẹn 100%! Đó là lý do đài FM luôn trong trẻo.`
    },

    // =========================================================================
    // SLIDE 16: CƠ CHẾ PHẢN XẠ TẦNG ĐIỆN LY CỦA SÓNG AM
    // =========================================================================
    {
        num: 16,
        tag: "PHẦN III • CƠ CHẾ LAN TRUYỀN SÓNG",
        title: "Cơ Chế Truyền Sóng AM: Phản Xạ Tầng Điện Ly",
        subtitle: "Bí quyết giúp sóng AM vượt đại dương hàng ngàn kilômét (Hình 4.10 SGK)",
        content_html: `
            <div class="grid-2col" style="flex:1; gap:24px; align-items:center;">
                <div class="card card-vintage">
                    <div class="card-badge badge-amber">TẦNG ĐIỆN LY LÀ GÌ?</div>
                    <p style="margin-top:10px; font-size:0.95rem; line-height:1.7;">
                        Là lớp khí quyển ở độ cao từ <strong>60 km đến 1000 km</strong> bị ion hóa cực mạnh bởi tia tử ngoại và tia X từ Mặt Trời, chứa mật độ electron tự do rất lớn.
                    </p>
                    <h4 style="color:var(--amber); margin-top:14px;">Quy luật phản xạ sóng AM:</h4>
                    <ul class="styled-list" style="margin-top:8px;">
                        <li>Sóng trung và sóng ngắn AM (tần số vài trăm kHz đến vài MHz) khi gặp tầng điện ly sẽ bị <strong>phản xạ ngược trở lại Trái Đất</strong> tương tự như ánh sáng gặp gương.</li>
                        <li>Sóng chạm xuống mặt đất, nước biển lại tiếp tục phản xạ ngược lên $\\to$ nảy zich-zắc nhiều lần đi vòng quanh bề mặt cong của địa cầu!</li>
                        <li><strong>Đặc tính ngày và đêm:</strong> Ban đêm không có Mặt Trời, tầng D biến mất $\\to$ sóng phản xạ ở tầng F cao hơn $\\to$ ban đêm nghe đài AM rõ và xa hơn ban ngày!</li>
                    </ul>
                </div>
                <div class="card" style="text-align:center; background:rgba(0,0,0,0.4); padding:16px;">
                    <div style="font-weight:700; color:var(--amber); font-size:0.95rem; margin-bottom:8px;">SƠ ĐỒ PHẢN XẠ ZICH-ZẮC (HÌNH 4.10 SGK)</div>
                    <svg viewBox="0 0 320 220" style="width:100%; max-height:200px;">
                        <!-- Trái Đất cong -->
                        <path d="M 10 210 Q 160 160 310 210" fill="none" stroke="#22C55E" stroke-width="4"/>
                        <text x="160" y="200" fill="#22C55E" font-size="11" text-anchor="middle" font-weight="bold">Bề mặt Trái Đất</text>
                        <!-- Tầng điện ly -->
                        <path d="M 10 70 Q 160 20 310 70" fill="none" stroke="#F59E0B" stroke-dasharray="6,4" stroke-width="3"/>
                        <text x="160" y="40" fill="#F59E0B" font-size="11" text-anchor="middle" font-weight="bold">Tầng điện ly (Ionosphere)</text>
                        <!-- Tháp phát AM -->
                        <line x1="60" y1="185" x2="60" y2="165" stroke="#FFF" stroke-width="2"/>
                        <text x="60" y="160" fill="#FFF" font-size="9" text-anchor="middle">Đài phát</text>
                        <!-- Tia sóng phản xạ -->
                        <path d="M 60 165 L 110 52 L 180 178 L 240 48 L 290 195" fill="none" stroke="#FFB703" stroke-width="2.5" marker-end="url(#arrow)"/>
                        <!-- Máy thu -->
                        <circle cx="290" cy="195" r="4" fill="#00E5FF"/>
                        <text x="290" y="215" fill="#00E5FF" font-size="9" text-anchor="middle">Máy thu</text>
                    </svg>
                </div>
            </div>
        `,
        notes: `Hình 4.10 trang 32 SGK giải thích vì sao đài AM lại truyền được xa hàng ngàn kilômét qua các châu lục:
Bí mật nằm ở Tầng điện ly nằm cách mặt đất từ 80 đến vài trăm km.
Đối với sóng AM có tần số trung bình, tầng điện ly đóng vai trò như một tấm gương khổng lồ phản xạ sóng vô tuyến.
Sóng phát ra từ anten bắn chéo lên bầu trời, đập vào tầng điện ly rồi dội ngược xuống mặt đất; mặt đất lại phản xạ lên tiếp. Cứ như vậy, sóng nảy zich-zắc vòng theo độ cong của Trái Đất mà không bị giới hạn bởi tầm nhìn thẳng.
Đặc biệt, vào ban đêm tầng điện ly ổn định hơn nên sóng AM truyền xa và rõ hơn ban ngày.`
    },

    // =========================================================================
    // SLIDE 17: CƠ CHẾ TRUYỀN SÓNG FM: TẦM NHÌN THẲNG
    // =========================================================================
    {
        num: 17,
        tag: "PHẦN III • CƠ CHẾ LAN TRUYỀN SÓNG",
        title: "Cơ Chế Truyền Sóng FM: Tầm Nhìn Thẳng (Line-of-Sight)",
        subtitle: "Lý do đài FM chỉ phát sóng hiệu quả trong phạm vi địa phương",
        content_html: `
            <div class="grid-2col" style="flex:1; gap:24px; align-items:center;">
                <div class="card card-modern">
                    <div class="card-badge badge-blue">TẠI SAO SÓNG FM KHÔNG PHẢN XẠ?</div>
                    <ul class="styled-list" style="margin-top:12px;">
                        <li><strong>Tần số cực cao (88 – 108 MHz):</strong> Bước sóng rất ngắn (chỉ khoảng $3\\text{ m}$). Năng lượng photon lớn và tần số vượt quá tần số tới hạn của tầng điện ly ($f \\gg f_{critical}$).</li>
                        <li><strong>Đâm xuyên không gian:</strong> Sóng FM đâm thẳng xuyên qua tầng điện ly bay ra ngoài vũ trụ, không thể dội ngược lại mặt đất.</li>
                        <li><strong>Truyền thẳng (Line-of-Sight):</strong> Sóng chỉ truyền từ đỉnh tháp phát thẳng tới anten máy thu theo đường chim bay.</li>
                        <li><strong>Bị cản trở bởi địa hình:</strong> Sóng FM bị chặn lại bởi các tòa nhà cao tầng, đồi núi và độ cong của Trái Đất $\\to$ cự ly phát thường chỉ đạt từ <strong>40 km đến 100 km</strong>.</li>
                    </ul>
                </div>
                <div class="card" style="text-align:center; background:rgba(0,0,0,0.4); padding:16px;">
                    <div style="font-weight:700; color:var(--cyan); font-size:0.95rem; margin-bottom:8px;">SÓNG FM ĐÂM XUYÊN TẦNG ĐIỆN LY</div>
                    <svg viewBox="0 0 320 220" style="width:100%; max-height:200px;">
                        <!-- Trái Đất cong -->
                        <path d="M 10 210 Q 160 160 310 210" fill="none" stroke="#22C55E" stroke-width="4"/>
                        <!-- Tầng điện ly -->
                        <path d="M 10 70 Q 160 20 310 70" fill="none" stroke="#64748B" stroke-dasharray="6,4" stroke-width="2"/>
                        <text x="160" y="40" fill="#64748B" font-size="11" text-anchor="middle">Tầng điện ly</text>
                        <!-- Tháp phát FM -->
                        <line x1="70" y1="185" x2="70" y2="155" stroke="#FFF" stroke-width="3"/>
                        <text x="70" y="148" fill="#FFF" font-size="9" text-anchor="middle">Tháp FM</text>
                        <!-- Tia FM đâm xuyên -->
                        <line x1="70" y1="155" x2="180" y2="10" stroke="#00E5FF" stroke-width="3" stroke-dasharray="4,3" marker-end="url(#arrow)"/>
                        <text x="150" y="20" fill="#00E5FF" font-size="10" font-weight="bold">Xuyên ra vũ trụ!</text>
                        <!-- Tia FM tầm nhìn thẳng -->
                        <line x1="70" y1="155" x2="160" y2="175" stroke="#00E5FF" stroke-width="2.5"/>
                        <circle cx="160" cy="175" r="4" fill="#00E5FF"/>
                        <text x="160" y="195" fill="#00E5FF" font-size="9" text-anchor="middle">Vùng phủ sóng (~60km)</text>
                    </svg>
                </div>
            </div>
        `,
        notes: `Ngược lại với AM, sóng FM có tần số lên tới cả trăm MegaHertz.
Ở tần số cực cao này, tầng điện ly hoàn toàn trong suốt đối với sóng. Tia sóng FM phóng thẳng lên trời sẽ đâm thủng tầng điện ly bay thẳng vào không gian vũ trụ mà không bị dội ngược lại.
Vì vậy, sóng FM chỉ có thể truyền theo tầm nhìn thẳng giữa hai anten. Khi chạm phải đường chân trời do Trái Đất cong, sóng sẽ bị chặn lại.
Đó là lý do đài FM VOV Giao thông ở Hà Nội chỉ có thể thu được trong bán kính khoảng 70-100 km; khi sang tỉnh khác, ta phải dò sang một tần số trạm tiếp sóng khác.`
    },

    // =========================================================================
    // SLIDE 18: PHỔ SÓNG VÔ TUYẾN TRONG TRUYỀN THÔNG HIỆN ĐẠI
    // =========================================================================
    {
        num: 18,
        tag: "PHẦN IV • PHỔ TẦN SỐ VÀ ỨNG DỤNG",
        title: "Tần Số & Bước Sóng Các Kênh Truyền Thông Phổ Biến",
        subtitle: "Bảng phân loại chuẩn theo Mục IV SGK Trang 31",
        content_html: `
            <div style="flex:1; overflow-x:auto;">
                <table class="academic-table" style="font-size:0.86rem; width:100%;">
                    <thead>
                        <tr>
                            <th>Kênh truyền thông</th>
                            <th>Dải tần số công tác</th>
                            <th>Bước sóng ($\\lambda = c/f$)</th>
                            <th>Đặc điểm & Ứng dụng thực tế</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong style="color:var(--amber);">Kênh phát thanh AM</strong></td>
                            <td>$530\\text{ kHz} \\to 1700\\text{ kHz}$</td>
                            <td>$566\\text{ m} \\to 176\\text{ m}$ (Sóng trung MF)</td>
                            <td>Phát thanh thời sự cự ly dài, vùng sâu vùng xa, biên giới hải đảo.</td>
                        </tr>
                        <tr>
                            <td><strong style="color:var(--cyan);">Kênh phát thanh FM</strong></td>
                            <td>$88\\text{ MHz} \\to 108\\text{ MHz}$</td>
                            <td>$3,4\\text{ m} \\to 2,8\\text{ m}$ (Sóng rất cao VHF)</td>
                            <td>Phát thanh âm nhạc chất lượng cao, VOV Giao thông đô thị.</td>
                        </tr>
                        <tr>
                            <td><strong>Kênh truyền hình VHF / UHF</strong></td>
                            <td>$30\\text{ MHz} \\to 3000\\text{ MHz}$</td>
                            <td>$10\\text{ m} \\to 0,1\\text{ m}$ (Sóng cực ngắn)</td>
                            <td>Truyền hình mặt đất kĩ thuật số (DVB-T2), sóng Wi-Fi, 4G LTE.</td>
                        </tr>
                        <tr>
                            <td><strong>Kênh vi ba (SHF)</strong></td>
                            <td>$300\\text{ MHz} \\to 300\\text{ GHz}$</td>
                            <td>$1\\text{ m} \\to 1\\text{ mm}$ (Sóng siêu cao tần)</td>
                            <td>Thông tin vệ tinh VINASAT, mạng 5G Milimeter Wave, Radar hàng không.</td>
                        </tr>
                        <tr>
                            <td><strong style="color:#C084FC;">Kênh sợi quang</strong></td>
                            <td>$187\\text{ THz} \\to 374\\text{ THz}$</td>
                            <td>$1600\\text{ nm} \\to 800\\text{ nm}$ (Hồng ngoại gần)</td>
                            <td>Cáp quang Internet xuyên đại dương, dung lượng Terabit/giây.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,
        notes: `Mục IV trong SGK trang 31 cung cấp một bức tranh toàn cảnh về phổ sóng vô tuyến:
Từ sóng trung AM bước sóng hàng trăm mét, tới sóng VHF FM bước sóng vài mét;
Lên tới sóng UHF và Vi ba bước sóng vài milimét dùng cho mạng di động 4G, 5G và vệ tinh viễn thông;
Và cao nhất là sóng ánh sáng hồng ngoại trong cáp quang với tần số lên tới hàng trăm TeraHertz.
Quy luật vật lí bất biến: Tần số càng cao thì bước sóng càng ngắn, lượng thông tin mang được càng khổng lồ, nhưng cự ly truyền thẳng càng đòi hỏi tầm nhìn không vật cản.`
    },

    // =========================================================================
    // SLIDE 19: THỰC TẾ PHÁT THANH VIỆT NAM (VOV)
    // =========================================================================
    {
        num: 19,
        tag: "PHẦN IV • LIÊN HỆ THỰC TIỄN VIỆT NAM",
        title: "Đài Tiếng Nói Việt Nam (VOV) Trong Đời Sống",
        subtitle: "Giải đáp các câu hỏi thực hành theo SGK Trang 31 & 32",
        content_html: `
            <div class="grid-3col" style="flex:1; gap:16px;">
                <div class="card card-vintage" style="text-align:center;">
                    <div style="font-size:2.2rem; margin-bottom:8px;">📻</div>
                    <h3 style="color:var(--amber);">KÊNH VOV1</h3>
                    <p style="font-size:0.85rem; color:#AAB7C8; margin-top:4px;">Thời sự & Chính trị Quốc gia</p>
                    <div class="badge badge-amber" style="margin:12px auto; display:inline-block;">Sóng AM & FM kết hợp</div>
                    <p style="font-size:0.88rem; color:#E2E8F0; text-align:left; line-height:1.6;">
                        Phát sóng trên các tần số AM (như $675\\text{ kHz}$) để phủ sóng toàn quốc, tới bà con vùng núi, ngư dân ngoài khơi xa Trường Sa, Hoàng Sa.
                    </p>
                </div>
                <div class="card card-modern" style="text-align:center;">
                    <div style="font-size:2.2rem; margin-bottom:8px;">🎵</div>
                    <h3 style="color:var(--cyan);">KÊNH VOV3</h3>
                    <p style="font-size:0.85rem; color:#AAB7C8; margin-top:4px;">Âm nhạc & Giải trí Giới trẻ</p>
                    <div class="badge badge-blue" style="margin:12px auto; display:inline-block;">FM 102.7 MHz</div>
                    <p style="font-size:0.88rem; color:#E2E8F0; text-align:left; line-height:1.6;">
                        Phát thanh hoàn toàn trên sóng FM chuẩn Stereo chất lượng cao tại Hà Nội và các thành phố lớn, truyền tải âm nhạc sống động, trung thực.
                    </p>
                </div>
                <div class="card" style="text-align:center; background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.3);">
                    <div style="font-size:2.2rem; margin-bottom:8px;">🚗</div>
                    <h3 style="color:#C084FC;">VOV GIAO THÔNG</h3>
                    <p style="font-size:0.85rem; color:#AAB7C8; margin-top:4px;">Thông tin trực tiếp Giờ cao điểm</p>
                    <div class="badge" style="background:rgba(168,85,247,0.25); color:#E0AAFF; margin:12px auto; display:inline-block;">FM 91.0 MHz</div>
                    <p style="font-size:0.88rem; color:#E2E8F0; text-align:left; line-height:1.6;">
                        Kênh thông tin không thể thiếu của các tài xế ô tô tại Hà Nội, TP.HCM và Đồng bằng sông Cửu Long, cập nhật tức thời tình trạng ùn tắc giao thông.
                    </p>
                </div>
            </div>
        `,
        notes: `Để trả lời câu hỏi liên hệ thực tế trong SGK trang 31:
Đài Tiếng nói Việt Nam (VOV) là minh chứng sinh động nhất cho việc ứng dụng linh hoạt cả hai loại sóng:
Kênh VOV1 phát thanh thời sự bắt buộc phải duy trì sóng AM công suất lớn hàng trăm kilowatt để truyền tới các hải đảo xa xôi và vùng núi cao, nơi sóng FM không thể với tới.
Kênh VOV3 chuyên về âm nhạc phát sóng trên FM 102.7 MHz để thính giả thưởng thức âm thanh nổi chất lượng cao.
Còn VOV Giao thông phát trên FM 91.0 MHz đã trở thành người bạn đồng hành quen thuộc trên mọi chiếc xe hơi tại các đô thị lớn.`
    },

    // =========================================================================
    // SLIDE 20: QUẢN LÝ VÀ CẤP PHÁT TẦN SỐ VÔ TUYẾN ĐIỆN
    // =========================================================================
    {
        num: 20,
        tag: "PHẦN IV • PHÁP LUẬT VÀ CHỦ QUYỀN",
        title: "Quản Lý & Cấp Phát Tần Số Vô Tuyến Điện",
        subtitle: "Tài nguyên vô tuyến là chủ quyền quốc gia — Theo Hộp Em có biết SGK Trang 32",
        content_html: `
            <div class="grid-2col" style="flex:1; gap:24px;">
                <div class="card card-modern">
                    <div class="card-badge badge-blue">TẠI SAO PHẢI QUẢN LÝ TẦN SỐ?</div>
                    <ul class="styled-list" style="margin-top:14px;">
                        <li><strong>Tài nguyên hữu hạn:</strong> Phổ tần số sóng vô tuyến là tài nguyên quốc gia có giới hạn; nếu phát sóng tùy tiện sẽ gây can nhiễu nghiêm trọng.</li>
                        <li><strong>An toàn sinh mạng & An ninh quốc gia:</strong>
                            <br>• Dải tần điều khiển không lưu hàng không, cứu hộ hàng hải, thông tin quân sự quốc phòng phải được bảo vệ tuyệt đối không bị chèn phá sóng.
                        </li>
                        <li><strong>Trách nhiệm cơ quan quản lý:</strong> Tại Việt Nam, <strong>Bộ Thông tin và Truyền thông</strong> (trực tiếp là Cục Tần số vô tuyến điện) chịu trách nhiệm quy hoạch, cấp phép và thanh tra xử lý can nhiễu.</li>
                    </ul>
                </div>
                <div class="card card-vintage">
                    <div class="card-badge badge-amber">QUỐC TẾ HÓA & PHỐI HỢP BIÊN GIỚI</div>
                    <ul class="styled-list" style="margin-top:14px;">
                        <li><strong>Đăng ký quốc tế:</strong> Phối hợp với Liên minh Viễn thông Quốc tế (ITU) để đăng ký vị trí quỹ đạo vệ tinh VINASAT và tần số phát thanh quốc tế.</li>
                        <li><strong>Hiệp định biên giới:</strong> Thống nhất tần số phát sóng tại khu vực biên giới với các nước láng giềng (Lào, Campuchia, Trung Quốc) để tránh đài nước này đè sóng đài nước kia.</li>
                        <li><strong>Chế tài xử phạt:</strong> Sử dụng thiết bị kích sóng, micro không dây, bộ đàm sai dải tần quy định đều bị xử phạt nghiêm khắc theo Luật Tần số vô tuyến điện.</li>
                    </ul>
                </div>
            </div>
        `,
        notes: `Nội dung mục "Em có biết" tại trang 32 SGK nhấn mạnh một khía cạnh vô cùng quan trọng: Pháp luật và chủ quyền không gian vô tuyến.
Sóng điện từ không có biên giới hữu hình, nhưng phổ tần số lại là tài nguyên quốc gia có hạn.
Nếu không có sự quản lý của Bộ Thông tin và Truyền thông, các đài phát sẽ chèn sóng lên nhau. Nghiêm trọng hơn, nếu can nhiễu vào tần số radar dẫn đường máy bay dân dụng hay tần số quốc phòng, hậu quả sẽ khôn lường.
Do đó, mọi thiết bị phát sóng vô tuyến đều phải tuân thủ nghiêm ngặt quy hoạch tần số quốc gia.`
    },

    // =========================================================================
    // SLIDE 21: MỐI LIÊN HỆ HỆ THỐNG VỚI BÀI 5
    // =========================================================================
    {
        num: 21,
        tag: "TỔNG HỢP KIẾN THỨC • CẦU NỐI BÀI 4 VÀ BÀI 5",
        title: "Sự Kết Nối Giữa Bài 4 (Biến Điệu) Và Bài 5 (Tín Hiệu Số)",
        subtitle: "Bức tranh toàn cảnh của hệ thống viễn thông hiện đại",
        content_html: `
            <div style="flex:1; display:flex; flex-direction:column; justify-content:center; gap:20px;">
                <div class="card" style="padding:20px; background:rgba(15,23,42,0.9); border:1px solid rgba(0,229,255,0.25);">
                    <div style="font-weight:700; color:var(--cyan); margin-bottom:12px; text-align:center;">
                        SƠ ĐỒ DÒNG DỮ LIỆU TỪ NGUỒN PHÁT ĐẾN NƠI NHẬN TRONG VIỄN THÔNG HIỆN ĐẠI
                    </div>
                    <!-- Sơ đồ chuỗi truyền thông kết hợp Bài 4 và Bài 5 -->
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; text-align:center;">
                        <div class="flow-pill" style="border-color:#F59E0B;">
                            <div style="font-size:1.4rem;">🎙️</div>
                            <div style="font-weight:bold; color:#F59E0B;">Âm thanh analog</div>
                            <div style="font-size:0.75rem; color:#94A3B8;">Giọng nói ban đầu</div>
                        </div>
                        <div style="color:var(--cyan); font-size:1.3rem;">➜</div>
                        <div class="flow-pill" style="border-color:#3B82F6;">
                            <div style="font-size:1.4rem;">🔢</div>
                            <div style="font-weight:bold; color:#3B82F6;">Bộ ADC (Bài 5)</div>
                            <div style="font-size:0.75rem; color:#94A3B8;">Số hóa thành bit 0, 1</div>
                        </div>
                        <div style="color:var(--cyan); font-size:1.3rem;">➜</div>
                        <div class="flow-pill" style="border-color:#A855F7;">
                            <div style="font-size:1.4rem;">💾</div>
                            <div style="font-weight:bold; color:#A855F7;">Xử lý số DSP</div>
                            <div style="font-size:0.75rem; color:#94A3B8;">Nén dữ liệu & mã hóa</div>
                        </div>
                        <div style="color:var(--cyan); font-size:1.3rem;">➜</div>
                        <div class="flow-pill" style="border-color:var(--amber); background:rgba(245,158,11,0.15);">
                            <div style="font-size:1.4rem;">📡</div>
                            <div style="font-weight:bold; color:var(--amber);">BIẾN ĐIỆU (Bài 4)</div>
                            <div style="font-size:0.75rem; color:#F8FAFC;">Gắn vào sóng mang cao tần</div>
                        </div>
                        <div style="color:var(--cyan); font-size:1.3rem;">➜</div>
                        <div class="flow-pill" style="border-color:#10B981;">
                            <div style="font-size:1.4rem;">📶</div>
                            <div style="font-weight:bold; color:#10B981;">Anten phát xạ</div>
                            <div style="font-size:0.75rem; color:#94A3B8;">Truyền sóng đi xa</div>
                        </div>
                    </div>
                </div>
                <div class="grid-2col" style="gap:16px;">
                    <div class="card" style="font-size:0.9rem; line-height:1.6;">
                        <strong style="color:var(--amber);">Bài 4 dạy chúng ta:</strong> Sóng điện từ truyền tin đi xa như thế nào thông qua kĩ thuật điều chế sóng mang cao tần (AM và FM).
                    </div>
                    <div class="card" style="font-size:0.9rem; line-height:1.6;">
                        <strong style="color:var(--cyan);">Bài 5 hoàn thiện bức tranh:</strong> Bản chất của tín hiệu số và tương tự, cách bộ ADC/DAC kết hợp cùng mạch biến điệu để tạo nên điện thoại 4G/5G và Internet không dây ngày nay.
                    </div>
                </div>
            </div>
        `,
        notes: `Slide 21 kết nối hai bài học liên hoàn trong Chuyên đề II:
Bài 4 và Bài 5 không đứng tách rời, mà là hai mảnh ghép cốt lõi của một hệ thống viễn thông hoàn chỉnh.
Trong các thiết bị hiện đại như điện thoại thông minh: Giọng nói analog của ta trước hết được bộ ADC ở Bài 5 số hóa thành các bit 0 và 1; sau khi được chip nén dữ liệu, chuỗi bit này lại được đưa vào bộ biến điệu ở Bài 4 để cưỡi lên sóng mang cao tần phát ra không gian.
Hiểu được cả hai bài, chúng ta đã nắm trọn vẹn nền tảng của toàn bộ nền văn minh thông tin số ngày nay.`
    },

    // =========================================================================
    // SLIDE 22: TỔNG KẾT BÀI HỌC
    // =========================================================================
    {
        num: 22,
        tag: "PHẦN KẾT LUẬN • TỔNG KẾT BÀI HỌC",
        title: "Tóm Tắt Khắc Sâu Kiến Thức Bài 4",
        subtitle: "Những bài học cốt lõi cần ghi nhớ",
        content_html: `
            <div class="grid-2col" style="flex:1; gap:20px;">
                <div class="card card-vintage" style="display:flex; flex-direction:column; justify-content:center;">
                    <div class="card-badge badge-amber">3 TỪ KHÓA BẢN CHẤT</div>
                    <ol class="styled-list" style="margin-top:14px; font-size:0.95rem; line-height:1.7;">
                        <li><strong>Biến điệu:</strong> Trộn tín hiệu âm tần tần số thấp vào sóng mang cao tần để bức xạ truyền xa.</li>
                        <li><strong>AM (Biến điệu biên độ):</strong> Biên độ đổi, tần số giữ nguyên. Băng thông $B_{AM} = 2f_m$. Phản xạ tầng điện li truyền ngàn km.</li>
                        <li><strong>FM (Biến điệu tần số):</strong> Tần số đổi, biên độ đỉnh giữ nguyên. Băng thông $B_{FM} = 2(1+b)B$. Âm thanh Hi-Fi stereo, kháng nhiễu tuyệt đối, truyền tầm nhìn thẳng.</li>
                    </ol>
                </div>
                <div class="card card-modern" style="display:flex; flex-direction:column; justify-content:center; text-align:center;">
                    <div style="font-size:2.5rem; margin-bottom:8px;">🎓</div>
                    <h3 style="color:var(--cyan);">CẢM ƠN THẦY CÔ VÀ CÁC BẠN ĐÃ LẮNG NGHE!</h3>
                    <p style="color:#AAB7C8; margin-top:10px; font-size:0.92rem; line-height:1.6;">
                        Kính mời thầy cô và các bạn trải nghiệm các phòng thí nghiệm mô phỏng 3D/2D tương tác trực tiếp trên Website!
                    </p>
                    <div style="margin-top:16px; display:flex; justify-content:center; gap:12px;">
                        <button class="btn btn-primary" onclick="goToSlide(0)">↺ Xem lại từ Slide 1</button>
                        <button class="btn" onclick="toggleOverview()">⊞ Danh mục 22 Slide</button>
                    </div>
                </div>
            </div>
        `,
        notes: `Để kết luận bài thuyết trình hôm nay, nhóm chúng em xin tóm tắt lại 3 thông điệp trọng tâm:
1. Biến điệu là chiếc cầu nối đưa âm thanh tần số thấp vượt ngàn dặm không gian nhờ sóng mang cao tần.
2. AM và FM đại diện cho hai triết lý điều chế: AM tối ưu cự ly và độ phủ sóng toàn cầu nhờ tầng điện ly; còn FM tối ưu chất lượng âm thanh trung thực và khả năng kháng nhiễu tuyệt đối cho đô thị.
3. Cùng với Bài 5, đây chính là nền móng của toàn bộ công nghệ phát thanh, truyền hình và viễn thông di động.
Xin chân thành cảm ơn thầy cô và các bạn đã chú ý lắng nghe! Sau đây xin mời thầy cô và các bạn cùng đặt câu hỏi và trải nghiệm mô phỏng tương tác trên trang web.`
    }
];
