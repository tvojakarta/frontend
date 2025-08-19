import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Cookie, Settings, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentProps {
  onPreferencesChange?: (preferences: CookiePreferences) => void;
}

export function CookieConsent({ onPreferencesChange }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  const COOKIE_CONSENT_KEY = 'tvoja-karta-cookie-consent';
  const COOKIE_PREFERENCES_KEY = 'tvoja-karta-cookie-preferences';

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
    
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
        // Only call onPreferencesChange if we have a callback
        if (onPreferencesChange) {
          onPreferencesChange(parsed);
        }
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []); // Empty dependency array - only run once on mount

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    
    setPreferences(allAccepted);
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(allAccepted));
    setShowBanner(false);
    if (onPreferencesChange) {
      onPreferencesChange(allAccepted);
    }
  };

  const acceptSelected = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
    if (onPreferencesChange) {
      onPreferencesChange(preferences);
    }
  };

  const rejectAll = () => {
    const minimal = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    
    setPreferences(minimal);
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(minimal));
    setShowBanner(false);
    if (onPreferencesChange) {
      onPreferencesChange(minimal);
    }
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return; // Necessary cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const cookieTypes = [
    {
      key: 'necessary' as keyof CookiePreferences,
      title: 'Neophodni kolačići',
      description: 'Potrebni su za osnovno funkcionisanje stranice i ne mogu se onemogućiti.',
      required: true
    },
    {
      key: 'functional' as keyof CookiePreferences,
      title: 'Funkcionalni kolačići',
      description: 'Omogućavaju poboljšane funkcionalnosti i personalizaciju.',
      required: false
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      title: 'Analitički kolačići',
      description: 'Pomažu nam da razumijemo kako koristite našu stranicu.',
      required: false
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      title: 'Marketing kolačići',
      description: 'Koriste se za prikazivanje relevantnih reklama.',
      required: false
    }
  ];

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <Card className="mx-auto max-w-4xl border-2 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Cookie className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Kolačići i privatnost</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Koristimo kolačiće da poboljšamo vaše iskustvo, analiziramo saobraćaj i prilagodimo sadržaj. 
                  Možete upravljati svojim preferencijama u bilo kom trenutku.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={acceptAll} size="sm">
                    Prihvati sve
                  </Button>
                  <Button onClick={rejectAll} variant="outline" size="sm">
                    Odbaci sve
                  </Button>
                  <Button 
                    onClick={() => setShowSettings(true)} 
                    variant="ghost" 
                    size="sm"
                    className="gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Postavke
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              Postavke kolačića
            </DialogTitle>
            <DialogDescription>
              Upravljajte svojom privatnošću birajući koje tipove kolačića želite da dozvolite. 
              Možete promijeniti ove postavke u bilo kom trenutku.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              {cookieTypes.map((type) => (
                <div key={type.key} className="flex items-start justify-between gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{type.title}</h4>
                      {type.required && (
                        <Badge variant="secondary" className="text-xs">
                          Obavezno
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={type.key}
                      checked={preferences[type.key]}
                      onCheckedChange={(checked) => updatePreference(type.key, checked)}
                      disabled={type.required}
                    />
                    <Label htmlFor={type.key} className="sr-only">
                      {type.title}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Otkaži
              </Button>
              <Button onClick={acceptSelected}>
                Sačuvaj postavke
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}