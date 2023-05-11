import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../src/Login';
import Signup from '../src/Signup';
import Dashboard from './Dashboard';
import Homepage from "./Homepage";
import Profile from "./Profile";
import SettingsPage from "./SettingsPage";

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;
