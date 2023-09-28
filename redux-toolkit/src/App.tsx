import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Users from './components/user/users';
import UserInfo from "./components/userInfo";
import Favorites from "./components/favorites";
import Navigate from "./components/navigate";
import Home from "./components/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigate />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<Users />} />
          <Route path='/userInfo/:id' element={<UserInfo />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
