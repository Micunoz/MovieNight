import { Outlet, Link } from "react-router-dom";
import './App.css';

function Layout() {
    return (
        <>

            <header>
                <ul>
                    <li>
                        <Link to="/movies" class="linkheader">Movie List</Link>
                    </li>
                    <li>
                        <Link to="/movies/add" class="linkheader">Add Movie</Link>
                    </li>
                    <li>
                        <Link to="/users" class="linkheader">User List</Link>
                    </li>
                    <li>
                        <Link to="/users/add" class="linkheader">Add User</Link>
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
