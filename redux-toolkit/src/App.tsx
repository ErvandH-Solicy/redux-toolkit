import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Users from './components/user/users';
import UserInfo from "./components/userInfo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/userInfo/:id' element={<UserInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
