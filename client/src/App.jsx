import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";
import RoutesConfig from "./routes/routes";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <RoutesConfig />
      </BrowserRouter>
    </div>
  );
}

export default App;
