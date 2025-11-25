// Dentro de tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    // Adicione os caminhos para TODOS os seus arquivos que usam classes do Tailwind
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // <== ESSE É O MAIS IMPORTANTE!
  ],
  theme: {
    extend: {
      // Você pode adicionar suas extensões de tema aqui
    },
  },
  plugins: [],
}
export default config