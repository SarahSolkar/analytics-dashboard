import { Advisors } from "./components/Advisors";
import { AppNavbar } from "./components/AppNavbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <div>
        <AppNavbar />
        <Advisors />
        <Footer />
      </div>
    </>
  );
}

export default App;
