import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Standard solution annealing is covered on the Bright Solution Annealing page.
    return [
      { source: '/services/solution-annealing', destination: '/services/bright-solution-annealing', permanent: true },
      {
        source: '/:locale(ar|de|tr|pt-BR|es|it|fr|pl|nl)/services/solution-annealing',
        destination: '/:locale/services/bright-solution-annealing',
        permanent: true
      }
    ];
  }
};

export default withNextIntl(nextConfig);
