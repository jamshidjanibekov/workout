import Home from "@/pages/home.tsx";
import Navbar from "@/components/shared/navbar.tsx";
import {Route, Routes} from "react-router-dom";
import Auth from "@/pages/auth.tsx";

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
    </div>
  );
};

export default App;