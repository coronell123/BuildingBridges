'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Nutzungsbedingungen</h1>
      
      <Card className="mb-8">
        <CardContent className="p-6 prose prose-purple max-w-none">
          <h2 className="text-2xl font-semibold text-[#8c52ff] mb-4">1. Plattformzweck</h2>
          <p>
            Building Bridges ist eine Austausch- und Vernetzungsplattform, die das Teilen von 
            Erfahrungsberichten, Perspektiven und Lösungsansätzen ermöglicht. Die Plattform wird 
            von der Freien Universität Berlin in Zusammenarbeit mit der Stiftung SPI und der 
            Universität Duisburg-Essen betrieben.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">2. Teilnahmebedingungen</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Die Teilnahme ist freiwillig und kann jederzeit ohne Nachteile beendet werden</li>
            <li>Nutzer*innen entscheiden eigenverantwortlich über die geteilten Inhalte</li>
            <li>Die Plattform richtet sich an Mädchen und FLINTA of Color im Alter von 16-18 Jahren</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">3. Anonymität & Inhalte</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Beiträge werden anonymisiert gespeichert</li>
            <li>Detailangaben können dennoch Rückschlüsse auf Identitäten ermöglichen</li>
            <li>Nutzer*innen sind für ihre eingestellten Inhalte selbst verantwortlich</li>
            <li>Rechtswidrige, diskriminierende oder beleidigende Inhalte sind verboten</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">4. Lizenz & Nutzung</h3>
          <p>
            Mit dem Einstellen von Beiträgen erteilen Nutzer*innen der Plattform ein nicht-exklusives, 
            weltweites und unbefristetes Nutzungsrecht zur Verwendung, Speicherung und Verarbeitung, 
            vorrangig für wissenschaftliche Zwecke und zur Optimierung der Plattform.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">5. Moderation & Unterstützung</h3>
          <p>
            Ein geschultes Moderationsteam überwacht die Inhalte und bietet bei emotional belastenden 
            Situationen Unterstützung an.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">6. Haftungsausschluss</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Die Betreiber haften nicht für Fehler, Vollständigkeit oder Aktualität der Inhalte</li>
            <li>Die Nutzung der Plattform erfolgt auf eigenes Risiko</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">7. Änderungsvorbehalt</h3>
          <p>
            Die Betreiber behalten sich das Recht vor, die Nutzungsbedingungen jederzeit anzupassen. 
            Änderungen werden den Nutzer*innen in geeigneter Weise bekanntgegeben.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">8. Kontakt</h3>
          <p>Bei Fragen oder Anliegen können Sie sich an uns wenden:</p>
          <p className="mb-1">Kontakt: Team Building Bridges</p>
          <p className="mb-1">E-Mail: team@buildingbridges.de</p>
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