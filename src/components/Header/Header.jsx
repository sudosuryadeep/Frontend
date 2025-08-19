import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim()) {
      // navigate(`${encodeURIComponent(value)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLinks />
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
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

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-md py-6 px-6 shadow-lg"
          >
            <NavLinks />
            <div className="mt-4">
              <SearchBar onSearch={handleSearch} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
