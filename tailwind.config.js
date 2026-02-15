/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-blue': '#0890F1',
                'brand-yellow': '#FFD06D',
                'brand-dark': '#1F2937', // Gray-800 for text
                'brand-light': '#F9FAFB', // Gray-50 for off-white
            },
            animation: {
                'fade-in-down': 'fadeInDown 0.8s ease-out',
            },
            keyframes: {
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
