import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Home from './components/components_lite/Home';
import PrivacyPolicy from './components/components_lite/PrivacyPolicy';
import TermsOfService from './components/components_lite/TermsOfService';
import Jobs from './components/components_lite/Jobs.jsx';
import Browse from './components/components_lite/Browse';
import Profile from './components/components_lite/Profile.jsx';
import Description from './components/components_lite/Description.jsx';
import Companies from './components/admincomponent/Companies';
import CompanyCreate from './components/admincomponent/CompanyCreate';
import CompanySetup from './components/admincomponent/CompanySetup';
import AdminJobs from './components/admincomponent/AdminJobs';
import PostJob from './components/admincomponent/PostJob';
import Applicants from './components/admincomponent/Applicants';
import ProtectedRoute from './components/admincomponent/ProtectedRoute';
import Creator from './components/creator/Creator';
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Navbar is inside Home
  },
  {
    path: "/login",
    element: <Login />, // No Navbar
  },
  {
    path: "/register",
    element: <Register />, // No Navbar
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />, // No Navbar
  },
  {
    path: "/TermsOfService",
    element: <TermsOfService />, // No Navbar
  },
  {
    path: "/Jobs",
    element: <Jobs />, // No Navbar
  },
  {
    path: "/Home",
    element: <Home />, // Navbar is inside Home
  },
  {
    path: "/Browse",
    element: <Browse />, // Navbar is inside Home
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path:"/Creator",
    element: <Creator />
  },
  {
    path: "/description/:id",
    element: <Description />,
  },
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  ,
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        {" "}
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        {" "}
        <PostJob />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),

  }
  
]);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;

