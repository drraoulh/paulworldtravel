/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
  // Old addresses, kept working after the site was reorganised by épreuve.
  async redirects() {
    return [
      { source: '/cours', destination: '/parcours/', permanent: true },
      { source: '/entrainement', destination: '/entrainement/series/', permanent: false },
      { source: '/entrainement/expression-ecrite', destination: '/epreuve/expression-ecrite/simulateur/', permanent: true },
      { source: '/entrainement/expression-orale', destination: '/epreuve/expression-orale/simulateur/', permanent: true },
      { source: '/parcours/:module/:lecon', destination: '/epreuve/:module/methodologie/:lecon/', permanent: true },
      { source: '/parcours/:module', destination: '/epreuve/:module/methodologie/', permanent: true },
    ];
  },
};
