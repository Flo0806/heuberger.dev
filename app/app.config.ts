export default defineAppConfig({
  ui: {
    colors: {
      // Glacier traegt alles Interaktive - Buttons, Links, Focus-Ringe.
      primary: 'glacier',
      // Ember ist Signal, kein Grundton. Nur ueber color="accent" abrufbar.
      accent: 'orange',
      secondary: 'glacier',
      neutral: 'ink',
      info: 'glacier',
      // Semantik bewusst weg vom Orange-Bereich, damit sie nicht mit Ember konkurriert.
      success: 'emerald',
      warning: 'yellow',
      error: 'rose'
    }
  },
  // Site metadata
  site: {
    name: 'Florian Heuberger',
    title: 'Senior Fullstack Developer',
    description: 'Senior Fullstack Developer & Nuxt Ecosystem Member',
    socials: {
      github: 'https://github.com/Flo0806',
      linkedin: 'https://www.linkedin.com/in/florian-heuberger-93700b166/'
    },
    email: 'f.heuberger@gmx.net'
  }
})
