import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routers/AppRoute";

function App() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
