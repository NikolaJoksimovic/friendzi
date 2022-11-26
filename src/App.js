import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route index element={<Home></Home>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/auth' element={<Auth></Auth>}></Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
