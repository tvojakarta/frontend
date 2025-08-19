import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Cookie, ArrowLeft, Settings } from 'lucide-react';

interface CookiePolicyPageProps {
  onNavigate: (page: string) => void;
}

export function CookiePolicyPage({ onNavigate }: CookiePolicyPageProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Nazad na početnu
        </Button>
        
        <div className="flex items-center gap-3 mb-4">
          <Cookie className="h-8 w-8 text-primary" />
          <h1 className="text-4xl">Politika kolačića</h1>
        </div>
        <p className="text-muted-foreground">
          Poslednja izmjena: {new Date().toLocaleDateString('sr-RS')}
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Šta su kolačići?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Kolačići su mali tekstualni fajlovi koji se postavljaju na vaš uređaj (računar, telefon, tablet) 
              kada posetite web stranicu. Oni omogućavaju stranici da "zapamti" vaše djelovanje i preferencije 
              kroz određeni period vremena.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kako koristimo kolačiće</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Tvoja Karta koristi kolačiće da poboljša vaše iskustvo korišćenja naše platforme, analizira 
              saobraćaj i personalizuje sadržaj. Možete upravljati postavkama kolačića u bilo kom trenutku.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tipovi kolačića koje koristimo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">Neophodni kolačići</h4>
                <Badge variant="destructive" className="text-xs">Obavezno</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Ovi kolačići su neophodni za osnovno funkcionisanje stranice i ne mogu se onemogućiti.
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Svrha:</strong> Održavanje sesije, sigurnost, osnovne funkcionalnosti</div>
                <div><strong>Trajanje:</strong> Sesija ili do 1 godina</div>
                <div><strong>Primjeri:</strong> Košarica, prijava, CSRF zaštita</div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">Funkcionalni kolačići</h4>
                <Badge variant="secondary" className="text-xs">Opciono</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Omogućavaju poboljšane funkcionalnosti i personalizaciju stranice.
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Svrha:</strong> Pamćenje preferencija, jezičke postavke, tema</div>
                <div><strong>Trajanje:</strong> Do 1 godine</div>
                <div><strong>Primjeri:</strong> Jezik, tema, lokacija</div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">Analitički kolačići</h4>
                <Badge variant="secondary" className="text-xs">Opciono</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Pomažu nam da razumijemo kako posetitelji koriste našu stranicu.
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Svrha:</strong> Analiza saobraćaja, statistike korišćenja</div>
                <div><strong>Trajanje:</strong> Do 2 godina</div>
                <div><strong>Primjeri:</strong> Google Analytics, interne statistike</div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">Marketing kolačići</h4>
                <Badge variant="secondary" className="text-xs">Opciono</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Koriste se za prikazivanje relevantnih reklama i mjerenje efikasnosti kampanja.
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Svrha:</strong> Personalizovane reklame, praćenje konverzija</div>
                <div><strong>Trajanje:</strong> Do 1 godine</div>
                <div><strong>Primjeri:</strong> Facebook Pixel, Google Ads</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kolačići treći strana</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Neki kolačići postavljaju treći strane koje koristimo za poboljšanje naših usluga:
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold">Google Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Analiza saobraćaja i ponašanja korisnika. 
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                     className="text-primary hover:underline ml-1">
                    Politika privatnosti Google-a
                  </a>
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold">Payment Processors</h4>
                <p className="text-sm text-muted-foreground">
                  Kolačići potrebni za sigurno procesiranje plaćanja preko Stripe, PayPal i drugih provajdera.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold">Social Media</h4>
                <p className="text-sm text-muted-foreground">
                  Kolačići za dijeljenje sadržaja na društvenim mrežama (Facebook, Twitter, Instagram).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upravljanje kolačićima</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Postavke kolačića na stranici</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Možete upravljati svojim preferencijama kolačića direktno na našoj stranici.
              </p>
              <Button size="sm" variant="outline">
                Otvori postavke kolačića
              </Button>
            </div>

            <h4 className="font-semibold">Postavke preglednika:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Chrome:</strong>
                <p className="text-muted-foreground">Postavke → Privatnost i sigurnost → Kolačići</p>
              </div>
              <div>
                <strong>Firefox:</strong>
                <p className="text-muted-foreground">Opcije → Privatnost i sigurnost → Kolačići</p>
              </div>
              <div>
                <strong>Safari:</strong>
                <p className="text-muted-foreground">Preferencije → Privatnost → Kolačići</p>
              </div>
              <div>
                <strong>Edge:</strong>
                <p className="text-muted-foreground">Postavke → Kolačići i dozvole stranica</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Posledice onemogućavanja kolačića</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Ako onemogućite kolačiće, neki djelovi naše stranice možda neće funkcionisati pravilno:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Možda nećete moći da se prijavite ili registrujete</li>
              <li>Košarica možda neće sačuvati vaš izbor</li>
              <li>Preferencije jezika i teme neće biti zapamćene</li>
              <li>Neke personalizovane funkcije neće biti dostupne</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ažuriranje ove politike</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Možemo povremeno ažurirati ovu Politiku kolačića. O značajnim izmjenama ćemo vas 
              obavijestiti putem email-a ili obavještenja na stranici. Preporučujemo da povremeno 
              pregledate ovu politiku.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kontakt</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Ako imate pitanja o našem korišćenju kolačića:</p>
            <div className="mt-4 space-y-1">
              <p><strong>Email:</strong> privatnost@tvojakarta.ba</p>
              <p><strong>Telefon:</strong> +387 51 123 456</p>
              <p><strong>Adresa:</strong> Kralja Petra I 15, 78000 Banja Luka</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}