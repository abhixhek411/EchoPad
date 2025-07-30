import React, { useState } from 'react'
import { Button, Container, LogoutBtn, Logo } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import ThemeBtn from './ThemeBtn'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "About", slug: "/", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-white/10 backdrop-blur-lg shadow-lg font-sans">
      <Container>
        <nav className="flex items-center justify-between py-4 relative">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to='/' className='flex items-center gap-2 group'>
              <Logo size={40} />
            </Link>
          </div>

          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`block w-6 h-0.5 bg-blue-400 mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-blue-400 mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-blue-400 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Navigation Items */}
          <ul className={`
            flex-col md:flex-row md:flex items-center gap-4
            absolute md:static top-full left-0 w-full md:w-auto bg-white/90 md:bg-transparent shadow-lg md:shadow-none transition-all duration-300
            ${menuOpen ? 'flex' : 'hidden md:flex'}
          `}>
            {/* Theme Toggle */}
            <li>
              {/* <ThemeBtn /> */}
            </li>

            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="w-full md:w-auto">
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setMenuOpen(false);
                    }}
                    className="w-full md:w-auto px-4 py-2 rounded-lg text-base md:text-lg font-medium transition-all duration-300 hover:bg-blue-100 md:hover:bg-white/10 hover:text-blue-700 md:hover:text-white text-gray-700 md:text-gray-300 text-left md:text-center font-sans"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* Logout Button */}
            {authStatus && (
              <li className="w-full md:w-auto">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
