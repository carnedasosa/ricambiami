# Specifiche Progetto: E-commerce Ricambi Automotive (ricambiami.it)

## 1. Panoramica
Sito web e-commerce destinato alla vendita di pezzi di ricambio per auto, camion e moto. Il target comprende sia il settore B2B (officine di riparazione, rivenditori) sia il settore B2C (clienti privati). 

## 2. Requisiti Fondamentali
- **Dominio Ufficiale:** ricambiami.it
- **Lingue Supportate:** Italiano, Inglese, Spagnolo.
- **Tipologia Utenti & Sconti:** 
  - I prezzi di base sono uguali per tutti.
  - **Sconto del 10%** automatico per gli **utenti registrati** su ordini superiori a 100€.
  - Utenti Ospiti / Guest: Acquisto possibile senza registrazione obbligatoria (ma senza sconto speciale).
- **Catalogo Prodotti:** Ampio, con sistema di **importazione/sincronizzazione automatica** da fornitori esterni (aziende cinesi).
- **Design:** Stile serio, composto, pulito e professionale (trasmettere fiducia, sicurezza e garanzia).

## 3. Funzionalità Chiave
1. **Navigazione e Ricerca:** Catalogo strutturato per categorie (Auto, Camion, Moto).
2. **Sistema di Checkout:** Carrello, regole di sconto automatiche e pagamento.
3. **Pagamenti Online:** Integrazione sicura per carte di credito (Stripe).
4. **Notifiche Email:** Conferma d'ordine e di prenotazione automatica via email.
5. **Pannello di Controllo (Admin CMS):** 
   - Gestione delle regole di importazione automatica dei prodotti.
   - Gestione ordini e prenotazioni.
   - Clienti.

## 4. Architettura Tecnica (Proposta)
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Shadcn UI
- **Database & Auth:** Supabase (PostgreSQL)
- **Pagamenti:** Stripe
- **Email:** Resend
- **Hosting / Deploy:** Vercel (Frontend & Serverless API)

## 5. Pagine Iniziali (Fase 1)
- **Homepage:** Benvenuto, categorie in evidenza, barra di ricerca.
- **Catalogo / Negozio:** Griglia dei prodotti con filtri.
- **Pagina Prodotto:** Dettagli completi.
- **Autenticazione:** Login / Registrazione (per abilitare lo sconto del 10% su carrelli > 100€).
- **Checkout:** Riepilogo ordine, applicazione sconti e pagamento.
- **Dashboard Admin.**
