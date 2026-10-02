# Struttura del Backend e Database (Supabase)

Il backend è strutturato per essere "Serverless" utilizzando le API Routes di Next.js (che comunicano con Stripe e i fornitori esterni) e Supabase (PostgreSQL) per lo stoccaggio dei dati e l'autenticazione.

## 1. Schema del Database Relazionale (Tabelle Principali)

- **`users`** (Gestita nativamente da Supabase Auth)
  - `id` (UUID, Primary Key)
  - `email` (String)
  - `role` (Enum: 'admin', 'customer')
  - `created_at` (Timestamp)

- **`profiles`** (Dati aggiuntivi degli utenti)
  - `id` (UUID, Foreign Key verso users.id)
  - `company_name` (String, Opzionale per B2B)
  - `vat_number` (String, Partita IVA)
  - `shipping_address` (JSON/String)

- **`products`**
  - `id` (UUID)
  - `sku` (String, Univoco - fondamentale per sincronizzazione con Cina)
  - `title` (String)
  - `description` (Text)
  - `price` (Decimal)
  - `stock_quantity` (Integer)
  - `category` (Enum: 'auto', 'moto', 'camion')
  - `images` (Array di Stringhe/URL)

- **`orders`**
  - `id` (UUID)
  - `user_id` (UUID, Foreign Key, NULLABLE per gli utenti Guest)
  - `status` (Enum: 'pending', 'paid', 'shipped', 'cancelled')
  - `total_amount` (Decimal)
  - `discount_applied` (Boolean, true se l'utente era registrato e il carrello > 100€)
  - `stripe_payment_id` (String)

- **`order_items`**
  - `id` (UUID)
  - `order_id` (UUID, Foreign Key)
  - `product_id` (UUID, Foreign Key)
  - `quantity` (Integer)
  - `price_at_purchase` (Decimal)

## 2. Logica di Sincronizzazione Catalogo (Cron Jobs)
Il sistema prevederà un Endpoint API dedicato (es. `/api/cron/sync-products`) che:
1. Viene invocato automaticamente ogni notte.
2. Scarica il feed dei fornitori (CSV/JSON).
3. Esegue un comando "Upsert" (Update o Insert) sulla tabella `products` basandosi sulla chiave `sku`.

## 3. Logica dello Sconto 10%
La logica di calcolo risiederà rigorosamente sul **Backend** (per evitare che utenti malevoli manipolino il carrello dal browser).
Durante la chiamata API per creare il pagamento Stripe (checkout):
1. Il backend controlla se la sessione appartiene a un utente registrato.
2. Calcola la somma totale.
3. Se (Registrato == TRUE && Totale >= 100) -> Applica la decurtazione del 10% direttamente alla riga di pagamento passata a Stripe.

## 4. Autenticazione — Architettura Implementata (VERIFICATO)

### Stack
- **`@supabase/supabase-js`** + **`@supabase/ssr`** — installati e funzionanti
- Pattern ufficiale Supabase per Next.js App Router con cookie-based sessions

### File implementati

| File | Ruolo |
|------|-------|
| `src/lib/supabase/client.ts` | `createBrowserClient()` — per Client Components |
| `src/lib/supabase/server.ts` | `createServerClient()` con cookie Next.js — per Server Components |
| `src/middleware.ts` | Aggiorna sessione ad ogni request, protegge route private |
| `src/app/(auth)/actions.ts` | Server Actions: `loginAction`, `registerAction`, `logoutAction` |
| `src/app/login/page.tsx` | Pagina login Server Component |
| `src/app/registrati/page.tsx` | Pagina registrazione (wrapper) |
| `src/components/auth/RegisterForm.tsx` | Form registrazione Client Component (toggle B2C/B2B) |
| `src/app/registrati/conferma/page.tsx` | Pagina post-registrazione "controlla email" |

### Route protette dal middleware
```
/account/*    → redirect /login?redirect=/account
/checkout/*   → redirect /login?redirect=/checkout
/admin/*      → redirect /login + verifica role=admin in profiles
```

### Flusso registrazione B2B
I campi `company_name` e `vat_number` vengono salvati in `auth.users.user_metadata` e dovranno essere sincronizzati nella tabella `profiles` tramite un Database Trigger Supabase (da creare in dashboard).

### Variabili d'ambiente richieste
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```
File template: `.env.local.example`

