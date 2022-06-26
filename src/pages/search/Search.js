// react imports
import { useLocation } from 'react-router-dom';

// custom hooks
import { useFetch } from '../../hooks/useFetch';

// styles
import './Search.css';

// components
import RecipeList from '../../components/RecipeList';

export default function Search() {
  // vraćamo URL koji pretražujemo tj. /search?q="unos"
  const queryString = useLocation().search;
  // u queryParams unosimo sve atribute koji se mogu pronaći u okviru URL-a
  // tj one koji imaju zapis ?atribut="..."
  const queryParams = new URLSearchParams(queryString);
  // imamo samo atribut q, u kom je zapisano ono što je korisnik pretražio
  // tako da to unosimo u varijablu query
  const query = queryParams.get('q');

  // za URL postavljamo recepte i prosleđeni upit, kako bismo u okviru json-a mogli da
  // pronađemo recepte koji odgovaraju pretrazi
  const url = 'http://localhost:3000/recipes?q=' + query; 
  
  const { error, isPending, data } = useFetch(url);

  return (
    <div>
      <h2 className='page-title'>Recipes including "{query}"</h2>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data}/>}
    </div>
  )
}
