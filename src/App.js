import { Header } from "./components";
import { AnimatePresence } from "framer-motion";
function App() {
  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
      </div>
    </AnimatePresence>
  );
}

export default App;
