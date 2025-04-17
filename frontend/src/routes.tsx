import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Workspace from './components/Workspace/Workspace';
import Templates from './components/Templates/Templates';
import About from './components/About/About';
import CloudStorage from './components/CloudStorage/CloudStorage';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ForgotPassword from './components/Auth/ForgotPassword';
import Donation from './components/Donation/Donation';
import HallOfFame from './components/Donation/HallOfFame';
import SubscriptionPlans from './components/Subscription/SubscriptionPlans';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/workspace/:pageId" element={<Workspace />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/about" element={<About />} />
      <Route path="/storage" element={<CloudStorage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/donate" element={<Donation />} />
      <Route path="/hall-of-fame" element={<HallOfFame />} />
      <Route path="/subscription" element={<SubscriptionPlans />} />
    </Routes>
  );
};

export default AppRoutes; 