// Services for the header "Services" dropdown and the /services/[slug] pages.
// Single source of truth for slugs, order and status. `name` / `description` are the English copy;
// every language (English included) is rendered from messages "services.items.<slug>".
// Services with hasContent: false render the noindex "Coming soon" template at /services/[slug];
// services with content have their own route (e.g. app/[locale]/services/bright-solution-annealing).
// Standard (air) solution annealing is covered on the Bright Solution Annealing page, not a separate service.
// PMI Testing and the Quality page (/quality) link to each other.

export type Service = {
  slug: string;
  name: string;
  description: string;
  hasContent: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: 'bright-solution-annealing',
    name: 'Bright Solution Annealing',
    description: 'Solution annealing in a protective atmosphere that leaves stainless steel bright and scale-free.',
    hasContent: true
  },
  {
    slug: 'pickling-and-passivation',
    name: 'Pickling & Passivation',
    description: 'Chemical treatment that removes scale and restores the protective oxide layer on stainless steel.',
    hasContent: true
  },
  {
    slug: 'pmi-testing',
    name: 'PMI Testing',
    description: 'Positive material identification to verify the alloy grade of metal components.',
    hasContent: true
  },
  {
    slug: 'stud-welding-solutions',
    name: 'Stud Welding / Gun Welding Solutions',
    description: 'Stud and gun welding support for fast, consistent installation of refractory anchors.',
    hasContent: true
  }
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
