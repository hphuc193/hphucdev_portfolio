export interface MultilingualText {
  en: string;
  vi: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: MultilingualText;
  period: string;
  category: "mobile" | "ai" | "fullstack";
  role: MultilingualText;
  featured: boolean;
  githubUrl?: string;
  demoUrl?: string;
  isComingSoon?: boolean;
  image?: string;
  techStack: string[];
  extendedStack?: {
    tags: string[];
    confirm: boolean;
  };
  summary: MultilingualText;
  problem: MultilingualText;
  solution: MultilingualText;
  architecture: MultilingualText;
  challenges: MultilingualText;
  limitations: MultilingualText;
  highlights: MultilingualText[];
  academicMetrics?: {
    confirm: boolean;
    accuracy?: string;
    recall?: string;
    observations?: string;
    stations?: string;
    provinces?: string;
    timeframe?: string;
    disclaimer: MultilingualText;
  };
  screenMockupType: "flood" | "aivideo" | "cinema" | "homeservice" | "xray";
}

export interface ExperienceItem {
  id: string;
  role: MultilingualText;
  company: MultilingualText;
  period: string;
  location: MultilingualText;
  description: MultilingualText[];
  skills: string[];
  type: "internship" | "fellowship" | "hackathon" | "education";
}

export interface EducationItem {
  id: string;
  school: MultilingualText;
  degree: MultilingualText;
  period: string;
  location: MultilingualText;
  honor?: MultilingualText;
  gpa?: string;
  badge?: {
    en: string;
    vi: string;
  };
  details: MultilingualText[];
  confirmGraduation?: boolean;
}

export interface SkillCategory {
  id: string;
  title: MultilingualText;
  skills: string[];
}

export interface CapabilityItem {
  id: string;
  index: string;
  title: MultilingualText;
  description: MultilingualText;
  tags: string[];
}

export interface CertificateSignatory {
  name: string;
  title: string;
}

export interface CertificateItem {
  id: number;
  code: string;
  title: string;
  category: "hackathon" | "academic" | "fellowship" | "achievement" | "badge";
  categoryLabel: MultilingualText;
  recipientName: string;
  teamName?: string;
  studentCohort?: string;
  studentId?: string;
  major?: string;
  certificateNumber?: string;
  coRecipients?: string[];
  issuingOrganization: string[];
  issueDate: string;
  programDuration?: string;
  description: MultilingualText;
  signatories: CertificateSignatory[];
  image: string;
  featured: boolean;
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
    orientation: "landscape" | "portrait";
  };
}

