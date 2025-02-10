import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>Recipes Manager</h1>
                </Link>
                <nav>
                    <div>
                        <Link to='/nutrition-analysis'>Nutrition Analysis</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar