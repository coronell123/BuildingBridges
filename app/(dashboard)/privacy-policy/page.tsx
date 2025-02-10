'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Datenschutzrichtlinie</h1>
      
      <Card className="mb-8">
        <CardContent className="p-6 prose prose-purple max-w-none">
          <h2 className="text-2xl font-semibold text-[#8c52ff] mb-4">1. Verantwortliche Stelle</h2>
          <p>
            Betreiber der Living-Plattform im Rahmen des Projekts „Building Bridges" sind die Freie 
            Universität Berlin, Stiftung SPI und Universität Duisburg-Essen.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">2. Datenerhebung & -verarbeitung</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Erhebung ausschließlich der für die Plattformteilnahme erforderlichen Daten</li>
            <li>Beiträge werden anonymisiert gespeichert</li>
            <li>Freiwillig angegebene personenbezogene Daten werden getrennt behandelt</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">3. Zweck der Datenverarbeitung</h3>
          <p>
            Die Daten werden ausschließlich verwendet für:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Wissenschaftliche Zwecke</li>
            <li>Evaluation der Plattform</li>
            <li>Optimierung des Angebots</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">4. Anonymisierung & Rückschlüsse</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Speicherung der Beiträge in anonymisierter Form</li>
            <li>Geteilte Detailinformationen können potenziell Rückschlüsse ermöglichen</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">5. Datenweitergabe</h3>
          <p>
            Keine Weitergabe an Dritte; Datenverarbeitung erfolgt intern und ausschließlich innerhalb 
            des Projektkontexts.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">6. Speicherdauer & Löschung</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Speicherung der Daten für die Projektdauer bzw. bis zum Widerruf der Einwilligung</li>
            <li>Nutzer*innen können jederzeit die Löschung ihrer Daten verlangen</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">7. Rechte der Nutzer*innen</h3>
          <p>
            Gemäß geltender Datenschutzgesetze haben Sie das Recht auf:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Auskunft</li>
            <li>Berichtigung</li>
            <li>Löschung</li>
            <li>Einschränkung der Verarbeitung</li>
            <li>Widerspruch</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">8. Sicherheitsmaßnahmen</h3>
          <p>
            Wir implementieren angemessene technische und organisatorische Maßnahmen zum Schutz 
            Ihrer Daten.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">9. Kontakt</h3>
          <p>Bei Fragen oder Anliegen zum Datenschutz können Sie sich an uns wenden:</p>
          <p className="mb-1">Kontaktperson: Susanne Birnkammer</p>
          <p className="mb-1">E-Mail: susanne.birnkammer@fu-berlin.de</p>
          <p>Telefon: +49 30 838 75634</p>
        </CardContent>
      </Card>

      <div className="text-center mt-12">
        <Button asChild className="bg-gradient-to-b from-[#8c52ff] to-black text-white rounded-full px-8 py-4 inline-flex items-center justify-center">
          <Link href="/sign-up">
            Jetzt Teilnehmen
          </Link>
        </Button>
      </div>
    </div>
  );
} 