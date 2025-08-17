import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // For the hamburger menu

const Header = () => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim()) {
      navigate(`/search?query=${encodeURIComponent(value)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLinks />
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Hamburger Menu Button for Mobile */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-800">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* User Menu */}
        <UserMenu />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/90 backdrop-blur py-4 px-6">
          <NavLinks />
          <SearchBar onSearch={handleSearch} />
        </div>
      )}
    </header>
  );
};

export default Header;
