import React from "react";
import { Outlet } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import { DocumentProvider } from "./context/DocumentContext";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <NotificationProvider>
      <DocumentProvider>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <main>
            <Outlet />
          </main>
        </div>
      </DocumentProvider>
    </NotificationProvider>
  );
}

export default App;