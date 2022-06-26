// react imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// page components
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';

// styles
import './App.css';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* homepage */}
          <Route path='/' element={<Home />} /> 

          {/* add recipe page */}
          <Route path="/create" element={<Create />} />

          {/* search page */}
          <Route path="/search" element={<Search />} />
          
          {/* single recipe page */}
          {/* :id - id recepta u URL */}
          <Route path="/recipes/:id" element={<Recipe />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
