import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram,
  Send,
  CheckCircle
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      content: '+387 64 455 1447',
      description: 'Pozovite nas radnim danima',
      link: 'tel:+38764455147'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@tvojakarta.com',
      description: 'Odgovaramo u roku od 24 sata',
      link: 'mailto:info@tvojakarta.com'
    },
    {
      icon: MapPin,
      title: 'Lokacija',
      content: 'Banja Luka',
      description: 'Bosna i Hercegovina',
      link: null
    }
  ];

  const workingHours = [
    { day: 'Ponedjeljak - Petak', hours: '09:00 - 17:00' },
    { day: 'Subota', hours: '10:00 - 14:00' },
    { day: 'Nedjelja', hours: 'Zatvoreno' }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: 'Facebook',
      link: 'https://facebook.com/tvojakarta.com',
      description: 'Pratite najnovije događaje'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      link: 'https://instagram.com/tvojakarta.com',
      description: 'Ekskluzivni sadržaj i iza kulisa'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Nazad na početnu
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-4">Kontaktirajte nas</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Imamo pitanje? Trebate pomoć? Naš tim je spreman da vam pomogne. 
            Kontaktirajte nas putem telefona, email-a ili društvenih mreža.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Kontakt informacije</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-primary hover:underline block"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p>{info.content}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              {/* Working Hours */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Radno vrijeme</h3>
                </div>
                <div className="space-y-2">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{schedule.day}</span>
                      <span>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Social Media */}
              <div>
                <h3 className="font-semibold mb-3">Pratite nas</h3>
                <div className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <social.icon className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{social.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {social.description}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Pošaljite nam poruku</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl mb-2">Poruka poslana!</h3>
                  <p className="text-muted-foreground">
                    Hvala vam na poruci. Odgovorićemo vam u najkraćem mogućem roku.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ime i prezime</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Unesite vaše ime"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email adresa</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="vaš.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Tema</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Ukratko opišite temu vaše poruke"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Poruka</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Detaljno opišite vaš upit ili problem..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Pošaljite poruku
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Često postavljana pitanja</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Kako mogu kupiti karte?</h4>
                <p className="text-sm text-muted-foreground">
                  Karte možete kupiti direktno na našoj stranici. Odaberite događaj, 
                  broj karata i završite kupovinu. Karte će vam biti poslane na email.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Mogu li vratiti karte?</h4>
                <p className="text-sm text-muted-foreground">
                  Da, povraćaj je moguć do 48 sati prije događaja. Administrativni 
                  troškovi se zadržavaju prema našim uslovima korišćenja.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Koliko dugo traje dostava karata?</h4>
                <p className="text-sm text-muted-foreground">
                  Elektronske karte se dostavljaju odmah nakon uspješne kupovine 
                  na vašu email adresu.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Koje načine plaćanja prihvatate?</h4>
                <p className="text-sm text-muted-foreground">
                  Prihvatamo sve glavne kreditne i debitne kartice. Sva plaćanja 
                  se obrađuju sigurno preko šifrovanih konekcija.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Šta ako je događaj otkazan?</h4>
                <p className="text-sm text-muted-foreground">
                  U slučaju otkazivanja događaja, kupci automatski dobijaju pun 
                  povraćaj novca ili opciju prebacivanja na novi datum.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Mogu li prenjeti karte drugoj osobi?</h4>
                <p className="text-sm text-muted-foreground">
                  Zavisi od organizatora događaja. Kontaktirajte nas za specifične 
                  slučajeve prenosa karata.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}