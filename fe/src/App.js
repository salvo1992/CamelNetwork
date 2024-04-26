import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import Success from "./pages/Success";
import UserProfile from './component/UserProfile/UserProfile';
import MainLayoutUser from './layouts/MainLayoutUser';
import Settings from './component/Settings/Settings';
import ProfileSettings from './component/Settings/ProfileSettings';
import EmailSettings from './component/Settings/EmailSettings';
import PasswordSettings from './component/Settings/PasswordSettings';
import LanguageSettings from './component/Settings/LanguageSettings';
import NotificationsSettings from './component/Settings/NotificationsSettings';
import PrivacySettings from './component/Settings/PrivacySettings';

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
                  <Route path="/Settings" element={<MainLayoutUser> <Settings /> </MainLayoutUser>} />
                  <Route path="/ProfileSettings" element={<ProfileSettings/>} />
                  <Route path="/EmailSettings" element={<EmailSettings/>} />
                  <Route path="/PasswordSettings" element={<PasswordSettings/>} />
                  <Route path="/LanguageSettings" element={<LanguageSettings/>} />
                  <Route path="/NotificationsSettings" element={<NotificationsSettings/>} />
                  <Route path="/PrivacySettings" element={<PrivacySettings/>} />
              </Route>
          </Routes>
      </Router>
  )
}

export default App
