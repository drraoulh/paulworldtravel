/** Public address of the training site, for canonical links, Open Graph and the sitemap. */
export const SITE_URL = 'https://formation.paulworldtravel.com';
export const SITE_NAME = 'Paul World Travel Formation';

/** Absolute URL of a path that starts with a slash (the site uses trailing slashes). */
export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;
