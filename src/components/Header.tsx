import "./Header.css"

interface HeaderProps {
    title: string;
    description: string;
}

const Header = ({title, description}: HeaderProps) => {
    return (
        <header>
            <h1>{title}</h1>
            <p>{description}</p>
        </header>
    )
}

export default Header;