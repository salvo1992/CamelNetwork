import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import Success from "./pages/Success";

const App = () => {
  console.log(process.env);
  return (
      <Router>
          <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/success" element={<Success />}/>
              <Route element={<ProtectedRoutes/>}>
                  <Route path="/home" element={<Home />} />
              </Route>
          </Routes>
      </Router>
  )
}

export default App
