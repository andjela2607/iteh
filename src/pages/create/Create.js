// react imports
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// custom hooks
import { useFetch } from '../../hooks/useFetch';

// styles
import './Create.css';

export default function Create() {
  // varijable forme (novog recepta)
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  // useRef nam omogućava da ostanemo u okviru input boxa i nakon unosa svakog sastojka
  const ingredientsInput = useRef(null);

  const navigate = useNavigate()

  // vraćamo postavljen novi recept korišćenjem funkcije useFetch sa metodom POST
  const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST');

  // pozivamo kada prosledimo formu
  const handleSubmit = (e) => {
    e.preventDefault();
    // podaci o receptu koji se čuvaju u bazi
    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' });
  };

  // pozivamo kada kliknemo dugme za dodavanje novog sastojka
  const handleAdd = (e) => {
    e.preventDefault();
    // skraćujemo blankove sa obe strane unosa
    const ing = newIngredient.trim();

    // proveramo da li već postoji sastojak u nizu sastojaka
    if(ing && !ingredients.includes(ing)) {
      // na postojeće sastojke dodajemo novi
      setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    // vraćamo varijablu newIngredient na početno stanje
    setNewIngredient('');
    // ostajemo u okviru input box-a
    ingredientsInput.current.focus();
  };

  // prebacujemo korisnika na početnu stranu kada dobijemo odgovor od servera
  useEffect(() => {
    if(data) {
      navigate('/');
    }
  }, [data, navigate])

  return (
    <div className='create'>
        <h2 className='page-title'>Add a New Recipe</h2>

        <form onSubmit={handleSubmit}>

          <label>
            <span>Recipe title:</span>
            <input 
              type="text"
              onChange={(e) => setTitle(e.target.value)} 
              value={title}
              required
            />
          </label>

          <label>
            <span>Recipe method:</span>
            <textarea 
              onChange={(e) => setMethod(e.target.value)} 
              value={method}
              required
            />
          </label>

          <label>
            <span>Recipe ingredients:</span>
            <div className='ingredients'> 
              <input 
                type="text" 
                onChange={(e) => setNewIngredient(e.target.value)}
                value={newIngredient}
                ref={ingredientsInput}
              />
              <button onClick={handleAdd} className='btn'>Add</button>
            </div>
          </label>
          <p>Current ingredients: {ingredients.map(ing => <em>{ing}, </em>)}</p>

          <label>
            <span>Cooking Time (minutes)</span>
            <input
              type="number"
              onChange={(e) => setCookingTime(e.target.value)}
              value={cookingTime}
              required
            />
          </label>

          <button className='btn'>Submit</button>

        </form>

    </div>
  )
}
