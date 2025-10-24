import { navLinks } from "../constants";
import "../styles/sections/_navbar.scss";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <img src="/logo.svg" alt="Apple Logo" />

        <ul className="nav-items">
          {navLinks.map(({ label }) => (
            <li key={label}>
              <a href={label}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-icons">
          <button>
            <img src="/search.svg" alt="Search" />
          </button>
          <button>
            <img src="/cart.svg" alt="Cart" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
