import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomeScreen } from "./components/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home?p=1" replace />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
