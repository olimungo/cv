/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'dark-space': 'rgba(2, 0, 36, 1)',
                primary: '#bf7bd9',
                secondary: '#efceff',
                ternary: '#8f37aa',
                'gradient-from': 'rgba(2, 0, 36, 1)',
                'gradient-via': 'rgba(55, 24, 65, 1)',
                'gradient-to': 'rgba(100, 39, 119, 1)',
            },
            boxShadow: {
                glow: '0 0 50px 15px rgba(100, 39, 119, 0.5)',
            },
        },
    },
    plugins: [],
};
