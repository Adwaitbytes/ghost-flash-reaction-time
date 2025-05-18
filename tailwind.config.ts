
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"], // Keep dark mode if you plan to use it, otherwise can be 'media' or removed
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
			colors: {
        // Inspired by context colors
        'primary-purple': '#9b87f5',
        'secondary-purple': '#7E69AB',
        'light-purple': '#D6BCFA',
        'soft-purple': '#E5DEFF',
        'bright-blue': '#1EAEDB', // Accent for tap zone
        'sky-blue': '#33C3F0',
        'dark-bg': '#10101A', // A very dark, slightly purplish background
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'glass-bg': 'rgba(255, 255, 255, 0.05)',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
        'ambient-glow': {
          '0%, 100%': { 'box-shadow': '0 0 20px 5px rgba(155, 135, 245, 0.3), 0 0 30px 10px rgba(30, 174, 219, 0.2)' },
          '50%': { 'box-shadow': '0 0 30px 10px rgba(155, 135, 245, 0.4), 0 0 40px 15px rgba(30, 174, 219, 0.3)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        'background-pan': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'ambient-glow': 'ambient-glow 5s infinite ease-in-out',
        'pulse-glow': 'pulse-glow 1.5s infinite ease-in-out',
        'background-pan': 'background-pan 15s linear infinite',
			},
      boxShadow: {
        'neon-blue': '0 0 5px #1EAEDB, 0 0 10px #1EAEDB, 0 0 15px #1EAEDB, 0 0 20px #33C3F0',
        'neon-purple': '0 0 5px #9b87f5, 0 0 10px #9b87f5, 0 0 15px #9b87f5, 0 0 20px #7E69AB',
      }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
