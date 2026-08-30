// fill: true renders the paths filled with currentColor; false renders stroked
export const stackItems = [
  {
    name: 'Vue 3',
    description: 'Progressive JavaScript framework with Composition API',
    color: '#41b883',
    fill: true,
    paths: ['M2 3h3.5L12 19.5 18.5 3H22L14 21h-4L2 3z']
  },
  {
    name: 'Vite',
    description: 'Next generation frontend tooling with fast HMR',
    color: '#646cff',
    fill: false,
    paths: ['M13 2L3 14h9l-1 8 10-12h-9l1-8z']
  },
  {
    name: 'TypeScript',
    description: 'Type-safe JavaScript with enhanced developer experience',
    color: '#3178c6',
    fill: true,
    paths: [
      'M3 3h18v18H3V3zm10.5 13.5v-1.8l-3.6 1.8v-1.8l3.6-1.8V9.9l-5.4 2.7v1.8l1.8-.9v3.6l3.6-1.8zm4.5-.9v-3.6h-1.8v3.6c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-3.6h-1.8v3.6c0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7z'
    ]
  },
  {
    name: 'Vue Router',
    description: 'Official routing solution for Vue.js applications',
    color: '#fbbf24',
    fill: false,
    paths: ['M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0', 'M12 2v4M12 18v4M2 12h4M18 12h4']
  },
  {
    name: 'Vitest',
    description: 'Blazing fast unit testing powered by Vite',
    color: '#fcba03',
    fill: false,
    paths: ['M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07']
  },
  {
    name: 'ESLint + Prettier',
    description: 'Code linting and formatting for consistent style',
    color: '#9ca3af',
    fill: false,
    paths: ['M9 11l3 3L22 4', 'M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11']
  }
]
