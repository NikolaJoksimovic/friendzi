import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Booking from "./pages/Booking";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route index element={<Home></Home>}></Route>
          <Route path='/auth' element={<Auth></Auth>}></Route>
          <Route path='/onboarding' element={<Onboarding></Onboarding>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route
            path='/dashboard/booking'
            element={<Booking></Booking>}
          ></Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
