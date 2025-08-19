import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { EventsPage } from './components/EventsPage';
import { EventDetailPage } from './components/EventDetailPage';
import { CartPage } from './components/CartPage';
import { PaymentPage } from './components/PaymentPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { CookiePolicyPage } from './components/CookiePolicyPage';
import { ContactPage } from './components/ContactPage';
import { FAQPage } from './components/FAQPage';
import { AboutPage } from './components/AboutPage';
import { ThankYouPage } from './components/ThankYouPage';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { CartProvider } from './components/CartProvider';
import { LanguageProvider } from './components/LanguageProvider';

type Page = 'home' | 'events' | 'event-detail' | 'cart' | 'payment' | 'thank-you' | 'privacy-policy' | 'terms-of-service' | 'cookie-policy' | 'contact' | 'faq' | 'about';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  // Load cookie preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('tvoja-karta-cookie-preferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setCookiePreferences(parsed);
        
        // Initialize analytics if enabled
        if (parsed.analytics) {
          // Here you would initialize Google Analytics or other analytics tools
          console.log('Analytics initialized');
        }
        
        // Initialize marketing tools if enabled
        if (parsed.marketing) {
          // Here you would initialize marketing pixels, etc.
          console.log('Marketing tools initialized');
        }
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  const navigate = useCallback((page: Page, eventId?: string) => {
    setCurrentPage(page);
    if (eventId) setSelectedEventId(eventId);
    
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setSelectedCategory(''); // Clear category when searching
    setCurrentPage('events');
  }, []);

  const handleCategoryFilter = useCallback((category: string) => {
    setSelectedCategory(category);
    setSearchTerm(''); // Clear search when filtering by category
    setCurrentPage('events');
  }, []);

  const handleCookiePreferencesChange = useCallback((preferences: CookiePreferences) => {
    setCookiePreferences(prevPreferences => {
      // Handle analytics initialization/removal
      if (preferences.analytics && !prevPreferences.analytics) {
        // Initialize analytics
        console.log('Analytics enabled');
      } else if (!preferences.analytics && prevPreferences.analytics) {
        // Remove analytics
        console.log('Analytics disabled');
      }
      
      // Handle marketing tools initialization/removal
      if (preferences.marketing && !prevPreferences.marketing) {
        // Initialize marketing tools
        console.log('Marketing tools enabled');
      } else if (!preferences.marketing && prevPreferences.marketing) {
        // Remove marketing tools
        console.log('Marketing tools disabled');
      }
      
      return preferences;
    });
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigate={navigate} 
            onCategoryFilter={handleCategoryFilter}
          />
        );
      case 'events':
        return (
          <EventsPage 
            onNavigate={navigate} 
            initialSearchTerm={searchTerm}
            selectedCategory={selectedCategory}
          />
        );
      case 'event-detail':
        return <EventDetailPage eventId={selectedEventId} onNavigate={navigate} />;
      case 'cart':
        return <CartPage onNavigate={navigate} />;
      case 'payment':
        return <PaymentPage onNavigate={navigate} />;
      case 'thank-you':
        return <ThankYouPage onNavigate={navigate} />;
      case 'privacy-policy':
        return <PrivacyPolicyPage onNavigate={navigate} />;
      case 'terms-of-service':
        return <TermsOfServicePage onNavigate={navigate} />;
      case 'cookie-policy':
        return <CookiePolicyPage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage onNavigate={navigate} />;
      case 'faq':
        return <FAQPage onNavigate={navigate} />;
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      default:
        return (
          <HomePage 
            onNavigate={navigate} 
            onCategoryFilter={handleCategoryFilter}
          />
        );
    }
  };

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <Header 
            onNavigate={navigate} 
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
          />
          <main className="pt-16 flex-1">
            {renderPage()}
          </main>
          <Footer 
            onNavigate={navigate}
            onCategoryFilter={handleCategoryFilter}
          />
          <CookieConsent onPreferencesChange={handleCookiePreferencesChange} />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}