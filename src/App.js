import TopBar from './components/topbar/TopBar';
import Home from './page/home/Home';
import Single from './page/single/Single';
import Write from './page/write/Write';
import Settings from './page/settings/Settings';
import Login from './page/login/Login';
import Register from './page/register/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const user = false;
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route
          path='/register'
          element={user ? <Home /> : <Register />}
        ></Route>
        <Route path='/login' element={user ? <Home /> : <Login />}></Route>
        <Route path='/write' element={user ? <Write /> : <Register />}></Route>
        <Route
          path='/settings'
          element={user ? <Settings /> : <Register />}
        ></Route>
        <Route path='/post/:postId' element={<Single />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
