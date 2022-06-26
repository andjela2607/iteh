// react imports
import { useParams} from 'react-router-dom';

// custom hooks
import { useFetch } from '../../hooks/useFetch';

// styles
import './Recipe.css';

export default function Recipe() {
  // koristimo useParams da bismo vratili id konkretnog recepta koji želimo da prikažemo
  const { id } = useParams(); 
  // iz baze (sa url-a ispod) uzimamo informacije o traženom receptu na osnovu id-a
  const url = 'http://localhost:3000/recipes/' + id;
  // vraćamo konkretni recept i informaciju o učitavanju i greški korišćenjem useFetch-a
  const { error, isPending, data: recipe } = useFetch(url);

  return (
    <div className='recipe'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className='method'>{recipe.method}</p>
        </>
      )}
    </div>
  )
}
