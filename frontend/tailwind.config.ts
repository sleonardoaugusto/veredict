import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'dark-blue': 'var(--dark-blue)',
        accent: 'var(--accent)',
        border: 'var(--border)',
        surface: 'var(--surface)',
        danger: 'var(--danger)',
        success: 'var(--success)',
        'ag-grid-header-background-color':
          'var(--ag-grid-header-background-color)',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('daisyui')],
} satisfies Config
