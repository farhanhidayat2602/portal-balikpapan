'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const PELAPORAN_URL =
  process.env.NEXT_PUBLIC_PELAPORAN_URL || 'https://pelaporanakuisisiareabalikpapan.web.id/login'
const WA_NUMBER = '628988887761'

// Enam pilar aplikasi — dipetakan satu-satu dari grup menu yang BENAR-BENAR ada
// di dalam Pelaporan Akuisisi, bukan ringkasan yang enak didengar. Cakupannya
// jauh lebih luas dari sekadar GMM/CIF: ada follow up leads (6 jenis), booking
// kredit (KSM/KPR/KUR-KUM), prioritas, sampai Superblock & Telkom Divre.
// Dulu ini cuma chip kecil di kaki kartu; sekarang jadi grid yang MENGISI panel
// supaya satu-satunya aplikasi tidak tampak mengambang kesepian di tengah layar.
const FEATURES = [
  { icon: IconReport,    title: 'Laporan Harian',    desc: 'GMM & CIF per cabang' },
  { icon: IconChecklist, title: 'Follow Up Leads',   desc: 'Pebisnis · Payroll · TBR · CC' },
  { icon: IconCard,      title: 'Booking Kredit',    desc: 'KSM · KPR · KUR/KUM' },
  { icon: IconStar,      title: 'Akuisisi Prioritas', desc: 'Monitoring nasabah prioritas' },
  { icon: IconBuilding,  title: 'Superblock & Telkom', desc: 'Produktivitas individu' },
  { icon: IconUsers,     title: 'Administrasi',      desc: 'Reminder WA · pegawai · user' },
]

