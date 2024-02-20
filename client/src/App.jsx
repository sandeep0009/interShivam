import {Routes ,Route} from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Singup"
import Protected from "./components/Protected"
import Home from "./components/Home"
import Update from "./components/Update"
const App = () => {
  return (
    <div>

    <Routes>
      <Route path="/singup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/' element={<Protected Component={Home}/>}/>
      <Route path="/update/:id" element={<Update />} />
    </Routes>

    </div>
  )
}

export default App