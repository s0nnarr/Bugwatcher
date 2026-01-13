import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/homePage/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";



export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
