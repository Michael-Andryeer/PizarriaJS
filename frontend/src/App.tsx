import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import Login from './pages/login/Login';
import { Register } from './pages/register/Register';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;