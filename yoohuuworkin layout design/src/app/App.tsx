import { useState } from "react";
import {
  Search, Star, Heart, Bell, Lock, Thermometer, Lightbulb,
  Plus, Minus, TrendingUp, Download, Wind, Users, Calendar,
  MapPin, ArrowUpRight, CreditCard, MoreHorizontal, Zap,
} from "lucide-react";

type Role = "employee" | "admin" | "host";

// ─── Static data ──────────────────────────────────────────────────────────────

const LISTINGS = [
  { id: 1, title: "제주 오션뷰 워케이션 스튜디오", location: "제주도 · 서귀포시", rating: 4.92, reviews: 134, pricePerNight: 180, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=640&h=480&fit=crop&auto=format", superhost: true },
  { id: 2, title: "강릉 솔향기 독채 워케이션", location: "강원도 · 강릉시", rating: 4.87, reviews: 89, pricePerNight: 220, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=640&h=480&fit=crop&auto=format", superhost: false },
  { id: 3, title: "여수 바다보이는 복층 아파트", location: "전라남도 · 여수시", rating: 4.95, reviews: 201, pricePerNight: 150, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&h=480&fit=crop&auto=format", superhost: true },
  { id: 4, title: "전주 한옥마을 모던 게스트하우스", location: "전라북도 · 전주시", rating: 4.78, reviews: 67, pricePerNight: 130, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=640&h=480&fit=crop&auto=format", superhost: false },
  { id: 5, title: "경주 고즈넉한 프라이빗 빌라", location: "경상북도 · 경주시", rating: 4.91, reviews: 112, pricePerNight: 200, image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=640&h=480&fit=crop&auto=format", superhost: true },
  { id: 6, title: "양양 서퍼스파라다이스 독채", location: "강원도 · 양양군", rating: 4.84, reviews: 156, pricePerNight: 165, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=640&h=480&fit=crop&auto=format", superhost: false },
];

const CATEGORIES = ["전체", "제주", "강릉", "여수", "전주", "경주", "양양", "속초", "부산"];

const EMPLOYEES = [
  { id: 1, name: "김민준", email: "minjun@acme.co", dept: "개발팀", used: 340, limit: 500, status: "active" },
  { id: 2, name: "이수연", email: "suyeon@acme.co", dept: "마케팅팀", used: 180, limit: 400, status: "active" },
  { id: 3, name: "박지현", email: "jihyun@acme.co", dept: "디자인팀", used: 0, limit: 300, status: "active" },
  { id: 4, name: "최도현", email: "dohyun@acme.co", dept: "개발팀", used: 450, limit: 500, status: "active" },
  { id: 5, name: "정하은", email: "haeun@acme.co", dept: "인사팀", used: 220, limit: 350, status: "inactive" },
];

const CREDIT_TXNS = [
  { id: 1, type: "charge", desc: "크레딧 충전", amount: 2000, date: "2025.06.10" },
  { id: 2, type: "use", desc: "김민준 · 제주 오션뷰 스튜디오", amount: -180, date: "2025.06.12" },
  { id: 3, type: "use", desc: "최도현 · 강릉 솔향기 독채", amount: -220, date: "2025.06.14" },
  { id: 4, type: "use", desc: "이수연 · 여수 복층 아파트", amount: -150, date: "2025.06.15" },
  { id: 5, type: "refund", desc: "박지현 예약 취소 환불", amount: 130, date: "2025.06.16" },
];

const HOST_PROPERTIES = [
  { id: 1, title: "제주 오션뷰 워케이션 스튜디오", location: "제주도 서귀포시", status: "active", rating: 4.92, reviews: 134, price: 180, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=280&fit=crop&auto=format" },
  { id: 2, title: "제주 한적한 감귤밭 통집", location: "제주도 애월읍", status: "paused", rating: 4.75, reviews: 42, price: 220, image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=280&fit=crop&auto=format" },
];

const BOOKINGS_HOST = [
  { id: 1, guest: "김민준", company: "에이크미(주)", checkIn: "06.20", checkOut: "06.24", nights: 4, credits: 720, status: "confirmed" },
  { id: 2, guest: "최도현", company: "에이크미(주)", checkIn: "06.25", checkOut: "06.28", nights: 3, credits: 540, status: "pending" },
  { id: 3, guest: "이수연", company: "에이크미(주)", checkIn: "07.02", checkOut: "07.05", nights: 3, credits: 540, status: "confirmed" },
];

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav({ role, setRole }: { role: Role; setRole: (r: Role) => void }) {
  const roles: { key: Role; label: string }[] = [
    { key: "employee", label: "임직원" },
    { key: "admin", label: "기업관리자" },
    { key: "host", label: "호스트" },
  ];
  const avatar = role === "employee" ? "김" : role === "admin" ? "이" : "최";
  const username = role === "employee" ? "김민준" : role === "admin" ? "이관리" : "최호스트";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex-shrink-0">
          <span className="text-xl font-bold tracking-tight select-none">
            <span className="text-primary">유휴</span>워크인
          </span>
        </div>

        <div className="flex items-center bg-muted rounded-lg p-1 gap-0.5">
          {roles.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setRole(key)}
              className={`px-3.5 py-1.5 text-sm rounded-md transition-colors ${
                role === key
                  ? "bg-white text-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex-shrink-0 flex items-center gap-2">
          {role === "employee" && (
            <div className="hidden md:flex items-center gap-1.5 text-sm mr-2">
              <span className="text-muted-foreground">잔여 크레딧</span>
              <span className="text-primary font-bold">4,780 C</span>
            </div>
          )}
          <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
          </button>
          <button className="flex items-center gap-2 border border-border rounded-full px-3 py-1.5 hover:shadow-md transition-shadow">
            <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
              <span className="text-white text-xs font-semibold">{avatar}</span>
            </div>
            <span className="hidden sm:block text-sm font-medium">{username}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Employee View ────────────────────────────────────────────────────────────

function EmployeeView() {
  const [hearted, setHearted] = useState<Set<number>>(new Set());
  const [category, setCategory] = useState("전체");
  const [location, setLocation] = useState("");

  const toggleHeart = (id: number) => {
    setHearted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered =
    category === "전체"
      ? LISTINGS
      : LISTINGS.filter((l) => l.location.includes(category));

  return (
    <main>
      {/* Search bar */}
      <div className="border-b border-border bg-white py-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-stretch border border-border rounded-full shadow-sm hover:shadow-md transition-shadow max-w-2xl mx-auto overflow-hidden">
            <div className="flex-1 px-5 py-3 border-r border-border">
              <div className="text-xs font-semibold mb-0.5">여행지</div>
              <input
                type="text"
                placeholder="어디로 가실 건가요?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none"
              />
            </div>
            <button className="px-5 py-3 border-r border-border hover:bg-muted/50 transition-colors text-left">
              <div className="text-xs font-semibold mb-0.5">체크인</div>
              <div className="text-sm text-muted-foreground">날짜 추가</div>
            </button>
            <button className="px-5 py-3 border-r border-border hover:bg-muted/50 transition-colors text-left">
              <div className="text-xs font-semibold mb-0.5">체크아웃</div>
              <div className="text-sm text-muted-foreground">날짜 추가</div>
            </button>
            <div className="flex items-center gap-3 px-4 py-3">
              <div>
                <div className="text-xs font-semibold mb-0.5">인원</div>
                <div className="text-sm text-muted-foreground">2명</div>
              </div>
              <button className="bg-primary text-white rounded-full p-2.5 flex-shrink-0 hover:opacity-90 transition-opacity">
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="border-b border-border bg-white sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  category === cat
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listings grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-muted-foreground">
            <MapPin size={36} className="mb-3 opacity-25" />
            <p className="font-medium">해당 지역의 숙소가 없습니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {filtered.map((listing) => (
              <div key={listing.id} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-muted mb-3">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleHeart(listing.id);
                    }}
                    className="absolute top-3 right-3 p-1"
                  >
                    <Heart
                      size={22}
                      fill={hearted.has(listing.id) ? "#ff5500" : "rgba(0,0,0,0.3)"}
                      stroke={hearted.has(listing.id) ? "#ff5500" : "white"}
                      strokeWidth={1.5}
                    />
                  </button>
                  {listing.superhost && (
                    <div className="absolute top-3 left-3 bg-white text-foreground text-xs font-semibold px-2 py-1 rounded-full">
                      슈퍼호스트
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-foreground truncate">{listing.location}</p>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <Star size={12} fill="#111" stroke="none" />
                        <span className="text-sm font-medium">{listing.rating}</span>
                        <span className="text-sm text-muted-foreground">({listing.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{listing.title}</p>
                    <p className="text-sm mt-1.5">
                      <span className="font-bold text-foreground">{listing.pricePerNight.toLocaleString()} 크레딧</span>
                      <span className="text-muted-foreground"> / 박</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// ─── Admin View ───────────────────────────────────────────────────────────────

function AdminView() {
  const [activeTab, setActiveTab] = useState<"employees" | "history">("employees");

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">기업 대시보드</h1>
          <p className="text-sm text-muted-foreground mt-1">에이크미 주식회사</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <CreditCard size={15} />
          크레딧 충전
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "크레딧 잔액", value: "4,780 C", sub: "소진 시 충전 필요", icon: CreditCard, primary: true },
          { label: "이번달 사용", value: "550 C", sub: "전월 대비 +12%", icon: TrendingUp, primary: false },
          { label: "임직원", value: "5명", sub: "활성 4명", icon: Users, primary: false },
          { label: "진행중 예약", value: "6건", sub: "이번달 기준", icon: Calendar, primary: false },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-xl border p-5 ${s.primary ? "border-primary/20 bg-primary/5" : "border-border bg-white"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-medium">{s.label}</span>
              <s.icon size={17} className={s.primary ? "text-primary" : "text-muted-foreground"} />
            </div>
            <div className={`text-2xl font-bold ${s.primary ? "text-primary" : "text-foreground"}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        {(["employees", "history"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "employees" ? "임직원 관리" : "크레딧 내역"}
          </button>
        ))}
      </div>

      {activeTab === "employees" && (
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <span className="text-sm font-semibold">임직원 목록 ({EMPLOYEES.length}명)</span>
            <button className="flex items-center gap-1 text-sm text-accent font-medium hover:opacity-80 transition-opacity">
              <Plus size={14} />
              임직원 초대
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3">이름</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 hidden md:table-cell">부서</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3">예산 사용</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3">상태</th>
                  <th className="px-5 py-3 w-10" />
                </tr>
              </thead>
              <tbody>
                {EMPLOYEES.map((emp) => {
                  const pct = Math.round((emp.used / emp.limit) * 100);
                  const warn = pct >= 80;
                  return (
                    <tr key={emp.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {emp.name[0]}
                          </div>
                          <div>
                            <div className="text-sm font-semibold">{emp.name}</div>
                            <div className="text-xs text-muted-foreground">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">{emp.dept}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="min-w-[140px]">
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className={`font-semibold ${warn ? "text-primary" : "text-foreground"}`}>
                              {emp.used.toLocaleString()} C
                            </span>
                            <span className="text-muted-foreground">{emp.limit.toLocaleString()} C</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${warn ? "bg-primary" : "bg-accent"}`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          emp.status === "active"
                            ? "bg-green-50 text-green-700"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${emp.status === "active" ? "bg-green-500" : "bg-muted-foreground"}`} />
                          {emp.status === "active" ? "활성" : "비활성"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button className="p-1 rounded hover:bg-muted transition-colors">
                          <MoreHorizontal size={16} className="text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-2.5">
          {CREDIT_TXNS.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between bg-white border border-border rounded-xl px-5 py-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  txn.type === "charge" ? "bg-accent/10" : txn.type === "refund" ? "bg-green-50" : "bg-muted"
                }`}>
                  {txn.type === "charge" && <CreditCard size={17} className="text-accent" />}
                  {txn.type === "use" && <ArrowUpRight size={17} className="text-muted-foreground" />}
                  {txn.type === "refund" && <Download size={17} className="text-green-600" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">{txn.desc}</p>
                  <p className="text-xs text-muted-foreground">{txn.date}</p>
                </div>
              </div>
              <div className={`text-base font-bold ${txn.amount > 0 ? "text-accent" : "text-foreground"}`}>
                {txn.amount > 0 ? "+" : ""}
                {txn.amount.toLocaleString()} C
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

// ─── Host View ────────────────────────────────────────────────────────────────

function HostView() {
  const [selectedProp, setSelectedProp] = useState(0);
  const [tab, setTab] = useState<"bookings" | "iot" | "settlement">("bookings");
  const [iot, setIot] = useState({ door: false, light: true, ac: false, temp: 22 });

  const prop = HOST_PROPERTIES[selectedProp];

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">호스트 관리</h1>
          <p className="text-sm text-muted-foreground mt-1">최호스트님의 워케이션 공간</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus size={15} />
          숙소 등록
        </button>
      </div>

      {/* Property selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {HOST_PROPERTIES.map((p, i) => (
          <div
            key={p.id}
            onClick={() => setSelectedProp(i)}
            className={`flex gap-4 border rounded-xl p-4 cursor-pointer transition-colors ${
              selectedProp === i ? "border-foreground" : "border-border hover:border-muted-foreground/40"
            } bg-white`}
          >
            <div className="w-24 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold leading-snug truncate flex-1">{p.title}</p>
                <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  p.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {p.status === "active" ? "운영중" : "일시중지"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{p.location}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-0.5">
                  <Star size={11} fill="#111" stroke="none" />
                  <span className="text-xs font-semibold">{p.rating}</span>
                </span>
                <span className="text-xs text-muted-foreground">후기 {p.reviews}개</span>
                <span className="text-xs font-bold text-foreground">{p.price.toLocaleString()} C/박</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        {([
          { key: "bookings", label: "예약 관리" },
          { key: "iot", label: "스마트홈" },
          { key: "settlement", label: "정산" },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === key
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Bookings */}
      {tab === "bookings" && (
        <div className="space-y-3">
          {BOOKINGS_HOST.map((b) => (
            <div key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-border rounded-xl px-5 py-4 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {b.guest[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{b.guest}</span>
                    <span className="text-xs text-muted-foreground">{b.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Calendar size={11} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {b.checkIn} – {b.checkOut} · {b.nights}박
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="text-right">
                  <div className="text-sm font-bold">{b.credits.toLocaleString()} C</div>
                  <div className="text-xs text-muted-foreground">예상 정산액</div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                  b.status === "confirmed"
                    ? "bg-accent/10 text-accent"
                    : "bg-amber-50 text-amber-700"
                }`}>
                  {b.status === "confirmed" ? "확정" : "승인대기"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* IoT */}
      {tab === "iot" && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Zap size={15} className="text-primary" />
            <span className="text-sm font-semibold">{prop.title} · 원격 제어</span>
            <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700">온라인</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Door lock */}
            <div className="bg-white border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iot.door ? "bg-primary/10" : "bg-muted"}`}>
                    <Lock size={19} className={iot.door ? "text-primary" : "text-muted-foreground"} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">도어락</div>
                    <div className="text-xs text-muted-foreground">{iot.door ? "잠금 해제됨" : "잠금됨"}</div>
                  </div>
                </div>
                <button
                  onClick={() => setIot((s) => ({ ...s, door: !s.door }))}
                  className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${iot.door ? "bg-primary" : "bg-muted"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-[left] ${iot.door ? "left-7" : "left-1"}`} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">최근 제어: 오늘 14:23</p>
            </div>

            {/* Lights */}
            <div className="bg-white border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iot.light ? "bg-amber-50" : "bg-muted"}`}>
                    <Lightbulb size={19} className={iot.light ? "text-amber-500" : "text-muted-foreground"} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">거실 조명</div>
                    <div className="text-xs text-muted-foreground">{iot.light ? "켜짐 · 밝기 80%" : "꺼짐"}</div>
                  </div>
                </div>
                <button
                  onClick={() => setIot((s) => ({ ...s, light: !s.light }))}
                  className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${iot.light ? "bg-primary" : "bg-muted"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-[left] ${iot.light ? "left-7" : "left-1"}`} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">최근 제어: 오늘 10:05</p>
            </div>

            {/* AC */}
            <div className="bg-white border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iot.ac ? "bg-accent/10" : "bg-muted"}`}>
                    <Wind size={19} className={iot.ac ? "text-accent" : "text-muted-foreground"} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">에어컨</div>
                    <div className="text-xs text-muted-foreground">{iot.ac ? "냉방 가동중" : "꺼짐"}</div>
                  </div>
                </div>
                <button
                  onClick={() => setIot((s) => ({ ...s, ac: !s.ac }))}
                  className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${iot.ac ? "bg-primary" : "bg-muted"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-[left] ${iot.ac ? "left-7" : "left-1"}`} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">절전 모드 활성화 중</p>
            </div>

            {/* Temperature */}
            <div className="bg-white border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Thermometer size={19} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm font-semibold">온도 설정</div>
                  <div className="text-xs text-muted-foreground">실내 온도 조절</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIot((s) => ({ ...s, temp: Math.max(16, s.temp - 1) }))}
                  className="w-9 h-9 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus size={15} />
                </button>
                <div className="text-center">
                  <span className="text-3xl font-bold">{iot.temp}</span>
                  <span className="text-lg text-muted-foreground">°C</span>
                </div>
                <button
                  onClick={() => setIot((s) => ({ ...s, temp: Math.min(30, s.temp + 1) }))}
                  className="w-9 h-9 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settlement */}
      {tab === "settlement" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "이번달 정산 예정", value: "1,800 C", sub: "6월 확정 예약 기준", highlight: false },
              { label: "정산 완료", value: "12,400 C", sub: "누적 총액", highlight: false },
              { label: "다음 정산일", value: "06.30", sub: "자동 이체 예정", highlight: true },
            ].map((item) => (
              <div key={item.label} className={`border rounded-xl p-5 ${item.highlight ? "border-primary/20 bg-primary/5" : "border-border bg-white"}`}>
                <div className="text-sm text-muted-foreground font-medium mb-2">{item.label}</div>
                <div className={`text-2xl font-bold ${item.highlight ? "text-primary" : "text-foreground"}`}>{item.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.sub}</div>
              </div>
            ))}
          </div>
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <span className="text-sm font-semibold">정산 내역</span>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Download size={12} />
                엑셀 다운로드
              </button>
            </div>
            {BOOKINGS_HOST.filter((b) => b.status === "confirmed").map((b) => (
              <div key={b.id} className="flex items-center justify-between px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <div>
                  <p className="text-sm font-medium">{b.guest} · {b.checkIn}–{b.checkOut}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{b.nights}박 확정</p>
                </div>
                <div className="text-sm font-bold">{b.credits.toLocaleString()} C</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [role, setRole] = useState<Role>("employee");

  return (
    <div className="min-h-screen bg-background">
      <Nav role={role} setRole={setRole} />
      {role === "employee" && <EmployeeView />}
      {role === "admin" && <AdminView />}
      {role === "host" && <HostView />}
    </div>
  );
}
