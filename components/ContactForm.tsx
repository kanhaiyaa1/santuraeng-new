'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClasses =
  'mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/30';
const labelClasses = 'block text-sm font-medium text-slate-700';

export default function ContactForm() {
  const t = useTranslations('contactForm');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const { error } = await supabase.from('contact_submissions').insert({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: (formData.get('company') as string) || null,
      country: (formData.get('country') as string) || null,
      message: formData.get('message') as string
    });

    setStatus(error ? 'error' : 'success');
    if (!error) {
      form.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClasses}>
          {t('name')}
          <input name="name" required autoComplete="name" className={inputClasses} />
        </label>
        <label className={labelClasses}>
          {t('email')}
          <input name="email" type="email" required autoComplete="email" className={inputClasses} />
        </label>
        <label className={labelClasses}>
          {t('company')}
          <input name="company" autoComplete="organization" className={inputClasses} />
        </label>
        <label className={labelClasses}>
          {t('country')}
          <input name="country" autoComplete="country-name" className={inputClasses} />
        </label>
      </div>
      <label className={labelClasses}>
        {t('message')}
        <textarea name="message" rows={5} required className={inputClasses} />
      </label>
      <p className="text-xs text-slate-500">
        {t('privacyNote')}{' '}
        <Link href="/privacy-policy" className="underline hover:text-navy-700">
          {t('privacyLink')}
        </Link>
      </p>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-md bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-50"
      >
        {status === 'submitting' ? t('sending') : t('submit')}
      </button>
      {status === 'success' && <p className="text-sm text-emerald-700" role="status">{t('success')}</p>}
      {status === 'error' && <p className="text-sm text-red-600" role="alert">{t('error')}</p>}
    </form>
  );
}
