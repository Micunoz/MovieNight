import { Outlet, Link } from "react-router-dom";
import './App.css';

function Layout() {
    return (
        <>
            <header>
                <ul>
                    <li>
                        <Link to="/project">Project List</Link>
                    </li>
                    <li>
                        <Link to="/project/new">Add Project</Link>
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
