import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./components/Login";


function App() {
  return (
    <Routes> 
      <Route path="/" element={<Layout/>}>
        <Route index element={<Public/>} />
        <Route path="login" element={<Login/>} />

        <Route path="dash" >
          <Route index element={<Dashboard/>} />
        </Route>

      </Route> 
    </Routes> //main route
  );
}

export default App;
