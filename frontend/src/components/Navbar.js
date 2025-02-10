import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>Recipes Manager</h1>
                </Link>

                <nav>
                    { user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}

                    { !user && (
                        <div>
                            <Link to='/nutrition-analysis'>Nutrition Analysis</Link>
                            <Link to='/login'>Log in</Link>
                            <Link to='/register'>Sign up</Link>
                        </div>
                    )}
                </nav>

            </div>
        </header>
    )
}

export default Navbar