import {Router, Route, Routes} from "react-router-dom"
import Reac from "react"
import HomePage from "./pages/HomePage"
import About from "./pages/About"
import Login from "./components/auth/Login"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"
import TareasPage from "./pages/TareasPage"
import TraeasFromPage from "./pages/TareasFromPage"



function App() {
  return (
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route pahth="/about" element={<About/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>

    <Route path="/perfil" element={<ProfilePage/>}/>
    <Route path="/tareas" element={<TareasPage/>}/>
    <Route path="/tareas/crear" element={<TraeasFromPage/>}/>
     <Route path="/tareas/editar/:id" element={<TraeasFromPage/>}/>




    
    </Routes>
  
  )
}

export default App
