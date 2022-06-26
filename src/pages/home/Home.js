// custom hooks
import { useFetch } from '../../hooks/useFetch'

// styles
import './Home.css'

// components
import RecipeList  from '../../components/RecipeList'

export default function Home() {
  // vraćamo sve recepte i informaciju o učitavanju i greški korišćenjem useFetch-a
  const { data, isPending, error } = useFetch('http://localhost:3000/recipes')

  return (
    <div className='home'>
      {/* ako imamo grešku ispisujemo je */}
      {error && <p className='error'>{error}</p>}
      {/* ako se vrši učitavanju ispisujemo poruku Loading... */}
      {isPending && <p className='loading'>Loading...</p>}
      {/* ako imamo podatke tj. recepte ispisaćemo ih */}
      {data && <RecipeList recipes={data} />} {/* prosleđujemo data do komponente RecipeList, koja će koristiti parametre recepata */}
    </div>
  )
}
