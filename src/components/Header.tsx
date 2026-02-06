import "./Header.css"

interface HeaderProps {
    title: string;
    description: string;
    logo?: string;
}

const Header = ({title, description, logo}: HeaderProps) => {
    return (
        <header className="header-container">
            {logo && <img src={logo} alt="Logo" className="header-logo" />}
            <div className="header-text">
            <h1 className="header__title">{title}</h1>
            <p className="header__description">{description}</p>
            </div>
            
        </header>
    )
}

export default Header;