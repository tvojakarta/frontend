import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FileText, ArrowLeft } from 'lucide-react';

interface TermsOfServicePageProps {
  onNavigate: (page: string) => void;
}

export function TermsOfServicePage({ onNavigate }: TermsOfServicePageProps) {
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
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-4xl">Uslovi korišćenja</h1>
        </div>
        <p className="text-muted-foreground">
          Poslednja izmjena: {new Date().toLocaleDateString('sr-RS')}
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Prihvatanje uslova</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Dobrodošli na Tvoja Karta platformu. Pristupanjem i korišćenjem naše stranice, pristajete 
              da budete vezani ovim Uslovima korišćenja. Ako se ne slažete sa bilo kojim dijelom ovih 
              uslova, molimo vas da ne koristite našu uslugu.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Opis usluge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Tvoja Karta je online platforma za prodaju i distribuciju elektronskih karata za različite 
              događaje uključujući koncerte, festivale, predstave i konferencije.
            </p>
            <p>
              Služimo kao posrednik između organizatora događaja i posetilaca, omogućavajući jednostavnu 
              kupovinu i dostavu elektronskih karata.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Registracija i račun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Za kupovinu karata potrebno je da kreirate račun. Odgovorni ste za:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pružanje tačnih i potpunih informacija</li>
              <li>Održavanje sigurnosti vaše lozinke</li>
              <li>Sve aktivnosti koje se dese na vašem računu</li>
              <li>Ažuriranje informacija kada se promijene</li>
            </ul>
            <p>
              Zadržavamo pravo da privremeno ili trajno onemogućimo račune koji krše ove uslove.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Kupovina karata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Proces kupovine:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Sve cijene su prikazane u konvertibilnim markama (KM)</li>
              <li>Cijene mogu uključivati administrativne troškove</li>
              <li>Plaćanje se obrađuje kroz sigurne treće strane</li>
              <li>Karte se dostavljaju elektronski na vašu email adresu</li>
            </ul>

            <h4 className="font-semibold">Ograničenja:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Broj karata po transakciji može biti ograničen</li>
              <li>Karte nisu prenosive osim ako drugačije nije navedeno</li>
              <li>Preprodaja karata je zabranjena</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Povraćaj i otkazivanje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Za kupce:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Povraćaj je moguć do 48 sati prije događaja</li>
              <li>Administrativni troškovi se zadržavaju</li>
              <li>Povraćaj se obrađuje u roku od 5-10 radnih dana</li>
            </ul>

            <h4 className="font-semibold">Za organizatore:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>U slučaju otkazivanja događaja, pun povraćaj novca</li>
              <li>Obavještavanje kupaca putem email-a i stranice</li>
              <li>Mogućnost prebacivanja na novi datum</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Zabrane korišćenja</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Zabranjeno je:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Korišćenje platforme za nezakonite svrhe</li>
              <li>Pokušaj neovlašćenog pristupa sistemu</li>
              <li>Preprodaja karata po višim cijenama</li>
              <li>Kreiranje lažnih računa ili identiteta</li>
              <li>Automatizovana kupovina karata (botovi)</li>
              <li>Narušavanje rada platforme</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Intelektualna svojina</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Sav sadržaj na našoj platformi, uključujući dizajn, logotipe, tekst i kod, zaštićen je 
              pravima intelektualne svojine. Zabranjeno je neovlašćeno korišćenje, kopiranje ili 
              distribucija ovog sadržaja.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Ograničenje odgovornosti</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Tvoja Karta se trudi da pruži kvalitetnu uslugu, ali ne garantuje:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Neprekidnu dostupnost platforme</li>
              <li>Tačnost svih informacija o događajima</li>
              <li>Kvalitet događaja ili usluga organizatora</li>
            </ul>
            <p>
              Naša odgovornost je ograničena na vrijednost kupljenih karata.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Privatnost</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Vaša privatnost je važna za nas. Molimo pogledajte našu 
              <Button variant="link" className="p-0 h-auto" onClick={() => onNavigate('privacy-policy')}>
                Politiku privatnosti
              </Button> za informacije o tome kako prikupljamo, koristimo i štitimo vaše podatke.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Izmjene uslova</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Zadržavamo pravo da mijenjamo ove uslove. O značajnim izmjenama ćemo vas obavijestiti 
              putem email-a ili obavještenja na stranici. Kontinuirano korišćenje usluge nakon 
              izmjena predstavlja prihvatanje novih uslova.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Primenljivo pravo</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Ovi uslovi se tumače prema zakonima Bosne i Hercegovine. Svi sporovi će biti rješavani 
              pred nadležnim sudovima u Banja Luci.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Kontakt</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Za pitanja o ovim uslovima kontaktirajte nas:</p>
            <div className="mt-4 space-y-1">
              <p><strong>Email:</strong> podrska@tvojakarta.ba</p>
              <p><strong>Telefon:</strong> +387 51 123 456</p>
              <p><strong>Adresa:</strong> Kralja Petra I 15, 78000 Banja Luka</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}