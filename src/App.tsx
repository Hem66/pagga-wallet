import EarnPage from "@pages/Earn";
import "./assets/scss/app.scss";
import "@rainbow-me/rainbowkit/styles.css";
import MainLayout from "./layouts/default";
//import MainLayout from "./layouts/MainLayout";
import MainPage from './pages/index'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebApp from "@twa-dev/sdk"
import ActionsPage from "@pages/Actions";
import SwapPage from "@pages/Swap";
import BackButton from "@components/BackButton";
import DepositPage from "@pages/Deposit";
import SendPage from "@pages/Send";
import TestEarn from "@pages/TestEarn";


const App = () => {

  WebApp.setHeaderColor(`#000`)
  WebApp.expand()

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />
          <Route
            path="/deposit"
            element={<ActionsPage />}
          />
          <Route
            path="/deposit/:token"
            element={<DepositPage />}
          />
          <Route
            path="/send"
            element={<ActionsPage />}
          />
          <Route
            path="/send/:token"
            element={<SendPage />}
          />
          <Route
            path="/swap"
            element={<SwapPage />}
          />
          <Route
            path="/earn"
            element={<EarnPage />}
          />
          <Route 
            path="/earn/testEarn" 
            element={<TestEarn />} 
          />
        </Routes>
        <BackButton />
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
