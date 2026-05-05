"use client";
import { useState, useEffect } from "react";
import { Stars } from "@/components/canvas/stars/render.component";
import { NavBar } from "@/components/navbar.component";
import { styles } from "./styles";

// ========== PRODUCT DATA WITH IMAGES ==========
const products = [
  // STEAM ACCOUNTS WITH IMAGES
  { id: 1, title: "Steam Account - GTA V", category: "Steam Account", price: 1.99, originalPrice: 59.99, description: "Grand Theft Auto V - Online & Offline. FiveM Ready.", type: "account", games: ["GTA V", "GTA Online"], level: 25, steamGuard: "Enabled", image: "/images/products/gtav.jpg" },
  { id: 2, title: "Steam Account - FIFA 25", category: "Steam Account", price: 1.99, originalPrice: 69.99, description: "FIFA 25 Ultimate Team, Career Mode, Online Access", type: "account", games: ["FIFA 25"], level: 18, steamGuard: "Enabled", image: "/images/products/fifa.jpg" },
  { id: 3, title: "Steam Account - SpiderMan", category: "Steam Account", price: 1.99, originalPrice: 59.99, description: "Marvel's Spider-Man Remastered + Miles Morales", type: "account", games: ["Spider-Man Remastered", "Miles Morales"], level: 12, steamGuard: "Enabled", image: "/images/products/spider.jpg" },
  { id: 4, title: "Steam Account - RDR2", category: "Steam Account", price: 1.99, originalPrice: 69.99, description: "Red Dead Redemption 2 - Story + Online", type: "account", games: ["RDR2", "RDR Online"], level: 20, steamGuard: "Enabled", image: "/images/products/rdr2.jpg" },
  { id: 5, title: "Steam Account - God Of War", category: "Steam Account", price: 1.99, originalPrice: 59.99, description: "God of War (2018) + Ragnarok", type: "account", games: ["God of War", "Ragnarok"], level: 15, steamGuard: "Enabled", image: "/images/products/godofwar.jpg" },
  { id: 6, title: "Steam Account - Horizon", category: "Steam Account", price: 1.99, originalPrice: 59.99, description: "Horizon Zero Dawn + Forbidden West", type: "account", games: ["Horizon Zero Dawn", "Forbidden West"], level: 14, steamGuard: "Enabled", image: "/images/products/horizon.jpg" },
  { id: 7, title: "Steam Account - The Forest", category: "Steam Account", price: 1.49, originalPrice: 19.99, description: "The Forest + Sons of The Forest", type: "account", games: ["The Forest", "Sons of The Forest"], level: 10, steamGuard: "Enabled", image: "/images/products/theforest.jpg" },
  { id: 8, title: "Steam Account - Witcher 3", category: "Steam Account", price: 1.99, originalPrice: 39.99, description: "The Witcher 3: Wild Hunt Complete Edition", type: "account", games: ["Witcher 3", "Hearts of Stone"], level: 22, steamGuard: "Enabled", image: "/images/products/witcher.jpg" },
  { id: 9, title: "Steam Account - Football 26", category: "Steam Account", price: 1.99, originalPrice: 59.99, description: "Football 26 - Ultimate Team, Career Mode", type: "account", games: ["Football 26"], level: 16, steamGuard: "Enabled", image: "/images/products/pesfodball.jpg" },
  { id: 10, title: "Steam Account - Forza 5", category: "Steam Account", price: 1.99, originalPrice: 59.99, description: "Forza Horizon 5 - Premium Edition", type: "account", games: ["Forza Horizon 5"], level: 30, steamGuard: "Enabled", image: "/images/products/forza5.jpg" },
  { id: 11, title: "Steam Account - Black Myth Wukong", category: "Steam Account", price: 2.99, originalPrice: 59.99, description: "Black Myth: Wukong - Full Game", type: "account", games: ["Black Myth Wukong"], level: 8, steamGuard: "Enabled", image: "/images/products/blackwukong.jpg" },
  { id: 12, title: "Steam Account - Naruto", category: "Steam Account", price: 1.49, originalPrice: 49.99, description: "Naruto Ultimate Ninja Storm Series", type: "account", games: ["Naruto Storm 1-4"], level: 35, steamGuard: "Enabled", image: "/images/products/naruto.jpg" },
  { id: 13, title: "Steam Account - ARK", category: "Steam Account", price: 1.99, originalPrice: 49.99, description: "ARK Survival Evolved + All DLCs", type: "account", games: ["ARK SE", "ARK Ascended"], level: 50, steamGuard: "Enabled", image: "/images/products/ark.jpg" },
  { id: 14, title: "Steam Account - Sekiro", category: "Steam Account", price: 1.99, originalPrice: 59.99, description: "Sekiro: Shadows Die Twice - GOTY", type: "account", games: ["Sekiro"], level: 12, steamGuard: "Enabled", image: "/images/products/sekiro.jpg" },
  { id: 15, title: "Steam Account - 500+ Games Bundle", category: "Steam Account", price: 9.99, originalPrice: 499.99, description: "Mega Bundle - 500+ Premium Steam Games! Includes GTA V, FIFA, RDR2, God of War, Witcher 3, Forza 5, ARK, Sekiro, Black Myth, Naruto, Football 26 & More!", type: "account", games: ["500+ Games Total", "All AAA Titles"], level: 99, steamGuard: "Enabled", image: "/images/products/500+.jpg" },
  
  // ========== ZIP FILES ==========
  { id: 16, title: "ATR SAMPLE PACK", category: "ZIP File", price: 1.99, originalPrice: 19.99, description: "1000+ Items - Professional Sound Effects", type: "zip", fileSize: "2.5 GB", image: "/images/products/atrsample.jpg" },
  { id: 17, title: "ATR STUP SUPER", category: "ZIP File", price: 2.99, originalPrice: 29.99, description: "Premium Studio Stup Super Pack", type: "zip", fileSize: "3.2 GB", image: "/images/products/atrstup.jpg" },
  { id: 18, title: "HSO Sample Recording", category: "ZIP File", price: 1.49, originalPrice: 14.99, description: "HSO Studio Quality Sample Recordings", type: "zip", fileSize: "1.8 GB", image: "/images/products/hso_sample.jpg" },
  { id: 19, title: "Roblox Menu", category: "ZIP File", price: 0.99, originalPrice: 4.99, description: "Roblox Custom Menu UI - Scripts", type: "zip", fileSize: "50 MB", image: "/images/products/robloxmenu.jpg" },
  { id: 20, title: "AntiCheat Roblox Server", category: "ZIP File", price: 4.99, originalPrice: 19.99, description: "Advanced Anticheat for Roblox", type: "zip", fileSize: "15 MB", image: "/images/products/anticheat.jpg" },
  { id: 21, title: "FiveM Cheat Ambani", category: "ZIP File", price: 5.99, originalPrice: 29.99, description: "Premium FiveM Cheat Menu - Aimbot, ESP", type: "zip", fileSize: "120 MB", image: "/images/products/ambanicheat.jpg" }
];

