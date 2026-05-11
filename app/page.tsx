const MERCHANT_URL  = process.env.NEXT_PUBLIC_MERCHANT_URL  || 'https://portal-akuisisi-merchant.vercel.app'
const PELAPORAN_URL = process.env.NEXT_PUBLIC_PELAPORAN_URL || '#'

const portals = [
  {
    icon: '📊',
    badge: 'Internal',
    badgeStyle: {
      background: 'rgba(26,86,219,0.35)',
      color: '#93c5fd',
      border: '1px solid rgba(147,197,253,0.3)',
    },
    title: 'Pelaporan Akuisisi',
    desc: 'Laporan harian GMM & CIF, dashboard performa cabang, tren akuisisi, dan rekap area.',
    tags: ['Dashboard', 'Tren CIF', 'Per Cabang', 'Laporan Harian'],
    href: PELAPORAN_URL,
    external: false,
    arrow: '→',
  },
  {
    icon: '🏪',
    badge: 'Live · Vercel',
    badgeStyle: {
      background: 'rgba(5,122,85,0.35)',
      color: '#6ee7b7',
      border: '1px solid rgba(110,231,183,0.3)',
    },
    title: 'Portal Akuisisi Merchant',
    desc: 'Manajemen data merchant, akuisisi EDC & QRIS, leads, dan monitoring performa merchant.',
    tags: ['Merchant', 'EDC', 'QRIS', 'Leads'],
    href: MERCHANT_URL,
    external: true,
    arrow: '↗',
  },
]

export default function Home() {
  return (
    <main
      className="bg-animated relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Ambient orbs */}
      <div className="orb-top" />
      <div className="orb-bottom" />

      {/* Header */}
      <header className="text-center mb-10 relative z-10">
        <span className="text-5xl block mb-3" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
          🏦
        </span>
        <h1
          className="text-2xl font-extrabold text-white"
          style={{ letterSpacing: '-0.3px', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
        >
          Portal Area Balikpapan
        </h1>
        <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Bank Mandiri — Pilih aplikasi yang ingin diakses
        </p>
      </header>

      {/* Cards */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-5 w-full max-w-2xl">
        {portals.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target={p.external ? '_blank' : undefined}
            rel={p.external ? 'noopener noreferrer' : undefined}
            className="glass-card flex-1 rounded-2xl p-7 flex flex-col gap-4 cursor-pointer no-underline"
          >
            {/* Icon */}
            <span className="text-4xl leading-none" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}>
              {p.icon}
            </span>

            {/* Badge */}
            <span
              className="text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full w-fit"
              style={p.badgeStyle}
            >
              {p.badge}
            </span>

            {/* Title */}
            <div className="text-lg font-bold text-white leading-snug">{p.title}</div>

            {/* Description */}
            <div className="text-sm flex-1 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {p.desc}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                  style={{ color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.1)' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA button */}
            <div className="card-btn flex items-center justify-between mt-1 px-4 py-2.5 rounded-xl text-white text-sm font-semibold">
              <span>Buka Aplikasi</span>
              <span className="text-base">{p.arrow}</span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-9 text-xs text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>
        Area Balikpapan &nbsp;·&nbsp; Bank Mandiri &nbsp;·&nbsp; 2026
      </footer>
    </main>
  )
}
