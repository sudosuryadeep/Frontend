import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";

const Header = () => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      setIsSearchOpen(false); // close mobile search after submit
    }
  };

  const toggleMenu = () => {
    if (isSearchOpen) setIsSearchOpen(false); // 👈 Close search if open
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    if (isMenuOpen) setIsMenuOpen(false); // 👈 Close menu if open
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          <Logo />

          {/* Desktop Nav + Search */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLinks />
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Mobile Icons */}
          <div className="lg:hidden flex items-center gap-10">
            {/* Search Icon */}
            <button
              onClick={toggleSearch}
              className="text-gray-800 hover:scale-110 transition-transform"
            >
              <FaSearch size={20} />
            </button>

            {/* Menu Icon */}
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:scale-110 transition-transform"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Right Side */}
        <UserMenu />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-md py-6 px-6 shadow-lg"
          >
            <NavLinks direction="column" />
            <div className="mt-4">
              <SearchBar onSearch={handleSearch} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Search Bar Dropdown */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden px-4 py-3 bg-white shadow-md border-t z-30"
          >
            <SearchBar onSearch={handleSearch} autoFocus />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
