import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Home />
      </div>
    </>
  );
}