export default function Home() {
  const [clock, setClock] = useState('')
  const [scrolled, setScrolled] = useState(false)
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

  // Navbar mulai transparan di atas foto, lalu mengeras jadi kaca saat digulir.
  // Listener-nya passive supaya tidak menghambat scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Modal terbuka: kunci scroll latar, dan Esc untuk menutup.
  useEffect(() => {
    if (!showModal) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowModal(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [showModal])

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
    <div className="root">

      {/* ── Navbar ───────────────────────────────────────────── */}
      <nav className={`nav ${scrolled ? 'nav--solid' : ''}`}>
        <div className="nav__inner">
          <div className="nav__brand">
            <Image src="/logo-ab.webp" alt="" width={40} height={45} className="nav__logo" priority />
            <span className="nav__area">Area Balikpapan</span>
          </div>
          <div className="nav__clock" suppressHydrationWarning>{clock}</div>
        </div>
      </nav>

      <main>
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="hero">
          <div className="hero__media">
            {/* priority: ini LCP halaman. sizes=100vw supaya Next menyajikan
                varian selebar viewport, bukan 1536px ke semua perangkat. */}
            <Image
              src="/city-bg.webp"
              alt="Siluet kota Balikpapan saat senja"
              fill
              priority
              sizes="100vw"
              className="hero__img"
            />
          </div>
          <div className="hero__scrim" aria-hidden="true" />
          <div className="hero__glow" aria-hidden="true" />

          <div className="hero__inner">
            <p className="hero__eyebrow reveal">
              <span className="hero__pulse" aria-hidden="true" />
              Selamat datang di
            </p>
            <h1 className="hero__title reveal reveal--1">
              Portal Area <span className="hero__accent">Balikpapan</span>
            </h1>
            <p className="hero__sub reveal reveal--2">
              Pusat akses aplikasi internal Area Transaction &amp; Funding.
            </p>
          </div>
        </section>

        {/* ── Panel aplikasi (naik menembus hero) ────────────── */}
        <section className="stage">
          <article className="panel reveal reveal--3">
            <div className="panel__left">
              <span className="badge">
                <span className="badge__dot" aria-hidden="true" />
                Internal
              </span>

              <h2 className="panel__title">Pelaporan Akuisisi</h2>
              <p className="panel__desc">
                Pusat pelaporan akuisisi Area Balikpapan — dari laporan harian GMM &amp; CIF,
                follow up leads funding &amp; transaction, hingga monitoring booking kredit
                dan nasabah prioritas.
              </p>

              <a href={PELAPORAN_URL} className="cta">
                <span>Buka Aplikasi</span>
                <IconArrow />
              </a>

              <p className="panel__meta">
                <IconLock />
                Butuh login. Hanya untuk personel berwenang.
              </p>
            </div>

            <div className="panel__right">
              <p className="panel__label">Yang bisa diakses</p>
              <div className="feats">
                {FEATURES.map(({ icon: Icon, title, desc }) => (
                  <div className="feat" key={title}>
                    <span className="feat__icon" aria-hidden="true"><Icon /></span>
                    <div className="feat__text">
                      <span className="feat__title">{title}</span>
                      <span className="feat__desc">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>

        {/* ── Bantuan ────────────────────────────────────────── */}
        <section className="help">
          <div className="help__inner">
            <span className="help__icon" aria-hidden="true"><IconHeadset /></span>
            <div className="help__text">
              <span className="help__label">Butuh bantuan?</span>
              <strong className="help__name">M. Farhan Hidayat</strong>
            </div>
            <button type="button" className="help__btn" onClick={() => setShowModal(true)}>
              <IconWA />
              <span>Hubungi via WhatsApp</span>
            </button>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="foot">
        <div className="foot__inner">
          <div className="foot__col">
            <span className="foot__ico" aria-hidden="true"><IconShield /></span>
            <div>
              <div className="foot__t">Keamanan Terjamin</div>
              <div className="foot__d">Data terlindungi dengan enkripsi dan autentikasi berlapis.</div>
            </div>
          </div>

          <div className="foot__mid">
            <Image src="/logo-ab.webp" alt="" width={44} height={49} className="foot__logo" />
            <div className="foot__copy">© 2026 Portal Area Balikpapan</div>
            <div className="foot__unit">Area Transaction and Funding<br />Area Balikpapan</div>
          </div>

          <div className="foot__col foot__col--end">
            <span className="foot__ico" aria-hidden="true"><IconKey /></span>
            <div>
              <div className="foot__t">Akses Terbatas</div>
              <div className="foot__d">Hanya dapat diakses oleh personel yang berwenang.</div>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Modal WhatsApp ───────────────────────────────────── */}
      {showModal && (
        <div className="modal__bg" onClick={() => setShowModal(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal__head">
              <div>
                <h3 id="modalTitle">Hubungi via WhatsApp</h3>
                <p>Isi form berikut, pesan akan dikirim otomatis.</p>
              </div>
              <button type="button" className="modal__x" onClick={() => setShowModal(false)} aria-label="Tutup">
                <IconClose />
              </button>
            </div>

            <div className="modal__body">
              <label>
                Nama Lengkap
                <input
                  type="text"
                  placeholder="Masukkan nama Anda"
                  value={form.nama}
                  onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
                />
              </label>
              <label>
                Cabang
                <input
                  type="text"
                  placeholder="Nama cabang Anda"
                  value={form.cabang}
                  onChange={(e) => setForm((f) => ({ ...f, cabang: e.target.value }))}
                />
              </label>
              <label>
                Kendala
                <textarea
                  rows={4}
                  placeholder="Jelaskan kendala yang Anda hadapi..."
                  value={form.kendala}
                  onChange={(e) => setForm((f) => ({ ...f, kendala: e.target.value }))}
                />
              </label>
            </div>

            <div className="modal__foot">
              <button type="button" className="modal__cancel" onClick={() => setShowModal(false)}>
                Batal
              </button>
              <button type="button" className="modal__send" onClick={handleSend} disabled={!canSend}>
                <IconWA />
                Kirim WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Ikon garis (inline SVG: ikut currentColor, tanpa request tambahan) ────── */

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/* Follow Up Leads — papan periksa: tiap lead dihubungi lalu dicatat hasilnya. */
function IconChecklist() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
      <path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="2.5" width="6" height="3.5" rx="1" />
      <path d="M8.5 12.5l1.8 1.8 3.7-3.7" />
      <path d="M8.5 17.5h7" />
    </svg>
  )
}

/* Booking Kredit — KSM, KPR, KUR/KUM. */
function IconCard() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19" />
      <path d="M6 14.5h3" />
    </svg>
  )
}

/* Akuisisi Prioritas. */
function IconStar() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
      <path d="M12 3.5l2.6 5.3 5.9.86-4.25 4.14 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.66l5.9-.86z" />
    </svg>
  )
}

/* Superblock & Telkom Divre — produktivitas individu per lokasi. */
function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
      <path d="M3 21h18" />
      <path d="M5 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15" />
      <path d="M13 21V10h5a1 1 0 0 1 1 1v10" />
      <path d="M8 9h2M8 13h2M16 14h.01M16 17.5h.01" />
    </svg>
  )
}

/* Administrasi — reminder WA, kelola pegawai, manajemen user. */
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.6a3.2 3.2 0 0 1 0 5.9" />
      <path d="M17.6 14.4a5.5 5.5 0 0 1 2.9 5.1" />
    </svg>
  )
}

function IconReport() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  )
}

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...S} strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" {...S}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function IconKey() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
      <circle cx="8" cy="14" r="4" />
      <path d="M11 11l9-9M17 5l2 2M14 8l2 2" />
    </svg>
  )
}

function IconHeadset() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2" y="14" width="4" height="6" rx="1.5" />
      <rect x="18" y="14" width="4" height="6" rx="1.5" />
      <path d="M20 20v1a2 2 0 0 1-2 2h-3" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...S} strokeWidth={1.8}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

function IconWA() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}