export interface PortfolioData {
  personal: {
    name: string;
    intlName: string;
    displayName: string;
    nativeName: string;
    title: MultilingualText;
    subheadline: MultilingualText;
    location: MultilingualText;
    timezone: string;
    status: MultilingualText;
    statusAvailable: boolean;
    email: string;
    social: {
      github: string;
      linkedin: string;
      devto: string;
      x: string;
      instagram: string;
      facebook: string;
    };
    cv: {
      en: string;
      vi: string;
      downloadLabel: MultilingualText;
    };
    bioShort: MultilingualText;
    bioLong: MultilingualText;
    portraitImage: string;
    reposCount: number;
    yearsOfExperience: string;
    gpa?: string;
    english?: string;
  };
  projects: ProjectItem[];
  moreRepos: {
    name: string;
    language: string;
    url: string;
    description: MultilingualText;
  }[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  capabilities: CapabilityItem[];
  certificates: CertificateItem[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Lê Công Hoàng Phúc",
    intlName: "HOANGPHUC",
    displayName: "HOANGPHUC",
    nativeName: "Hoàng Phúc",
    title: {
      en: "Software & Mobile Engineer",
      vi: "Kỹ sư Phần mềm & Di động",
    },
    subheadline: {
      en: "Mobile Applications · AI-Powered Software · Full-stack Engineering",
      vi: "Ứng dụng Di động · Phần mềm Tích hợp AI · Kỹ thuật Full-stack",
    },
    location: {
      en: "Ho Chi Minh City, Vietnam",
      vi: "Thành phố Hồ Chí Minh, Việt Nam",
    },
    timezone: "Asia/Ho_Chi_Minh",
    status: {
      en: "Open to opportunities",
      vi: "Sẵn sàng cho cơ hội mới",
    },
    statusAvailable: true,
    email: "phuc07134@gmail.com",
    social: {
      github: "https://github.com/hphuc193",
      linkedin: "https://www.linkedin.com/in/hphucit193",
      devto: "https://dev.to/hphuc193",
      x: "https://x.com/Hphuc193",
      instagram: "https://www.instagram.com/hphuc_193/",
      facebook: "https://www.facebook.com/hoang.phuc.226590/",
    },
    cv: {
      en: "/cv/HoangPhuc_Resume_EN.pdf",
      vi: "/cv/HoangPhuc_Resume_VI.pdf",
      downloadLabel: {
        en: "Download Resume",
        vi: "Tải xuống CV",
      },
    },
    bioShort: {
      en: "I build mobile applications and software products that bring together thoughtful user experiences, reliable backend systems, and intelligent technology.",
      vi: "Tôi xây dựng ứng dụng di động và sản phẩm phần mềm kết hợp trải nghiệm người dùng tinh tế, hệ thống backend đáng tin cậy và công nghệ thông minh.",
    },
    bioLong: {
      en: "I am a software engineer with a strong interest in mobile application development and AI-powered software. Through academic and personal projects, I have explored Flutter, native Android development, SwiftUI, backend APIs, databases, and machine learning. I enjoy connecting these areas to build complete software experiences, from application interfaces to the systems that support them.",
      vi: "Tôi là kỹ sư phần mềm với niềm đam mê phát triển ứng dụng di động và phần mềm tích hợp AI. Qua các dự án học thuật và cá nhân, tôi đã làm việc với Flutter, Android native, SwiftUI, API backend, cơ sở dữ liệu và machine learning. Tôi thích kết nối các mảng này để tạo nên trải nghiệm phần mềm hoàn chỉnh, từ giao diện ứng dụng đến hệ thống vận hành phía sau.",
    },
    portraitImage: "/images/portrait2.png",
    reposCount: 31,
    yearsOfExperience: "2022 - 2026",
    gpa: "3.23 / 4.0",
    english: "B1 (VSTEP 5.5)",
  },

  projects: [
    {
      id: "flood-early-warning",
      title: "Flood Early Warning System",
      tagline: {
        en: "AI-powered real-time flood monitoring and early warning system with geospatial mapping.",
        vi: "Hệ thống cảnh báo lũ sớm thời gian thực ứng dụng AI kết hợp trực quan hóa bản đồ địa không gian.",
      },
      period: "01/2025 – 05/2026",
      category: "mobile",
      role: {
        en: "Lead Engineer (Capstone / Graduation Thesis)",
        vi: "Kỹ sư chính (Đồ án tốt nghiệp đại học)",
      },
      featured: true,
      githubUrl: "https://github.com/hphuc193/flood-warning-backend",
      demoUrl: undefined,
      isComingSoon: false,
      image: "/images/projects/flood-warning.jpg",
      techStack: [
        "Flutter",
        "Node.js",
        "PostgreSQL",
        "WebSocket",
        "Docker",
        "RESTful API",
        "AI/ML Services",
      ],
      extendedStack: {
        tags: [
          "Dart",
          "flutter_map",
          "OpenStreetMap",
          "Express",
          "JWT",
          "PostGIS",
          "Firebase Cloud Messaging",
          "Supabase",
          "Render",
          "Python (Random Forest, XGBoost, LSTM)",
        ],
        confirm: true,
      },
      summary: {
        en: "Flagship graduation capstone engineering a complete flood disaster warning ecosystem. Combines an interactive Flutter mobile interface, high-throughput microservices backend, and intelligent predictive algorithms to provide real-time hazard alerts.",
        vi: "Dự án đồ án tốt nghiệp chủ lực xây dựng hệ sinh thái cảnh báo thiên tai ngập lụt toàn diện. Kết hợp ứng dụng di động Flutter trực quan, backend microservice hiệu năng cao và các thuật toán dự báo thông minh cung cấp cảnh báo nguy cơ lũ thời gian thực.",
      },
      problem: {
        en: "Communities frequently face rapid river swell and flooding with fragmented, delayed sensor reporting. Traditional municipal warnings arrive too late for actionable local response and lack intuitive geospatial clarity.",
        vi: "Các khu vực dân cư thường xuyên đối mặt với ngập lụt và lũ quét nhưng thông tin quan trắc bị phân mảnh, chậm trễ. Cảnh báo truyền thống thường đến trễ và thiếu bản đồ trực quan hóa vùng nguy cơ cụ thể.",
      },
      solution: {
        en: "Engineered a reactive cross-platform Flutter application connected via WebSockets to an automated backend pipeline. Processes live hydrological metrics, projects inundation levels on interactive maps, and dispatches automated emergency notifications.",
        vi: "Phát triển ứng dụng Flutter đa nền tảng kết nối WebSocket với backend xử lý tự động. Tiếp nhận và phân tích dữ liệu thủy văn tức thời, hiển thị vùng nguy cơ trên bản đồ tương tác và phát cảnh báo khẩn cấp tức thì.",
      },
      architecture: {
        en: "Microservice-oriented architecture: Flutter client with interactive OpenStreetMap layers connects to Node.js / Express API gateways. Real-time sensor telemetry flows into PostgreSQL with spatial PostGIS querying, while a Python ML prediction worker generates risk classifications dispatched via WebSockets and push notifications.",
        vi: "Kiến trúc hướng dịch vụ: Ứng dụng Flutter với lớp bản đồ OpenStreetMap giao tiếp qua API Gateway Node.js/Express. Dữ liệu cảm biến thời gian thực được lưu tại PostgreSQL (PostGIS), luồng worker Python ML xử lý dự đoán rủi ro và phát qua WebSocket cùng thông báo đẩy.",
      },
      challenges: {
        en: "Handling high-concurrency real-time WebSocket streams during simulated storm surges without UI thread freezing, and optimizing geospatial vector queries across regional boundaries.",
        vi: "Xử lý luồng dữ liệu WebSocket thời gian thực khi mô phỏng lưu lượng tăng cao trong bão mà không gây giật lag giao diện Flutter, tối ưu truy vấn dữ liệu địa không gian đa tầng.",
      },
      limitations: {
        en: "Subject to sensor station reporting latency in remote watersheds and requires continuous historical calibration for local terrain deviations.",
        vi: "Phụ thuộc vào độ trễ truyền tin của trạm quan trắc tại các lưu vực xa và cần hiệu chỉnh dữ liệu địa hình định kỳ theo từng địa phương.",
      },
      highlights: [
        {
          en: "Real-time bidirectional WebSocket event distribution for live hazard updates.",
          vi: "Kênh truyền WebSocket 2 chiều thời gian thực cập nhật biến động nguy cơ tức thì.",
        },
        {
          en: "Interactive geospatial visualization rendering danger zones and telemetry stations.",
          vi: "Bản đồ tương tác đa tầng trực quan hóa trạm quan trắc và phân vùng nguy cơ.",
        },
        {
          en: "Containerized microservices backend running on Docker with PostgreSQL persistence.",
          vi: "Hệ thống backend module hóa triển khai Docker với cơ sở dữ liệu PostgreSQL.",
        },
      ],
      academicMetrics: {
        confirm: true,
        accuracy: "91.2%",
        recall: "84.7%",
        observations: "~180,000",
        stations: "47",
        provinces: "12",
        timeframe: "2010 – 2023",
        disclaimer: {
          en: "Academic evaluation on historical dataset; not a guarantee of real-world operational forecasting.",
          vi: "Kết quả đánh giá học thuật trên tập dữ liệu lịch sử; không phải đảm bảo hiệu năng dự báo thực tế.",
        },
      },
      screenMockupType: "flood",
    },
    {
      id: "ai-video-studio",
      title: "AI Video Studio",
      tagline: {
        en: "Android application generating dynamic AI video renders from user media and prompts.",
        vi: "Ứng dụng Android sáng tạo video AI tự động từ hình ảnh và văn bản người dùng.",
      },
      period: "2025",
      category: "ai",
      role: {
        en: "Android & Backend Engineer",
        vi: "Kỹ sư Android & Backend",
      },
      featured: true,
      githubUrl: undefined,
      demoUrl: undefined,
      isComingSoon: true,
      image: "/images/projects/video-studio.jpg",
      techStack: [
        "Kotlin",
        "Android SDK",
        "ViewBinding",
        "Media3",
        "Python",
        "FastAPI",
        "React",
        "Ant Design",
      ],
      summary: {
        en: "Comprehensive mobile video generation suite featuring a native Kotlin Android client, a high-throughput Python FastAPI backend integrating AI synthesis APIs, and a React Ant Design administration console.",
        vi: "Hệ thống ứng dụng di động tạo video AI gồm ứng dụng Android native bằng Kotlin, backend FastAPI (Python) tích hợp API sinh video AI, và trang quản trị React với Ant Design.",
      },
      problem: {
        en: "Mobile users often lack lightweight tools to synthesize high-quality motion video from still photos and text prompts without cumbersome desktop software.",
        vi: "Người dùng di động thiếu công cụ thuận tiện để chuyển ảnh tĩnh và mô tả chữ thành video chuyển động sống động mà không cần phần mềm máy tính phức tạp.",
      },
      solution: {
        en: "Developed an Android interface powered by Android Media3 for seamless video playback, real-time generation queue tracking, credit management, and prompt engineering.",
        vi: "Xây dựng giao diện Android tối ưu với Android Media3 phát video mượt mà, theo dõi tiến trình hàng đợi xử lý video, quản lý lượt tạo và tinh chỉnh câu lệnh.",
      },
      architecture: {
        en: "Native Kotlin UI leverages ViewBinding and Media3 ExoPlayer. Requests are dispatched to a FastAPI REST service that orchestrates AI generation workers, reports progress asynchronously, and serves media back to mobile clients.",
        vi: "Giao diện Kotlin sử dụng ViewBinding và Media3 ExoPlayer. Yêu cầu được gửi đến dịch vụ REST FastAPI điều phối các worker AI xử lý bất đồng bộ và trả kết quả về điện thoại.",
      },
      challenges: {
        en: "Managing long-running asynchronous video generation tasks and rendering smooth video streams across varying mobile hardware capabilities.",
        vi: "Quản lý tiến trình xử lý video bất đồng bộ tốn thời gian và phát video mượt mà trên đa dạng thiết bị di động.",
      },
      limitations: {
        en: "Processing duration depends heavily on third-party generative AI model inference latency.",
        vi: "Thời gian tạo video phụ thuộc vào độ trễ xử lý của mô hình AI thế hệ mới từ nhà cung cấp.",
      },
      highlights: [
        {
          en: "Native Android UI built with Kotlin, ViewBinding, and Media3 video pipeline.",
          vi: "Giao diện Android native xây dựng bằng Kotlin, ViewBinding và bộ phát Media3.",
        },
        {
          en: "Asynchronous task orchestration via Python FastAPI backend.",
          vi: "Điều phối tác vụ xử lý bất đồng bộ thông qua backend FastAPI.",
        },
        {
          en: "Web management dashboard developed with React and Ant Design.",
          vi: "Bảng điều khiển quản trị web xây dựng với React và Ant Design.",
        },
      ],
      screenMockupType: "aivideo",
    },
    {
      id: "cinema-ticket-tmovie",
      title: "Cinema Ticket Movie App",
      tagline: {
        en: "Cross-platform mobile movie discovery and ticket booking app with sandbox payment integration.",
        vi: "Ứng dụng di động đặt vé xem phim và thanh toán trực tuyến tích hợp cổng PayPal Sandbox.",
      },
      period: "06/2025 – 08/2025",
      category: "mobile",
      role: {
        en: "Mobile Developer",
        vi: "Lập trình viên Di động",
      },
      featured: true,
      githubUrl: "https://github.com/hphuc193/cinema_ticket_tmovie",
      demoUrl: undefined,
      isComingSoon: false,
      image: "/images/projects/cinema-ticket.jpg",
      techStack: [
        "Flutter",
        "Firebase Auth",
        "Cloud Firestore",
        "Firebase Storage",
        "PayPal Sandbox",
        "Provider",
      ],
      summary: {
        en: "Modern cinema ticketing mobile application built with Flutter. Provides rich movie browsing, showtime schedules, interactive seat reservation, PayPal Sandbox payment verification, and automated digital barcode tickets.",
        vi: "Ứng dụng đặt vé xem phim hiện đại xây dựng bằng Flutter. Hỗ trợ xem danh mục phim, lịch chiếu, chọn ghế ngồi trực quan, thanh toán an toàn qua cổng PayPal Sandbox và xuất vé điện tử tích hợp mã vạch.",
      },
      problem: {
        en: "Cinema-goers seek streamlined, frictionless mobile ticket booking without complex physical queueing or sluggish web views.",
        vi: "Khán giả rạp chiếu phim cần trải nghiệm đặt vé nhanh chóng, tiện lợi trên di động mà không phải xếp hàng chờ đợi hay duyệt web nặng nề.",
      },
      solution: {
        en: "Delivered a fluid Flutter mobile client with Provider state management, Google sign-in via Firebase Authentication, real-time seat lockups on Cloud Firestore, and Sandbox transaction checkout.",
        vi: "Phát triển giao diện Flutter mượt mà với quản lý trạng thái Provider, đăng nhập Google qua Firebase Authentication, giữ chỗ thời gian thực trên Cloud Firestore và thanh toán giả lập qua PayPal Sandbox.",
      },
      architecture: {
        en: "Flutter client frontend using Provider for reactive seat selection and cart state. Firebase Authentication handles credential security, Cloud Firestore stores live theater schedules and reservations, and PayPal Sandbox SDK confirms transactions.",
        vi: "Ứng dụng Flutter quản lý trạng thái bằng Provider. Firebase Auth xác thực người dùng, Cloud Firestore lưu dữ liệu rạp chiếu và vé đặt, tích hợp PayPal Sandbox SDK xử lý thanh toán.",
      },
      challenges: {
        en: "Ensuring atomic seat reservation logic to prevent double-booking during concurrent ticket selection sessions.",
        vi: "Đảm bảo tính toàn vẹn khi chọn ghế ngồi nhằm tránh tình trạng đặt trùng ghế giữa nhiều người dùng đồng thời.",
      },
      limitations: {
        en: "Configured for PayPal Sandbox testing environment rather than live merchant processing.",
        vi: "Được cấu hình trong môi trường thử nghiệm PayPal Sandbox, chưa kết nối tài khoản thanh toán thương mại thật.",
      },
      highlights: [
        {
          en: "Intuitive interactive theater seat selection layout with real-time availability states.",
          vi: "Sơ đồ chọn ghế xem phim trực quan với trạng thái ghế trống/đã đặt cập nhật tức thì.",
        },
        {
          en: "Secure user authentication via Firebase Google Sign-In.",
          vi: "Xác thực tài khoản người dùng an toàn với Firebase Google Sign-In.",
        },
        {
          en: "End-to-end checkout flow tested with PayPal Sandbox payment gateway.",
          vi: "Quy trình thanh toán hoàn chỉnh được kiểm thử với cổng PayPal Sandbox.",
        },
      ],
      screenMockupType: "cinema",
    },
    {
      id: "homeservice-platform",
      title: "HomeService Platform",
      tagline: {
        en: "Full-stack on-demand residential service marketplace spanning iOS, web, and .NET backend.",
        vi: "Nền tảng dịch vụ tiện ích gia đình full-stack gồm app iOS SwiftUI, web React và backend .NET API.",
      },
      period: "2025",
      category: "fullstack",
      role: {
        en: "Full-stack Engineer",
        vi: "Kỹ sư Full-stack",
      },
      featured: false,
      githubUrl: undefined,
      demoUrl: undefined,
      isComingSoon: true,
      image: "/images/projects/homeservice.jpg",
      techStack: [
        "SwiftUI",
        "React",
        "Tailwind CSS",
        "shadcn/ui",
        ".NET API",
        "SQL Server",
        "Docker",
      ],
      summary: {
        en: "Integrated multi-platform residential maintenance system: a native iOS application built with SwiftUI, an administrative web portal with React and shadcn/ui, backed by an enterprise .NET REST API and SQL Server on Docker.",
        vi: "Hệ thống dịch vụ gia đình đa nền tảng: ứng dụng iOS native viết bằng SwiftUI, cổng quản trị web dùng React và shadcn/ui, vận hành trên nền tảng .NET REST API và SQL Server chạy container Docker.",
      },
      problem: {
        en: "Homeowners need reliable booking for appliance repairs, plumbing, and cleaning with verified technicians and clear scheduling.",
        vi: "Chủ nhà cần giải pháp tin cậy để đặt thợ sửa chữa thiết bị, điện nước và vệ sinh với lịch hẹn rõ ràng và quản lý minh bạch.",
      },
      solution: {
        en: "Engineered a native SwiftUI consumer app with fluid iOS navigation, paired with a web operations dashboard and an enterprise C# .NET core service.",
        vi: "Thiết kế app iOS mượt mà bằng SwiftUI dành cho khách hàng, kết hợp trang web quản lý lịch phân công thợ và backend dịch vụ C# .NET API.",
      },
      architecture: {
        en: "Clean architecture in ASP.NET Core with Entity Framework, containerized SQL Server, SwiftUI mobile frontend with Combine, and modern React dashboard with Tailwind CSS.",
        vi: "Kiến trúc Clean Architecture trên ASP.NET Core với Entity Framework, SQL Server trong Docker, ứng dụng iOS SwiftUI và dashboard quản trị web React.",
      },
      challenges: {
        en: "Designing consistent domain data models shared across mobile iOS clients, web administration, and C# backend contracts.",
        vi: "Đồng bộ hóa mô hình dữ liệu giữa ứng dụng iOS Swift, giao diện web React và các hợp đồng API trong C# .NET.",
      },
      limitations: {
        en: "Internal prototype architecture pending full production rollout.",
        vi: "Mô hình kiến trúc prototype nội bộ đang chuẩn bị cho các đợt kiểm thử nâng cao.",
      },
      highlights: [
        {
          en: "Native iOS interface crafted with modern SwiftUI components.",
          vi: "Giao diện iOS native thiết kế với các thành phần hiện đại của SwiftUI.",
        },
        {
          en: "High-performance .NET REST API architecture with SQL Server database.",
          vi: "Hệ thống .NET REST API hiệu năng cao kết hợp cơ sở dữ liệu SQL Server.",
        },
        {
          en: "Responsive operational web dashboard utilizing Tailwind CSS and shadcn/ui.",
          vi: "Bảng điều khiển web phản hồi nhanh sử dụng Tailwind CSS và shadcn/ui.",
        },
      ],
      screenMockupType: "homeservice",
    },
    {
      id: "xray-ai-prediction",
      title: "X-Ray AI Prediction",
      tagline: {
        en: "Academic computer vision research prototype for chest radiograph pulmonary anomaly analysis.",
        vi: "Dự án nghiên cứu thị giác máy tính phân tích bất thường ảnh X-quang phổi giao diện Streamlit.",
      },
      period: "2024 – 2025",
      category: "ai",
      role: {
        en: "AI Research & Prototyping",
        vi: "Nghiên cứu & Thử nghiệm AI",
      },
      featured: false,
      githubUrl: "https://github.com/hphuc193/XRayPrediction",
      demoUrl: undefined,
      isComingSoon: false,
      image: "/images/projects/xray-ai.jpg",
      techStack: [
        "Python",
        "Computer Vision",
        "Machine Learning",
        "Streamlit",
        "Image Processing",
      ],
      summary: {
        en: "Academic exploration in medical imaging and computer vision. Implements an interactive Streamlit application to inspect chest radiographs, preprocess scans, and demonstrate convolutional deep learning prototypes. Strictly an educational prototype, not for clinical diagnosis.",
        vi: "Dự án nghiên cứu học thuật trong lĩnh vực thị giác máy tính xử lý ảnh y tế. Xây dựng ứng dụng Streamlit tương tác để nạp ảnh X-quang lồng ngực, tiền xử lý và thử nghiệm mô hình học sâu. Đây là dự án học thuật/prototype, không phải công cụ chẩn đoán lâm sàng.",
      },
      problem: {
        en: "Understanding how convolutional feature extractors interpret thoracic radiographic patterns and visualizing classification regions.",
        vi: "Nghiên cứu cách mô hình học sâu trích xuất đặc trưng hình ảnh trên ảnh chụp X-quang lồng ngực và trực quan hóa các vùng nhận diện.",
      },
      solution: {
        en: "Built a Python-based interactive visualizer with Streamlit enabling researchers to upload anonymized radiographs, normalize contrast, and review prototype model predictions.",
        vi: "Xây dựng ứng dụng Python với Streamlit cho phép tải lên ảnh chụp X-quang, chuẩn hóa tương phản và hiển thị trực quan dự đoán thử nghiệm của mô hình.",
      },
      architecture: {
        en: "Python image processing pipeline paired with Streamlit interactive frontend. Handles DICOM/PNG ingestion, histogram equalization, tensor transformations, and model forward-pass rendering.",
        vi: "Quy trình xử lý ảnh bằng Python kết hợp giao diện Streamlit. Hỗ trợ chuẩn hóa ảnh, biến đổi ma trận điểm ảnh và đưa qua mô hình đánh giá kết quả.",
      },
      challenges: {
        en: "Standardizing heterogeneous radiological scan exposures and image resolutions for stable pipeline input.",
        vi: "Chuẩn hóa độ phân giải và độ tương phản không đồng nhất của ảnh chụp X-quang để đảm bảo đầu vào ổn định.",
      },
      limitations: {
        en: "Strictly an academic prototype for study purposes; not certified or intended for clinical diagnostics.",
        vi: "Dự án mang tính chất học thuật/nghiên cứu; không phải công cụ chẩn đoán y tế lâm sàng.",
      },
      highlights: [
        {
          en: "Interactive Streamlit web GUI for rapid visual experimentation.",
          vi: "Giao diện web trực quan Streamlit phục vụ thử nghiệm và demo thuật toán nhanh chóng.",
        },
        {
          en: "Preprocessing pipeline with contrast normalization and artifact reduction.",
          vi: "Quy trình tiền xử lý ảnh cân bằng độ tương phản và lọc nhiễu ảnh.",
        },
        {
          en: "Clear ethical positioning as an academic research tool.",
          vi: "Định vị minh bạch là dự án học thuật phục vụ học tập và nghiên cứu.",
        },
      ],
      screenMockupType: "xray",
    },
  ],

  moreRepos: [
    {
      name: "Project_Hottel",
      language: "Kotlin",
      url: "https://github.com/hphuc193/Project_Hottel",
      description: {
        en: "Hotel booking and management Android application built with Kotlin.",
        vi: "Ứng dụng Android đặt phòng và quản lý khách sạn xây dựng bằng Kotlin.",
      },
    },
    {
      name: "Hotelsys",
      language: "JavaScript",
      url: "https://github.com/hphuc193/Hotelsys",
      description: {
        en: "Web-based hotel reservation and administrative management system.",
        vi: "Hệ thống quản lý và đặt phòng khách sạn nền tảng web.",
      },
    },
    {
      name: "MobileFrontend",
      language: "Dart",
      url: "https://github.com/hphuc193/MobileFrontend",
      description: {
        en: "Cross-platform mobile UI component library and experimental patterns.",
        vi: "Thư viện giao diện và thành phần UI di động đa nền tảng.",
      },
    },
    {
      name: "StaticWeb",
      language: "HTML/CSS",
      url: "https://github.com/hphuc193/StaticWeb",
      description: {
        en: "Responsive web design templates and interactive web practices.",
        vi: "Mẫu giao diện web phản hồi nhanh và bài tập phát triển web.",
      },
    },
    {
      name: "loveweb",
      language: "JavaScript",
      url: "https://github.com/hphuc193/loveweb",
      description: {
        en: "Interactive creative web animations and canvas visual experiments.",
        vi: "Thử nghiệm hoạt ảnh web tương tác và đồ họa canvas sáng tạo.",
      },
    },
  ],

  experience: [
    {
      id: "ivs-smartfactory",
      role: {
        en: "Software Developer Intern",
        vi: "Thực tập sinh Phát triển Phần mềm",
      },
      company: {
        en: "IVS Joint Stock Company (SmartFactory Project)",
        vi: "Công ty Cổ phần IVS (Dự án SmartFactory)",
      },
      period: "10/2025 – 12/2025",
      location: {
        en: "Ho Chi Minh City, Vietnam",
        vi: "Thành phố Hồ Chí Minh, Việt Nam",
      },
      description: [
        {
          en: "Contributed to SmartFactory, an intelligent production management platform supporting manufacturing scheduling, inventory tracking, and real-time operational monitoring.",
          vi: "Tham gia phát triển SmartFactory, nền tảng quản lý sản xuất thông minh hỗ trợ lập kế hoạch sản xuất, theo dõi tồn kho và giám sát vận hành thời gian thực.",
        },
        {
          en: "Developed and maintained web application features for the SmartFactory platform using .NET Framework and C#, supporting responsive factory operations workflows.",
          vi: "Tham gia phát triển phiên bản Web cho hệ thống SmartFactory với .NET Framework và C#, xây dựng và bảo trì các tính năng quản lý quy trình vận hành nhà máy.",
        },
        {
          en: "Collaborated with engineering team to implement business logic, optimize module performance, and support integration with production planning systems.",
          vi: "Phối hợp với nhóm phát triển để triển khai business logic, tối ưu chức năng và hỗ trợ tích hợp với các module quản lý sản xuất.",
        },
      ],
      skills: [".NET Framework", "C#", "Web Development", "Web Application", "Factory Management"],
      type: "internship",
    },
    {
      id: "vpbank-hackathon-2025",
      role: {
        en: "Hackathon Participant",
        vi: "Thí sinh tham gia",
      },
      company: {
        en: "VPBank Technology Hackathon 2025 (VPBank & AWS Vietnam)",
        vi: "VPBank Technology Hackathon 2025 (VPBank & AWS Vietnam)",
      },
      period: "08/2025",
      location: {
        en: "Vietnam",
        vi: "Việt Nam",
      },
      description: [
        {
          en: "Participated in the competitive technology hackathon organized by VPBank in collaboration with AWS Vietnam.",
          vi: "Tham gia cuộc thi công nghệ chuyên sâu do VPBank phối hợp cùng AWS Vietnam tổ chức.",
        },
        {
          en: "Explored cloud architectures, scalable fintech service integrations, and rapid prototyping under timed constraints.",
          vi: "Thử nghiệm kiến trúc đám mây, tích hợp dịch vụ tài chính quy mô lớn và xây dựng sản phẩm mẫu thần tốc.",
        },
      ],
      skills: ["Cloud Architecture", "AWS", "Rapid Prototyping", "Fintech Innovations"],
      type: "hackathon",
    },
    {
      id: "unj-fellowship-2025",
      role: {
        en: "Global Citizen Fellow (Exchange Program)",
        vi: "Học viên Trao đổi Quốc tế",
      },
      company: {
        en: "Universitas Negeri Jakarta (UNJ) · Indosat · Nolimit Indonesia",
        vi: "Universitas Negeri Jakarta (UNJ) · Indosat · Nolimit Indonesia",
      },
      period: "09/06/2025 – 21/06/2025",
      location: {
        en: "Jakarta, Indonesia",
        vi: "Jakarta, Indonesia",
      },
      description: [
        {
          en: "Completed the 2-week 'Industrial Immersion Camp – Global Citizen Fellowship' organized by UNJ, Indosat, and Nolimit Indonesia.",
          vi: "Hoàn thành chương trình 2 tuần 'Industrial Immersion Camp – Global Citizen Fellowship' do UNJ, Indosat và Nolimit Indonesia tổ chức.",
        },
        {
          en: "Awarded official certification of completion (June 2025) for international tech innovation collaboration and cultural exchange.",
          vi: "Nhận chứng chỉ hoàn thành chính thức (06/2025) về đổi mới công nghệ quốc tế và trao đổi văn hóa sinh viên.",
        },
      ],
      skills: ["Cross-cultural Collaboration", "Industry Immersion", "Telecommunications", "Global Tech"],
      type: "fellowship",
    },
    {
      id: "umt-software-engineering",
      role: {
        en: "Undergraduate Software Engineering Student",
        vi: "Sinh viên Kỹ thuật Phần mềm",
      },
      company: {
        en: "University of Management and Technology (UMT)",
        vi: "Trường Đại học Quản lý và Công nghệ TP.HCM (UMT)",
      },
      period: "10/2022 – 07/2026",
      location: {
        en: "Ho Chi Minh City, Vietnam",
        vi: "Thành phố Hồ Chí Minh, Việt Nam",
      },
      description: [
        {
          en: "Pursuing Bachelor of Science in Information Technology, majoring in Software Engineering.",
          vi: "Theo học Cử nhân Công nghệ Thông tin, chuyên ngành Kỹ thuật Phần mềm.",
        },
        {
          en: "Recipient of the prestigious 'Maker' Scholarship valued at 175,000,000 VND.",
          vi: "Đạt học bổng 'Maker' danh giá trị giá 175 triệu VNĐ.",
        },
      ],
      skills: ["Software Engineering", "Algorithms", "Mobile Development", "Distributed Systems"],
      type: "education",
    },
  ],

  education: [
    {
      id: "umt-degree",
      school: {
        en: "University of Management and Technology (UMT)",
        vi: "Trường Đại học Quản lý và Công nghệ TP.HCM (UMT)",
      },
      degree: {
        en: "Bachelor of Information Technology - Software Engineering",
        vi: "Cử nhân Công nghệ Thông tin - Kỹ thuật Phần mềm",
      },
      period: "10/2022 – 07/2026",
      location: {
        en: "Ho Chi Minh City, Vietnam",
        vi: "Thành phố Hồ Chí Minh, Việt Nam",
      },
      gpa: "3.23 / 4.0",
      honor: {
        en: "GPA: 3.23 / 4.0 · 'Maker' Scholarship (175,000,000 VND)",
        vi: "GPA: 3.23 / 4.0 · Học bổng 'Maker' trị giá 175 triệu VNĐ",
      },
      badge: {
        en: "GPA: 3.23 / 4.0 · Maker Scholar",
        vi: "GPA: 3.23 / 4.0 · Học bổng Maker",
      },
      details: [
        {
          en: "Academic Standing: GPA 3.23 / 4.0 (Good Standing). Specialized curriculum in software engineering, mobile systems, database architecture, and artificial intelligence.",
          vi: "Điểm tích lũy GPA: 3.23 / 4.0 (Xếp loại Khá - Tốt). Chương trình đào tạo chuyên sâu về kỹ thuật phần mềm, hệ thống di động, kiến trúc dữ liệu và trí tuệ nhân tạo.",
        },
      ],
      confirmGraduation: true,
    },
    {
      id: "unj-fellowship",
      school: {
        en: "Universitas Negeri Jakarta (UNJ), Indonesia",
        vi: "Universitas Negeri Jakarta (UNJ), Indonesia",
      },
      degree: {
        en: "Industrial Immersion Camp – Global Citizen Fellowship",
        vi: "Chương trình Trao đổi & Học bổng Global Citizen",
      },
      period: "09/06/2025 – 21/06/2025",
      location: {
        en: "Jakarta, Indonesia",
        vi: "Jakarta, Indonesia",
      },
      honor: {
        en: "Certificate of Completion (06/2025)",
        vi: "Chứng chỉ hoàn thành chính thức (06/2025)",
      },
      details: [
        {
          en: "Joint international technology fellowship co-hosted by UNJ, Indosat telecommunications, and Nolimit Indonesia.",
          vi: "Chương trình đào tạo và giao lưu công nghệ quốc tế do UNJ, tập đoàn viễn thông Indosat và Nolimit Indonesia đồng tổ chức.",
        },
      ],
    },
    {
      id: "vpbank-hackathon",
      school: {
        en: "VPBank & AWS Vietnam",
        vi: "VPBank & AWS Vietnam",
      },
      degree: {
        en: "VPBank Technology Hackathon 2025",
        vi: "Cuộc thi VPBank Technology Hackathon 2025",
      },
      period: "08/2025",
      location: {
        en: "Vietnam",
        vi: "Việt Nam",
      },
      honor: {
        en: "Official Participant",
        vi: "Thí sinh tham dự chính thức",
      },
      details: [
        {
          en: "Intensive innovation competition solving enterprise challenges on AWS cloud infrastructure.",
          vi: "Thử thách lập trình giải quyết bài toán thực tế trên hạ tầng đám mây AWS.",
        },
      ],
    },
    {
      id: "english-proficiency",
      school: {
        en: "VSTEP - Vietnamese Standardized Test of English Proficiency",
        vi: "Kỳ thi Đánh giá Năng lực Ngoại ngữ VSTEP",
      },
      degree: {
        en: "English Level B1 · VSTEP Certificate 5.5",
        vi: "Tiếng Anh B1 · Chứng chỉ VSTEP 5.5",
      },
      period: "Certified",
      location: {
        en: "CEFR B1 Benchmark (Level 3/6)",
        vi: "Khung CEFR B1 (Bậc 3/6)",
      },
      gpa: "5.5 / 10",
      honor: {
        en: "VSTEP Score: 5.5 / 10 · CEFR Level B1",
        vi: "Điểm VSTEP: 5.5 / 10 · Đạt chuẩn B1 CEFR",
      },
      badge: {
        en: "Level B1 · VSTEP 5.5 Certified",
        vi: "Trình độ B1 · Chứng chỉ VSTEP 5.5",
      },
      details: [
        {
          en: "Official VSTEP Level B1 (Score 5.5/10). Solid technical comprehension of engineering documentation, software specifications, RFCs, and collaborative international teamwork.",
          vi: "Chứng chỉ VSTEP 5.5 (Tương đương B1 CEFR Bậc 3/6). Năng lực đọc hiểu chuyên sâu tài liệu kỹ thuật, kiến trúc phần mềm, RFC và giao tiếp làm việc trong môi trường công nghệ quốc tế.",
        },
      ],
    },
  ],

  skills: [
    {
      id: "mobile",
      title: {
        en: "Mobile Engineering",
        vi: "Kỹ thuật Ứng dụng Di động",
      },
      skills: [
        "Flutter",
        "Dart",
        "Kotlin",
        "Android SDK",
        "XML Layouts",
        "ViewBinding",
        "Media3 (ExoPlayer)",
        "Swift",
        "SwiftUI",
        "Firebase",
        "Realm",
        "Provider",
      ],
    },
    {
      id: "frontend",
      title: {
        en: "Frontend Web",
        vi: "Giao diện Web",
      },
      skills: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "shadcn/ui",
        "Ant Design",
      ],
    },
    {
      id: "backend",
      title: {
        en: "Backend & Systems",
        vi: "Backend & Hệ thống API",
      },
      skills: [
        "Node.js",
        "Express",
        "FastAPI",
        "C# / .NET",
        "ASP.NET Core",
        ".NET API",
        "RESTful API",
        "GraphQL",
        "WebSocket",
      ],
    },
    {
      id: "database",
      title: {
        en: "Databases & Storage",
        vi: "Cơ sở Dữ liệu & Lưu trữ",
      },
      skills: [
        "PostgreSQL",
        "PostGIS",
        "MongoDB",
        "MySQL",
        "SQL Server",
        "Cloud Firestore",
      ],
    },
    {
      id: "ai",
      title: {
        en: "AI & Data Science",
        vi: "AI & Khoa học Dữ liệu",
      },
      skills: [
        "Python",
        "PyTorch",
        "TensorFlow",
        "scikit-learn",
        "Machine Learning",
        "Computer Vision",
        "AI API Integration",
      ],
    },
    {
      id: "tools",
      title: {
        en: "Tools & Ecosystem",
        vi: "Công cụ & Môi trường",
      },
      skills: [
        "Git",
        "GitHub",
        "Docker",
        "Android Studio",
        "Xcode",
        "VS Code",
        "Visual Studio",
        "Claude Code",
        "Codex",
        "Antigravity",
      ],
    },
    {
      id: "softskills",
      title: {
        en: "Professional & Soft Skills",
        vi: "Kỹ năng Mềm & Quy trình",
      },
      skills: [
        "Teamwork & Agile/Scrum",
        "Manual & Unit Testing",
        "Technical Documentation",
        "CapCut Template Creator (Video Editing)",
      ],
    },
    {
      id: "languages",
      title: {
        en: "Languages",
        vi: "Ngôn ngữ Giao tiếp",
      },
      skills: [
        "Vietnamese (Native)",
        "English (B1 Intermediate)",
      ],
    },
  ],

