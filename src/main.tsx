import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HeroUIProvider } from "@heroui/react";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HeroUIProvider>
      <main className='dark text-foreground'>
        <App />
      </main>
    </HeroUIProvider>
  </React.StrictMode>
);
