import SignUp from "./SignUp.jsx"
import NavBar from "./NavBar.jsx"
import ProductCard from "./ProductCard.jsx"
import Login from "./Login.jsx"
import Home from "./Home.jsx"
import {Routes, Route} from "react-router-dom"
import ProtectedRoute from "./ProtectedRoutes.jsx"
import Profile from "./Profile.jsx"
import {AuthProvider} from "./AuthContext.jsx"
// w-1/3
// sm	40rem (640px)	
// md	48rem (768px)	
// lg	64rem (1024px)
// xl	80rem (1280px)	
// 2xl	96rem (1536px)

const App = () => {
  return (
    // <div className="">
    //   <NavBar/>
    //   {/* <Login/> */}
    //   <Home/>
    //   {/* <SignUp /> */}
    //  {/* <ProductCard/> */}
    // </div>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Login required to see /profile */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App;