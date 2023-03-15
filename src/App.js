import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './cmp/login';
import Homepage from './cmp/homepage'
import Navbar from './cmp/navbar';
import Profile from './cmp/profile';
import ForgotPassword from './cmp/login/forgot-password';
import {Protected,LoginProtected} from './Protected';

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="*" element={<h1 className='text-center mt-10'>page not found</h1>} />
        <Route element={<LoginProtected />}>
          <Route exact path='/login' element={<Login />} />
        </Route>
        <Route element={<Protected />}>
          <Route exact path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
    );
}

export default App;
