import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Torna all'Editor
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-50 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy di MicioCode</h1>
            <p className="text-gray-500">Ultimo aggiornamento: 16 Agosto 2026</p>
          </div>
        </div>

        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduzione</h2>
            <p>
              Benvenuto su MicioCode. La tua privacy è estremamente importante per noi. Questa Privacy Policy spiega come raccogliamo, utilizziamo, proteggiamo e condividiamo le tue informazioni quando utilizzi la nostra piattaforma di programmazione a blocchi.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Informazioni che raccogliamo</h2>
            <p>
              Per offrirti la migliore esperienza possibile, raccogliamo i seguenti dati:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dati di Account:</strong> Nome utente, indirizzo email e password (criptata).</li>
              <li><strong>Dati Profilo:</strong> Data di nascita e paese di residenza, necessari per conformità legale e personalizzazione dell'esperienza.</li>
              <li><strong>Progetti:</strong> Il codice dei blocchi, le immagini e le descrizioni dei progetti che decidi di salvare o pubblicare.</li>
              <li><strong>Dati Social:</strong> Se scegli di accedere tramite Google o Microsoft, riceviamo il tuo nome e la tua email dal fornitore scelto.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Utilizzo dei Dati</h2>
            <p>
              Utilizziamo le tue informazioni per:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gestire il tuo account e permetterti di salvare i tuoi progetti sul cloud.</li>
              <li>Permetterti di condividere i tuoi progetti nella sezione "Esplora".</li>
              <li>Assicurarci che gli utenti più giovani utilizzino la piattaforma in modo sicuro, in base alla data di nascita fornita.</li>
              <li>Inviarti comunicazioni tecniche o relative alla sicurezza del tuo account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Condivisione dei Progetti</h2>
            <p>
              Quando clicchi su "Pubblica", il titolo, la descrizione, i crediti e i tag del tuo progetto diventano visibili a tutta la comunità di MicioCode. Non condividiamo mai il tuo indirizzo email o la tua data di nascita con altri utenti.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Sicurezza</h2>
            <p>
              MicioCode utilizza Firebase di Google per l'archiviazione sicura dei dati. Utilizziamo crittografia standard del settore per proteggere le tue password e le tue comunicazioni con il server.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. I tuoi diritti</h2>
            <p>
              Puoi richiedere in qualsiasi momento la cancellazione dei tuoi dati o la modifica delle tue informazioni contattando il supporto tecnico di MicioCode o eliminando i tuoi progetti direttamente dall'interfaccia.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center italic text-sm">
            MicioCode è un progetto educativo dedicato alla creatività digitale.
          </div>
        </div>
      </div>
    </div>
  );
};
