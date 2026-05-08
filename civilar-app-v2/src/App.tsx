import { useState, useCallback } from 'react';
import './App.css';
import BottomNav from './components/BottomNav';
import ToastContainer from './components/ToastContainer';
import { useToast } from './hooks/useToast';
import type { Page } from './types';

import SplashScreen from './pages/SplashScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import HomeScreen from './pages/HomeScreen';
import ExplorarScreen from './pages/ExplorarScreen';
import PrestadorDetailScreen from './pages/PrestadorDetailScreen';
import CadastrarScreen from './pages/CadastrarScreen';
import DadosScreen from './pages/DadosScreen';
import PerfilScreen from './pages/PerfilScreen';

export default function App() {
  const [phase, setPhase] = useState<'splash' | 'welcome' | 'app'>('splash');
  const [page, setPage] = useState<Page>('home');
  const [prestadorId, setPrestadorId] = useState<number | null>(null);
  const { toasts, showToast } = useToast();

  const isTabPage = (p: Page) => ['home', 'explorar', 'cadastrar', 'dados', 'perfil'].includes(p);

  const handleNavigate = useCallback((target: string) => {
    const p = target as Page;
    setPage(p);
    window.scrollTo(0, 0);
  }, []);

  const handleShowPrestador = useCallback((id: number) => {
    setPrestadorId(id);
    setPage('prestador');
    window.scrollTo(0, 0);
  }, []);

  const handleBack = useCallback(() => {
    setPage('explorar');
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = useCallback(() => {
    setPhase('welcome');
    setPage('home');
  }, []);

  return (
    <div className="app-container">
      {phase === 'splash' && (
        <SplashScreen onFinish={() => setPhase('welcome')} />
      )}

      {phase === 'welcome' && (
        <WelcomeScreen onEnter={() => setPhase('app')} />
      )}

      {phase === 'app' && (
        <>
          {page === 'home' && (
            <HomeScreen onNavigate={handleNavigate} onShowPrestador={handleShowPrestador} onToast={showToast} />
          )}
          {page === 'explorar' && (
            <ExplorarScreen onShowPrestador={handleShowPrestador} onNavigate={handleNavigate} />
          )}
          {page === 'prestador' && prestadorId !== null && (
            <PrestadorDetailScreen prestadorId={prestadorId} onBack={handleBack} onToast={showToast} />
          )}
          {page === 'cadastrar' && (
            <CadastrarScreen onBack={() => setPage('home')} onToast={showToast} />
          )}
          {page === 'dados' && (
            <DadosScreen onBack={() => setPage('home')} />
          )}
          {page === 'perfil' && (
            <PerfilScreen onLogout={handleLogout} onToast={showToast} />
          )}

          {isTabPage(page) && (
            <BottomNav active={page} onNavigate={setPage} />
          )}
        </>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}
