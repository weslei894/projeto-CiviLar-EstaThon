import { useState, useCallback } from 'react';
import './App.css';
import BottomNav from './components/BottomNav';
import ToastContainer from './components/ToastContainer';
import { useToast } from './hooks/useToast';
import type { Page } from './types';

import SplashScreen from './pages/SplashScreen';
import LoginScreen from './pages/LoginScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import HomeScreen from './pages/HomeScreen';
import ExplorarScreen from './pages/ExplorarScreen';
import MapScreen from './pages/MapScreen';
import PrestadorDetailScreen from './pages/PrestadorDetailScreen';
import CadastrarScreen from './pages/CadastrarScreen';
import PortfolioScreen from './pages/PortfolioScreen';
import DadosScreen from './pages/DadosScreen';
import ReferralScreen from './pages/ReferralScreen';
import PerfilScreen from './pages/PerfilScreen';
import AvaliacoesScreen from './pages/AvaliacoesScreen';
import PrivacidadeScreen from './pages/PrivacidadeScreen';
import ChatListScreen from './pages/ChatListScreen';
import ChatScreen from './pages/ChatScreen';
import AssinaturaScreen from './pages/AssinaturaScreen';
import PublicarScreen from './pages/PublicarScreen';
import MeusServicosScreen from './pages/MeusServicosScreen';
import DashboardScreen from './pages/DashboardScreen';

type CurrentUser = { name: string; phone: string; bairro: string; role: 'prestador' | 'solicitante' | 'ambos' };

export default function App() {
  const [phase, setPhase] = useState<'splash' | 'welcome' | 'login' | 'app'>('splash');
  const [page, setPage] = useState<Page>('home');
  const [prestadorId, setPrestadorId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [chatId, setChatId] = useState<number | null>(null);
  const [activeChatIds, setActiveChatIds] = useState<number[]>([]);
  const [unreadChats, setUnreadChats] = useState(2);
  const { toasts, showToast } = useToast();

  const tabPages: Page[] = ['home', 'explorar', 'mapa', 'publicar', 'chat-list', 'perfil'];
  const isTabPage = (p: Page) => tabPages.includes(p);

  const handleNavigate = useCallback((target: string) => {
    setPage(target as Page);
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = useCallback((userData: CurrentUser) => {
    setCurrentUser(userData);
    setPhase('app');
    setPage('home');
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
    setCurrentUser(null);
    setPhase('welcome');
    setPage('home');
  }, []);

  const handleOpenChat = useCallback((id: number) => {
    if (!activeChatIds.includes(id)) setActiveChatIds(prev => [id, ...prev]);
    setChatId(id);
    setPage('chat');
    setUnreadChats(prev => Math.max(0, prev - 1));
    window.scrollTo(0, 0);
  }, [activeChatIds]);

  return (
    <div className="app-container">
      {phase === 'splash' && <SplashScreen onFinish={() => setPhase('welcome')} />}
      {phase === 'welcome' && <WelcomeScreen onEnter={() => setPhase('login')} />}
      {phase === 'login' && <LoginScreen onLogin={handleLogin} onBack={() => setPhase('welcome')} />}

      {phase === 'app' && (
        <>
          {page === 'home' && (
            <HomeScreen onNavigate={handleNavigate} onShowPrestador={handleShowPrestador} onToast={showToast} userRole={currentUser?.role} userBairro={currentUser?.bairro} />
          )}
          {page === 'explorar' && (
            <ExplorarScreen onShowPrestador={handleShowPrestador} onNavigate={handleNavigate} onChatSelect={handleOpenChat} />
          )}
          {page === 'prestador' && prestadorId !== null && (
            <PrestadorDetailScreen prestadorId={prestadorId} onBack={handleBack} onToast={showToast} onChatStart={handleOpenChat} />
          )}
          {page === 'mapa' && (
            <MapScreen onShowPrestador={handleShowPrestador} onBack={() => setPage('home')} />
          )}
          {page === 'cadastrar' && (
            <CadastrarScreen onBack={() => setPage('home')} onToast={showToast} />
          )}
          {page === 'dados' && (
            <DadosScreen onBack={() => setPage('home')} />
          )}
          {page === 'perfil' && (
            <PerfilScreen onLogout={handleLogout} onNavigate={handleNavigate} currentUser={currentUser} />
          )}
          {page === 'portfolio' && (
            <PortfolioScreen onBack={() => setPage('perfil')} onToast={showToast} />
          )}
          {page === 'referral' && (
            <ReferralScreen onBack={() => setPage('perfil')} onToast={showToast} />
          )}
          {page === 'avaliacoes' && (
            <AvaliacoesScreen onBack={() => setPage('perfil')} />
          )}
          {page === 'privacidade' && (
            <PrivacidadeScreen onBack={() => setPage('perfil')} />
          )}
          {page === 'chat-list' && (
            <ChatListScreen onBack={() => setPage('home')} onChatSelect={handleOpenChat} activeChatIds={activeChatIds} />
          )}
          {page === 'chat' && chatId !== null && (
            <ChatScreen onBack={() => { setChatId(null); setPage('chat-list'); }} chatId={chatId} />
          )}
          {page === 'assinatura' && (
            <AssinaturaScreen onBack={() => setPage('perfil')} onToast={showToast} />
          )}
          {page === 'publicar' && (
            <PublicarScreen onBack={() => setPage('home')} onToast={showToast} />
          )}
          {page === 'meus-servicos' && (
            <MeusServicosScreen onBack={() => setPage('perfil')} onOpenChat={handleOpenChat} userRole={currentUser?.role} />
          )}
          {page === 'dashboard' && (
            <DashboardScreen onBack={() => setPage('perfil')} currentUser={currentUser} />
          )}

          {isTabPage(page) && (
            <BottomNav active={page} onNavigate={handleNavigate} userRole={currentUser?.role} unreadChats={unreadChats} />
          )}
        </>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}
