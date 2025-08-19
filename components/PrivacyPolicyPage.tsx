import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Shield, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (page: string) => void;
}

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
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
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl">Politika privatnosti</h1>
        </div>
        <p className="text-muted-foreground">
          Poslednja izmjena: {new Date().toLocaleDateString('sr-RS')}
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Uvod</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Tvoja Karta ("mi", "naš", "nas") je posvećena zaštiti vaše privatnosti. Ova Politika privatnosti 
              objašnjava kako prikupljamo, koristimo, čuvamo i dijelimo vaše lične podatke kada koristite našu 
              platformu za prodaju karata.
            </p>
            <p>
              Korišćenjem naših usluga, pristajete na prikupljanje i korišćenje informacija u skladu sa ovom politikom.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Podaci koje prikupljamo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Lični podaci:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ime i prezime</li>
              <li>Email adresa</li>
              <li>Broj telefona</li>
              <li>Adresa</li>
              <li>Podaci o plaćanju (obrađuju se preko sigurnih treći strana)</li>
            </ul>

            <h4 className="font-semibold">Tehnički podaci:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP adresa</li>
              <li>Tip preglednika i verzija</li>
              <li>Operativni sistem</li>
              <li>Podaci o korišćenju stranice</li>
              <li>Kolačići i slične tehnologije</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Kako koristimo vaše podatke</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Za obradu vaših narudžbi i dostavu elektronskih karata</li>
              <li>Za komunikaciju u vezi sa vašim narudžbama</li>
              <li>Za poboljšanje naših usluga i korisničkog iskustva</li>
              <li>Za pružanje korisničke podrške</li>
              <li>Za slanje promotivnih materijala (samo uz vašu saglasnost)</li>
              <li>Za analizu korišćenja stranice i kreiranje izvještaja</li>
              <li>Za sprečavanje prevara i osiguravanje sigurnosti</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Kolačići</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Koristimo kolačiće da poboljšamo vaše iskustvo. Kolačići su mali tekstualni fajlovi koji se 
              čuvaju na vašem uređaju. Možete upravljati kolačićima kroz postavke vašeg preglednika.
            </p>
            <p>
              Za detaljne informacije o našem korišćenju kolačića, molimo pogledajte našu 
              <Button variant="link" className="p-0 h-auto" onClick={() => onNavigate('cookie-policy')}>
                Politiku kolačića
              </Button>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Dijeljenje podataka</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Ne prodajemo vaše lične podatke trećim licima. Možemo podijeliti vaše podatke u sljedećim situacijama:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Sa pouzdanim poslovnim partnerima koji nam pomažu u pružanju usluga</li>
              <li>Sa processorima plaćanja radi obradu transakcija</li>
              <li>Kada to zahtijeva zakon ili regulatorni organi</li>
              <li>U slučaju spajanja, akvizicije ili prodaje imovine</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Sigurnost podataka</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Implementiramo odgovarajuće tehničke i organizacione mjere sigurnosti da zaštitimo vaše lične 
              podatke od neovlašćenog pristupa, mijenjanja, otkrivanja ili uništavanja. Ipak, nijedan sistem 
              prenosa preko interneta nije 100% siguran.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Vaša prava</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Imate pravo da:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Pristupite svojim ličnim podacima</li>
              <li>Ispravite netačne podatke</li>
              <li>Zatražite brisanje svojih podataka</li>
              <li>Ograničite obradu svojih podataka</li>
              <li>Prigovorite obradi svojih podataka</li>
              <li>Zatražite prenosivost podataka</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Čuvanje podataka</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Vaše lične podatke čuvam samo onoliko dugo koliko je potrebno za svrhe za které su prikupljeni, 
              ili koliko zahtijeva zakon. Podaci o transakcijama se čuvaju u skladu sa računovodstvenim 
              i poreskim propisima.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Kontakt</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Ako imate pitanja o ovoj Politici privatnosti, možete nas kontaktirati:</p>
            <div className="mt-4 space-y-1">
              <p><strong>Email:</strong> privatnost@tvojakarta.ba</p>
              <p><strong>Telefon:</strong> +387 51 123 456</p>
              <p><strong>Adresa:</strong> Kralja Petra I 15, 78000 Banja Luka</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Izmjene politike</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Zadržavamo pravo da mijenjamo ovu Politiku privatnosti. O značajnim izmjenama ćemo vas 
              obavijestiti putem email-a ili obavještenja na našoj stranici. Preporučujemo da povremeno 
              pregledate ovu politiku.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}