// 3D Text Component - Single Blue Color for ZIP
const RotatingText3D = ({ text1, text2, text3, isZip = false }: { text1: string; text2: string; text3?: string; isZip?: boolean }) => {
  if (isZip) {
    return (
      <span style={{ display: "inline-block" }}>
        <span
          style={{
            display: "inline-block",
            animation: "rotate3dHalf 2.5s ease-in-out",
            color: "#00BFFF",
            textShadow: "0 0 10px #00BFFF, 0 0 20px #00BFFF",
          }}
        >
          {text2}
        </span>
      </span>
    );
  }
  
  return (
    <span style={{ display: "inline-block" }}>
      <span
        style={{
          display: "inline-block",
          animation: "rotate3dHalf 2.5s ease-in-out",
          color: "#00BFFF",
          textShadow: "0 0 10px #00BFFF, 0 0 20px #00BFFF",
        }}
      >
        {text1}{" "}
      </span>
      <span
        style={{
          display: "inline-block",
          animation: "rotate3dHalf 2.5s ease-in-out 0.3s",
          color: "#FF69B4",
          textShadow: "0 0 10px #FF69B4, 0 0 20px #FF69B4",
        }}
      >
        {text2}
      </span>
      {text3 && (
        <span
          style={{
            display: "inline-block",
            animation: "rotate3dHalf 2.5s ease-in-out 0.6s",
            color: "#FF69B4",
            textShadow: "0 0 10px #FF69B4, 0 0 20px #FF69B4",
          }}
        >
          {" "}{text3}
        </span>
      )}
    </span>
  );
};

