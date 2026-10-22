# Felix Le — Software & Mobile Engineer Portfolio

Website portfolio đạt chuẩn **Awwwards / FWA / CSS Design Awards** dành cho **Felix Le (Lê Công Hoàng Phúc)** — **Software & Mobile Engineer**.

Được phát triển với trọng tâm **Hiệu ứng cuộn tương tác (Scroll-triggered Motion)**, **Typography động**, **Lenis Smooth Scroll**, **Horizontal Scroll Projects**, **Scrollytelling** và hình ảnh chân dung không viền hòa nhập tự nhiên với trang web.

---

## 🌟 Tính năng nổi bật & Hiệu ứng cuộn (Section 8)

1. **Lenis Smooth Scroll**:
   - Trải nghiệm cuộn mượt mà chuẩn 60fps trên toàn trang, đồng bộ hoàn hảo với **GSAP ScrollTrigger** (`SmoothScrollProvider.tsx`).
   - Tự động ngắt khi người dùng bật `prefers-reduced-motion`.
2. **Horizontal Scroll (Dự án chọn lọc)**:
   - Khi cuộn dọc đến phần Dự án (`SelectedProjects.tsx`), khu vực này được ghim (`pin: true`) và 5 dự án thực tế trượt ngang mượt mà từ phải sang trái.
   - Thẻ dự án tích hợp hiệu ứng **3D Perspective Tilt** và **Con trỏ Spotlight** phản hồi vị trí chuột theo thời gian thực.
3. **Pinned Sections & Scrollytelling (Giới thiệu & Bản sắc)**:
   - Cột trái ghim cố định (`sticky`) với danh tính, số liệu đếm động và định vị chuyên môn.
   - Cột phải cuộn dẫn dắt người xem qua 4 nấc thang: Triết lý công nghệ → Đại học UMT & Học bổng Maker 175M → Trao đổi quốc tế UNJ Indonesia → Thử thách Hackathon VPBank & AWS.
4. **Ảnh chân dung không nền hòa nhập tự nhiên**:
   - Nhân vật hiển thị không viền khung hộp (`portrait.png`), hòa quyện vào giao diện cả ở Dark Mode và Light Mode.
   - Phản ứng nghiêng thị sai (Parallax) theo chuột cùng quầng sáng hào quang (Electric Lime / Cyber Violet) và các chip dữ liệu bay xung quanh.
5. **Text Scramble / Hacker Decode Effect**:
   - Tiêu đề, nhãn menu và vai trò kỹ thuật giải mã tự động bằng ký tự ngẫu nhiên (`_ / [ ] * # $ @`) khi tải trang, khi hover hoặc khi chuyển ngôn ngữ.
6. **Counter đếm số tự động (Number Count-Up)**:
   - Các số liệu thật trong CV tự động đếm tăng dần khi lọt vào tầm nhìn: `31` Repositories, `175` Triệu VNĐ học bổng, `4+` Năm học tập, `5+` Dự án cốt lõi.
7. **Velocity Marquee**:
   - Dải chữ chạy vô tận tự động tăng tốc theo vận tốc lăn chuột của người dùng.
8. **Scroll Progress Bar**:
   - Thanh tiến trình phát sáng siêu mỏng ghim sát mép trên màn hình, báo chính xác % nội dung đã đọc.
9. **Sơ đồ kiến trúc tương tác (Interactive System Architecture)**:
   - Trong Case Study của **Flood Early Warning System**: Cho phép bấm vào từng node (Mobile Client ↔ API Gateway ↔ PostgreSQL PostGIS ↔ Python ML ↔ Alert Dispatch) để xem luồng dữ liệu thời gian thực.
10. **Song ngữ (EN | VI) & Dark / Light Mode**:
    - Chuyển đổi tức thời trên Header, không reload trang, chống nháy màu tuyệt đối.

---

## 🚀 Khởi chạy dự án

