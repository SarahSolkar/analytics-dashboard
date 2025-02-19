import { Dashboard } from "./components/Dashboard";
import { AppNavbar } from "./components/AppNavbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <div>
        <AppNavbar />
        <Dashboard />
        <Footer />
      </div>
    </>
  );
}

export default App;
