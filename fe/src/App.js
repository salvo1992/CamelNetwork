import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import Success from "./pages/Success";
import UserProfile from './component/UserProfile/UserProfile';
import MainLayoutUser from './layouts/MainLayoutUser';

const App = () => {
  console.log(process.env);
  return (
      <Router>
          <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/success" element={<Success />}/>
              <Route element={<ProtectedRoutes/>}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/UserProfile" element={<MainLayoutUser> <UserProfile /> </MainLayoutUser>} />
              </Route>
          </Routes>
      </Router>
  )
}

export default App
