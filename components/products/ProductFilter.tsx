'use client';

import { useEffect, useState, type ReactNode } from 'react';

export type FilterGroup = {
  key: string;
  anchor: string;
  label: string;
  intro: string;
  count: number;
  content: ReactNode;
};

type Props = {
  groups: FilterGroup[];
  allLabel: string;
  filterLabel: string;
};

const ALL = 'all';

export default function ProductFilter({ groups, allLabel, filterLabel }: Props) {
  const [active, setActive] = useState(ALL);

  useEffect(() => {
    const match = groups.find((g) => g.anchor === window.location.hash.slice(1));
    if (match) setActive(match.key);
  }, [groups]);

  function select(key: string) {
    setActive(key);
    const group = groups.find((g) => g.key === key);
    const url = group ? `#${group.anchor}` : window.location.pathname + window.location.search;
    window.history.replaceState(null, '', url);
  }

  const chip = (selected: boolean) =>
    `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
      selected ? 'border-navy-800 bg-navy-800 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-navy-600'
    }`;

  return (
    <>
      <div role="group" aria-label={filterLabel} className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={active === ALL} onClick={() => select(ALL)} className={chip(active === ALL)}>
          {allLabel}
        </button>
        {groups.map((g) => (
          <button key={g.key} type="button" aria-pressed={active === g.key} onClick={() => select(g.key)} className={chip(active === g.key)}>
            {g.label}
            <span className={`text-xs ${active === g.key ? 'text-navy-100' : 'text-slate-400'}`}>{g.count}</span>
          </button>
        ))}
      </div>

      <div className="mt-12 space-y-16">
        {groups
          .filter((g) => active === ALL || g.key === active)
          .map((g) => (
            <section key={g.key} id={g.anchor} aria-labelledby={`${g.anchor}-title`} className="scroll-mt-24">
              <h2 id={`${g.anchor}-title`} className="text-2xl font-bold tracking-tight text-navy-900">
                {g.label}
              </h2>
              <p className="mt-2 max-w-3xl text-slate-600">{g.intro}</p>
              <div className="mt-6">{g.content}</div>
            </section>
          ))}
      </div>
    </>
  );
}
