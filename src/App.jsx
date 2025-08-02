import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SolanaWalletProvider } from './config/WalletProvider.jsx';
import ContractContextProvider from './contexts/contractsOnSolana/contractContexts.jsx';
import { ToastProvider } from './contexts/ToastContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AllTokensPage from './pages/AllTokensPage.jsx';
import ComingSoonPage from './pages/ComingSoonPage.jsx';
import TokenPage from './pages/TokenPage.jsx';
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
                      <Route path="/token/:tokenAddress" element={<TokenPage />} />
                      <Route path="/profile/:username" element={<ProfilePage />} />
                      <Route path="/coming-soon" element={<ComingSoonPage />} />
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