  capabilities: [
    {
      id: "cap-mobile",
      index: "01",
      title: {
        en: "Mobile App Development",
        vi: "Phát triển Ứng dụng Di động",
      },
      description: {
        en: "Building fluid, high-performance mobile applications across Flutter, native Android (Kotlin), and iOS (SwiftUI) with robust architecture, smooth animations, and clean state management.",
        vi: "Phát triển ứng dụng di động hiệu năng cao trên Flutter, Android native (Kotlin) và iOS (SwiftUI) với cấu trúc vững chắc, hoạt ảnh mượt mà và quản lý trạng thái chuẩn xác.",
      },
      tags: ["Flutter", "Kotlin", "SwiftUI", "Provider", "Media3"],
    },
    {
      id: "cap-backend",
      index: "02",
      title: {
        en: "Backend & API Architectures",
        vi: "Kiến trúc Backend & API",
      },
      description: {
        en: "Designing reliable REST and WebSocket services using Node.js, FastAPI, and .NET. Structuring relational and spatial databases (PostgreSQL, PostGIS, SQL Server) for real-time responsiveness.",
        vi: "Thiết kế hệ thống API REST và WebSocket tin cậy với Node.js, FastAPI và .NET. Tổ chức cơ sở dữ liệu quan hệ và không gian (PostgreSQL, PostGIS, SQL Server) đáp ứng thời gian thực.",
      },
      tags: ["Node.js", "FastAPI", ".NET API", "PostgreSQL", "WebSocket"],
    },
    {
      id: "cap-ai",
      index: "03",
      title: {
        en: "AI & Computer Vision Integration",
        vi: "Tích hợp AI & Thị giác Máy tính",
      },
      description: {
        en: "Connecting machine learning models into real-world software workflows: environmental risk forecasting, computer vision image screening, and generative media synthesis pipelines.",
        vi: "Đưa các mô hình học máy vào quy trình phần mềm thực tế: dự báo nguy cơ thiên tai, phân tích ảnh thị giác máy tính và quy trình sinh video AI tự động.",
      },
      tags: ["Python", "Machine Learning", "Computer Vision", "AI APIs"],
    },
    {
      id: "cap-ui",
      index: "04",
      title: {
        en: "Fluid UI/UX Implementation",
        vi: "Hiện thực Hóa Giao diện UI/UX",
      },
      description: {
        en: "Translating sophisticated design concepts into tactile digital products with micro-interactions, responsive spatial layouts, and accessible component systems.",
        vi: "Biến bản thiết kế thành sản phẩm số sống động với vi tương tác tinh tế, bố cục không gian phản hồi nhanh và hệ thống thành phần chuẩn khả năng tiếp cận.",
      },
      tags: ["React", "Tailwind CSS", "shadcn/ui", "Micro-interactions"],
    },
    {
      id: "cap-fullstack",
      index: "05",
      title: {
        en: "Full-Stack System Engineering",
        vi: "Kỹ thuật Hệ thống Full-Stack",
      },
      description: {
        en: "Bridging client interfaces, server logic, database persistence, and cloud containerization (Docker) to deliver cohesive, end-to-end software solutions.",
        vi: "Kết nối liền mạch giữa giao diện người dùng, logic máy chủ, cơ sở dữ liệu và container Docker để tạo ra sản phẩm phần mềm trọn vẹn từ đầu đến cuối.",
      },
      tags: ["Docker", "Git", "REST APIs", "Clean Architecture"],
    },
  ],
  certificates: [
    {
      id: 1,
      code: "HP-CERT-01",
      title: "CERTIFICATE OF PARTICIPATION IN THE VPBANK TECHNOLOGY HACKATHON 2025",
      category: "hackathon",
      categoryLabel: {
        en: "Fintech & Cloud Hackathon",
        vi: "Cuộc Thi Hackathon Công Nghệ",
      },
      recipientName: "Lê Công Hoàng Phúc",
      teamName: "VeraGuard",
      issuingOrganization: ["VPBank", "AWS Vietnam"],
      issueDate: "2025-08-02",
      description: {
        en: "Certificate of Participation in the VPBank Technology Hackathon 2025 (Chinh phục công nghệ, kiến tạo tương lai cùng VPBank - Learn, Ideate, Develop, Compete).",
        vi: "Chứng nhận tham gia cuộc thi VPBank Technology Hackathon 2025 (Chinh phục công nghệ, kiến tạo tương lai cùng VPBank - Learn, Ideate, Develop, Compete).",
      },
      signatories: [
        {
          name: "Wong Kok Seng Augustine",
          title: "Chief Information Officer, VPBank",
        },
        {
          name: "Tran Thi Diep Anh",
          title: "Chief Human Resources Officer, VPBank",
        },
        {
          name: "Eric Yeo",
          title: "Country Manager, AWS Vietnam",
        },
      ],
      image: "/images/certificates/cert-1-vpbank-hackathon.png",
      featured: true,
      dimensions: {
        width: 2000,
        height: 1414,
        aspectRatio: 2000 / 1414,
        orientation: "landscape",
      },
    },
    {
      id: 2,
      code: "HP-CERT-02",
      title: "GIẤY CHỨNG NHẬN / CERTIFICATE OF VOLUNTEER",
      category: "academic",
      categoryLabel: {
        en: "ICPC & Olympiad Volunteer",
        vi: "Tình Nguyện Viên Olympic & ICPC",
      },
      recipientName: "Lê Công Hoàng Phúc",
      studentCohort: "2022 - 2026",
      major: "Công nghệ thông tin / Information Technology",
      issuingOrganization: [
        "Trường Đại học Quản lý và Công nghệ Thành phố Hồ Chí Minh (UMT)",
      ],
      issueDate: "2025-07-14",
      description: {
        en: "Contributed to the successful organization of the UMT IT Student Olympiad and ICPC UMT 2025.",
        vi: "Đã góp phần tổ chức thành công Kỳ thi Olympic Tin học Sinh viên và ICPC UMT năm 2025.",
      },
      signatories: [
        {
          name: "PGS. TS. Trần Đan Thư",
          title: "Trưởng Khoa Công nghệ",
        },
        {
          name: "Huỳnh Thúy Phương",
          title: "KT. Hiệu trưởng - Phó Hiệu trưởng",
        },
      ],
      image: "/images/certificates/cert-2-icpc-volunteer.png",
      featured: true,
      dimensions: {
        width: 1435,
        height: 1001,
        aspectRatio: 1435 / 1001,
        orientation: "landscape",
      },
    },
    {
      id: 3,
      code: "HP-CERT-03",
      title: "CERTIFICATE OF COMPLETION - THE INDUSTRIAL IMMERSION CAMP: GLOBAL CITIZEN FELLOWSHIP",
      category: "fellowship",
      categoryLabel: {
        en: "International Fellowship",
        vi: "Học Bổng Trao Đổi Quốc Tế",
      },
      recipientName: "LÊ CÔNG HOÀNG PHÚC",
      issuingOrganization: [
        "Universitas Negeri Jakarta",
        "University of Management and Technology Ho Chi Minh City",
        "Radio Republik Indonesia",
        "Department of Tourism and Creative Economy of East Jakarta",
        "Indosat",
        "NoLimit",
      ],
      issueDate: "2025-06-20",
      programDuration: "2025-06-09 to 2025-06-21",
      description: {
        en: "Successfully completed THE INDUSTRIAL IMMERSION CAMP: GLOBAL CITIZEN FELLOWSHIP in Jakarta, Indonesia.",
        vi: "Hoàn thành xuất sắc khóa huấn luyện THE INDUSTRIAL IMMERSION CAMP: GLOBAL CITIZEN FELLOWSHIP tại Jakarta, Indonesia.",
      },
      signatories: [
        {
          name: "Andy Hadiyanto",
          title: "Vice Rector for Cooperation and Business Affairs, Universitas Negeri Jakarta",
        },
        {
          name: "Huỳnh Thúy Phương",
          title: "Vice President, University of Management and Technology Ho Chi Minh City",
        },
        {
          name: "Ignatius Hendrasmo",
          title: "President Director, Radio Republik Indonesia",
        },
        {
          name: "Mona L Binilang",
          title: "VP Head of Talent Acquisition & E-Brand, Indosat",
        },
        {
          name: "Aqsath Rasyid Naradhipa",
          title: "Chief Executive Officer, NoLimit Indonesia",
        },
      ],
      image: "/images/certificates/cert-3-global-citizen-fellowship.png",
      featured: true,
      dimensions: {
        width: 1400,
        height: 973,
        aspectRatio: 1400 / 973,
        orientation: "landscape",
      },
    },
    {
      id: 4,
      code: "HP-CERT-04",
      title: "CERTIFICATE OF APPRECIATION - BEST PRESENTATION",
      category: "academic",
      categoryLabel: {
        en: "Best Presentation Honor",
        vi: "Giải Thuyết Trình Xuất Sắc",
      },
      certificateNumber: "1497/UN39.5.FISH/KM.05.03/2025",
      recipientName: "Le Cong Hoang Phuc",
      coRecipients: [
        "Phan Nguyen Duy Kha",
        "Cao Sy Sieu",
        "Phan Phuong Phi",
        "Le Dang Quang",
        "Huynh Lam Vu Dinh",
      ],
      issuingOrganization: [
        "Universitas Negeri Jakarta",
        "University of Management and Technology Ho Chi Minh City",
      ],
      issueDate: "2025-06",
      description: {
        en: "For giving the Best Presentation at the International Academic-Industrial Immersion Program.",
        vi: "Khen thưởng cho bài thuyết trình xuất sắc nhất tại International Academic-Industrial Immersion Program.",
      },
      signatories: [
        {
          name: "FIRDAUS WAJDI, M.A., Ph.D",
          title: "Dean of Faculty of Social Sciences and Law, Universitas Negeri Jakarta",
        },
      ],
      image: "/images/certificates/cert-4-best-presentation-unj.png",
      featured: true,
      dimensions: {
        width: 1277,
        height: 877,
        aspectRatio: 1277 / 877,
        orientation: "landscape",
      },
    },
    {
      id: 5,
      code: "HP-CERT-05",
      title: "GIẤY CHỨNG NHẬN / CERTIFICATE OF ACHIEVEMENT",
      category: "achievement",
      categoryLabel: {
        en: "Business & Innovation",
        vi: "Kinh Doanh & Đổi Mới Sáng Tạo",
      },
      certificateNumber: "32/2025/GCN-KKD",
      recipientName: "Lê Công Hoàng Phúc",
      studentId: "2201700083",
      issuingOrganization: [
        "Khoa Kinh doanh - Trường Đại học Quản lý và Công nghệ Thành phố Hồ Chí Minh (UMT Business School)",
      ],
      issueDate: "2025-05-27",
      description: {
        en: "iCREAL Member - Actively engaged and showed promise at UMT Business School 2024–2025.",
        vi: "Thành viên iCREAL | iCREAL Member - Tích cực tham gia và thể hiện tiềm năng tại UMT Khoa Kinh doanh, 2024–2025.",
      },
      signatories: [
        {
          name: "Lê Thị Ngọc Tú, PhD.",
          title: "TRƯỞNG KHOA / DEAN - BUSINESS SCHOOL",
        },
      ],
      image: "/images/certificates/cert-5-icreal-member.png",
      featured: true,
      dimensions: {
        width: 1066,
        height: 1532,
        aspectRatio: 1066 / 1532,
        orientation: "portrait",
      },
    },
    {
      id: 6,
      code: "HP-CERT-06",
      title: "1 Year on Kaggle Badge Certificate",
      category: "badge",
      categoryLabel: {
        en: "Data Science Milestone",
        vi: "Cột Mốc Khoa Học Dữ Liệu",
      },
      recipientName: "Phúc Hoàng",
      issuingOrganization: ["Kaggle"],
      issueDate: "2026-10-09",
      description: {
        en: "Has successfully earned the milestone achievement badge: 1 Year on Kaggle.",
        vi: "Đạt huy hiệu cột mốc chính thức: 1 Năm hoạt động và cống hiến trên nền tảng Kaggle.",
      },
      signatories: [
        {
          name: "Kaggle Platform Governance",
          title: "Global Machine Learning Community",
        },
      ],
      image: "/images/certificates/cert-6-kaggle-1year.png",
      featured: true,
      dimensions: {
        width: 4800,
        height: 2960,
        aspectRatio: 4800 / 2960,
        orientation: "landscape",
      },
    },
    {
      id: 7,
      code: "HP-CERT-07",
      title: "Kaggle Community Member Badge Certificate",
      category: "badge",
      categoryLabel: {
        en: "Kaggle Contributor",
        vi: "Thành Viên Cộng Đồng Kaggle",
      },
      recipientName: "Phúc Hoàng",
      issuingOrganization: ["Kaggle"],
      issueDate: "2025-03-18",
      description: {
        en: "Has successfully earned the verified badge: Kaggle Community Member.",
        vi: "Đạt huy hiệu chứng nhận: Thành viên Cộng đồng học máy và khoa học dữ liệu Kaggle.",
      },
      signatories: [
        {
          name: "Kaggle Community Operations",
          title: "Developer Relations & Datasets",
        },
      ],
      image: "/images/certificates/cert-7-kaggle-community.png",
      featured: true,
      dimensions: {
        width: 4800,
        height: 2960,
        aspectRatio: 4800 / 2960,
        orientation: "landscape",
      },
    },
  ],
};
