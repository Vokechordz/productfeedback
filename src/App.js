import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import NewFeed from "./components/NewFeed";
import Feed from "./components/Feed";
import Register from "./components/Register";
import EditFeedForm from "./components/EditFeedForm";
import EditFeed from "./components/EditFeed";


function App() {
  return (
    <Routes> 
      <Route path="/" element={<Layout/>}>
        <Route index element={<Login/>} />
        <Route path="create" element={<Register/>} />

        <Route path="dash" >
          <Route index element={<Dashboard/>} />

          <Route path="feedback">
             <Route path="new" element={<NewFeed />} />
             <Route path=":id" >
                <Route index element={<Feed/>} />
                <Route path="edit" element={<EditFeed/>} />
             </Route>
          </Route>
          
        </Route>

      </Route> 
    </Routes> //main route
  );
}

export default App;
