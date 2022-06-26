// react imports
import { Link } from 'react-router-dom';

// styles
import './Navbar.css';

// components
import SearchBar from './SearchBar';

export default function Navbar() {

    return (
        <div className='navbar'>
            <nav>
                {/* title */}
               <Link to="/" className='brand'>
                    <h1>Recipe directory</h1>
               </Link> 

               {/* searchbar component */}
               <SearchBar />

               {/* create recipe page */}
               <Link to="/create">Create Recipe</Link>
            </nav>
        </div>
  )
}
