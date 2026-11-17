/**
 * Full 26-Slide Academic Presentation Data
 * Physics 11 - Chapter II - Lesson 5: Analog & Digital Signals
 * Integrating Interactive 3D & 2D Simulation Mounts + Full Speaker Notes
 */

window.SLIDES_DATA = [
    // =========================================================================
    // SLIDE 01: TRANG BÌA (WITH 3D HERO SIMULATION)
    // =========================================================================
    {
        num: 1,
        isCover: true,
        simBadge: "3D WebGL",
        tag: "CHUYÊN ĐỀ HỌC TẬP VẬT LÍ 11 • BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG",
        title: "BÀI 5: TÍN HIỆU TƯƠNG TỰ VÀ TÍN HIỆU SỐ",
        subtitle: "Chuyên đề II: Truyền thông tin bằng sóng vô tuyến • Báo cáo Khoa học Học thuật",
        content_html: `
            <div class="sim-box" style="flex:1; margin-top:12px;">
                <div class="sim-topbar">
                    <span><span class="badge badge-3d">MÔ PHỎNG 3D TƯƠNG TÁC</span> Sóng Điện Từ Tương Tự (vectơ E, B) → Chuyển Đổi Thành Xung Số Nhị Phân</span>
                    <div style="display:flex; gap:8px;">
                        <button class="sim-btn" onclick="Sim3DManager.get('sim3d-hero')?.resetView()">↺ Đặt lại góc nhìn</button>
                    </div>
                </div>
                <div class="sim-canvas-wrap" id="sim3d-hero"></div>
                <div class="sim-hint">🖱️ Kéo chuột để xoay 360° • Cuộn để phóng to/thu nhỏ</div>
            </div>
        `,
        notes: `Kính thưa quý thầy cô và toàn thể các bạn học sinh! Hôm nay nhóm chúng em xin trình bày bài báo cáo học thuật chuyên sâu thuộc Chuyên đề Vật lí 11 – Bài 5: "Tín hiệu tương tự và Tín hiệu số".
Ngay trên màn hình trang bìa, thầy cô và các bạn có thể quan sát mô hình 3D trực quan minh họa sự chuyển đổi cốt lõi của thế giới truyền thông: bên trái là sóng điện từ tương tự biến thiên liên tục theo không gian và thời gian (gồm vectơ điện trường E và từ trường B vuông góc nhau); khi đi qua vòng chuyển đổi số hóa (ADC), nó trở thành các cột xung vuông rời rạc biểu diễn chuỗi bit 0 và 1.
Bài thuyết trình gồm 4 phần chính sẽ giúp chúng ta nắm vững bản chất vật lí, phương thức truyền dẫn và ứng dụng thực tế của cả hai loại tín hiệu này.`
    },

    // =========================================================================
    // SLIDE 02: TỔNG QUAN VỀ TÍN HIỆU TRONG ĐỜI SỐNG
    // =========================================================================
    {
        num: 2,
        tag: "PHẦN MỞ ĐẦU • ĐẶT VẤN ĐỀ",
        title: "Tổng quan về tín hiệu trong đời sống",
        content_html: `
            <div class="grid-2">
                <div class="card card-cyan">
                    <h3 class="card-title cyan">1. TÍN HIỆU LÀ GÌ?</h3>
                    <div class="quote-box">
                        <b>Định nghĩa (SGK trang 33):</b><br>
                        Thông tin được biến đổi thành dạng <b>điện</b> hoặc <b>quang</b> phù hợp để truyền đi xa được gọi là <b>tín hiệu</b>.
                    </div>
                    <p style="color:#AAB7C8; margin-top:8px;">
                        <b>Giải thích bản chất vật lí:</b><br>
                        Thông tin gốc trong tự nhiên (âm thanh, hình ảnh, nhiệt độ) thường có tần số thấp hoặc chỉ lan truyền trong phạm vi hẹp. Để truyền đi xa hàng nghìn ki-lô-mét với tốc độ ánh sáng, con người bắt buộc phải chuyển đổi chúng thành <i>dao động điện áp</i> hoặc <i>xung ánh sáng</i>.
                    </p>
                    <div class="info-callout" style="border-color:#32D5F2;">
                        <b class="cyan">→ Hai hình thức tồn tại cơ bản trong kỹ thuật:</b><br>
                        1. Tín hiệu tương tự (Analog Signal)<br>
                        2. Tín hiệu số (Digital Signal)
                    </div>
                </div>
                <div class="card card-blue">
                    <h3 class="card-title blue">2. CÁC VÍ DỤ QUEN THUỘC QUANH TA</h3>
                    <ul class="bullet-list" style="margin-top:6px;">
                        <li><b>Giọng nói khi giao tiếp:</b> Dây thanh quản dao động làm áp suất không khí biến thiên liên tục tạo thành sóng âm cơ học.</li>
                        <li><b>Âm nhạc phát ra từ loa:</b> Tín hiệu điện biến thiên chạy qua cuộn dây đặt trong từ trường nam châm làm màng loa rung.</li>
                        <li><b>Tín hiệu truyền hình:</b> Hình ảnh và âm thanh được mã hóa thành sóng vô tuyến truyền từ đài phát đến ăng-ten thu.</li>
                        <li><b>Dữ liệu truyền qua Internet:</b> Văn bản, video, cuộc gọi được đóng gói thành hàng tỉ xung ánh sáng truyền trong cáp quang xuyên đại dương.</li>
                    </ul>
                </div>
            </div>
        `,
        notes: `Để bắt đầu bài học, chúng ta hãy nhìn lại khái niệm nền tảng từ sách giáo khoa trang 33: Thông tin sau khi được biến đổi thành dạng điện hoặc dạng quang phù hợp để truyền đi xa được gọi là tín hiệu.
Trong đời sống hàng ngày, chúng ta tiếp xúc liên tục với thông tin và tín hiệu: từ tiếng nói khi giao tiếp trực tiếp, bản nhạc phát ra từ chiếc loa, sóng truyền hình cho tới dữ liệu Internet truyền qua cáp quang và mạng di động.
Trên thực tế kỹ thuật, mọi tín hiệu điện hay quang đó đều tồn tại dưới một trong hai dạng thức cơ bản: Tín hiệu tương tự hoặc Tín hiệu số. Tiếp theo, chúng ta sẽ đi sâu vào Phần I để tìm hiểu về Tín hiệu tương tự.`
    },

    // =========================================================================
    // SLIDE 03: KHÁI NIỆM TÍN HIỆU TƯƠNG TỰ (WITH 2D INTERACTIVE ANALOG EXPLORER)
    // =========================================================================
    {
        num: 3,
        simBadge: "2D Tương tác",
        tag: "PHẦN I • TÍN HIỆU TƯƠNG TỰ (ANALOG SIGNAL)",
        title: "Khái niệm và bản chất tín hiệu tương tự",
        content_html: `
            <div class="grid-2-wide-right">
                <div class="card card-cyan">
                    <h3 class="card-title cyan">ĐỊNH NGHĨA CHUẨN VẬT LÍ</h3>
                    <div class="quote-box">
                        <b>Tín hiệu tương tự</b> là tín hiệu <b>liên tục theo thời gian</b>, có <b>vô số giá trị/mức biên độ</b> trong một khoảng thời gian.
                    </div>
                    <h4 class="blue" style="margin-top:10px; margin-bottom:6px;">3 Đặc trưng bản chất:</h4>
                    <ul class="bullet-list">
                        <li><b>Liên tục theo thời gian:</b> Tại mọi thời điểm t bất kì, tín hiệu luôn xác định giá trị.</li>
                        <li><b>Vô số mức biên độ:</b> Giữa 2 mức điện áp bất kì luôn tồn tại vô số giá trị thực trung gian.</li>
                        <li><b>Đồ thị hình học:</b> Đường cong biểu diễn đi qua <i>vô số điểm</i> trên mặt phẳng tọa độ u–t.</li>
                    </ul>
                    <div class="info-callout">
                        💡 <b>Thử tương tác:</b> Di chuột lên đồ thị bên phải để kiểm chứng tại mọi thời điểm t đều có giá trị điện áp u liên tục, hoặc chọn chế độ <i>"Tự vẽ sóng"</i>!
                    </div>
                </div>
                <div class="sim-box">
                    <div class="sim-topbar">
                        <span><span class="badge badge-2d">MÔ PHỎNG 2D</span> Khảo sát đồ thị u(t) liên tục</span>
                        <div style="display:flex; gap:5px;">
                            <button class="sim-btn active" id="btn-analog-per" onclick="setAnalogMode('periodic')">Tuần hoàn</button>
                            <button class="sim-btn" id="btn-analog-non" onclick="setAnalogMode('nonperiodic')">Không tuần hoàn</button>
                            <button class="sim-btn" id="btn-analog-draw" onclick="setAnalogMode('draw')">✏️ Tự vẽ sóng</button>
                        </div>
                    </div>
                    <div class="sim-canvas-wrap">
                        <canvas id="sim2d-analog"></canvas>
                    </div>
                    <div class="sim-controls">
                        <div class="ctrl-group">
                            <label>Tần số f:</label>
                            <input type="range" id="analog-freq" min="0.5" max="5" step="0.5" value="2" oninput="updateAnalogParams()">
                        </div>
                        <div class="ctrl-group">
                            <label>Biên độ U₀:</label>
                            <input type="range" id="analog-amp" min="0.2" max="1.0" step="0.1" value="0.8" oninput="updateAnalogParams()">
                        </div>
                    </div>
                </div>
            </div>
        `,
        notes: `Bước vào Phần I, định nghĩa chuẩn của Tín hiệu tương tự như sau: "Tín hiệu tương tự là tín hiệu liên tục theo thời gian, có vô số giá trị hoặc mức biên độ trong một khoảng thời gian."
Ở đây có hai tính chất cực kì quan trọng:
Thứ nhất là tính liên tục theo thời gian: không hề có khoảng trống bị ngắt quãng.
Thứ hai là có vô số mức biên độ: đại lượng biểu diễn tín hiệu (như điện áp u) biến thiên mượt mà, đi qua vô số điểm trên đồ thị.
Thầy cô và các bạn có thể quan sát trên mô phỏng 2D bên phải: khi tôi di chuột dọc theo đường cong màu xanh, tại bất kì thời điểm t nào hệ thống cũng đo được một giá trị điện áp thực tương ứng. Thậm chí chúng ta có thể chuyển sang dạng không tuần hoàn hoặc tự vẽ một đường sóng bất kì để thấy sự biến thiên liên tục này.`
    },

    // =========================================================================
    // SLIDE 04: HAI DẠNG TÍN HIỆU TƯƠNG TỰ
    // =========================================================================
    {
        num: 4,
        tag: "PHẦN I • TÍN HIỆU TƯƠNG TỰ (ANALOG SIGNAL)",
        title: "Hai dạng tín hiệu tương tự: Tuần hoàn & Không tuần hoàn",
        content_html: `
            <div style="display:flex; flex-direction:column; gap:14px; height:100%;">
                <div class="grid-2" style="flex:1; min-height:0;">
                    <div class="card card-cyan">
                        <h3 class="card-title cyan">1. TÍN HIỆU TUẦN HOÀN</h3>
                        <ul class="bullet-list">
                            <li><b>Đặc điểm:</b> Có dạng sóng <b>lặp lại như cũ</b> sau mỗi chu kì T bằng nhau.</li>
                            <li><b>Dạng sóng tiêu biểu:</b> Tín hiệu hình <b>sin</b> hoặc <b>cosin</b>.</li>
                            <li><b>Phương trình:</b> <code>u(t) = U₀ cos(ωt + φ)</code></li>
                            <li><b>Ví dụ:</b> Dòng điện xoay chiều sinh hoạt 50 Hz, sóng âm thuần từ âm thoa chuẩn, sóng mang vô tuyến chưa điều chế.</li>
                        </ul>
                    </div>
                    <div class="card card-coral">
                        <h3 class="card-title coral">2. TÍN HIỆU KHÔNG TUẦN HOÀN</h3>
                        <ul class="bullet-list">
                            <li><b>Đặc điểm:</b> <b>Không có sự lặp lại</b> đều đặn sau những khoảng thời gian bằng nhau, tức là <i>không có chu kì</i>.</li>
                            <li><b>Cấu trúc phổ:</b> Là tổng hợp phức tạp của nhiều dao động tần số khác nhau biến đổi theo thời gian.</li>
                            <li><b>Ví dụ:</b> Sóng âm giọng nói con người khi giao tiếp, tiếng đàn nhạc cụ, tín hiệu điện áp cảm biến môi trường.</li>
                        </ul>
                    </div>
                </div>
                <div class="card card-blue" style="padding:10px; text-align:center; flex-shrink:0;">
                    <img src="assets/fig_analog_signals.png" style="max-height:205px; margin:0 auto; border-radius:6px;">
                </div>
            </div>
        `,
        notes: `Dựa vào Hình 5.1 trong sách giáo khoa, tín hiệu tương tự tồn tại ở một trong hai dạng là tuần hoàn hoặc không tuần hoàn.
Tín hiệu tuần hoàn có dạng sóng lặp lại giống hệt nhau sau mỗi chu kì T, điển hình là đồ thị hình sin hoặc hình cosin như hình (a).
Ngược lại, tín hiệu không tuần hoàn như hình (b) không hề có sự lặp lại tuần hoàn nào và không có chu kì cố định. Giọng nói của con người hay tiếng nhạc cụ thực tế phần lớn là tín hiệu tương tự không tuần hoàn. Tuy hình dạng khác nhau, cả hai đều có chung bản chất là biến đổi liên tục theo thời gian.`
    },

    // =========================================================================
    // SLIDE 05: CHU KÌ VÀ TẦN SỐ (WITH 3D PHASOR & WAVE SIMULATION)
    // =========================================================================
    {
        num: 5,
        simBadge: "3D WebGL",
        tag: "PHẦN I • TÍN HIỆU TƯƠNG TỰ (ANALOG SIGNAL)",
        title: "Chu kì và tần số của tín hiệu tương tự tuần hoàn",
        content_html: `
            <div class="grid-2-wide-right">
                <div class="card card-cyan">
                    <h3 class="card-title cyan">CÔNG THỨC VÀ BÀI TOÁN SGK</h3>
                    <div class="formula-box">
                        T = 1 / f &nbsp;&nbsp;&nbsp;⇄&nbsp;&nbsp;&nbsp; f = 1 / T
                    </div>
                    <ul class="bullet-list" style="margin-top:8px;">
                        <li><b>T:</b> Chu kì dao động, đơn vị giây (<b>s</b>).</li>
                        <li><b>f:</b> Tần số dao động, đơn vị Hertz (<b>Hz</b>).</li>
                    </ul>
                    <div style="margin-top:10px; padding:12px; background:rgba(16,28,53,0.9); border-radius:8px; border-left:4px solid #FF6B6B;">
                        <b class="coral">VÍ DỤ MẪU SGK (Trang 33):</b><br>
                        Dòng điện xoay chiều sinh hoạt tại Việt Nam là tín hiệu tương tự dạng sin có tần số <b>f = 50 Hz</b>.<br>
                        <b class="cyan">→ Tính chu kì T:</b><br>
                        <code>T = 1 / f = 1 / 50 = 0,02 s = 20 ms</code><br>
                        <span style="color:#AAB7C8; font-size:0.86rem;">Mỗi dao động toàn phần kéo dài đúng 20 mili giây.</span>
                    </div>
                    <div class="info-callout" style="margin-top:10px;">
                        🎛️ Kéo thanh trượt <b>Tần số f</b> ở mô phỏng 3D bên cạnh để quan sát véc-tơ quay tốc độ nhanh/chậm và chu kì T thay đổi trực tiếp!
                    </div>
                </div>
                <div class="sim-box">
                    <div class="sim-topbar">
                        <span><span class="badge badge-3d">MÔ PHỎNG 3D</span> Véc-tơ quay & Sóng hình sin</span>
                        <span class="sim-readout" id="phasor-readout">f = 50 Hz → T = 20.0 ms</span>
                    </div>
                    <div class="sim-canvas-wrap" id="sim3d-phasor"></div>
                    <div class="sim-controls">
                        <div class="ctrl-group">
                            <label>Tần số f:</label>
                            <input type="range" id="phasor-freq" min="10" max="100" step="5" value="50" oninput="updatePhasor3D()">
                        </div>
                        <div class="ctrl-group">
                            <label>Biên độ:</label>
                            <input type="range" id="phasor-amp" min="0.4" max="1.2" step="0.1" value="1.0" oninput="updatePhasor3D()">
                        </div>
                        <button class="sim-btn" onclick="Sim3DManager.get('sim3d-phasor')?.resetView()">↺ Reset góc</button>
                    </div>
                </div>
            </div>
        `,
        notes: `Với tín hiệu tương tự tuần hoàn dạng sin, hai đại lượng đặc trưng cơ bản nhất là Chu kì T và Tần số f, liên hệ mật thiết qua công thức T = 1/f. Trong đó T tính bằng giây (s), là thời gian thực hiện 1 dao động toàn phần; còn f tính bằng Hertz (Hz), là số dao động thực hiện trong 1 giây.
Theo ví dụ trang 33 SGK: dòng điện xoay chiều ta đang sử dụng hàng ngày có tần số 50 Hz, suy ra chu kì của nó là T = 1/50 = 0,02 giây, tức 20 mili giây.
Trên mô phỏng 3D bên phải, khi véc-tơ quay tròn một vòng hoàn chỉnh, hình chiếu thẳng đứng của nó tạo ra đúng một chu kì sóng sin. Khi tôi tăng tần số f lên 100 Hz, véc-tơ quay nhanh gấp đôi và chu kì T rút ngắn một nửa còn 10 ms.`
    },

    // =========================================================================
    // SLIDE 06: VÍ DỤ THỰC TẾ VỀ TÍN HIỆU TƯƠNG TỰ
    // =========================================================================
    {
        num: 6,
        tag: "PHẦN I • TÍN HIỆU TƯƠNG TỰ (ANALOG SIGNAL)",
        title: "Các ví dụ thực tế về tín hiệu tương tự trong tài liệu",
        content_html: `
            <div class="grid-3">
                <div class="card card-cyan">
                    <h3 class="card-title cyan">1. CÁP ĐỒNG ĐIỆN THOẠI CỐ ĐỊNH</h3>
                    <div class="quote-box" style="font-size:0.9rem;">
                        Tín hiệu truyền trên đường dây cáp đồng nối điện thoại cố định với tổng đài.
                    </div>
                    <p style="color:#AAB7C8; margin-top:8px;">
                        <b>Phân tích vật lí:</b> Khi người dùng nói vào ống nghe, dao động cơ học được biến đổi trực tiếp thành dòng điện có cường độ và điện áp thay đổi liên tục theo lời nói, truyền dọc đôi dây đồng về tổng đài bưu điện.
                    </p>
                </div>
                <div class="card card-blue">
                    <h3 class="card-title blue">2. TRUYỀN HÌNH ĐEN TRẮNG THẬP NIÊN 90</h3>
                    <div class="quote-box" style="font-size:0.9rem;">
                        Tín hiệu truyền hình đen trắng phát vào thập niên 90 là tín hiệu tương tự.
                    </div>
                    <p style="color:#AAB7C8; margin-top:8px;">
                        <b>Phân tích vật lí:</b> Độ sáng tối của từng điểm ảnh trên màn hình bóng đèn hình (CRT) tỉ lệ thuận liên tục với biên độ điện áp tín hiệu video thu được từ ăng-ten.
                    </p>
                </div>
                <div class="card card-green">
                    <h3 class="card-title green">3. MICRO CHUYỂN ĐỔI ÂM THANH</h3>
                    <div class="quote-box" style="font-size:0.9rem;">
                        Sóng âm thanh đập vào micrô biến đổi thành tín hiệu điện có điện áp thay đổi liên tục.
                    </div>
                    <p style="color:#AAB7C8; margin-top:8px;">
                        <b>Phân tích vật lí:</b> Áp suất sóng âm làm rung màng micro, kéo cuộn dây chuyển động trong từ trường sinh ra suất điện động cảm ứng biến thiên liên tục đồng dạng 1:1 với âm thanh gốc.
                    </p>
                    <div class="slide-img-card" style="margin-top:8px;">
                        <img src="assets/sound_mixer_studio.jpg" alt="Phòng thu & Micro âm thanh analog" style="max-height:85px; object-fit:cover;">
                        <div class="slide-img-caption">🎙️ Màng micro biến dao động âm thanh thành điện áp tương tự liên tục</div>
                    </div>
                </div>
            </div>
        `,
        notes: `Mục "Em có biết" trong sách giáo khoa trang 33 cung cấp 3 ví dụ thực tế rất tiêu biểu giúp chúng ta hiểu rõ mối liên hệ giữa đại lượng vật lí và tín hiệu tương tự:
Thứ nhất, tín hiệu truyền trên đường dây cáp đồng nối điện thoại cố định với tổng đài: sự biến thiên áp suất giọng nói biến trực tiếp thành điện áp liên tục trên dây đồng.
Thứ hai, tín hiệu truyền hình đen trắng vào thập niên 90: biên độ điện áp điều khiển trực tiếp cường độ chùm tia electron quét trên đèn hình CRT để tạo mức sáng tối.
Thứ ba, hoạt động của micro: sóng âm thanh đập vào màng rung của micro làm phát sinh dòng điện cảm ứng có điện áp biến đổi liên tục theo thời gian. Cả ba trường hợp đều chứng minh đại lượng vật lí đầu vào liên tục tạo ra tín hiệu điện tương tự đầu ra.`
    },

    // =========================================================================
    // SLIDE 07: KHÁI NIỆM TÍN HIỆU SỐ
    // =========================================================================
    {
        num: 7,
        tag: "PHẦN II • TÍN HIỆU SỐ (DIGITAL SIGNAL)",
        title: "Khái niệm và đặc trưng của tín hiệu số",
        content_html: `
            <div class="grid-2">
                <div class="card card-cyan">
                    <h3 class="card-title cyan">ĐỊNH NGHĨA CHUẨN VẬT LÍ</h3>
                    <div class="quote-box">
                        <b>Tín hiệu số</b> là tín hiệu <b>rời rạc theo thời gian</b> và thường được biểu diễn dưới dạng <b>xung vuông</b>.
                    </div>
                    <h4 class="blue" style="margin-top:12px; margin-bottom:6px;">3 Đặc điểm bản chất của tín hiệu số:</h4>
                    <ul class="bullet-list">
                        <li><b>Rời rạc theo thời gian:</b> Tín hiệu chỉ tồn tại ở những khoảng thời gian hoặc bước xung gián đoạn, không biến thiên trơn tru liên tục.</li>
                        <li><b>Hữu hạn các mức điện áp:</b> Chỉ nhận một số lượng hữu hạn (đếm được) các giá trị/mức điện áp xác định trước.</li>
                        <li><b>Bước nhảy đột ngột:</b> Đồ thị cho thấy tín hiệu nhảy vọt tức thời từ giá trị điện áp này sang giá trị điện áp khác tạo nên hình dạng xung vuông.</li>
                    </ul>
                    <div class="slide-img-card" style="margin-top:10px;">
                        <img src="assets/digital_circuit_chip.jpg" alt="Vi mạch xử lý tín hiệu số" style="max-height:85px; object-fit:cover;">
                        <div class="slide-img-caption">💾 Vi mạch logic số xử lý hàng tỉ xung nhị phân 0 và 1 mỗi giây</div>
                    </div>
                </div>
                <div class="card card-blue center-v" style="text-align:center;">
                    <h3 class="card-title blue" style="justify-content:center;">HÌNH DẠNG XUNG VUÔNG RỜI RẠC (HÌNH 5.2 SGK)</h3>
                    <img src="assets/fig_digital_2level.png" style="max-width:100%; border-radius:8px; margin-top:8px;">
                    <p style="color:#AAB7C8; font-size:0.86rem; margin-top:10px;">
                        Các bước nhảy thẳng đứng thể hiện sự chuyển đổi đột ngột giữa Mức 1 (0V) và Mức 2 (+5V).
                    </p>
                </div>
            </div>
        `,
        notes: `Chuyển sang Phần II, chúng ta tìm hiểu về Tín hiệu số (Digital Signal).
Theo định nghĩa trang 34 SGK: "Tín hiệu số là tín hiệu rời rạc theo thời gian và thường được biểu diễn dưới dạng xung vuông."
Nếu tín hiệu tương tự giống như một con dốc thoai thoải có vô số độ cao, thì tín hiệu số giống như một chiếc cầu thang chỉ có một số bậc cao thấp cố định.
Các đặc trưng cốt lõi cần nắm là: tín hiệu số chỉ nhận một số hữu hạn các mức điện áp trong một khoảng thời gian; và trên đồ thị, chúng ta luôn thấy các bước nhảy đột ngột giữa các mức để tạo thành các xung vuông sắc cạnh.`
    },

    // =========================================================================
    // SLIDE 08: HAI MỨC ĐIỆN ÁP VÀ CÁCH BIỂU DIỄN 0, 1
    // =========================================================================
    {
        num: 8,
        tag: "PHẦN II • TÍN HIỆU SỐ (DIGITAL SIGNAL)",
        title: "Hai mức điện áp và cách biểu diễn logic 0, 1",
        content_html: `
            <div class="grid-2">
                <div class="card card-cyan">
                    <h3 class="card-title cyan">MÃ HÓA NHỊ PHÂN CƠ BẢN</h3>
                    <ul class="bullet-list" style="margin-top:6px;">
                        <li><b>Bit "1" (Mức cao):</b> Có thể được mã hóa (biểu diễn) bằng một giá trị <b>điện áp dương</b> xác định (ví dụ +5 V hoặc +3,3 V).</li>
                        <li><b>Bit "0" (Mức thấp):</b> Có thể được mã hóa bằng giá trị <b>điện áp bằng 0</b> (0 V).</li>
                    </ul>
                    <div class="info-callout" style="border-color:#FF6B6B; margin-top:14px;">
                        <b class="coral">LƯU Ý HỌC THUẬT QUAN TRỌNG:</b><br>
                        Đây là cách mã hóa minh họa căn bản trong sách giáo khoa, <b>không phải quy ước điện áp duy nhất</b> cho mọi hệ thống số. Trong kỹ thuật thực tế còn có nhiều chuẩn khác (ví dụ chuẩn TTL, CMOS hoặc tín hiệu vi sai dùng điện áp âm và dương).
                    </div>
                    <div style="margin-top:14px; padding:10px; background:#101C35; border-radius:8px;">
                        <span class="green" style="font-weight:bold;">Ví dụ chuỗi bit trên đồ thị bên phải:</span><br>
                        <code style="font-size:1.1rem; color:#32D5F2;">1 &nbsp; 0 &nbsp; 1 &nbsp; 1 &nbsp; 0 &nbsp; 0 &nbsp; 1 &nbsp; 0</code>
                    </div>
                </div>
                <div class="card card-blue center-v" style="text-align:center;">
                    <h3 class="card-title blue" style="justify-content:center;">ĐÁNH DẤU TỪNG ĐOẠN BIT 0 VÀ 1</h3>
                    <img src="assets/fig_digital_2level.png" style="max-width:100%; border-radius:8px; margin-top:8px;">
                    <p style="color:#AAB7C8; font-size:0.86rem; margin-top:10px;">
                        Mỗi khoảng thời gian bằng nhau tương ứng với 1 bit được truyền đi.
                    </p>
                </div>
            </div>
        `,
        notes: `Ở trường hợp đơn giản nhất, tín hiệu số chỉ sử dụng hai mức điện áp để biểu diễn hai trạng thái nhị phân 0 và 1.
Cụ thể theo sách giáo khoa: giá trị "1" có thể được mã hóa bằng giá trị điện áp dương, còn giá trị "0" được mã hóa bằng giá trị điện áp bằng 0.
Tuy nhiên, cần lưu ý rõ về mặt khoa học: đây là ví dụ quy ước minh họa trong tài liệu học tập. Trong các mạch điện tử thực tế, người ta có thể dùng chuẩn điện áp +3,3V hoặc +5V cho mức 1, thậm chí dùng điện áp âm -5V cho mức 0 và +5V cho mức 1 trong chuẩn truyền thông công nghiệp RS-232.
Nhìn vào đồ thị bên phải, các đoạn điện áp dương tương ứng bit 1 và các đoạn 0V tương ứng bit 0 tạo nên một chuỗi mã nhị phân hoàn chỉnh.`
    },

    // =========================================================================
    // SLIDE 09: BIT VÀ CÁC MỨC TÍN HIỆU
    // =========================================================================
    {
        num: 9,
        tag: "PHẦN II • TÍN HIỆU SỐ (DIGITAL SIGNAL)",
        title: "Khái niệm Bit và tín hiệu số nhiều mức điện áp",
        content_html: `
            <div class="grid-2">
                <div class="card card-cyan">
                    <h3 class="card-title cyan">1. BIT LÀ GÌ?</h3>
                    <div class="quote-box">
                        <b>Bit</b> (<i>Binary digit</i>) là <b>đơn vị nhỏ nhất</b> để biểu diễn thông tin trong hệ thống số. Mỗi bit là một chữ số nhị phân <b>0</b> hoặc <b>1</b>.
                    </div>
                    <ul class="bullet-list" style="margin-top:8px;">
                        <li>Với tín hiệu số có <b>2 mức điện áp</b>: Mỗi mức chỉ mang đúng <b>1 bit</b> (0 hoặc 1).</li>
                        <li><b>Tốc độ bit (Bit rate):</b> Số lượng bit truyền được trong một giây, đơn vị là <b>bit/s</b> (bps).</li>
                    </ul>
                </div>
                <div class="card card-blue">
                    <h3 class="card-title blue">2. MỞ RỘNG TÍN HIỆU ĐA MỨC</h3>
                    <p>Một tín hiệu số hoàn toàn có thể có <b>nhiều hơn 2 giá trị điện áp</b> (mỗi giá trị điện áp gọi là một <i>mức</i>).</p>
                    <div class="formula-box">
                        Số mức M = 2ⁿ &nbsp;&nbsp;→&nbsp;&nbsp; Mỗi mức mang n bit
                    </div>
                    <ul class="bullet-list" style="margin-top:8px;">
                        <li><b>Hệ 2 mức (M = 2):</b> Mỗi mức biểu diễn <b>1 bit</b> (<code>0</code>, <code>1</code>).</li>
                        <li><b>Hệ 4 mức (M = 4):</b> Mỗi mức biểu diễn một nhóm <b>2 bit</b> (<code>00</code>, <code>01</code>, <code>10</code>, <code>11</code>).</li>
                        <li><b>Hệ 8 mức (M = 8):</b> Mỗi mức biểu diễn một nhóm <b>3 bit</b> (<code>000</code> ... <code>111</code>).</li>
                    </ul>
                </div>
            </div>
        `,
        notes: `Trong hệ thống số, Bit là đơn vị nhỏ nhất để biểu diễn thông tin; mỗi bit là một chữ số nhị phân 0 hoặc 1.
Một điểm mở rộng rất hay trong sách giáo khoa trang 34 mà các bạn cần chú ý: Tín hiệu số không nhất thiết chỉ giới hạn ở 2 mức điện áp! Một tín hiệu số có thể có nhiều hơn 2 giá trị điện áp (gọi là các mức). Trong trường hợp đó, mỗi mức điện áp có thể mã hóa cho một nhóm gồm nhiều hơn 1 bit.
Cụ thể: nếu dùng 4 mức điện áp khác nhau, ta có thể gán mức 1 là "00", mức 2 là "01", mức 3 là "10" và mức 4 là "11". Điều này giúp gửi được lượng thông tin lớn hơn nhiều trong cùng một khoảng thời gian.`
    },

    // =========================================================================
    // SLIDE 10: SO SÁNH TÍN HIỆU SỐ 2 MỨC VÀ 4 MỨC (WITH 2D INTERACTIVE LAB)
    // =========================================================================
    {
        num: 10,
        simBadge: "2D Tương tác",
        tag: "PHẦN II • TÍN HIỆU SỐ (DIGITAL SIGNAL)",
        title: "So sánh tín hiệu số hai mức và bốn mức (Hình 5.3 SGK)",
        content_html: `
            <div class="grid-2-wide-left">
                <div class="sim-box">
                    <div class="sim-topbar">
                        <span><span class="badge badge-2d">MÔ PHỎNG 2D</span> Tốc độ truyền theo số mức điện áp (Hình 5.3)</span>
                        <div style="display:flex; gap:5px;">
                            <button class="sim-btn active" id="btn-lvl-2" onclick="setMultiLevel(2)">2 mức (1 bit)</button>
                            <button class="sim-btn" id="btn-lvl-4" onclick="setMultiLevel(4)">4 mức (2 bit)</button>
                            <button class="sim-btn" id="btn-lvl-8" onclick="setMultiLevel(8)">8 mức (3 bit)</button>
                        </div>
                    </div>
                    <div class="sim-canvas-wrap">
                        <canvas id="sim2d-multilevel"></canvas>
                    </div>
                    <div class="sim-controls">
                        <div class="ctrl-group">
                            <label>Chuỗi bit:</label>
                            <input type="text" id="multi-bits-input" value="1011000110010110" oninput="updateMultiBits()">
                        </div>
                        <button class="sim-btn" onclick="randomizeMultiBits()">🎲 Ngẫu nhiên</button>
                        <span class="sim-readout" id="multilevel-readout" style="font-size:0.78rem;">2 mức (1 bit/mức) | 8 xung/s → 8 bit/s</span>
                    </div>
                </div>
                <div class="card card-cyan">
                    <h3 class="card-title cyan">PHÂN TÍCH SỐ LIỆU HÌNH 5.3 SGK</h3>
                    <table class="data-table" style="margin-bottom:10px;">
                        <thead>
                            <tr>
                                <th>Thông số (trong 1 giây)</th>
                                <th>Tín hiệu 2 mức</th>
                                <th>Tín hiệu 4 mức</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Số mức điện áp</td><td>2 mức</td><td>4 mức</td></tr>
                            <tr><td>Số bit trên 1 mức</td><td><b>1 bit</b> (0, 1)</td><td><b>2 bit</b> (00, 01, 10, 11)</td></tr>
                            <tr><td>Số lần truyền trong 1s</td><td>8 lần</td><td>8 lần</td></tr>
                            <tr><td><b>Tổng số bit gửi (Tốc độ)</b></td><td class="cyan"><b>8 bit/s</b></td><td class="green"><b>16 bit/s</b></td></tr>
                        </tbody>
                    </table>
                    <p style="color:#AAB7C8; font-size:0.88rem;">
                        <b>Lí giải:</b> Trong cùng một giây và cùng số lần thay đổi mức tín hiệu (8 lần/s), tín hiệu 4 mức mang được <b>2 bit cho mỗi mức</b> nên tốc độ bit truyền tải tăng gấp đôi so với tín hiệu 2 mức!
                    </p>
                </div>
            </div>
        `,
        notes: `Quan sát trực tiếp Hình 5.3 trong sách giáo khoa và mô phỏng 2D tương tác ở bên trái:
Ở trường hợp (a), tín hiệu số có 2 mức điện áp: mỗi xung chỉ đại diện cho 1 bit. Trong khoảng thời gian 1 giây có 8 xung, nên tốc độ truyền là 8 bit/s.
Khi chuyển sang trường hợp (b) – các bạn hãy bấm nút "4 mức (2 bit)" trên mô phỏng để xem sự thay đổi ngay lập tức: trong cùng 1 giây với 8 khoảng thời gian y hệt, nhưng mỗi mức điện áp giờ đây mã hóa cho một cặp 2 bit (như 11, 10, 01, 00). Do đó tổng lượng dữ liệu truyền đi được trong 1 giây là 8 x 2 = 16 bit, đạt tốc độ 16 bit/s, gấp đôi tín hiệu 2 mức! Nếu dùng hệ 8 mức thì tốc độ tăng lên tới 24 bit/s.`
    },

    // =========================================================================
    // SLIDE 11: BẢN CHẤT VÀ SỰ KHÁC BIỆT GIỮA TÍN HIỆU TƯƠNG TỰ VÀ SỐ
    // =========================================================================
    {
        num: 11,
        tag: "TỔNG HỢP PHẦN I & II",
        title: "Bản chất và sự khác biệt giữa tín hiệu tương tự và tín hiệu số",
        content_html: `
            <div style="display:flex; flex-direction:column; gap:14px; height:100%;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width:24%;">Tiêu chí đối chiếu</th>
                            <th style="width:38%;">Tín hiệu tương tự (Analog)</th>
                            <th style="width:38%;">Tín hiệu số (Digital)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Bản chất thời gian</b></td>
                            <td><b>Liên tục</b> theo thời gian</td>
                            <td><b>Rời rạc</b> theo thời gian</td>
                        </tr>
                        <tr>
                            <td><b>Giá trị điện áp</b></td>
                            <td><b>Vô số mức</b> giá trị trong một khoảng thời gian</td>
                            <td><b>Một số hữu hạn</b> các mức giá trị điện áp</td>
                        </tr>
                        <tr>
                            <td><b>Dạng biểu diễn</b></td>
                            <td>Đường cong liên tục đi qua vô số điểm</td>
                            <td>Các xung vuông rời rạc có bước nhảy đột ngột</td>
                        </tr>
                        <tr>
                            <td><b>Khả năng xử lí & lưu trữ</b></td>
                            <td>Khó xử lí, khó lưu trữ trong thiết bị máy tính</td>
                            <td>Thuận lợi cho việc xử lí và lưu trữ trong máy tính</td>
                        </tr>
                    </tbody>
                </table>
                <div class="card card-blue" style="padding:10px; text-align:center; flex:1; justify-content:center;">
                    <img src="assets/fig_compare_waveforms.png" style="max-height:195px; margin:0 auto; border-radius:6px;">
                </div>
            </div>
        `,
        notes: `Slide 11 đúc kết lại sự khác nhau cơ bản nhất giữa tín hiệu tương tự và tín hiệu số dựa trên câu hỏi thảo luận trang 34 của sách giáo khoa:
Sự khác biệt gốc rễ nằm ở 4 phương diện:
1. Tín hiệu tương tự liên tục theo thời gian, có vô số mức điện áp; còn tín hiệu số rời rạc theo thời gian, chỉ có một số hữu hạn mức điện áp.
2. Về mặt hình thái đồ thị bên dưới, tín hiệu tương tự là đường cong mượt mà không đứt đoạn, còn tín hiệu số là chuỗi xung vuông nhảy bậc.
3. Chính nhờ sự rời rạc và hữu hạn mức đó mà tín hiệu số rất dễ dàng được xử lí, tính toán và lưu trữ trong các thiết bị điện tử và máy tính.`
    },

    // =========================================================================
    // SLIDE 12: TỔNG QUAN VỀ TRUYỀN DỮ LIỆU
    // =========================================================================
    {
        num: 12,
        tag: "PHẦN III • TRUYỀN DỮ LIỆU DƯỚI DẠNG TƯƠNG TỰ VÀ DẠNG SỐ",
        title: "Tổng quan về dữ liệu và phương thức truyền dẫn",
        content_html: `
            <div class="grid-2">
                <div class="card card-cyan">
                    <h3 class="card-title cyan">1. DỮ LIỆU TƯƠNG TỰ VÀ DỮ LIỆU SỐ</h3>
                    <div class="quote-box">
                        Dữ liệu (thông tin) có thể tồn tại dưới dạng <b>tương tự</b> hoặc dạng <b>số</b>.
                    </div>
                    <ul class="bullet-list" style="margin-top:10px;">
                        <li><b>Dữ liệu tương tự:</b> Chứa đựng thông tin liên tục theo thời gian (như giọng nói con người, sóng âm thanh tự nhiên, tín hiệu nhiệt độ biến đổi liên tục).</li>
                        <li><b>Dữ liệu số:</b> Chứa đựng thông tin rời rạc, được mã hóa thành các mức hữu hạn (như văn bản máy tính, tập tin MP3, hình ảnh kỹ thuật số, chuỗi bit 0 và 1).</li>
                    </ul>
                </div>
                <div class="card card-blue">
                    <h3 class="card-title blue">2. NGUYÊN TẮC TRUYỀN DẪN QUA KÊNH TRUYỀN</h3>
                    <p>Để truyền dữ liệu từ nơi phát đến nơi thu, dữ liệu phải đi qua một <b>đường truyền (kênh truyền thông)</b> như cáp đồng, cáp quang hoặc môi trường không khí.</p>
                    <p style="color:#AAB7C8; margin-top:10px;">
                        Tùy vào bản chất dữ liệu và hạ tầng kỹ thuật, người ta lựa chọn một trong hai phương thức:
                    </p>
                    <div style="margin-top:12px; display:flex; flex-direction:column; gap:10px;">
                        <div style="padding:10px 14px; background:#101C35; border-radius:8px; border-left:4px solid #32D5F2;">
                            <b class="cyan">Phương thức 1:</b> Truyền dữ liệu dưới dạng <b>tương tự</b> (Hình 5.4 SGK)
                        </div>
                        <div style="padding:10px 14px; background:#101C35; border-radius:8px; border-left:4px solid #2ED573;">
                            <b class="green">Phương thức 2:</b> Truyền dữ liệu dưới dạng <b>số</b> (Hình 5.5 SGK)
                        </div>
                    </div>
                </div>
            </div>
        `,
        notes: `Bước sang Phần III, chúng ta tìm hiểu cách thức truyền dữ liệu dưới dạng tương tự và dạng số (SGK trang 35).
Trước hết cần phân biệt: Dữ liệu tương tự chứa thông tin liên tục (như âm thanh tự nhiên), còn dữ liệu số chứa thông tin rời rạc.
Khi muốn đưa thông tin đi xa qua một đường truyền vật lí, dữ liệu cần được biến đổi thành dạng tín hiệu tương thích. Tương ứng ta có hai phương thức truyền dẫn chính được minh họa ở Hình 5.4 và Hình 5.5 sau đây.`
    },

    // =========================================================================
    // SLIDE 13: TRUYỀN DỮ LIỆU DƯỚI DẠNG TƯƠNG TỰ (HÌNH 5.4 SGK)
    // =========================================================================
    {
        num: 13,
        tag: "PHẦN III • TRUYỀN DỮ LIỆU DƯỚI DẠNG TƯƠNG TỰ VÀ DẠNG SỐ",
        title: "Truyền dữ liệu dưới dạng tương tự (Hình 5.4 SGK)",
        content_html: `
            <div style="display:flex; flex-direction:column; gap:14px; height:100%;">
                <div class="card card-cyan" style="flex-shrink:0;">
                    <h3 class="card-title cyan">NGUYÊN LÍ TRUYỀN DẪN BẰNG TÍN HIỆU TƯƠNG TỰ</h3>
                    <p>Truyền dữ liệu dưới dạng tương tự là sử dụng các <b>sóng liên tục dạng sin hoặc cosin</b> để truyền tải thông tin. Dữ liệu cần truyền được biến đổi thành tín hiệu tương tự (nhờ các bộ chuyển đổi) và đi trực tiếp trên đường truyền.</p>
                </div>
                <div class="card card-blue center-v" style="text-align:center; flex:1; padding:12px;">
                    <img src="assets/fig_sgk_5_4_analog_trans.png" style="max-height:195px; margin:0 auto; border-radius:6px;">
                    <p style="color:#AAB7C8; font-size:0.86rem; margin-top:6px;"><i>Hình 5.4. Truyền dẫn bằng tín hiệu tương tự (Tín hiệu đầu vào → Đường truyền → Tín hiệu đầu ra)</i></p>
                </div>
                <div class="card card-coral" style="flex-shrink:0;">
                    <h4 class="coral" style="margin-bottom:4px;">ĐẶC ĐIỂM KỸ THUẬT:</h4>
                    <p><b>• Ưu điểm:</b> Tốn ít băng thông, cấu tạo mạch đơn giản.<br>
                    <b>• Hạn chế:</b> Trên đường truyền, nhiễu điện từ và suy hao cộng gộp trực tiếp vào biên độ sóng liên tục nên <b>khó khôi phục lại dạng tín hiệu ban đầu</b> vì có vô số mức điện áp.</p>
                </div>
            </div>
        `,
        notes: `Quan sát sơ đồ Hình 5.4 trong sách giáo khoa: Đây là mô hình truyền dẫn bằng tín hiệu tương tự.
Dữ liệu cần truyền được các bộ chuyển đổi (như micro) biến thành tín hiệu điện áp tương tự dạng sóng sin hoặc cosin liên tục, rồi đưa thẳng lên đường truyền tới đầu ra.
Phương thức này có ưu điểm là tốn ít băng thông tần số. Tuy nhiên nhược điểm lớn nhất là tín hiệu dễ bị ảnh hưởng bởi nhiễu. Do có vô số mức điện áp liên tục, một khi nhiễu đã làm biến dạng đường sóng trên đường truyền thì ở đầu ra rất khó khôi phục lại nguyên trạng ban đầu.`
    },

    // =========================================================================
    // SLIDE 14: TRUYỀN DỮ LIỆU DƯỚI DẠNG SỐ (HÌNH 5.5 SGK)
    // =========================================================================
    {
        num: 14,
        tag: "PHẦN III • TRUYỀN DỮ LIỆU DƯỚI DẠNG TƯƠNG TỰ VÀ DẠNG SỐ",
        title: "Truyền dữ liệu dưới dạng số (Hình 5.5 SGK)",
        content_html: `
            <div style="display:flex; flex-direction:column; gap:14px; height:100%;">
                <div class="card card-cyan" style="flex-shrink:0;">
                    <h3 class="card-title cyan">NGUYÊN LÍ TRUYỀN DẪN BẰNG TÍN HIỆU SỐ</h3>
                    <p>Truyền dữ liệu dưới dạng số là sử dụng <b>các mức điện áp (các xung vuông, rời rạc)</b> để truyền tải thông tin. Dữ liệu cần truyền được biến đổi thành dạng tín hiệu số (nhờ các <b>bộ mã hóa</b>) rồi truyền đi trên đường truyền đến bộ giải mã.</p>
                </div>
                <div class="card card-blue center-v" style="text-align:center; flex:1; padding:12px;">
                    <img src="assets/fig_sgk_5_5_digital_trans.png" style="max-height:205px; margin:0 auto; border-radius:6px;">
                    <p style="color:#AAB7C8; font-size:0.86rem; margin-top:6px;"><i>Hình 5.5. Truyền dẫn bằng tín hiệu số: Tín hiệu vào → Mã hóa → Đường truyền → Giải mã → Tín hiệu ra</i></p>
                </div>
                <div class="card card-green" style="flex-shrink:0;">
                    <h4 class="green" style="margin-bottom:4px;">VAI TRÒ BỘ MÃ HÓA VÀ GIẢI MÃ:</h4>
                    <p>Nhờ các bộ mã hóa chuyển dữ liệu thành các xung rời rạc chỉ có 2 giá trị <b>0 và 1</b>, phía thu dễ dàng nhận diện đúng chuỗi bit ban đầu bất chấp nhiễu trên đường truyền, sau đó bộ giải mã tái tạo lại tín hiệu gốc.</p>
                </div>
            </div>
        `,
        notes: `Khác với truyền tương tự, Hình 5.5 SGK mô tả sơ đồ truyền dẫn bằng tín hiệu số với quy trình từ trái sang phải gồm:
Tín hiệu tương tự đầu vào đi qua Bộ mã hóa để trở thành tín hiệu số dạng xung vuông. Chuỗi xung vuông này đi qua đường truyền đến nơi nhận. Tại đây, mạch thu đọc lấy tín hiệu số đầu ra rồi đưa vào Bộ giải mã để tái tạo lại tín hiệu tương tự đầu ra.
Chính nhờ việc quy chuẩn dữ liệu về các mức điện áp rời rạc (0 và 1), hệ thống này khắc phục hoàn toàn điểm yếu nhiễu loạn của truyền dẫn tương tự.`
    },

    // =========================================================================
    // SLIDE 15: ƯU ĐIỂM CỦA TRUYỀN DẪN TÍN HIỆU SỐ (WITH 2D NOISE BATTLE LAB)
    // =========================================================================
    {
        num: 15,
        simBadge: "2D Tương tác",
        tag: "PHẦN III • TRUYỀN DỮ LIỆU DƯỚI DẠNG TƯƠNG TỰ VÀ DẠNG SỐ",
        title: "Ưu điểm của truyền dẫn tín hiệu số (Phòng thí nghiệm nhiễu)",
        content_html: `
            <div class="grid-2-wide-right">
                <div class="card card-cyan" style="gap:8px;">
                    <h3 class="card-title cyan">6 ƯU ĐIỂM THEO SGK (Trang 35)</h3>
                    <ul class="bullet-list" style="font-size:0.86rem;">
                        <li><b>1. Ít bị ảnh hưởng bởi nhiễu:</b> Chỉ cần phân biệt giữa 2 ngưỡng giá trị 0 và 1, nhiễu biên độ nhỏ bị mạch lọc loại bỏ hoàn toàn.</li>
                        <li><b>2. Ít bị suy giảm & ít lỗi:</b> Tại các trạm trung gian, xung số được tái sinh mới hoàn toàn thay vì khuếch đại cả nhiễu.</li>
                        <li><b>3. Dễ phát hiện và sửa lỗi:</b> Nhúng thêm các bit kiểm tra toán học để tự động phát hiện và sửa bit sai.</li>
                        <li><b>4. Cấu trúc nhị phân đơn giản:</b> Chỉ có hai giá trị khác nhau 0 và 1 giúp mạch điện tử tin cậy cao.</li>
                        <li><b>5. Tính bảo mật & hiệu quả cao:</b> Dữ liệu số dễ dàng mã hóa mật mã bảo mật thông tin.</li>
                        <li><b>6. Dễ lưu trữ và xử lí:</b> Thuận tiện nén dữ liệu và xử lí trên máy tính.</li>
                    </ul>
                </div>
                <div class="sim-box">
                    <div class="sim-topbar">
                        <span><span class="badge badge-2d">THÍ NGHIỆM 2D</span> Cuộc chiến chống nhiễu & Sao chép</span>
                    </div>
                    <div class="sim-canvas-wrap">
                        <canvas id="sim2d-noise"></canvas>
                    </div>
                    <div class="sim-controls">
                        <div class="ctrl-group">
                            <label>Mức nhiễu:</label>
                            <input type="range" id="noise-lvl" min="0" max="1" step="0.05" value="0.25" oninput="updateNoiseBattle()">
                            <span class="sim-readout" id="noise-val">25%</span>
                        </div>
                        <div class="ctrl-group">
                            <label>Số lần truyền/chép:</label>
                            <input type="range" id="gen-lvl" min="1" max="10" step="1" value="1" oninput="updateNoiseBattle()">
                            <span class="sim-readout" id="gen-val">1 lần</span>
                        </div>
                    </div>
                </div>
            </div>
        `,
        notes: `Tài liệu sách giáo khoa trang 35 liệt kê đầy đủ những ưu điểm vượt trội của truyền dữ liệu số so với truyền tương tự: ít bị ảnh hưởng bởi nhiễu, ít lỗi, dễ dàng phát hiện và sửa lỗi vì chỉ có hai giá trị khác nhau 0 và 1, tính bảo mật và hiệu quả cao hơn, đồng thời có thể lưu trữ và dễ dàng xử lí.
Để thầy cô và các bạn kiểm chứng trực quan cơ chế vật lí này, xin mời quan sát phòng thí nghiệm 2D ở bên phải:
Khi tôi kéo thanh trượt "Mức nhiễu" lên 40% hoặc tăng "Số lần sao chép" lên 5 lần: ở đường trên (Analog), sóng sin bị nhiễu cộng gộp và biến dạng hoàn toàn; trong khi ở đường dưới (Digital), dù xung nhận được có nhấp nhô răng cưa, nhưng miễn là chưa vượt qua đường Ngưỡng phân định 2.5V màu vàng, mạch số vẫn khôi phục lại 100% chuỗi bit xanh lá cây nguyên vẹn không sai một bit nào!`
    },

    // =========================================================================
    // SLIDE 16: HẠN CHẾ VÀ SO SÁNH HAI PHƯƠNG THỨC TRUYỀN DẪN
    // =========================================================================
    {
        num: 16,
        tag: "PHẦN III • TRUYỀN DỮ LIỆU DƯỚI DẠNG TƯƠNG TỰ VÀ DẠNG SỐ",
        title: "Hạn chế và bảng đối chiếu 6 tiêu chí hai phương thức",
        content_html: `
            <div class="grid-2-wide-right">
                <div class="card card-coral">
                    <h3 class="card-title coral">CÂN BẰNG KHOA HỌC: ƯU & NHƯỢC</h3>
                    <div style="margin-bottom:10px;">
                        <b class="cyan">• Truyền dữ liệu tương tự:</b><br>
                        <span style="color:#2ED573;">+ Ưu điểm:</span> <b>Tốn ít băng thông</b> tần số hơn.<br>
                        <span style="color:#FF6B6B;">- Nhược điểm:</span> Dễ bị nhiễu, khó khôi phục dạng sóng gốc.
                    </div>
                    <div>
                        <b class="blue">• Truyền dữ liệu số:</b><br>
                        <span style="color:#FF6B6B;">- Nhược điểm:</span> <b>Chiếm nhiều băng thông hơn</b> (xung vuông chứa nhiều sóng hài tần số cao).<br>
                        <span style="color:#2ED573;">+ Ưu điểm:</span> Ít nhiễu, sửa lỗi tốt, bảo mật cao.
                    </div>
                    <div class="slide-img-card" style="margin-top:8px;">
                        <img src="assets/fiber_optic.jpg" alt="Mạng cáp quang viễn thông số" style="max-height:80px; object-fit:cover;">
                        <div class="slide-img-caption">💡 Cáp quang truyền xung ánh sáng số tốc độ cao giải quyết bài toán băng thông</div>
                    </div>
                    <div class="info-callout" style="border-color:#AAB7C8; margin-top:8px;">
                        ⚖️ <b>Nhận xét khách quan:</b> Không có phương thức nào hoàn hảo tuyệt đối; tùy bài toán băng thông hay chất lượng mà kỹ thuật chọn phương án phù hợp.
                    </div>
                </div>
                <div class="card card-blue">
                    <h3 class="card-title blue">ĐỐI CHIẾU 6 TIÊU CHÍ THẢO LUẬN (SGK TRANG 35)</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Tiêu chí so sánh</th>
                                <th>Dạng tương tự</th>
                                <th>Dạng số</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><b>a) Ảnh hưởng của nhiễu</b></td><td>Rất dễ bị nhiễu</td><td>Ít bị ảnh hưởng</td></tr>
                            <tr><td><b>b) Suy giảm khi truyền & ghi/đọc</b></td><td>Suy giảm, méo dạng</td><td>Ít suy giảm chất lượng</td></tr>
                            <tr><td><b>c) Chất lượng & số lần sao chép</b></td><td>Giảm sau mỗi lần chép</td><td>Không đổi dù chép nhiều lần</td></tr>
                            <tr><td><b>d) Khả năng khôi phục tín hiệu</b></td><td>Rất khó khôi phục gốc</td><td>Dễ dàng khôi phục 0 & 1</td></tr>
                            <tr><td><b>e) Nén, lưu trữ, xử lí, bảo mật</b></td><td>Cồng kềnh, khó bảo mật</td><td>Nén tốt, dễ xử lí, bảo mật cao</td></tr>
                            <tr><td><b>g) Cho phép nhiều người dùng</b></td><td>Ghép kênh hạn chế</td><td>Dễ chia sẻ kênh truyền (TDM)</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        notes: `Khi đánh giá khoa học khách quan, chúng ta cần nắm rõ hạn chế của từng phương thức như sách giáo khoa đã chỉ ra:
Truyền dữ liệu dưới dạng tương tự tuy dễ bị nhiễu nhưng lại có ưu điểm là tốn ít băng thông. Ngược lại, truyền dẫn số có nhược điểm lớn nhất là chiếm nhiều băng thông hơn, bởi vì để tạo ra các cạnh vuông thẳng đứng của xung số, tín hiệu đòi hỏi dải tần số rộng chứa nhiều thành phần hài bậc cao.
Bảng bên phải tổng hợp đầy đủ 6 tiêu chí so sánh theo gợi ý thảo luận trang 35 SGK: từ ảnh hưởng của nhiễu, suy giảm, số lần sao chép, khả năng khôi phục, nén – bảo mật cho đến khả năng phục vụ nhiều người dùng cùng lúc trên kênh truyền.`
    },

    // =========================================================================
    // SLIDE 17: TẠI SAO CẦN CHUYỂN ĐỔI TÍN HIỆU?
    // =========================================================================
    {
        num: 17,
        tag: "PHẦN IV • HỆ THỐNG TRUYỀN DẪN SỬ DỤNG ADC VÀ DAC",
        title: "Tại sao cần chuyển đổi giữa tín hiệu tương tự và tín hiệu số?",
        content_html: `
            <div class="grid-2">
                <div class="card card-cyan">
                    <h3 class="card-title cyan">THỰC TẾ GIỮA TỰ NHIÊN VÀ THIẾT BỊ</h3>
                    <ul class="bullet-list" style="margin-top:6px;">
                        <li><b>1. Âm thanh tự nhiên là Tương tự:</b><br>
                        Giọng nói con người hoặc âm nhạc thu từ micro là tín hiệu tương tự biến thiên liên tục.</li>
                        <li style="margin-top:10px;"><b>2. Xử lí & lưu trữ cần Tín hiệu số:</b><br>
                        Đôi khi ta cần chỉnh sửa, thêm bớt hiệu ứng, lọc ồn hoặc lưu trữ vào máy tính và thiết bị kỹ thuật số — vốn chỉ hiểu các bit <code>0</code> và <code>1</code>.</li>
                        <li style="margin-top:10px;"><b>3. Phát lại ra tai người cần Tương tự:</b><br>
                        Loa và tai nghe chỉ phát ra sóng âm khi nhận dòng điện áp tương tự liên tục để làm rung màng loa.</li>
                    </ul>
                </div>
                <div class="card card-blue">
                    <h3 class="card-title blue">HAI CẦU NỐI BIÊN DỊCH: ADC & DAC</h3>
                    <p style="color:#AAB7C8; margin-bottom:12px;">
                        Vì lí do trên, mọi hệ thống truyền giọng nói hoặc âm nhạc hiện đại đều phải sử dụng cặp bộ chuyển đổi:
                    </p>
                    <div style="padding:14px; background:#101C35; border-radius:8px; border-left:4px solid #32D5F2; margin-bottom:12px;">
                        <b class="cyan" style="font-size:1.05rem;">1. Bộ ADC (Analog-to-Digital Converter)</b><br>
                        Chuyển đổi tín hiệu <b>Tương tự → Số</b> trước khi xử lí, lưu trữ hoặc truyền đi.
                    </div>
                    <div style="padding:14px; background:#101C35; border-radius:8px; border-left:4px solid #2ED573;">
                        <b class="green" style="font-size:1.05rem;">2. Bộ DAC (Digital-to-Analog Converter)</b><br>
                        Chuyển đổi ngược tín hiệu <b>Số → Tương tự</b> ở nơi nhận để khôi phục tín hiệu gốc phát ra loa.
                    </div>
                </div>
            </div>
        `,
        notes: `Bước vào Phần IV – phần tổng hợp ứng dụng thực tiễn quan trọng nhất của Bài 5: Hệ thống truyền dẫn sử dụng bộ chuyển đổi tương tự - số (ADC) và số - tương tự (DAC).
Câu hỏi đặt ra là: Tại sao ta không dùng thuần nhất một loại tín hiệu mà cứ phải chuyển đổi qua lại?
Bởi vì giọng nói và âm nhạc tự nhiên vốn dĩ là tín hiệu tương tự. Nhưng để chúng ta có thể cắt ghép, thêm hiệu ứng âm thanh, lưu trữ vào thẻ nhớ máy tính hay truyền đi không bị nhiễu, bắt buộc phải chuyển đổi nó sang dạng số bằng bộ ADC.
Sau khi xử lí hoặc truyền tới nơi nhận, để chiếc loa có thể rung lên phát thành âm thanh cho tai người nghe, ta lại bắt buộc phải dùng bộ DAC để chuyển ngược từ tín hiệu số về lại tín hiệu tương tự.`
    },

    // =========================================================================
    // SLIDE 18: BỘ CHUYỂN ĐỔI ADC (WITH 3D PCM QUANTIZATION CHAMBER)
    // =========================================================================
    {
        num: 18,
        simBadge: "3D WebGL",
        tag: "PHẦN IV • HỆ THỐNG TRUYỀN DẪN SỬ DỤNG ADC VÀ DAC",
        title: "Bộ chuyển đổi tương tự – số (ADC) và kỹ thuật PCM",
        content_html: `
            <div class="grid-2-wide-right">
                <div class="card card-cyan">
                    <h3 class="card-title cyan">NGUYÊN LÍ BỘ CHUYỂN ĐỔI ADC</h3>
                    <p><b>ADC (Analog-to-Digital Converter):</b> Thiết bị chuyển đổi tín hiệu điện áp tương tự liên tục thành tín hiệu số rời rạc.</p>
                    <p style="margin-top:8px;"><b>Vị trí:</b> Đặt ngay sau tầng khuếch đại micro, trước giai đoạn xử lí tín hiệu số.</p>
                    <h4 class="blue" style="margin-top:10px; margin-bottom:6px;">Kỹ thuật PCM (Pulse-Code Modulation):</h4>
                    <ul class="bullet-list" style="font-size:0.86rem;">
                        <li><b>Bước 1 – Lấy mẫu (Sampling):</b> Đo giá trị điện áp tương tự tại các thời điểm rời rạc cách đều nhau.</li>
                        <li><b>Bước 2 – Lượng tử hóa (Quantization):</b> Làm tròn giá trị mẫu về các mức điện áp chuẩn gần nhất.</li>
                        <li><b>Bước 3 – Mã hóa (Coding):</b> Gán mỗi mức điện áp thành một chuỗi bit nhị phân (ví dụ 3-bit: <code>000</code> đến <code>111</code>).</li>
                    </ul>
                    <div class="slide-img-card" style="margin-top:8px;">
                        <img src="assets/diag_adc_3step_hd.png" alt="Sơ đồ 3 bước chuyển đổi ADC PCM" style="max-height:105px; object-fit:contain; background:#080E1C;">
                        <div class="slide-img-caption">📊 3 bước số hóa PCM: Lấy mẫu → Lượng tử hóa → Mã hóa nhị phân</div>
                    </div>
                </div>
                <div class="sim-box">
                    <div class="sim-topbar">
                        <span><span class="badge badge-3d">MÔ PHỎNG 3D</span> Buồng Số Hóa ADC (Lấy mẫu & Lượng tử hóa)</span>
                        <button class="sim-btn" onclick="Sim3DManager.get('sim3d-adc')?.resetView()">↺ Reset</button>
                    </div>
                    <div class="sim-canvas-wrap" id="sim3d-adc"></div>
                    <div class="sim-controls">
                        <div class="ctrl-group">
                            <label>Số mẫu:</label>
                            <input type="range" id="adc3d-samples" min="6" max="28" step="2" value="16" oninput="updateADC3D()">
                            <span class="sim-readout" id="adc3d-sval">16</span>
                        </div>
                        <div class="ctrl-group">
                            <label>Độ phân giải:</label>
                            <button class="sim-btn" id="btn-adc-2b" onclick="setADC3DBits(2)">2-bit (4 mức)</button>
                            <button class="sim-btn active" id="btn-adc-3b" onclick="setADC3DBits(3)">3-bit (8 mức)</button>
                            <button class="sim-btn" id="btn-adc-4b" onclick="setADC3DBits(4)">4-bit (16 mức)</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        notes: `Trên slide 18, chúng ta khảo sát chi tiết bộ chuyển đổi ADC (Analog-to-Digital Converter).
Theo sách giáo khoa trang 36, quá trình biến đổi tín hiệu tương tự sang số thường được thực hiện nhờ kĩ thuật PCM (Pulse-Code Modulation - Điều chế mã xung).
Trên mô phỏng 3D bên phải, thầy cô và các bạn có thể thấy rõ cách thức ADC hoạt động theo 3 bước:
Đường cong màu xanh là sóng tương tự đầu vào. Các chấm đỏ là các điểm lấy mẫu rời rạc. Không gian được chia thành các mặt phẳng mức điện áp (ví dụ 8 mặt phẳng ứng với 3-bit). Mỗi mẫu được làm tròn về mức gần nhất để dựng thành các cột xung rời rạc màu xanh lá cây.
Khi tôi tăng số mẫu hoặc tăng độ phân giải từ 2-bit lên 4-bit (16 mức), các cột xung bám sát đường sóng gốc hơn hẳn, giúp giảm sai số số hóa xuống cực thấp.`
    },

    // =========================================================================
    // SLIDE 19: BỘ CHUYỂN ĐỔI DAC (WITH 2D DAC RECONSTRUCTION LAB)
    // =========================================================================
    {
        num: 19,
        simBadge: "2D Tương tác",
        tag: "PHẦN IV • HỆ THỐNG TRUYỀN DẪN SỬ DỤNG ADC VÀ DAC",
        title: "Bộ chuyển đổi số – tương tự (DAC) và tái tạo sóng",
        content_html: `
            <div class="grid-2-wide-left">
                <div class="sim-box">
                    <div class="sim-topbar">
                        <span><span class="badge badge-2d">MÔ PHỎNG 2D</span> Giải mã DAC & Sai số lượng tử hóa</span>
                    </div>
                    <div class="sim-canvas-wrap">
                        <canvas id="sim2d-pcm"></canvas>
                    </div>
                    <div class="sim-controls">
                        <div class="ctrl-group">
                            <label>Tần số lấy mẫu:</label>
                            <input type="range" id="pcm-samples" min="6" max="32" step="2" value="14" oninput="updatePCM2D()">
                        </div>
                        <div class="ctrl-group">
                            <label>Số bit:</label>
                            <button class="sim-btn" id="btn-pcm-2b" onclick="setPCMBits(2)">2-bit</button>
                            <button class="sim-btn active" id="btn-pcm-3b" onclick="setPCMBits(3)">3-bit</button>
                            <button class="sim-btn" id="btn-pcm-4b" onclick="setPCMBits(4)">4-bit</button>
                        </div>
                        <span class="sim-readout" id="pcm-readout" style="font-size:0.75rem;">3-bit (8 mức) | 14 mẫu</span>
                    </div>
                </div>
                <div class="card card-cyan">
                    <h3 class="card-title cyan">NGUYÊN LÍ BỘ CHUYỂN ĐỔI DAC</h3>
                    <p><b>DAC (Digital-to-Analog Converter):</b> Chuyển đổi ngược tín hiệu số nhị phân thành tín hiệu tương tự để <b>khôi phục dạng tín hiệu gốc ban đầu</b>.</p>
                    <p style="margin-top:8px;"><b>Vị trí:</b> Đặt ở phía nhận, sau giai đoạn xử lí số (hoặc tách sóng) và ngay trước tầng khuếch đại công suất ra loa.</p>
                    <h4 class="green" style="margin-top:10px; margin-bottom:6px;">Cơ chế tái tạo tín hiệu:</h4>
                    <ul class="bullet-list" style="font-size:0.88rem;">
                        <li><b>Giải mã mức điện áp:</b> Chuyển mỗi từ mã bit (vd <code>101</code>) thành một bậc thang điện áp tương ứng (đường màu vàng).</li>
                        <li><b>Lọc làm mịn (Low-pass filter):</b> Làm mượt các góc cạnh bậc thang rời rạc thành đường cong sóng điện áp liên tục (đường màu xanh lá) khớp với sóng gốc để phát ra loa.</li>
                    </ul>
                </div>
            </div>
        `,
        notes: `Ở chiều ngược lại là bộ chuyển đổi DAC (Digital-to-Analog Converter), có nhiệm vụ khôi phục lại tín hiệu tương tự từ dữ liệu số.
Vị trí của DAC luôn nằm ở phía thu, ngay sau giai đoạn xử lí số và trước mạch khuếch đại ra loa.
Trên mô phỏng 2D bên trái, ta thấy: từ chuỗi bit số, bộ DAC ban đầu tạo ra một đường điện áp dạng bậc thang màu vàng. Sau đó, nhờ đi qua bộ lọc thông thấp làm mịn, đường bậc thang được uốn cong thành đường sóng xanh lá cây mượt mà gần như trùng khớp với tín hiệu gốc màu xanh dương đứt nét. Nếu ta tăng số bit lên 4-bit và tăng tần số lấy mẫu, sai số lượng tử giảm xuống rõ rệt và đường sóng tái tạo đạt độ trung thực cực cao.`
    },

    // =========================================================================
    // SLIDE 20: QUY TRÌNH TRUYỀN VÀ XỬ LÍ ÂM THANH (HÌNH 5.6 + AUDIO STUDIO 2D + SOUND)
    // =========================================================================
    {
        num: 20,
        simBadge: "2D + Âm thanh thật",
        tag: "PHẦN IV • HỆ THỐNG TRUYỀN DẪN SỬ DỤNG ADC VÀ DAC",
        title: "Quy trình truyền và xử lí âm thanh (Hình 5.6 SGK)",
        content_html: `
            <div style="display:flex; flex-direction:column; gap:12px; height:100%;">
                <div class="sim-box" style="flex:1.15;">
                    <div class="sim-topbar">
                        <span><span class="badge badge-2d">STUDIO ÂM THANH 2D</span> Chu trình Hình 5.6: Micro → ADC → Xử lí số → DAC → Loa</span>
                        <button class="sim-btn accent" onclick="Sim2DManager.get('sim2d-audio')?.playSound()">🔊 Nghe thử âm thanh (1.2s)</button>
                    </div>
                    <div class="sim-canvas-wrap">
                        <canvas id="sim2d-audio"></canvas>
                    </div>
                    <div class="sim-controls">
                        <span style="font-weight:bold; color:#F4F7FB;">Chế độ xử lí số (DSP):</span>
                        <button class="sim-btn active" id="btn-aud-clean" onclick="setAudioMode('clean')">✨ Chuẩn (Clean)</button>
                        <button class="sim-btn" id="btn-aud-noisy" onclick="setAudioMode('noisy')">⚡ Nhiễu (Noisy)</button>
                        <button class="sim-btn" id="btn-aud-filtered" onclick="setAudioMode('filtered')">🛡️ Đã lọc ồn (DSP Filter)</button>
                        <button class="sim-btn" id="btn-aud-lowbit" onclick="setAudioMode('lowbit')">📉 Số hóa thấp (2-bit)</button>
                    </div>
                </div>
                <div class="card card-blue" style="flex-shrink:0; padding:12px 16px;">
                    <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:10px; font-size:0.82rem;">
                        <div><b class="cyan">1. Vào Micro:</b><br>Thu âm thanh thành điện áp tương tự.</div>
                        <div><b class="blue">2. Qua ADC:</b><br>Số hóa thành dữ liệu nhị phân.</div>
                        <div><b class="amber">3. Xử lí tín hiệu số:</b><br>Chỉnh sửa, thêm hiệu ứng, lọc ồn, lưu trữ.</div>
                        <div><b class="blue">4. Qua DAC:</b><br>Khôi phục về điện áp tương tự.</div>
                        <div><b class="green">5. Phát ra Loa:</b><br>Biến điện áp thành sóng âm truyền đến tai.</div>
                    </div>
                </div>
            </div>
        `,
        notes: `Hình 5.6 trong sách giáo khoa trang 36 minh họa trọn vẹn một quy trình thu và xử lí âm thanh thực tế gồm 5 giai đoạn khép kín:
1. Âm thanh đi vào Micro trở thành tín hiệu tương tự.
2. Bộ ADC biến đổi tín hiệu tương tự thành tín hiệu số.
3. Giai đoạn Xử lí tín hiệu số: trên máy tính, ta có thể lọc tạp âm, thêm hiệu ứng vang hay lưu trữ.
4. Bộ DAC chuyển đổi dữ liệu số đã xử lí trở lại thành tín hiệu tương tự.
5. Loa phát tín hiệu tương tự thành sóng âm đến tai người nghe.
Đặc biệt trên mô phỏng này, nếu thầy cô và các bạn bấm nút "Nghe thử âm thanh" ở góc trên, chúng ta có thể nghe trực tiếp âm thanh tổng hợp thực tế: khi chuyển sang chế độ "Số hóa thấp 2-bit", âm thanh sẽ bị rè do bước lượng tử hóa thô, còn ở chế độ chuẩn hoặc lọc ồn số DSP, âm thanh phát ra rất trong trẻo.`
    },

    // =========================================================================
    // SLIDE 21: HỆ THỐNG TRUYỀN DẪN VÔ TUYẾN (WITH 3D FULL TOWER-TO-TOWER DIORAMA)
    // =========================================================================
    {
        num: 21,
        simBadge: "3D WebGL Toàn Cảnh",
        tag: "PHẦN IV • HỆ THỐNG TRUYỀN DẪN SỬ DỤNG ADC VÀ DAC",
        title: "Hệ thống truyền dẫn vô tuyến sử dụng ADC và DAC (Hình 5.7 SGK)",
        content_html: `
            <div style="display:flex; flex-direction:column; gap:10px; height:100%;">
                <div class="sim-box" style="flex:1;">
                    <div class="sim-topbar">
                        <span><span class="badge badge-3d">MÔ HÌNH 3D ĐÀI PHÁT – THU</span> Hình 5.7 SGK: Bộ Phát (6 khối) 📡 Kênh Vô Tuyến 📡 Bộ Thu (6 khối)</span>
                        <div style="display:flex; gap:6px; flex-wrap:wrap;">
                            <button class="sim-btn accent" onclick="Sim3DManager.get('sim3d-rf')?.triggerPacket()">⚡ Gửi gói tin giọng nói</button>
                            <button class="sim-btn" onclick="Sim3DManager.get('sim3d-rf')?.setCameraPreset('overview')">Toàn cảnh</button>
                            <button class="sim-btn" onclick="Sim3DManager.get('sim3d-rf')?.setCameraPreset('tx')">Bộ phát</button>
                            <button class="sim-btn" onclick="Sim3DManager.get('sim3d-rf')?.setCameraPreset('air')">Sóng vô tuyến</button>
                            <button class="sim-btn" onclick="Sim3DManager.get('sim3d-rf')?.setCameraPreset('rx')">Bộ thu</button>
                        </div>
                    </div>
                    <div class="sim-canvas-wrap" id="sim3d-rf"></div>
                    <div class="sim-hint">🖱️ Kéo xoay 360° hoặc bấm các nút góc máy ở trên để soi từng khối!</div>
                </div>
                <div class="grid-2" style="flex-shrink:0; gap:12px; height:auto;">
                    <div class="card card-cyan" style="padding:10px 14px;">
                        <b class="cyan">BỘ PHÁT (6 khối đúng thứ tự SGK):</b>
                        <p style="font-size:0.84rem; margin-top:3px;"><code>Micro</code> → <code>Khuếch đại</code> → <code>ADC</code> → <code>Biến điệu</code> → <code>Khuếch đại</code> → <code>Anten phát</code></p>
                    </div>
                    <div class="card card-green" style="padding:10px 14px;">
                        <b class="green">BỘ THU (6 khối đúng thứ tự SGK):</b>
                        <p style="font-size:0.84rem; margin-top:3px;"><code>Anten thu</code> → <code>Bộ xử lí (Chọn sóng, KĐ)</code> → <code>Tách sóng</code> → <code>DAC</code> → <code>Khuếch đại</code> → <code>Loa</code></p>
                    </div>
                </div>
            </div>
        `,
        notes: `Slide 21 là trọng tâm đỉnh cao của toàn bài học: Sơ đồ nguyên lí hệ thống truyền dẫn vô tuyến sử dụng bộ chuyển đổi ADC và DAC theo đúng Hình 5.7 trong SGK.
Chúng ta có thể nhìn thấy toàn cảnh 3D trực quan chia làm hai phía rõ rệt:
- Phía BỘ PHÁT (bên trái): Micro thu âm (tương tự) → Khuếch đại → ADC (chuyển thành tín hiệu số) → Bộ Biến điệu → Khuếch đại công suất → Anten phát sóng.
- Phía BỘ THU (bên phải): Anten thu → Bộ xử lí (chọn sóng, khuếch đại) → Bộ Tách sóng → DAC (chuyển ngược về tín hiệu tương tự) → Khuếch đại công suất → Loa.

Điểm mấu chốt cần giải thích sâu tại đây là vai trò của khối Biến điệu và Tách sóng: Vì tín hiệu số từ đầu ra của ADC không thể tự truyền đi xa qua môi trường không khí và qua các kênh giới hạn băng thông, nên bắt buộc phải dùng bộ Biến điệu để biến đổi tín hiệu số thành sóng tương tự cao tần (cõng trên sóng mang) trước khi khuếch đại đưa ra Anten phát. Đến phía thu, bộ Tách sóng sẽ tách lấy thông tin số ra khỏi sóng mang rồi mới chuyển cho DAC khôi phục ra loa! Hãy bấm nút "Gửi gói tin giọng nói" để quan sát đường đi của tín hiệu trong không gian 3D.`
    },

    // =========================================================================
    // SLIDE 22: TỔNG KẾT KIẾN THỨC BÀI 5
    // =========================================================================
    {
        num: 22,
        tag: "TỔNG KẾT BÀI HỌC",
        title: "Tổng kết 4 nội dung cốt lõi Bài 5",
        content_html: `
            <div class="grid-4">
                <div class="card card-cyan">
                    <h3 class="card-title cyan">1. TÍN HIỆU TƯƠNG TỰ</h3>
                    <ul class="bullet-list" style="font-size:0.86rem;">
                        <li>Liên tục theo thời gian, có vô số mức biên độ.</li>
                        <li>Gồm 2 dạng: Tuần hoàn (sin/cos, <code>T = 1/f</code>) và Không tuần hoàn.</li>
                        <li>Ví dụ: Điện 50 Hz (T = 20 ms), micro, cáp đồng thoại bàn.</li>
                    </ul>
                </div>
                <div class="card card-blue">
                    <h3 class="card-title blue">2. TÍN HIỆU SỐ</h3>
                    <ul class="bullet-list" style="font-size:0.86rem;">
                        <li>Rời rạc theo thời gian, dạng xung vuông.</li>
                        <li>Hữu hạn các mức điện áp, nhảy bậc đột ngột.</li>
                        <li>Đơn vị Bit (0, 1). Tín hiệu đa mức (4 mức → 2 bit/mức) giúp tăng tốc độ bit.</li>
                    </ul>
                </div>
                <div class="card card-green">
                    <h3 class="card-title green">3. TRUYỀN DỮ LIỆU</h3>
                    <ul class="bullet-list" style="font-size:0.86rem;">
                        <li>Tương tự: Tiết kiệm băng thông nhưng dễ bị nhiễu, khó khôi phục.</li>
                        <li>Số: Tốn băng thông hơn nhưng chống nhiễu tốt, sửa lỗi được, bảo mật cao, sao chép không giảm chất lượng.</li>
                    </ul>
                </div>
                <div class="card card-coral">
                    <h3 class="card-title coral">4. HỆ THỐNG ADC & DAC</h3>
                    <ul class="bullet-list" style="font-size:0.86rem;">
                        <li><b>ADC:</b> Tương tự → Số (kĩ thuật PCM).</li>
                        <li><b>DAC:</b> Số → Tương tự ra loa.</li>
                        <li>Truyền qua vô tuyến cần thêm <b>Biến điệu</b> ở máy phát và <b>Tách sóng</b> ở máy thu.</li>
                    </ul>
                </div>
            </div>
        `,
        notes: `Slide 22 hệ thống hóa lại toàn bộ 4 nội dung trọng tâm của Bài 5 như một bản đồ tư duy trực quan:
1. Tín hiệu tương tự: bản chất liên tục, hai dạng tuần hoàn – không tuần hoàn, công thức T = 1/f.
2. Tín hiệu số: bản chất rời rạc, xung vuông, mã hóa nhị phân 0–1 và kỹ thuật đa mức.
3. Truyền dữ liệu: đánh đổi giữa băng thông với khả năng chống nhiễu, bảo mật, lưu trữ và phục hồi.
4. Hệ thống truyền dẫn với cặp đôi ADC và DAC kết hợp biến điệu sóng vô tuyến.`
    },

    // =========================================================================
    // SLIDE 23: CÂU HỎI CỦNG CỐ BÀI 5 (PHẦN 1 - CÂU 1, 2, 3)
    // =========================================================================
    {
        num: 23,
        tag: "CỦNG CỐ KIẾN THỨC • CÂU HỎI TRẮC NGHIỆM",
        title: "Câu Hỏi Ôn Tập Củng Cố Bài 5 (Phần 1)",
        subtitle: "Thử thách trắc nghiệm: Bản chất tín hiệu, Chu kì T = 1/f & Tín hiệu số đa mức",
        content_html: `
            <div class="quiz-container">
                <!-- Câu 1 -->
                <div class="quiz-card">
                    <div class="quiz-q-title">
                        <span class="badge badge-cyan">CÂU 1</span>
                        <span>Điểm khác biệt cốt lõi nhất về mặt bản chất giữa tín hiệu tương tự (analog) và tín hiệu số (digital) là gì?</span>
                    </div>
                    <div class="quiz-options">
                        <button class="quiz-opt" onclick="checkQuiz(this, true, 'bai5-q1-exp')">A. Tín hiệu tương tự biến thiên liên tục theo thời gian và có vô số mức giá trị; tín hiệu số rời rạc theo thời gian và chỉ nhận hữu hạn các mức điện áp</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q1-exp')">B. Tín hiệu tương tự chỉ truyền được trong dây đồng; tín hiệu số chỉ truyền trong cáp quang</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q1-exp')">C. Tín hiệu tương tự luôn có chu kì xác định; tín hiệu số không bao giờ có chu kì</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q1-exp')">D. Tín hiệu tương tự không bao giờ bị nhiễu; tín hiệu số luôn bị suy hao chất lượng</button>
                    </div>
                    <div id="bai5-q1-exp" class="quiz-exp">
                        ✅ <strong>Chính xác!</strong> Định nghĩa SGK trang 33-34: Tín hiệu tương tự biến thiên liên tục theo thời gian và có vô số giá trị biên độ. Tín hiệu số rời rạc theo thời gian và chỉ nhận một số hữu hạn các mức giá trị xác định (thường là 2 mức 0 và 1).
                    </div>
                </div>

                <!-- Câu 2 -->
                <div class="quiz-card">
                    <div class="quiz-q-title">
                        <span class="badge badge-cyan">CÂU 2</span>
                        <span>Dòng điện xoay chiều sinh hoạt tại Việt Nam có tần số $f = 50\\text{ Hz}$. Chu kì dao động của tín hiệu này là:</span>
                    </div>
                    <div class="quiz-options">
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q2-exp')">A. $T = 0,5\\text{ s} = 500\\text{ ms}$</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, true, 'bai5-q2-exp')">B. $T = 0,02\\text{ s} = 20\\text{ ms}$</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q2-exp')">C. $T = 0,05\\text{ s} = 50\\text{ ms}$</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q2-exp')">D. $T = 0,2\\text{ s} = 200\\text{ ms}$</button>
                    </div>
                    <div id="bai5-q2-exp" class="quiz-exp">
                        ✅ <strong>Chính xác!</strong> Theo công thức SGK trang 33: $T = \\frac{1}{f} = \\frac{1}{50\\text{ Hz}} = 0,02\\text{ s} = 20\\text{ ms}$. Mỗi dao động toàn phần của điện xoay chiều diễn ra trong đúng 20 mili giây.
                    </div>
                </div>

                <!-- Câu 3 -->
                <div class="quiz-card">
                    <div class="quiz-q-title">
                        <span class="badge badge-cyan">CÂU 3</span>
                        <span>Một tín hiệu số có 4 mức điện áp được dùng để truyền dữ liệu. Biết mỗi mức điện áp mã hóa được 2 bit ($00, 01, 10, 11$). Nếu mỗi giây gửi đi được 8 mức tín hiệu thì tốc độ bit là:</span>
                    </div>
                    <div class="quiz-options">
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q3-exp')">A. $4\\text{ bit/s}$</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q3-exp')">B. $8\\text{ bit/s}$</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, true, 'bai5-q3-exp')">C. $16\\text{ bit/s}$</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q3-exp')">D. $32\\text{ bit/s}$</button>
                    </div>
                    <div id="bai5-q3-exp" class="quiz-exp">
                        ✅ <strong>Chính xác!</strong> Dựa trên Hình 5.3 SGK trang 34: Mỗi mức tín hiệu biểu diễn nhóm 2 bit. Với tốc độ 8 mức/giây, tổng số bit truyền được trong 1 giây là $8 \\times 2 = 16\\text{ bit/s}$ (gấp đôi so với hệ thống 2 mức).
                    </div>
                </div>
            </div>
        `,
        notes: `Kính mời thầy cô và các bạn cùng ôn lại các kiến thức trọng tâm của Bài 5:
Câu 1 nhấn mạnh sự phân biệt cơ bản giữa liên tục vô số giá trị (tương tự) và rời rạc hữu hạn mức (số).
Câu 2 củng cố công thức chu kì T = 1/f với ví dụ dòng điện xoay chiều 50 Hz.
Câu 3 minh họa ưu thế của việc dùng tín hiệu số 4 mức: mỗi mức mang 2 bit giúp nhân đôi tốc độ truyền dữ liệu.`
    },

    // =========================================================================
    // SLIDE 24: CÂU HỎI CỦNG CỐ BÀI 5 (PHẦN 2 - CÂU 4, 5)
    // =========================================================================
    {
        num: 24,
        tag: "CỦNG CỐ KIẾN THỨC • CÂU HỎI TRẮC NGHIỆM",
        title: "Câu Hỏi Ôn Tập Củng Cố Bài 5 (Phần 2)",
        subtitle: "Thử thách trắc nghiệm: Cặp chuyển đổi ADC / DAC & Khả năng tái tạo tín hiệu số",
        content_html: `
            <div class="quiz-container">
                <!-- Câu 4 -->
                <div class="quiz-card">
                    <div class="quiz-q-title">
                        <span class="badge badge-green">CÂU 4</span>
                        <span>Trong các thiết bị điện thoại thông minh, vai trò chính xác của cặp bộ chuyển đổi ADC và DAC là:</span>
                    </div>
                    <div class="quiz-options">
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q4-exp')">A. ADC biến đổi tín hiệu số thành sóng radio; DAC biến đổi sóng radio thành điện áp</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, true, 'bai5-q4-exp')">B. ADC biến đổi giọng nói analog từ mic thành chuỗi bit số; DAC biến đổi chuỗi bit số nhận được thành tín hiệu analog cấp cho loa/tai nghe</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q4-exp')">C. ADC điều khiển dung lượng pin; DAC bảo vệ điện thoại khỏi sét đánh</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q4-exp')">D. ADC đặt ở máy thu; DAC đặt ở máy phát</button>
                    </div>
                    <div id="bai5-q4-exp" class="quiz-exp">
                        ✅ <strong>Chính xác!</strong> Theo SGK trang 36-37: ADC (Analog-to-Digital Converter) số hóa sóng âm tương tự từ micro thành chuỗi số nhị phân để chip xử lý. Ở nơi nhận, DAC (Digital-to-Analog Converter) giải mã chuỗi số thành điện áp tương tự biến thiên để làm rung màng loa/tai nghe.
                    </div>
                </div>

                <!-- Câu 5 -->
                <div class="quiz-card">
                    <div class="quiz-q-title">
                        <span class="badge badge-green">CÂU 5</span>
                        <span>Vì sao khi truyền tín hiệu số đi xa qua hàng chục trạm lặp (repeater), chất lượng dữ liệu ở đầu thu vẫn được bảo toàn nguyên vẹn gần như 100%?</span>
                    </div>
                    <div class="quiz-options">
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q5-exp')">A. Vì dây cáp truyền tín hiệu số không bao giờ có điện trở tiêu hao</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, true, 'bai5-q5-exp')">B. Vì trạm lặp số không khuếch đại cả sóng lẫn nhiễu như analog, mà tái tạo lại các xung vuông mới tinh nguyên bản (Regeneration), triệt tiêu hoàn toàn nhiễu tích lũy</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q5-exp')">C. Vì tín hiệu số có công suất năng lượng vô hạn</button>
                        <button class="quiz-opt" onclick="checkQuiz(this, false, 'bai5-q5-exp')">D. Vì tín hiệu số không bao giờ bị tác động bởi môi trường bên ngoài</button>
                    </div>
                    <div id="bai5-q5-exp" class="quiz-exp">
                        ✅ <strong>Chính xác!</strong> SGK trang 35: Đối với tín hiệu tương tự, bộ khuếch đại làm tăng cả tín hiệu lẫn tạp âm khiến nhiễu tích lũy dần. Đối với tín hiệu số, trạm lặp chỉ cần nhận diện mức 0 hay 1 rồi phát lại một xung vuông mới tinh hoàn hảo, loại bỏ sạch 100% tạp âm tích tụ!
                    </div>
                </div>
            </div>
        `,
        notes: `Hai câu hỏi cuối cùng của Bài 5:
Câu 4 khắc sâu vai trò của cặp chuyển đổi ADC và DAC – chiếc chìa khóa kết nối giữa thế giới âm thanh tự nhiên của con người và thế giới nhị phân của thiết bị điện tử.
Câu 5 giải thích cơ chế tái tạo xung (Regeneration) – nguyên nhân cốt lõi giúp tín hiệu số có thể đi vòng quanh thế giới qua cáp quang biển mà không bị suy giảm chất lượng âm thanh hay hình ảnh.`
    },

    // =========================================================================
    // SLIDE 25: ỨNG DỤNG THỰC TẾ VÀ KẾT LUẬN
    // =========================================================================
    {
        num: 25,
        tag: "LIÊN HỆ THỰC TIỄN & KẾT LUẬN",
        title: "Ứng dụng công nghệ thực tế và kết luận",
        content_html: `
            <div class="grid-2">
                <div class="card card-cyan">
                    <h3 class="card-title cyan">CÁC ỨNG DỤNG CÔNG NGHỆ HIỆN ĐẠI</h3>
                    <ul class="bullet-list">
                        <li><b>Điện thoại di động & Smartphone:</b> Từ chiếc điện thoại di động đầu tiên Motorola DynaTAC ngày 3/4/1973 của Tiến sĩ Martin Cooper (SGK trang 37), điện thoại ngày nay tích hợp hàng loạt bộ chuyển đổi ADC/DAC để truyền giọng nói qua mạng vô tuyến 4G/5G.</li>
                        <li style="margin-top:8px;"><b>Ghi âm & Xử lí âm thanh kỹ thuật số:</b> Phòng thu âm sử dụng ADC độ phân giải cao (24-bit) để số hóa giọng hát, xử lí hiệu ứng và nén thành MP3/FLAC.</li>
                        <li style="margin-top:8px;"><b>Phát nhạc & Truyền thông qua Internet:</b> Hàng tỉ bài hát và video trực tuyến truyền qua cáp quang và Wi-Fi dưới dạng tín hiệu số mà không bị suy giảm chất lượng.</li>
                    </ul>
                </div>
                <div class="card card-green center-v">
                    <h3 class="card-title green">KẾT LUẬN HỌC THUẬT</h3>
                    <div class="quote-box" style="border-color:#2ED573;">
                        Thế giới tự nhiên quanh ta tồn tại dưới dạng <b>tín hiệu tương tự</b> liên tục, còn máy tính và mạng truyền thông hiện đại vận hành tối ưu bằng <b>tín hiệu số</b>.
                    </div>
                    <p style="color:#F4F7FB; margin-top:10px;">
                        Sự kết hợp nhịp nhàng giữa <b>tín hiệu tương tự</b>, <b>tín hiệu số</b> cùng các bộ chuyển đổi <b>ADC/DAC</b> và kỹ thuật biến điệu sóng vô tuyến đã giúp con người thu nhận, xử lí, lưu trữ, truyền tải và tái tạo thông tin một cách chính xác và hiệu quả vượt bậc.
                    </p>
                </div>
            </div>
        `,
        notes: `Mục "Em có biết" cuối bài trang 37 nhắc tới một dấu mốc lịch sử: chiếc điện thoại di động đầu tiên trên thế giới ra đời ngày 3/4/1973 do Tiến sĩ Martin Cooper phát minh. Để truyền được tín hiệu tiếng nói qua hệ thống điện thoại di động hay nghe nhạc qua Internet ngày nay, người ta đều phải ứng dụng triệt để quá trình biến đổi tương tự sang số và ngược lại mà chúng ta vừa học.
Kết luận lại: sự kết hợp hài hòa giữa thế giới tương tự tự nhiên và sức mạnh tính toán chính xác của tín hiệu số thông qua cầu nối ADC/DAC chính là nền tảng của toàn bộ nền công nghệ truyền thông hiện đại.`
    },

    // =========================================================================
    // SLIDE 26: TÀI LIỆU THAM KHẢO
    // =========================================================================
    {
        num: 26,
        tag: "TÀI LIỆU THAM KHẢO & LỜI CẢM ƠN",
        title: "Tài liệu tham khảo",
        content_html: `
            <div class="grid-2">
                <div class="card card-cyan">
                    <h3 class="card-title cyan">NGUỒN TÀI LIỆU HỌC TẬP CHÍNH THỨC</h3>
                    <ul class="bullet-list" style="margin-top:10px;">
                        <li><b>Sách giáo khoa:</b> <i>Chuyên đề học tập Vật lí 11</i> – Bộ sách Kết nối tri thức với cuộc sống (Vũ Văn Hùng Tổng Chủ biên, Đặng Thanh Hải Chủ biên), Nhà xuất bản Giáo dục Việt Nam.</li>
                        <li style="margin-top:10px;"><b>Nội dung trích dẫn:</b> Chuyên đề II: <i>Truyền thông tin bằng sóng vô tuyến</i> – <b>Bài 5: Tín hiệu tương tự và tín hiệu số</b> (Trang in 33 – 37).</li>
                        <li style="margin-top:10px;"><b>Minh họa & Mô phỏng:</b> Các đồ thị sóng, sơ đồ nguyên lí và mô phỏng 2D/3D được xây dựng bám sát hệ thống Hình 5.1, 5.2, 5.3, 5.4, 5.5, 5.6 và 5.7 trong tài liệu học tập.</li>
                    </ul>
                </div>
                <div class="card card-green center-v" style="text-align:center;">
                    <h3 class="card-title green" style="justify-content:center; font-size:1.35rem;">TRÂN TRỌNG CẢM ƠN</h3>
                    <p style="font-size:1.05rem; margin-top:10px;">
                        Cảm ơn Quý Thầy Cô giáo và các bạn học sinh lớp 11 đã theo dõi bài thuyết trình chuyên đề!
                    </p>
                    <p style="color:#32D5F2; font-weight:bold; margin-top:16px;">
                        Nhóm thực hiện rất mong nhận được ý kiến đóng góp và trao đổi chuyên môn từ Thầy Cô và các bạn.
                    </p>
                </div>
            </div>
        `,
        notes: `Bài thuyết trình học thuật về Bài 5: Tín hiệu tương tự và Tín hiệu số của nhóm chúng em đến đây là kết thúc.
Toàn bộ kiến thức, thuật ngữ khoa học và sơ đồ nguyên lí đều được xây dựng bám sát sách Chuyên đề học tập Vật lí 11 (Bộ Kết nối tri thức với cuộc sống, trang 33 đến trang 37).
Xin trân trọng cảm ơn quý thầy cô và các bạn đã chú ý lắng nghe!`
    }
];
