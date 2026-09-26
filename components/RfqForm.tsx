'use client';

import { useState, type FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClasses =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500';

export default function RfqForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const { error } = await supabase.from('rfq_requests').insert({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      country: formData.get('country'),
      message: formData.get('message')
    });

    setStatus(error ? 'error' : 'success');
    if (!error) {
      form.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Full name" className={inputClasses} />
        <input name="email" type="email" required placeholder="Email" className={inputClasses} />
        <input name="phone" placeholder="Phone" className={inputClasses} />
        <input name="company" placeholder="Company" className={inputClasses} />
      </div>
      <input name="country" required placeholder="Country" className={inputClasses} />
      <textarea name="message" rows={4} placeholder="What are you looking for?" className={inputClasses} />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Submit Request'}
      </button>
      {status === 'success' && (
        <p className="text-sm text-green-600">Thank you. We will get back to you shortly.</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
