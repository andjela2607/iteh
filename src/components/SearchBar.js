// react imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import './SearchBar.css';

export default function SearchBar() {
    const [term, setTerm] = useState();
    const navigate = useNavigate()

    // pozivamo kada prosledimo formu (pretragu)
    const handleSubmit = (e) => { // e = event
        e.preventDefault();
        // sprečavamo ponovno učitavanje stranice, što je default ponašanje submit funckije
        navigate(`/search?q=${term}`);
        // redirectujemo korisnika na stranicu search?q="ono_što_je_upisano_u_pretragu"
    }

    return (
        <div className='searchbar'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search</label>
                <input 
                    type="text"
                    id="search"
                    // kada god unesemo nešto u pretragu, varijabla term postaje to što je uneto
                    onChange={(e) => setTerm(e.target.value)}
                    required
                />
            </form>
        </div>
  )
}
