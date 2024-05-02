import { Outlet, Link } from "react-router-dom";
import './App.css';

function Layout() {
    return (
        <>
            <header>
                <ul>
                    <li>
                        <Link to="/movies">Movie List</Link>
                    </li>
                    <li>
                        <Link to="/movies/add">Add Movie</Link>
                    </li>
                    <li>
                        <Link to="/users">User List</Link>
                    </li>
                    <li>
                        <Link to="/users/add">Add User</Link>
                    </li>
                </ul>
            </header>
            <Outlet />
            <footer>
                <p>&copy; 2024</p>
            </footer>
        </>
    );
}

export default Layout;
