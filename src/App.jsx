import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomeScreen } from "./components/HomeScreen";
import { Exhibition } from "./components/Exhibition";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home?page=1" replace />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route
          path="/exhibitions/:api/:exhibition_id"
          element={<Exhibition />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
