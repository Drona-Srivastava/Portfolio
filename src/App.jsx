import Home from './components/Home'
import './App.css'
import Dev from "./pages/Dev";
import Casual from "./pages/Casual";

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/dev") return <Dev />;
  if (path === "/casual") return <Casual />;

  return <Home />;
}

export default App;