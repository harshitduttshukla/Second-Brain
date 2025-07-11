import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashbord } from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { PlatformProvider } from "./context/PlatformContext"; // ⬅️ Import context

function App() {
  return (
    <BrowserRouter>
      <PlatformProvider> {/* ✅ Wrap context here */}
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashbord />} />
        </Routes>
      </PlatformProvider>
    </BrowserRouter>
  );
}

export default App;
