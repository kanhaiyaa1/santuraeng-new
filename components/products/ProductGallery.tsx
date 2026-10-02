'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = { images: string[]; alt: string; label: string };

export default function ProductGallery({ images, alt, label }: Props) {
  const [index, setIndex] = useState(0);
  if (!images.length) return null;

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-white">
        <Image src={images[index]} alt={alt} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-contain p-6" />
      </div>
      {images.length > 1 && (
        <ul aria-label={label} className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                aria-label={`${alt} (${i + 1}/${images.length})`}
                className={`relative block aspect-square w-full overflow-hidden rounded-md border bg-white transition ${
                  i === index ? 'border-navy-700 ring-2 ring-navy-700' : 'border-slate-200 hover:border-navy-600'
                }`}
              >
                <Image src={src} alt="" fill sizes="96px" className="object-contain p-1" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
