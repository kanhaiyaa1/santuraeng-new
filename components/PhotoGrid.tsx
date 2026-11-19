import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PHOTOS, type PhotoKey } from '@/lib/photos';

/** Captioned grid of client photos; captions come from the "photos" translation namespace. */
export default function PhotoGrid({
  keys,
  cols = 'sm:grid-cols-2 lg:grid-cols-4',
  captions = true
}: {
  keys: PhotoKey[];
  cols?: string;
  captions?: boolean;
}) {
  const t = useTranslations('photos');
  return (
    <ul className={`grid gap-4 ${cols}`}>
      {keys.map((key) => (
        <li key={key}>
          <figure className="overflow-hidden rounded-lg border border-line bg-white">
            <div className="relative aspect-[4/3] bg-surface-alt">
              <Image
                src={PHOTOS[key].src}
                alt={t(key)}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {captions && <figcaption className="px-3 py-2 text-xs text-ink-body">{t(key)}</figcaption>}
          </figure>
        </li>
      ))}
    </ul>
  );
}
