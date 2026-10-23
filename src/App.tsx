import React, { useState, useEffect } from 'react';
import { NavigationTab, Article } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ConsultationModal from './components/ConsultationModal';
import LegalModal from './components/LegalModals';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import PracticeAreasScreen from './screens/PracticeAreasScreen';
import ContactScreen from './screens/ContactScreen';
import IndustriesScreen from './screens/IndustriesScreen';
import ApproachScreen from './screens/ApproachScreen';
import InsightsScreen from './screens/InsightsScreen';
import ArticleDetailScreen from './screens/ArticleDetailScreen';
import AdminLoginScreen from './screens/admin/AdminLoginScreen';
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import AdminArticleEditorScreen from './screens/admin/AdminArticleEditorScreen';
import { getAdminToken, clearAdminAuth } from './services/articleService';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [adminView, setAdminView] = useState<'login' | 'dashboard' | 'editor' | null>(null);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationDomain, setConsultationDomain] = useState<string>('Corporate & Commercial');
  const [legalModalType, setLegalModalType] = useState<'disclaimer' | 'privacy' | 'terms' | null>(
    null
  );

  // Sync hash routing on mount and hashchange
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim();

      // Admin routes
      if (rawHash === 'admin') {
        setAdminView(getAdminToken() ? 'dashboard' : 'login');
        setSelectedArticleSlug(null);
        return;
      }
      if (rawHash === 'admin/new' || rawHash === 'admin/articles/new') {
        setAdminView(getAdminToken() ? 'editor' : 'login');
        setEditingArticleId(null);
        setSelectedArticleSlug(null);
        return;
      }
      if (rawHash.startsWith('admin/articles/') || rawHash.startsWith('admin/edit/')) {
        const id = rawHash.replace(/^(admin\/articles\/|admin\/edit\/)/, '').trim();
        setAdminView(getAdminToken() ? 'editor' : 'login');
        setEditingArticleId(id || null);
        setSelectedArticleSlug(null);
        return;
      }

      // Public site routes
      setAdminView(null);
      setEditingArticleId(null);

      if (rawHash.startsWith('insights/')) {
        const slug = rawHash.replace('insights/', '').trim();
        setCurrentTab('insights');
        setSelectedArticleSlug(slug || null);
        return;
      }

      setSelectedArticleSlug(null);
      const validTabs: NavigationTab[] = [
        'home',
        'about-us',
        'practice-areas',
        'industries',
        'our-approach',
        'insights',
        'contact',
      ];
      if (validTabs.includes(rawHash as NavigationTab)) {
        setCurrentTab(rawHash as NavigationTab);
      } else {
        setCurrentTab('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (tab: NavigationTab) => {
    setAdminView(null);
    setSelectedArticleSlug(null);
    setCurrentTab(tab);
    window.location.hash = tab === 'home' ? '' : tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: Article) => {
    setAdminView(null);
    setCurrentTab('insights');
    setSelectedArticleSlug(article.slug);
    window.location.hash = `insights/${article.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (domain = 'Corporate & Commercial') => {
    setConsultationDomain(domain);
    setIsConsultationOpen(true);
  };

  // ADMIN SCREENS
  if (adminView === 'login') {
    return (
      <AdminLoginScreen
        onLoginSuccess={() => {
          setAdminView('dashboard');
          window.location.hash = 'admin';
        }}
        onBackToSite={() => handleNavigate('home')}
      />
    );
  }

  if (adminView === 'editor') {
    return (
      <AdminArticleEditorScreen
        articleId={editingArticleId}
        onSaveSuccess={() => {
          setAdminView('dashboard');
          setEditingArticleId(null);
          window.location.hash = 'admin';
        }}
        onCancel={() => {
          setAdminView('dashboard');
          setEditingArticleId(null);
          window.location.hash = 'admin';
        }}
      />
    );
  }

  if (adminView === 'dashboard') {
    return (
      <AdminDashboardScreen
        onCreateNew={() => {
          setAdminView('editor');
          setEditingArticleId(null);
          window.location.hash = 'admin/articles/new';
        }}
        onEditArticle={(id) => {
          setAdminView('editor');
          setEditingArticleId(id);
          window.location.hash = `admin/articles/${id}`;
        }}
        onLogout={() => {
          clearAdminAuth();
          setAdminView('login');
          window.location.hash = 'admin';
        }}
        onViewPublicSite={() => handleNavigate('insights')}
      />
    );
  }

  // PUBLIC SITE VIEW
  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f8] text-[#1b1b1b] antialiased selection:bg-[#ffdad3] selection:text-[#b51c00]">
      {/* Sticky Global Architectural Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20">
        {currentTab === 'insights' && selectedArticleSlug ? (
          <ArticleDetailScreen
            slug={selectedArticleSlug}
            onBackToInsights={() => {
              setSelectedArticleSlug(null);
              window.location.hash = 'insights';
            }}
            onSelectArticle={handleSelectArticle}
            onOpenConsultation={handleOpenConsultation}
          />
        ) : currentTab === 'insights' ? (
          <InsightsScreen
            onSelectArticle={handleSelectArticle}
            onOpenConsultation={handleOpenConsultation}
          />
        ) : null}

        {currentTab === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentTab === 'about-us' && (
          <AboutScreen
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentTab === 'practice-areas' && (
          <PracticeAreasScreen onOpenConsultation={handleOpenConsultation} />
        )}

        {currentTab === 'industries' && (
          <IndustriesScreen onOpenConsultation={handleOpenConsultation} />
        )}

        {currentTab === 'our-approach' && (
          <ApproachScreen onOpenConsultation={handleOpenConsultation} />
        )}

        {currentTab === 'contact' && <ContactScreen />}
      </main>

      {/* Verified Office Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegalModal={(type) => setLegalModalType(type)}
      />

      {/* Floating Verified Email Consultation Desk Button */}
      <FloatingWhatsApp />

      {/* Duty Counsel Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultDomain={consultationDomain}
      />

      {/* Statutory Legal & Compliance Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
