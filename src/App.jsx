import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SolanaWalletProvider } from "./config/WalletProvider.jsx";
import ContractContextProvider from "./contexts/contractsOnSolana/contractContexts.jsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AllTokensPage from "./pages/AllTokensPage.jsx";
import ComingSoonPage from "./pages/ComingSoonPage.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import Privacy from "./pages/Privacy.jsx";
import Disclaimer from "./pages/Disclaimer.jsx";
import { SolPriceProvider } from "./contexts/SolPriceContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import TokenPage from "./pages/TokenPage.jsx";
import ThirdPartyIPAgreement from "./pages/ThirdPartyIPAgreement.jsx";
import StreamerPage from "./pages/StreamerPage.jsx";
import SupportPage from "./pages/SupportPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <ThemeProvider>
      <SolanaWalletProvider>
        <AuthProvider>
          <SolPriceProvider>
            <ToastProvider>
              <ContractContextProvider>
                <Router>
                  <div className="">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/all-tokens" element={<AllTokensPage />} />
                      <Route
                        path="/profile/:username"
                        element={<ProfilePage />}
                      />
                      <Route path="/coming-soon" element={<ComingSoonPage />} />
                      <Route
                        path="/terms-of-service"
                        element={<TermsOfService />}
                      />
                      <Route
                        path="/third-party-ip-agreement"
                        element={<ThirdPartyIPAgreement />}
                      />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/disclaimer" element={<Disclaimer />} />
                      <Route
                        path="/token/:tokenAddress"
                        element={<TokenPage />}
                      />
                      <Route
                        path="/streamers"
                        element={<HomePage isStreamersPage={true} />}
                      />
                      <Route
                        path="/streamer/:streamer"
                        element={<StreamerPage />}
                      />
                      <Route path="/support" element={<SupportPage />} />
                      {/* Catch-all route for 404 pages */}
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </div>
                </Router>
              </ContractContextProvider>
            </ToastProvider>
          </SolPriceProvider>
        </AuthProvider>
      </SolanaWalletProvider>
    </ThemeProvider>
  );
}

export default App;
