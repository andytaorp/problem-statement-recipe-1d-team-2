import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NutritionAnalysis from './pages/NutritionAnalysis';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/nutrition-analysis' element={<NutritionAnalysis />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
