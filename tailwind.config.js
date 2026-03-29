/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: '#0A0A0A',
                    light: '#F5F0EB',
                },
                gold: {
                    DEFAULT: '#C9A96E',
                    hover: '#D4AF37',
                },
                text: {
                    light: '#FAFAFA',
                    dark: '#1A1A1A',
                    muted: '#666666',
                },
                border: {
                    dark: '#2A2A2A',
                    light: '#E8E0D6',
                }
            },
            fontFamily: {
                primary: ['"Cormorant Garamond"', 'serif'],
                secondary: ['Inter', 'sans-serif'],
                accent: ['"Playfair Display"', 'serif'],
            },
            borderRadius: {
                none: '0px',
                sm: '2px',
                DEFAULT: '0px',
                md: '0px',
                lg: '0px',
            },
            spacing: {
                'section': '120px',
            },
            animation: {
                'marquee': 'marquee 30s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        },
    },
    plugins: [],
}
