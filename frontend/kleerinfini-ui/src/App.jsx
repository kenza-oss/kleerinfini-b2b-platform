import React from "react";
import AppRoutes from "./routes/AppRoutes";
import ProducerDashboard from "./pages/ProducerDashboard";
import './index.css'; 

function App() {
  return (
    <div>
      <ProducerDashboard/>
      <AppRoutes />
    </div>
  );
}

export default App;
