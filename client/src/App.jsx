import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./routes/routes";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="main">
          <div className="virtual-sidebar"></div>
          <RoutesConfig />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
