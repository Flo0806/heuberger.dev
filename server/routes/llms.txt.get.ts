/**
 * llms.txt - the entry point AI crawlers look for first. Points them at the
 * Markdown CV instead of leaving them to parse a hydrated page.
 */
export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600');
  return `# Florian Heuberger

> Senior Fullstack Developer (Vue, Nuxt, TypeScript, Node.js), Nuxt ecosystem member, Nuxtathon #1 champion 2026, open source maintainer (jasy, vorm, nuxt-spyglass, nuxt-pigeon).

## Résumé

- [CV, German](https://heuberger.dev/cv.md): Lebenslauf als Markdown
- [CV, English](https://heuberger.dev/cv.md?lang=en): Résumé as Markdown
- [CV, web](https://heuberger.dev/cv): Human-readable version with JSON-LD Person schema

## Profiles

- [GitHub](https://github.com/Flo0806)
- [npm](https://www.npmjs.com/~flogersoft)
- [LinkedIn](https://www.linkedin.com/in/florian-heuberger-93700b166/)
`;
});
