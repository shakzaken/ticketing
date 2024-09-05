import "./navbar.css"
import { Link } from "react-router-dom"

export const Navbar = () => {
    return <nav className="navbar bg-primary" data-bs-theme="dark">
        <div className="nav-left">
            <div className="nav-block">
                <a className="navbar-brand" href="#">Navbar</a>
            </div>
            <div className="nav-block">
                <Link to="/">Tickets</Link>
            </div>
            <div className="nav-block">
                <Link to="/create-ticket">Create Ticket</Link>
            </div>
            <div className="nav-block">
                <Link to="/orders">Orders</Link>
            </div>
        </div>

        <div className="nav-right">
            <div className="nav-block">
                <Link to="/login">Login</Link>
            </div>
            <div className="nav-block">
                <Link to="/register">Register</Link>
            </div>
            <div className="nav-block">
                <Link to="/orders">Logout</Link>
            </div>
        </div>
        
    </nav>
}