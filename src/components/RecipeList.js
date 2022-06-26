// react imports
import { Link } from 'react-router-dom';

// styles
import './RecipeList.css';

export default function RecipeList({ recipes }) {

  if(recipes.length === 0) { // provera da li imamo recepte
    return <div className='error'>No recipes to load...</div> // ispis u slučaju da nemamo recepte
  }

  return ( // prikaz u slučaju kada imamo recepte
    <div className='recipe-list'>
        {recipes.map(recipe => (  // prolazimo kroz sve recepte i za svaki prikazujemo sledeći template
            // key - identifikator svakog recepta (obavezno za map funckije)
            <div key={recipe.id} className='card'>  
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime} to make.</p>
                {/* skraćeni prikaz metoda pravljenja recepta na 100 karaktera */}
                <div>{recipe.method.substring(0, 100)}...</div>
                {/* link ka pojedinačnom receptu */}
                <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
            </div>
        ))}
    </div>
  )
}