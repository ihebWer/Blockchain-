import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from "./Component/App";
import SearchTerrain from './Component/SearchTerrain';
import TerrainList from './Component/TerrainList';
import Evaluation from './Component/Evaluation';
import About from "./Component/About";
import Offer from "./Component/Offer";
import Admin from "./Component/Admin";
import Avis from "./Component/Avis";
import Confirmation from "./Component/Confirmations";
import { AuthProvider } from "./Component/AuthContext";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "Hello Web3 dApp",
  projectId: "hellDapp",
  chains: [sepolia],
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/recherche" element={<SearchTerrain />} />
                <Route path="/terrains_disponibles" element={<TerrainList />} />
                <Route path="/evaluation" element={<Evaluation />} />
                <Route path="/about" element={<About />} />
                <Route path="/offer" element={<Offer />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/avis" element={<Avis />} />
              </Routes>
            </Router>
          </AuthProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
