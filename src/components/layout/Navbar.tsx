// src/components/layout/Navbar.tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Menu, X, Tv } from 'lucide-react'

export default function Navbar() {
  // State untuk efek scroll (true jika discroll ke bawah)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // State untuk buka/tutup menu full-screen
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Efek untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Pasang sensor scroll ke browser
    window.addEventListener('scroll', handleScroll)
    
    // Bersihkan sensor kalau komponen dihapus
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* --- TOP NAV --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 p-4 ${
          isScrolled 
            ? 'bg-slate-950/90 backdrop-blur-md shadow-lg border-b border-slate-800' // Warna biru gelap transparan saat di-scroll
            : 'bg-transparent' // Transparan saat di paling atas
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo Kiri */}
          <Link to="/" className="flex items-center gap-2 text-white">
            <Tv className="w-6 h-6" />
            <span className="font-bold text-xl tracking-wide">Movie</span>
          </Link>

          {/* Ikon Kanan */}
          <div className="flex items-center gap-5 text-white">
            <button aria-label="Search" className="hover:text-slate-300 transition">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)} 
              aria-label="Menu"
              className="hover:text-slate-300 transition"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* --- FULLSCREEN MOBILE MENU --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0a] text-white p-4 animate-in fade-in duration-200">
          
          {/* Header Menu */}
          <div className="flex justify-between items-center mb-10">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Tv className="w-6 h-6" />
              <span className="font-bold text-xl">Movie</span>
            </Link>
            <button 
              onClick={() => setIsMenuOpen(false)} 
              aria-label="Close menu"
              className="hover:text-slate-300 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* List Menu */}
          <nav className="flex flex-col gap-6 text-lg pl-2">
            <Link 
              to="/" 
              className="hover:text-slate-300 transition" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/favorites" 
              className="hover:text-slate-300 transition" 
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}