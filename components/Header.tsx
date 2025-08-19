import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ShoppingCart, Search, Ticket, Calendar, MapPin, Menu, X, Globe } from 'lucide-react';
import { Input } from './ui/input';
import { useCart } from './CartProvider';
import { searchEvents, EventData, categories } from './data/eventsData';
import { useLanguage } from './LanguageProvider';

interface HeaderProps {
  onNavigate: (page: string, eventId?: string) => void;
  onSearch: (searchTerm: string) => void;
  onCategoryFilter: (category: string) => void;
}

export function Header({ onNavigate, onSearch, onCategoryFilter }: HeaderProps) {
  const { getCartItemsCount } = useCart();
  const { t, language, setLanguage } = useLanguage();
  
  // Helper function to format category names for translation keys
  const getCategoryTranslationKey = (category: string) => {
    return `category.${category.toLowerCase()}`;
  };
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<EventData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [showDesktopSearchInput, setShowDesktopSearchInput] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const cartItemsCount = getCartItemsCount();

  // Handle search input changes and update suggestions
  useEffect(() => {
    if (searchInput.trim().length > 0) {
      const results = searchEvents(searchInput, 5);
      setSuggestions(results);
      setShowSuggestions(true);
      setSelectedSuggestionIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  }, [searchInput]);

  // Handle click outside to close suggestions and desktop search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        if (!searchInput.trim()) {
          setShowDesktopSearchInput(false);
        }
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        // Don't close mobile search on outside click
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchInput]);

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsMobileSearchOpen(false);
        setShowDesktopSearchInput(false);
        setSearchInput('');
        setShowSuggestions(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Focus search input when desktop search opens
  useEffect(() => {
    if (showDesktopSearchInput && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showDesktopSearchInput]);

  // Focus search input when mobile search opens
  useEffect(() => {
    if (isMobileSearchOpen && mobileInputRef.current) {
      setTimeout(() => mobileInputRef.current?.focus(), 100);
    }
  }, [isMobileSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchInput('');
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
      setIsMobileMenuOpen(false);
      setIsMobileSearchOpen(false);
      setShowDesktopSearchInput(false);
      inputRef.current?.blur();
      mobileInputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (event: EventData) => {
    setSearchInput('');
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
    setShowDesktopSearchInput(false);
    onNavigate('event-detail', event.id);
    inputRef.current?.blur();
    mobileInputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Escape') {
        setSearchInput('');
        setIsMobileSearchOpen(false);
        setShowDesktopSearchInput(false);
        inputRef.current?.blur();
        mobileInputRef.current?.blur();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else {
          handleSearchSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        setSearchInput('');
        setIsMobileSearchOpen(false);
        setShowDesktopSearchInput(false);
        inputRef.current?.blur();
        mobileInputRef.current?.blur();
        break;
    }
  };

  const handleCategoryClick = (category: string) => {
    onCategoryFilter(category);
    setIsMobileMenuOpen(false);
  };

  const toggleDesktopSearch = () => {
    setShowDesktopSearchInput(!showDesktopSearchInput);
    if (!showDesktopSearchInput) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchInput('');
      setShowSuggestions(false);
    }
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (isMobileSearchOpen) {
      setSearchInput('');
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Ticket className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">Tvoja Karta</span>
            </button>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant="ghost" 
                  size="sm"
                  onClick={() => onCategoryFilter(category)}
                  className="text-sm"
                >
                  {t(getCategoryTranslationKey(category))}
                </Button>
              ))}
            </nav>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'sr' ? 'en' : 'sr')}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{language.toUpperCase()}</span>
            </Button>

            {/* Desktop Search */}
            <div className="flex items-center gap-3" ref={searchRef}>
              {showDesktopSearchInput ? (
                <div className="relative w-64 md:w-80">
                  <form onSubmit={handleSearchSubmit}>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                    <Input 
                      ref={inputRef}
                      placeholder={t('events.search.placeholder')}
                      className="pl-10 pr-10"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoComplete="off"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                      onClick={toggleDesktopSearch}
                    >
                      ✕
                    </Button>
                  </form>
                  
                  {/* Desktop Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                      {suggestions.map((event, index) => (
                        <button
                          key={event.id}
                          className={`w-full p-3 text-left hover:bg-muted transition-colors border-b last:border-b-0 ${
                            index === selectedSuggestionIndex ? 'bg-muted' : ''
                          }`}
                          onClick={() => handleSuggestionClick(event)}
                          onMouseEnter={() => setSelectedSuggestionIndex(index)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={event.image} 
                                alt={event.title[language]}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium truncate">{event.title[language]}</h4>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(event.date).toLocaleDateString(language === 'sr' ? 'sr-RS' : 'en-US')}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{event.location[language]}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <Badge variant="outline" className="text-xs">
                                {t(getCategoryTranslationKey(event.category))}
                              </Badge>
                              <div className="text-sm mt-1">{event.price} {t('common.currency')}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                      
                      {searchInput.trim() && (
                        <button
                          className="w-full p-3 text-left hover:bg-muted transition-colors border-t text-primary"
                          onClick={(e) => handleSearchSubmit(e)}
                        >
                          <div className="flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            <span>{language === 'sr' ? `Pretraži sve za "${searchInput}"` : `Search all for "${searchInput}"`}</span>
                          </div>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDesktopSearch}
                  className="p-2"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('cart')}
              className="relative p-2"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile Right Side */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Search Icon */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileSearch}
              className="p-2"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('cart')}
              className="relative p-2"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar - Full Width Below Header */}
      {isMobileSearchOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-b shadow-sm md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="relative" ref={mobileSearchRef}>
              <form onSubmit={handleSearchSubmit}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                <Input 
                  ref={mobileInputRef}
                  placeholder={t('events.search.placeholder')}
                  className="pl-10 pr-10"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  onClick={toggleMobileSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
              
              {/* Mobile Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {suggestions.map((event, index) => (
                    <button
                      key={event.id}
                      className={`w-full p-3 text-left hover:bg-muted transition-colors border-b last:border-b-0 ${
                        index === selectedSuggestionIndex ? 'bg-muted' : ''
                      }`}
                      onClick={() => handleSuggestionClick(event)}
                      onMouseEnter={() => setSelectedSuggestionIndex(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={event.image} 
                            alt={event.title[language]}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">{event.title[language]}</h4>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(event.date).toLocaleDateString(language === 'sr' ? 'sr-RS' : 'en-US')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{event.location[language]}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <Badge variant="outline" className="text-xs mb-1">
                            {t(getCategoryTranslationKey(event.category))}
                          </Badge>
                          <div className="text-sm font-medium">{event.price} {t('common.currency')}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  {searchInput.trim() && (
                    <button
                      className="w-full p-3 text-left hover:bg-muted transition-colors border-t text-primary"
                      onClick={(e) => handleSearchSubmit(e)}
                    >
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        <span>{language === 'sr' ? `Pretraži sve za "${searchInput}"` : `Search all for "${searchInput}"`}</span>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Off-Canvas Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">{language === 'sr' ? 'Menu' : 'Menu'}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Language Switcher */}
            <div className="space-y-2 mb-6">
              <Button
                variant="outline"
                onClick={() => setLanguage(language === 'sr' ? 'en' : 'sr')}
                className="w-full justify-start text-left h-12 px-3"
              >
                <Globe className="h-4 w-4 mr-2" />
                {language === 'sr' ? 'English' : 'Srpski'}
              </Button>
            </div>

            {/* Categories Section - Vertical Stack */}
            <div className="space-y-2">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant="ghost" 
                  onClick={() => handleCategoryClick(category)}
                  className="w-full justify-start text-left h-12 px-3"
                >
                  {t(getCategoryTranslationKey(category))}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}