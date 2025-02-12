import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NutritionAnalysis from './pages/NutritionAnalysis';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className='pages'>
          <Routes>
            <Route path='/' element={ user ? <Home /> : <Navigate to='/login' />} />
            <Route path='/login' element={ !user ? <Login /> : <Navigate to='/' />} />
            <Route path='/register' element={ !user ? <Signup /> : <Navigate to='/' />} />
            <Route path='/nutrition-analysis' element={ user ? <NutritionAnalysis /> : <Navigate to='/login' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
