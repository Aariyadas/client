import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile"
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import ProtectedPages from "./Coponents/ProtectedPages";
import { useSelector } from "react-redux";
import Loader from "./Coponents/Loader";



function App() {
  const {loading} =useSelector((state)=>state.loaders)
  return (
    <div>
      {loading && <Loader/>}
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<ProtectedPages><Home/></ProtectedPages>}/>
    <Route path='/profile' element={<ProtectedPages><Profile/></ProtectedPages>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
   </Routes>
   </BrowserRouter>
   </div>
  );
}

export default App;
