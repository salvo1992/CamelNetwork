import React, { useState } from 'react';
import styles from './PrivacySettings.module.css';
import privacyIcon from './privacy-icon.png';

function PrivacySettings() {
  const [consent, setConsent] = useState(false);

  const handleConsentChange = () => {
    setConsent(!consent);
  };

  return (
    <>
    <div className={styles.container}>
      <h2>Gestione Privacy</h2>
      <div className={styles.privacyContent}>
        <img src={privacyIcon} alt="Privacy Icon" className={styles.privacyIcon} />
        <p>
          In questa sezione puoi gestire le tue preferenze sulla privacy in conformità con le leggi sulla privacy vigenti.
        </p>
        <div className={styles.consent}>
          <input
            type="checkbox"
            id="consentCheckbox"
            checked={consent}
            onChange={handleConsentChange}
          />
          <label htmlFor="consentCheckbox">Ho letto e accetto la politica sulla privacy</label>
        </div>
      </div>
    </div>
    <div className={styles.description}>
<h1>description to privacy</h1>
<h3>Il presente documento di privacy policy, aggiornato con il Regolamento UE (GDPR) 2016/679 relativo al trattamento dei dati personali, così come con il D.Lgs 181/18 che modifica il D.Lgs 196/2003, regola le modalità di trattamento dei dati raccolti da un sito internet durante la navigazione da parte dell'utente.

Esso ha lo scopo preciso di informare l'utente circa il trattamento dei suoi dati personali secondo quanto previsto dalla legge e dal recente Regolamento UE 679/2016, che ha modificato profondamente la disciplina.


Un sito web deve avere un Titolare del trattamento dei dati (Data Controller). Il titolare del trattamento è colui che ha potere decisionale e organizzativo sul trattamento, oltre che decidere le modalità di trattamento dei dati ed è il responsabile nei confronti del garante della privacy. Si possono nominare anche due o più contitolari. In questo caso, è obbligatorio che l'utente sappia quali siano le competenze di ogni contitolare, attraverso un link che indica l'accordo tra gli stessi.

Il titolare del trattamento, è affiancato dal Responsabile del Trattamento (Data Processor). Questa figura è colui che tratta i dati per conto del titolare del trattamento. Ciò significa, che sarà un soggetto vicino al titolare, dal quale riceve direttive su come gestire i dati. Il Responsabile del trattamento deve essere una figura competente in grado di soddisfare a pieno la sicurezza posta in essere dal Titolare del trattamento.

A queste due figure, si affianca il Responsabile della protezione dati (Data Protection Officer DPO), il quale, nonostante venga nominato direttamente dal titolare, è comunque un soggetto indipendente da quest'ultimo. Il DPO, prima solamente facoltativo, è ora una figura a volte obbligatoria ai dell'art.37 del Regolamento (UE) 679/2016. In questo articolo vengono indicati i soggetti obbligati e quelli che ne sono esenti. In ogni caso, il DPO, detto RPD in Italiano, è un soggetto indipendente e tratta i dati con autonomia. Inoltre, è direttamente responsabile e comunica con il garante della privacy. In definitiva, la designazione del DPO riflette il nuovo approccio del GDPR, verso una responsabilizzazione del trattamento dei dati, essendo finalizzata a facilitare l'attuazione del regolamento da parte del titolare e del responsabile. Il ruolo del DPO è di tutelare i dati personali, non gli interessi del titolare del trattamento.

Quindi, mentre il Responsabile del trattamento è una figura vicina al Titolare, il DPO è una figura molto più indipendente, la quale non può ne deve ricevere ordini dal titolare sull'effettiva protezione dei dati.

Tornando all'informativa, deve essere indicato anche il luogo dove verranno trattati i dati, che coincide con la sede del titolare del trattamento dei dati.


Trattamento dei dati

Il punto principale della riforma Europea riguarda il trattamento dei dati che l'utente fornisce al sito durante la sua navigazione. Fondamentale quindi, è inserire nell'informativa quali sono i dati che vengono raccolti dal sito, la finalità e le modalità del trattamento dei dati. Il sito può raccogliere tutti i dati che vuole rispettando sempre la normativa GDPR, e deve informare l'utente sui dati che vengono raccolti. Inoltre, deve indicare quali sono le finalità del raccoglimento dei dati, se questi sono per motivi tecnici o per motivi di profilazione, ossia per motivi di marketing e pubblicità. Infine, questi dati dovranno essere conservati per un periodo idoneo al raggiungimento delle finalità preposte dal sito, per poi essere cancellati. Quindi è obbligatorio che i dati trattati, le finalità del trattamento, e le modalità di conservazione degli stessi, vengano indicate in maniera chiara e concisa all'interno dell'informativa.


Il documento rimanda inoltre alla cookie policy per quanto riguarda i i tipi di cookies che vengono utilizzati nella pagina web, aggiornata con l'ultimo provvedimento del Garante della Privacy n. 231 del 10 giugno 2020.

Altre informazioni da dare all'utente sono quelle relativa alla possibilità di effettuare pagamenti online, avere una newsletter o un modulo di contatto nel sito stesso. Infine, vi è la possibilità di menzionare se il sito permette plug-in dei social network e l'eventuale trasferimento dei dati a società site in nazioni al di fuori dell'Unione Europea.

E' anche importante menzionare quali sono i nuovi diritti dell'interessato ai sensi della nuova normativa europea, come il diritto alla cancellazione dei dati, l'aggiornamento degli stessi o di opporsi ad un eventuale trasferimento dei dati.

Per un approfondimento riguardo a questo argomento, leggere la nostra guida sui punti chiave per essere conformi al GDPR.


Come usare il documento?

Attraverso questo documento si potrà indicare:

Il nome del sito internet per cui si utilizza il seguente documento e il suo proprietario;
Il titolare dei dati e il luogo in cui questi verranno trattati;
L'eventuale presenza di più titolari del trattamento;
Chi è il responsabile del trattamento dati, e, in caso anche il responsabile della protezione dei dati (DPO);
Quali dati vengono raccolti all'interno del sito;
Quali sono le finalità del trattamento dei dati, e il tempo di conservazione degli stessi;
Il link alla cookie policy;
Se il sito utilizza metodi di pagamento;¡
I dati che vengonno raccolti nella eventuale iscrizione alla newsletter e contact form;
Indicare se il sito utilizza plug-in dei social network;
Indicare se l'utente riceverà notifiche per eventuali aggiornamenti del sito.
Una volta che si ha il documento, questo dovrà essere inserito nella pagina web del sito e messo a disposizione dell'utente.


Normativa di riferimento

REGOLAMENTO (UE) 2016/679 del Parlamento Europeo e Consiglio, del 27 aprile 2016, relativo alla protezione delle persone fisiche con riguardo al trattamento dei dati personali, nonché alla libera circolazione di tali dati e che abroga la direttiva 95/46/CE (regolamento generale sulla protezione dei dati).

Decreto Legislativo 181/18, recante "Disposizioni per l'adeguamento della normativa nazionale alle disposizioni del regolamento (UE) 2016/679 del Parlamento europeo e del Consiglio, del 27 aprile 2016, relativo alla protezione delle persone fisiche con riguardo al trattamento dei dati personali, nonché alla libera circolazione di tali dati e che abroga la direttiva 95/46/CE (regolamento generale sulla protezione dei dati)" che modifica il Decreto Legislativo 196/2003, "Codice in materia di protezione dei dati personali."

Provvedimento del Garante della Privacy n. 229/2014, relativo alla "Individuazione delle modalità semplificate per l'informativa e l'acquisizione del consenso per l'uso dei cookie", cosi come modificato dal recante "Linee guida cookie e altri strumenti di tracciamento" (doc. web n. 9677876), pubblicato sulla Gazzetta Ufficiale n. 163 del 9 luglio 2021.


Assistenza di un avvocato

Potrai scegliere di consultare un avvocato se avrai bisogno di aiuto.

L'avvocato potrà rispondere alle tue domande o assisterti negli adempimenti opportuni. Questa opzione ti sarà proposta alla fine del documento.


Come modificare il modello?

Compili un modulo. Il documento viene redatto sotto i tuoi occhi man mano che inserisci le tue risposte.

Al termine, lo ricevi nei formati Word e PDF. Puoi modificarlo e riutilizzarlo. </h3>
    </div>
    </>
  );
}

export default PrivacySettings;
