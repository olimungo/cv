/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'dark-space': '#0a0727',
                'light-space': '#17153f',
                primary: '#de88ff',
                secondary: '#efceff',
                ternary: '#8f37aa',
                accent: '#6a2a6e',
                'accent-secondary': '#3a1645',
                'app-from': '#020024',
                'app-via': '#371841',
                'app-to': '#642777',
                'skill-green': '#55a000',
                'skill-orange': '#f2b01e',
            },
            boxShadow: {
                glow: '0 0 50px 1px rgba(100, 39, 119, 0.5)',
                contrast:
                    '0 0 0 1px #000, 0 30px 30px rgba(0, 0, 0, 0.07), \
                     0 15px 15px rgba(0, 0, 0, 0.06), \
                     0 10px 8px rgba(0, 0, 0, 0.05), \
                     0 4px 4px rgba(0, 0, 0, 0.04), \
                     0 2px 2px rgba(0, 0, 0, 0.03)',
            },
        },
    },
    safelist: ['bg-ternary', 'bg-accent', 'rounded', 'rounded-xl'],
    plugins: [],
};
