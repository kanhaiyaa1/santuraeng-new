'use client';

import { useState, type FormEvent } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error';

const inputClasses =
  'min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500';

export default function NewsletterSignup() {
  const [status, setStatus] = useState<Status>('idle');
  const locale = useLocale();
  const pathname = usePathname();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const email = new FormData(form).get('email') as string;

    const { error } = await supabase.from('newsletter_subscribers').insert({
      email,
      locale,
      source_page: pathname
    });

    if (!error) {
      setStatus('success');
      form.reset();
      return;
    }

    setStatus(error.code === '23505' ? 'duplicate' : 'error');
  }

  if (status === 'success') {
    return <p className="text-sm text-green-600">Thanks for subscribing.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
      <input name="email" type="email" required placeholder="Your email address" className={inputClasses} />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {status === 'duplicate' && (
        <p className="w-full text-sm text-gray-600">This email is already subscribed.</p>
      )}
      {status === 'error' && (
        <p className="w-full text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
