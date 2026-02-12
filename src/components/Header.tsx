import { NavLink } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  title: string;
  description: string;
  logo?: string;
}

const Header = ({ title, description, logo }: HeaderProps) => {
  return (
    <header className="header-container">
      
      <div className="header-left">
        <NavLink to="/" className="header-logo-link">
          {logo && (
            <img src={logo} alt="Logo" className="header-logo" />
          )}
        </NavLink>

        <NavLink to="/" className="header-title-link">
          <h1>{title}</h1>
          <p>{description}</p>
        </NavLink>
      </div>

      {/* Right side */}
      <div className="header__right">
        <NavLink to="/list">List</NavLink>
        <NavLink to="/add">Add</NavLink>
      </div>

    </header>
  );
};

export default Header;
