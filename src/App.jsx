import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SolanaWalletProvider } from './config/WalletProvider.jsx';
import ContractContextProvider from './contexts/contractsOnSolana/contractContexts.jsx';
import { ToastProvider } from './contexts/ToastContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AllTokensPage from './pages/AllTokensPage.jsx';
import ComingSoonPage from './pages/ComingSoonPage.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import Privacy from './pages/Privacy.jsx';
import Disclaimer from './pages/Disclaimer.jsx';
import { SolPriceProvider } from './contexts/SolPriceContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

function App() {
  return (
    <ThemeProvider>
      <SolanaWalletProvider>
        <AuthProvider>
          <SolPriceProvider>
            <ToastProvider>
              <ContractContextProvider>
                <Router>
                  <div className="pb-16 md:pb-0">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/all-tokens" element={<AllTokensPage />} />
                      <Route path="/profile/:username" element={<ProfilePage />} />
                      <Route path="/coming-soon" element={<ComingSoonPage />} />
                      <Route path="/terms-of-service" element={<TermsOfService/>} />
                      <Route path="/privacy" element={<Privacy/>} />
                      <Route path="/disclaimer" element={<Disclaimer/>} />
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