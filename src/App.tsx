import Kanbas from "./Kanbas";
import { HashRouter } from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";

function App() {
  return (
    <HashRouter>
      <>
        <Routes>
          <Route path="/"         element={<Navigate to="/kanbas"/>}/>
          <Route path="/kanbas/*" element={<Kanbas/>}/>
        </Routes>

      </>
    </HashRouter>
  );
}
export default App;