### Cài đặt và chạy thử
```bash
# 1. Cài đặt các gói phụ thuộc
npm install --legacy-peer-deps

# 2. Chạy môi trường phát triển (Development)
npm run dev
# Mở trình duyệt: http://localhost:3000

# 3. Đóng gói sản phẩm (Production Build)
npm run build

# 4. Khởi chạy máy chủ sản phẩm
npm run start
```

---

## 📂 Cấu trúc thư mục

```
hphucdev_portfolio/
├── public/
│   ├── images/
│   │   ├── portrait.png               # Ảnh chân dung PNG tách nền trong suốt
│   │   └── portrait.jpg               # Bản gốc JPG
│   └── cv/
│       ├── Felix_Le_Resume_EN.pdf     # File CV tiếng Anh
│       └── Felix_Le_Resume_VI.pdf     # File CV tiếng Việt
├── src/
│   ├── app/
│   │   ├── globals.css                # Design tokens, Grain overlay, Glassmorphism
│   │   ├── layout.tsx                 # RootLayout, SmoothScrollProvider, ScrollProgressBar
│   │   └── page.tsx                   # Trang chủ tích hợp 11 sections
│   ├── components/
│   │   ├── providers/
│   │   │   └── SmoothScrollProvider.tsx # Khởi tạo Lenis + đồng bộ GSAP ScrollTrigger
│   │   ├── sections/
│   │   │   ├── Hero.tsx               # Chân dung không viền, kinetic type, velocity marquee
│   │   │   ├── About.tsx              # Pinned scrollytelling, counter badges
│   │   │   ├── ExplodedArchitecture.tsx # 5 tầng kiến trúc phần mềm tương tác
│   │   │   ├── SelectedProjects.tsx   # Cuộn ngang (Horizontal scroll), 5 dự án thật
│   │   │   ├── TechStack.tsx          # Nhóm kỹ năng thực tế (không dùng thanh %)
│   │   │   ├── Experience.tsx         # Dòng thời gian dọc: IVS SmartFactory, VPBank, UNJ, UMT
│   │   │   ├── EducationAchievements.tsx # Huy hiệu học vấn & chứng nhận
│   │   │   ├── WhatIDo.tsx            # Accordion 5 năng lực kỹ sư phần mềm
│   │   │   ├── GitHubRadar.tsx        # Kết nối API GitHub thật hphuc193, ma trận heatmap
│   │   │   └── Contact.tsx            # Form liên hệ honeypot, copy email, mạng xã hội
│   │   └── ui/
│   │       ├── CustomCursor.tsx       # Con trỏ từ tính với nhãn ngữ cảnh
│   │       ├── Header.tsx             # Floating dock, đồng hồ HCM, nút EN/VI, Sun/Moon
│   │       ├── Preloader.tsx          # Monogram FL, bộ đếm khởi động hệ thống
│   │       ├── ProjectModal.tsx       # Sơ đồ kiến trúc tương tác dự án Flood Warning AI
│   │       ├── ScrollProgressBar.tsx  # Thanh đo tiến trình cuộn đầu trang
│   │       ├── SpotlightCard.tsx      # Thẻ phản hồi vị trí chuột & nghiêng 3D
│   │       ├── VelocityMarquee.tsx    # Dải chữ chạy tăng tốc theo vận tốc cuộn
│   │       ├── SocialIcons.tsx        # Icon vector sắc nét các mạng xã hội
│   │       └── Footer.tsx             # Nút cuộn mượt lên đầu trang & Easter egg Konami
│   ├── hooks/
│   │   ├── useCounter.tsx             # Hook đếm số tự động khi vào khung nhìn
│   │   └── useTextScramble.tsx        # Hook giải mã chữ ngẫu nhiên
│   ├── context/
│   │   └── PortfolioContext.tsx       # Quản lý Theme, Locale, Audio FX
│   └── data/
│       └── portfolioData.ts           # Toàn bộ dữ liệu song ngữ & cờ confirm
```
