'use client'

import { useState, useEffect } from 'react'

const MERCHANT_URL  = process.env.NEXT_PUBLIC_MERCHANT_URL  || 'https://portal-akuisisi-merchant.vercel.app'
const PELAPORAN_URL = process.env.NEXT_PUBLIC_PELAPORAN_URL || '#'
const WA_NUMBER     = '628988887761'

const portals = [
  {
    icon: '📊',
    badgeText: 'Internal',
    badgeStyle: { background: 'rgba(26,86,219,0.12)', color: '#1a56db', border: '1px solid rgba(26,86,219,0.25)' },
    title: 'Pelaporan Akuisisi',
    desc: 'Laporan harian GMM & CIF, dashboard performa cabang, tren akuisisi, dan rekap area.',
    tags: ['Dashboard', 'Tren CIF', 'Per Cabang', 'Laporan Harian'],
    href: PELAPORAN_URL,
    external: false,
  },
  {
    icon: '🏪',
    badgeText: 'Live · Vercel',
    badgeStyle: { background: 'rgba(5,122,85,0.12)', color: '#057a55', border: '1px solid rgba(5,122,85,0.25)' },
    title: 'Portal Akuisisi Merchant',
    desc: 'Manajemen data merchant, akuisisi EDC & QRIS, leads, dan monitoring performa merchant.',
    tags: ['Merchant', 'EDC', 'QRIS', 'Leads'],
    href: MERCHANT_URL,
    external: true,
  },
]

export default function Home() {
  const [clock, setClock] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ nama: '', cabang: '', kendala: '' })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const date = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Makassar',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(now)
      const time = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Makassar',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now)
      setClock(`${date} · ${time} WITA`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const handleSend = () => {
    const text =
      `Halo, saya *${form.nama}* dari cabang *${form.cabang}*.\n\n` +
      `Saya membutuhkan bantuan terkait:\n${form.kendala}`
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank')
    setShowModal(false)
    setForm({ nama: '', cabang: '', kendala: '' })
  }

  const canSend = form.nama.trim() && form.cabang.trim() && form.kendala.trim()

  return (
    <div className="portal-root">

      {/* ── Navbar ────────────────────────────────────────────── */}
      <nav className="portal-nav">
        <div className="portal-nav-inner">
          <div className="portal-nav-brand">
            <MandiriIcon />
            <div className="portal-nav-brand-text">
              <span className="portal-nav-bank">Bank Mandiri</span>
              <span className="portal-nav-area">Area Balikpapan</span>
            </div>
          </div>
          <div className="portal-nav-clock" suppressHydrationWarning>{clock}</div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="portal-hero">
        <div className="portal-hero-bg" />
        <div className="portal-hero-content">
          <p className="portal-hero-eyebrow">Selamat Datang di</p>
          <h1 className="portal-hero-heading">Portal Area Balikpapan</h1>
          <p className="portal-hero-sub">Bank Mandiri · Pilih aplikasi yang ingin diakses</p>
        </div>
      </section>

      {/* ── Cards ────────────────────────────────────────────── */}
      <section className="portal-cards">
        <div className="portal-cards-grid">
          {portals.map(p => (
            <a
              key={p.title}
              href={p.href}
              target={p.external ? '_blank' : undefined}
              rel={p.external ? 'noopener noreferrer' : undefined}
              className="pcard"
            >
              <span className="pcard-icon">{p.icon}</span>
              <span className="pcard-badge" style={p.badgeStyle as React.CSSProperties}>{p.badgeText}</span>
              <div className="pcard-title">{p.title}</div>
              <div className="pcard-desc">{p.desc}</div>
              <div className="pcard-tags">
                {p.tags.map(t => <span key={t} className="pcard-tag">{t}</span>)}
              </div>
              <div className="pcard-btn">
                <span>Buka Aplikasi</span>
                <span>{p.external ? '↗' : '→'}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section className="portal-contact">
        <div className="portal-contact-inner">
          <div className="portal-contact-icon">🎧</div>
          <div className="portal-contact-info">
            <span className="portal-contact-label">Butuh bantuan?</span>
            <strong className="portal-contact-name">M. Farhan Hidayat</strong>
            <span className="portal-contact-role">Officer Development Program Batch 318</span>
          </div>
          <button className="portal-wa-btn" onClick={() => setShowModal(true)}>
            <WAIcon />
            08988887761
          </button>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="portal-footer">
        <div className="portal-footer-inner">
          <div className="portal-footer-col">
            <div className="portal-footer-col-icon">🔒</div>
            <div className="portal-footer-col-title">Keamanan Terjamin</div>
            <div className="portal-footer-col-desc">Data terlindungi dengan enkripsi dan autentikasi berlapis.</div>
          </div>
          <div className="portal-footer-col portal-footer-col-mid">
            <MandiriIcon size={36} />
            <div className="portal-footer-copy">© 2026 Bank Mandiri</div>
            <div className="portal-footer-unit">Area Transaction and Funding<br />Area Balikpapan</div>
          </div>
          <div className="portal-footer-col">
            <div className="portal-footer-col-icon">🔑</div>
            <div className="portal-footer-col-title">Akses Terbatas</div>
            <div className="portal-footer-col-desc">Hanya dapat diakses oleh personel yang berwenang.</div>
          </div>
        </div>
      </footer>

      {/* ── WA Modal ─────────────────────────────────────────── */}
      {showModal && (
        <div className="portal-modal-bg" onClick={() => setShowModal(false)}>
          <div className="portal-modal" onClick={e => e.stopPropagation()}>
            <div className="portal-modal-head">
              <div>
                <h3>Hubungi via WhatsApp</h3>
                <p>Isi form berikut, pesan akan dikirim otomatis.</p>
              </div>
              <button className="portal-modal-x" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="portal-modal-body">
              <label>
                Nama Lengkap
                <input
                  type="text"
                  placeholder="Masukkan nama Anda"
                  value={form.nama}
                  onChange={e => setForm(f => ({ ...f, nama: e.target.value }))}
                />
              </label>
              <label>
                Cabang
                <input
                  type="text"
                  placeholder="Nama cabang Anda"
                  value={form.cabang}
                  onChange={e => setForm(f => ({ ...f, cabang: e.target.value }))}
                />
              </label>
              <label>
                Kendala
                <textarea
                  rows={4}
                  placeholder="Jelaskan kendala yang Anda hadapi..."
                  value={form.kendala}
                  onChange={e => setForm(f => ({ ...f, kendala: e.target.value }))}
                />
              </label>
            </div>
            <div className="portal-modal-foot">
              <button className="portal-modal-cancel" onClick={() => setShowModal(false)}>Batal</button>
              <button className="portal-modal-send" onClick={handleSend} disabled={!canSend}>
                <WAIcon />
                Kirim WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MandiriIcon({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="42" height="42" rx="7" fill="#003D79" />
      <path
        d="M7 33V9H15L21 22L27 9H35V33H30V18L23 30H19L12 18V33Z"
        fill="#F2A900"
      />
    </svg>
  )
}

function WAIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
