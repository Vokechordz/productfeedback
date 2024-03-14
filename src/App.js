import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./components/Login";
import NewFeed from "./components/NewFeed";
import EditFeed from "./components/EditFeed";


function App() {
  return (
    <Routes> 
      <Route path="/" element={<Layout/>}>
        <Route index element={<Public/>} />
        <Route path="login" element={<Login/>} />

        <Route path="dash" >
          <Route index element={<Dashboard/>} />

          <Route path="new" element={<NewFeed />} />
          <Route path="edit" element={<EditFeed/>} />
        </Route>

      </Route> 
    </Routes> //main route
  );
}

export default App;
