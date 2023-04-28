/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'dark-space': '#0a0727',
                'light-space': '#17153f',
                primary: '#bf7bd9',
                secondary: '#efceff',
                ternary: '#8f37aa',
                accent: '#6a2a6e',
                'accent-secondary': '#3a1645',
                'gradient-from': 'rgba(2, 0, 36, 1)',
                'gradient-via': 'rgba(55, 24, 65, 1)',
                'gradient-to': 'rgba(100, 39, 119, 1)',
            },
            boxShadow: {
                glow: '0 0 50px 1px rgba(100, 39, 119, 0.5)',
            },
        },
    },
    safelist: ['bg-ternary', 'bg-accent', 'rounded', 'rounded-xl'],
    plugins: [],
};
