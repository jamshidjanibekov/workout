import Home from "@/pages/home.tsx";
import Navbar from "@/components/shared/navbar.tsx";
import {Route, Routes} from "react-router-dom";
import Auth from "@/pages/auth.tsx";
import Dashboard from "@/pages/dashboard.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
      </Routes>
      <Toaster position={'top-center'}/>
    </>
  );
};

export default App;