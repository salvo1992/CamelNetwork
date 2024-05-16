import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import Success from "./pages/Success";
import UserProfile from './component/UserProfile/UserProfile';
import Settings from './component/Settings/Settings';
import ProfileSettings from './component/Settings/ProfileSettings';
import EmailSettings from './component/Settings/EmailSettings';
import PasswordSettings from './component/Settings/PasswordSettings';
import LanguageSettings from './component/Settings/LanguageSettings';
import NotificationsSettings from './component/Settings/NotificationsSettings';
import PrivacySettings from './component/Settings/PrivacySettings';
import CamelChat from './component/CamelChat/CamelChat';
import Contatti from './component/contatti/contatti';
import Contatore from './component/UserProfile/Camelartist';
import '../src/component/axios';


const App = () => {
  return (
      <Router>
          <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/success" element={<Success />}/>
              <Route element={<ProtectedRoutes/>}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/UserProfile" element={ <UserProfile /> } />
                  <Route path="/Settings" element={   <Settings />  } />
                  <Route path="/ProfileSettings" element={<ProfileSettings/>} />
                  <Route path="/EmailSettings" element={<EmailSettings/>} />
                  <Route path="/PasswordSettings" element={<PasswordSettings/>} />
                  <Route path="/LanguageSettings" element={<LanguageSettings/>} />
                  <Route path="/NotificationsSettings" element={<NotificationsSettings/>} />
                  <Route path="/PrivacySettings" element={<PrivacySettings/>} />
                  <Route path="/CamelChat" element={<CamelChat/>} />
                  <Route path="/contatti" element={<Contatti/>} />
                  <Route path="/Camelartist" element={<Contatore/>} />
              </Route>
          </Routes>
      </Router>
  )
}

export default App
