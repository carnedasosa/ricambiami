'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

// ─── Login ────────────────────────────────────────────────────────────────────

export async function loginAction(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const redirectTo = (formData.get('redirect') as string) || '/account';

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Redirect con errore come searchParam (sicuro, no client state)
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/', 'layout');
  redirect(redirectTo);
}

// ─── Registrazione ────────────────────────────────────────────────────────────

export async function registerAction(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const isB2B = formData.get('accountType') === 'b2b';
  const companyName = formData.get('companyName') as string | null;
  const vatNumber = formData.get('vatNumber') as string | null;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
        is_b2b: isB2B,
        company_name: isB2B ? companyName : null,
        vat_number: isB2B ? vatNumber : null,
      },
    },
  });

  if (error) {
    redirect(`/registrati?error=${encodeURIComponent(error.message)}`);
  }

  // Supabase invia email di conferma — redirect alla pagina di conferma
  redirect('/registrati/conferma');
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}
