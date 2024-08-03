import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import PostsList from "./PostsList";
import Error from "./Error";
import Signup from "./Signup";
import Login from "./Login";
import PostForm from "./PostForm";
import UsersList from "./UsersList";

function App() {
  const { AuthToken, currentUser } = useContext(AuthContext)
  const location = useLocation();
  const isAuth = AuthToken ? true : false

  const hideNavbarRoutes = ['/signup', '/login'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={isAuth ? <PostsList /> : <Navigate to="/login" />} />
        <Route path="/postForm" element={isAuth ? <PostForm /> : <Navigate to="/login" />} />
        <Route path="/UsersList" element={(isAuth && currentUser?.role === 'SuperAdmin') ? <UsersList /> : <Error />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