// 3D Title Component for "LMT STORE"
const AnimatedTitle3D = ({ text1, text2 }: { text1: string; text2: string }) => {
  return (
    <div style={{ display: "inline-block", transformStyle: "preserve-3d" }}>
      <span
        style={{
          display: "inline-block",
          animation: "rotate3dFull 3s ease-in-out infinite",
          color: "#00BFFF",
          textShadow: "0 0 15px #00BFFF, 0 0 30px #00BFFF",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        {text1}{" "}
      </span>
      <span
        style={{
          display: "inline-block",
          animation: "rotate3dFull 3s ease-in-out 0.5s infinite",
          color: "#FF69B4",
          textShadow: "0 0 15px #FF69B4, 0 0 30px #FF69B4",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        {text2}
      </span>
    </div>
  );
};

// Flashing Color Effect for About Page
const FlashingText = ({ children }: { children: string }) => {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['#00BFFF', '#FF69B4', '#FFD700', '#00FF7F', '#FF4500', '#9400D3', '#00CED1'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 300);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <span style={{ 
      color: colors[colorIndex],
      textShadow: `0 0 20px ${colors[colorIndex]}`,
      transition: "color 0.3s ease",
      animation: "pulse 0.8s ease-in-out infinite alternate"
    }}>
      {children}
    </span>
  );
};

function AnimatedGradientText({ children }: { children: string }) {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#8800ff', '#ff00ff'];
  useEffect(() => {
    const interval = setInterval(() => setColorIndex((prev) => (prev + 1) % colors.length), 500);
    return () => clearInterval(interval);
  }, []);
  return <span style={{ color: colors[colorIndex] }}>{children}</span>;
}

// 3D Rotating Card Component
const RotatingCard3D = ({ children }: { children: React.ReactNode }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);
  const [targetRotate, setTargetRotate] = useState(0);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setTargetRotate(prev => {
          let newValue = prev + (direction * 1.5);
          
          if (newValue >= 30) {
            setDirection(-1);
            return 30;
          } else if (newValue <= -30) {
            setDirection(1);
            return -30;
          }
          return newValue;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isHovered, direction]);

  useEffect(() => {
    if (!isHovered) {
      setRotateY(targetRotate);
    }
  }, [targetRotate, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateY((x - centerX) / 20);
    setRotateX((centerY - y) / 20);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "transform 0.2s ease-out" : "transform 0.6s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
};

export default function HomePage() {
  const [filter, setFilter] = useState<"all" | "account" | "zip">("all");
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState<"home" | "about" | "store" | "work" | "contact">("home");

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === "all" || (filter === "account" ? p.type === "account" : p.type === "zip");
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleBuy = (p: any) => {
    window.open("https://t.me/Shuwangcoder", "_blank");
  };

  // ABOUT PAGE with Flashing Effect and nice font
  if (activePage === "about") return (
    <main className="relative z-0 bg-primary min-h-screen">
      <NavBar setActivePage={setActivePage} />
      <div className="pt-32 px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-white mb-6 text-center" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>
          About <FlashingText>LMT</FlashingText><FlashingText>STORE</FlashingText>
        </h1>
        <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700 backdrop-blur-sm">
          <p className="text-gray-200 text-xl mb-6 leading-relaxed" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>
            <FlashingText>✨ Premium digital marketplace</FlashingText> for Steam accounts and gaming assets.
          </p>
          <div className="space-y-4 text-gray-300 text-lg">
            <p className="flex items-center gap-3">
              <span className="text-2xl">⚡</span> Instant delivery, 24/7 support, best prices guaranteed.
            </p>
            <p className="flex items-center gap-3">
              <span className="text-2xl">🌟</span> Serving 10,000+ satisfied customers worldwide.
            </p>
            <p className="flex items-center gap-3 pt-4 border-t border-gray-700">
              <span className="text-2xl">📱</span> Contact us on Telegram: <FlashingText>@Shuwangcoder</FlashingText>
            </p>
          </div>
        </div>
      </div>
      <Stars />
    </main>
  );

  // STORE PAGE with "LMT STORE" title
  if (activePage === "store") return (
    <main className="relative z-0 bg-primary min-h-screen">
      <NavBar setActivePage={setActivePage} />
      <div className="pt-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-center mb-4">
              <AnimatedTitle3D text1="LMT" text2="STORE" />
            </div>
            <p className="text-gray-400 text-lg">Steam Accounts & Digital Assets</p>
          </div>
          <div className="flex flex-wrap justify-between gap-4 mb-8">
            <div className="flex gap-3">
              <button onClick={() => setFilter("all")} className={`px-5 py-2 rounded-full ${filter === "all" ? "bg-[#00BFFF]" : "bg-gray-800"}`}>All</button>
              <button onClick={() => setFilter("account")} className={`px-5 py-2 rounded-full ${filter === "account" ? "bg-[#00BFFF]" : "bg-gray-800"}`}>Steam</button>
              <button onClick={() => setFilter("zip")} className={`px-5 py-2 rounded-full ${filter === "zip" ? "bg-[#00BFFF]" : "bg-gray-800"}`}>ZIP</button>
            </div>
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-4 py-2 rounded-full bg-gray-800 text-white w-full md:w-64" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredProducts.map(p => { const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100); return (<RotatingCard3D key={p.id}><div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700 hover:border-[#00BFFF] transition-all hover:-translate-y-2"><div className="relative h-48 bg-gradient-to-br from-blue-900/50 to-pink-900/50 flex items-center justify-center">{p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : <span className="text-6xl">{p.type === "account" ? "🎮" : "📦"}</span>}{discount > 0 && <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">-{discount}%</span>}<span className="absolute top-3 left-3 bg-[#00BFFF]/80 text-white text-xs px-2 py-1 rounded-full">{p.category}</span></div><div className="p-5"><h3 className="text-xl font-bold mb-1">{p.type === "account" ? (
  <RotatingText3D text1="Steam" text2="Account" text3={`- ${p.title.split(" - ")[1]}`} />
) : (
  <RotatingText3D text1="" text2={p.title} text3="" isZip={true} />
)}</h3><p className="text-gray-400 text-sm mb-3">{p.description}</p>{p.type === "account" && <div className="flex flex-wrap gap-2 mb-3"><span className="bg-gray-800 px-2 py-1 rounded-full text-xs">🎮 {p.games?.length} Games</span><span className="bg-gray-800 px-2 py-1 rounded-full text-xs">Level {p.level}</span></div>}{p.type === "zip" && <div className="mb-3 text-xs text-gray-400">📦 Size: {p.fileSize}</div>}<div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800"><div><span className="text-2xl font-bold text-[#00BFFF]">${p.price}</span>{p.originalPrice > p.price && <span className="text-gray-500 line-through text-sm ml-2">${p.originalPrice}</span>}</div><button onClick={() => handleBuy(p)} className="bg-[#00BFFF] hover:bg-blue-600 px-5 py-2 rounded-full text-white text-sm">Buy Now 🛒</button></div></div></div></RotatingCard3D>);})}</div>
        </div>
      </div>
      <Stars />
    </main>
  );

  // WORK PAGE
  if (activePage === "work") return (
    <main className="relative z-0 bg-primary min-h-screen"><NavBar setActivePage={setActivePage} /><div className="pt-32 px-4 max-w-6xl mx-auto"><h1 className="text-5xl font-bold text-white mb-6">Our <span className="text-[#00BFFF]">Work</span></h1><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{["FiveM Cheat System", "Steam Account Delivery", "AntiCheat Roblox"].map((item, i) => (<div key={i} className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 text-center"><div className="text-5xl mb-4">{["⚡", "🎮", "🛡️"][i]}</div><h3 className="text-xl font-bold text-white mb-2">{item}</h3><p className="text-gray-400">Premium delivery system</p></div>))}</div></div><Stars /></main>
  );

  // CONTACT PAGE
  if (activePage === "contact") return (
    <main className="relative z-0 bg-primary min-h-screen"><NavBar setActivePage={setActivePage} /><div className="pt-32 px-4 max-w-2xl mx-auto"><h1 className="text-5xl font-bold text-white mb-6">Contact <span className="text-[#00BFFF]">Us</span></h1><div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700"><div className="mb-4"><label className="text-white block mb-2">Email</label><input type="email" className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white" /></div><div className="mb-4"><label className="text-white block mb-2">Message</label><textarea rows={4} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"></textarea></div><button className="bg-[#00BFFF] hover:bg-blue-600 px-6 py-2 rounded-full text-white font-semibold">Send Message</button><div className="mt-6 text-center"><p className="text-gray-400">Or contact us on Telegram:</p><p className="text-[#00BFFF] text-lg font-bold">@Shuwangcoder</p></div></div></div><Stars /></main>
  );

  // HOME PAGE
  return (
    <main className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center w-screen h-screen">
        <NavBar setActivePage={setActivePage} />
        
        <section className="relative w-full min-h-[400px] mx-auto mt-20">
          <div className={`mx-auto ${styles.paddingX} -mb-20 flex flex-row items-start gap-5`}>
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
              <div className="w-1 sm:h-40 h-20 violet-gradient" />
            </div>
            <div>
              <h1 className={`${styles.hero.head.text} text-white`}>
                Welcome to{" "}
                <span className="text-[#00BFFF]">LMT</span>
                <span className="text-[#FF69B4]">STORE</span>
              </h1>
              <p className={`${styles.hero.sub.text} mt-2 text-white-100`}>
                <AnimatedGradientText>Premium Steam Accounts & Digital Assets - Instant Delivery</AnimatedGradientText>
              </p>
            </div>
          </div>
          
          {/* <Computer /> - Commented out to remove 3D model */}
          <div className="absolute xs:bottom-10 bottom-10 w-full flex justify-center items-center">
            <a href="#products">
              <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-center p-2">
                <div className="w-3 h-3 rounded-full bg-secondary mb-1 animate-bounce"></div>
              </div>
            </a>
          </div>
        </section>
      </div>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-2">
              <RotatingText3D text1="Featured" text2="Products" />
            </h2>
            <p className="text-gray-400">Best selling items this week</p>
          </div>
          
          <div className="flex flex-wrap justify-between gap-4 mb-8">
            <div className="flex gap-3">
              <button onClick={() => setFilter("all")} className={`px-5 py-2 rounded-full ${filter === "all" ? "bg-[#00BFFF]" : "bg-gray-800"}`}>All</button>
              <button onClick={() => setFilter("account")} className={`px-5 py-2 rounded-full ${filter === "account" ? "bg-[#00BFFF]" : "bg-gray-800"}`}>Steam</button>
              <button onClick={() => setFilter("zip")} className={`px-5 py-2 rounded-full ${filter === "zip" ? "bg-[#00BFFF]" : "bg-gray-800"}`}>ZIP</button>
            </div>
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-4 py-2 rounded-full bg-gray-800 text-white w-full md:w-64" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(p => {
              const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
              return (
                <RotatingCard3D key={p.id}>
                  <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700 hover:border-[#00BFFF] transition-all hover:-translate-y-2">
                    <div className="relative h-48 bg-gradient-to-br from-blue-900/50 to-pink-900/50 flex items-center justify-center">
                      {p.image ? (
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-6xl">{p.type === "account" ? "🎮" : "📦"}</span>
                      )}
                      {discount > 0 && <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">-{discount}%</span>}
                      <span className="absolute top-3 left-3 bg-[#00BFFF]/80 text-white text-xs px-2 py-1 rounded-full">{p.category}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold mb-1">
                        {p.type === "account" ? (
                          <RotatingText3D text1="Steam" text2="Account" text3={`- ${p.title.split(" - ")[1]}`} />
                        ) : (
                          <RotatingText3D text1="" text2={p.title} text3="" isZip={true} />
                        )}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">{p.description.substring(0, 80)}...</p>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800">
                        <div>
                          <span className="text-2xl font-bold text-[#00BFFF]">${p.price}</span>
                        </div>
                        <button onClick={() => handleBuy(p)} className="bg-[#00BFFF] hover:bg-blue-600 px-5 py-2 rounded-full text-white text-sm">Buy Now 🛒</button>
                      </div>
                    </div>
                  </div>
                </RotatingCard3D>
              );
            })}
          </div>
        </div>
      </section>
      <Stars />
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
          50% { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
        }
        @keyframes rotate3dHalf {
          0% {
            transform: rotateY(0deg) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: rotateY(90deg) scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: rotateY(0deg) scale(1);
            opacity: 1;
          }
        }
        @keyframes rotate3dFull {
          0% {
            transform: rotateY(0deg) scale(1);
            opacity: 0.7;
          }
          25% {
            transform: rotateY(10deg) scale(1.05);
          }
          50% {
            transform: rotateY(0deg) scale(1.1);
            opacity: 1;
          }
          75% {
            transform: rotateY(-10deg) scale(1.05);
          }
          100% {
            transform: rotateY(0deg) scale(1);
            opacity: 0.7;
          }
        }
      `}</style>
    </main>
  );
}