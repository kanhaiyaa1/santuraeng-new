import type { ReactNode } from 'react';
import { whatsappUrl } from '@/lib/site';
import { btnSecondary } from '@/lib/ui';

/** Secondary (grey) WhatsApp button with the green WhatsApp mark. */
export default function WhatsAppLink({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${btnSecondary} ${className}`}>
      <svg viewBox="0 0 24 24" fill="#25D366" className="h-5 w-5 shrink-0" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.42 1.31-1.95 1.36-.5.05-.98.23-3.3-.69-2.8-1.1-4.58-3.97-4.72-4.15-.14-.18-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.31.25-.27.55-.34.73-.34h.53c.17 0 .4-.06.62.48.24.56.8 1.93.87 2.07.07.14.12.3.02.48-.1.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.27.72 1.18 1.54 1.91 1.06.94 1.95 1.24 2.23 1.38.27.14.43.12.59-.07.16-.18.68-.8.86-1.07.18-.27.36-.23.61-.14.25.09 1.6.75 1.87.89.27.14.46.2.52.32.07.11.07.66-.17 1.34z" />
      </svg>
      {children}
    </a>
  );
}
