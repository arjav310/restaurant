import { AnimatePresence } from "framer-motion";
import Root from "./components/Root";
function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <Root />
    </AnimatePresence>
  );
}

export default App;
