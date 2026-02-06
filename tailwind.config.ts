import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
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
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))',
    				glow: 'hsl(var(--primary-glow))',
    				dark: 'hsl(var(--primary-dark))'
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
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		backgroundImage: {
    			'gradient-primary': 'var(--gradient-primary)',
    			'gradient-dark': 'var(--gradient-dark)',
    			'gradient-hero': 'var(--gradient-hero)',
    			'gradient-cyber': 'var(--gradient-cyber)',
    			'gradient-mesh': 'var(--gradient-mesh)',
    			'gradient-neural': 'var(--gradient-neural)'
    		},
    		boxShadow: {
    			elegant: 'var(--shadow-elegant)',
    			glow: 'var(--shadow-glow)',
    			card: 'var(--shadow-card)',
    			cyber: 'var(--shadow-cyber)',
    			neural: 'var(--shadow-neural)',
    			hologram: 'var(--shadow-hologram)'
    		},
    		transitionTimingFunction: {
    			smooth: 'var(--transition-smooth)',
    			bounce: 'var(--transition-bounce)',
    			cyber: 'var(--transition-cyber)'
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
    			'pulse-glow': {
    				'0%, 100%': {
    					boxShadow: '0 0 20px hsl(221 83% 53% / 0.3)'
    				},
    				'50%': {
    					boxShadow: '0 0 40px hsl(221 83% 53% / 0.6), 0 0 60px hsl(221 83% 65% / 0.3)'
    				}
    			},
    			'text-glow': {
    				'0%, 100%': {
    					textShadow: '0 0 20px hsl(221 83% 53% / 0.6), 0 0 30px hsl(221 83% 65% / 0.4)'
    				},
    				'50%': {
    					textShadow: '0 0 30px hsl(221 83% 53% / 0.8), 0 0 40px hsl(221 83% 65% / 0.6), 0 0 50px hsl(221 83% 75% / 0.4)'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0px)'
    				},
    				'50%': {
    					transform: 'translateY(-10px)'
    				}
    			},
    			'scan-line': {
    				'0%': {
    					transform: 'translateX(-100%)'
    				},
    				'100%': {
    					transform: 'translateX(100%)'
    				}
    			},
    			'neural-pulse': {
    				'0%, 100%': {
    					opacity: '0.1'
    				},
    				'50%': {
    					opacity: '0.3'
    				}
    			},
    			'hologram-flicker': {
    				'0%, 100%': {
    					opacity: '1'
    				},
    				'10%': {
    					opacity: '0.8'
    				},
    				'20%': {
    					opacity: '1'
    				},
    				'30%': {
    					opacity: '0.9'
    				}
    			},
    			'logo-click-ripple': {
    				'0%': {
    					transform: 'scale(0)',
    					opacity: '0.8'
    				},
    				'100%': {
    					transform: 'scale(4)',
    					opacity: '0'
    				}
    			},
    			'logo-breathe': {
    				'0%, 100%': {
    					transform: 'scale(1)',
    					filter: 'brightness(1) saturate(1)'
    				},
    				'50%': {
    					transform: 'scale(1.05)',
    					filter: 'brightness(1.2) saturate(1.4)'
    				}
    			},
    			'logo-shake': {
    				'0%, 100%': {
    					transform: 'translateX(0)'
    				},
    				'10%': {
    					transform: 'translateX(-2px) rotate(-1deg)'
    				},
    				'20%': {
    					transform: 'translateX(2px) rotate(1deg)'
    				},
    				'30%': {
    					transform: 'translateX(-2px) rotate(-1deg)'
    				},
    				'40%': {
    					transform: 'translateX(2px) rotate(1deg)'
    				},
    				'50%': {
    					transform: 'translateX(-1px) rotate(-0.5deg)'
    				},
    				'60%': {
    					transform: 'translateX(1px) rotate(0.5deg)'
    				}
    			},
    			'logo-success-spin': {
    				'0%': {
    					transform: 'rotate(0deg) scale(1)'
    				},
    				'50%': {
    					transform: 'rotate(180deg) scale(1.1)'
    				},
    				'100%': {
    					transform: 'rotate(360deg) scale(1)'
    				}
    			},
    			'particle-float': {
    				'0%': {
    					transform: 'translateY(0px) translateX(0px) scale(0)',
    					opacity: '0'
    				},
    				'10%': {
    					opacity: '1',
    					transform: 'scale(1)'
    				},
    				'90%': {
    					opacity: '1'
    				},
    				'100%': {
    					transform: 'translateY(-100px) translateX(30px) scale(0)',
    					opacity: '0'
    				}
    			},
    			'holographic-shimmer': {
    				'0%': {
    					backgroundPosition: '-200% 0'
    				},
    				'100%': {
    					backgroundPosition: '200% 0'
    				}
    			},
    			'chromatic-aberration': {
    				'0%, 100%': {
    					filter: 'hue-rotate(0deg)'
    				},
    				'33%': {
    					filter: 'hue-rotate(5deg)'
    				},
    				'66%': {
    					filter: 'hue-rotate(-5deg)'
    				}
    			},
    			'matrix-rain': {
    				'0%': {
    					transform: 'translateY(-100%)',
    					opacity: '0'
    				},
    				'10%': {
    					opacity: '1'
    				},
    				'90%': {
    					opacity: '1'
    				},
    				'100%': {
    					transform: 'translateY(200%)',
    					opacity: '0'
    				}
    			},
    			'neural-orbit': {
    				'0%': {
    					transform: 'rotate(0deg) translateX(60px) rotate(0deg)'
    				},
    				'100%': {
    					transform: 'rotate(360deg) translateX(60px) rotate(-360deg)'
    				}
    			},
    			'energy-pulse': {
    				'0%': {
    					transform: 'scale(0.8)',
    					opacity: '0'
    				},
    				'50%': {
    					transform: 'scale(1.2)',
    					opacity: '0.6'
    				},
    				'100%': {
    					transform: 'scale(2)',
    					opacity: '0'
    				}
    			},
    			// NEW PREMIUM ANIMATIONS
    			'shimmer': {
    				'0%': {
    					transform: 'translateX(-100%)'
    				},
    				'100%': {
    					transform: 'translateX(100%)'
    				}
    			},
    			'border-flow': {
    				'0%, 100%': {
    					backgroundPosition: '0% 50%'
    				},
    				'50%': {
    					backgroundPosition: '100% 50%'
    				}
    			},
    			'number-tick': {
    				'0%': {
    					transform: 'translateY(0)',
    					opacity: '1'
    				},
    				'50%': {
    					transform: 'translateY(-10px)',
    					opacity: '0'
    				},
    				'51%': {
    					transform: 'translateY(10px)',
    					opacity: '0'
    				},
    				'100%': {
    					transform: 'translateY(0)',
    					opacity: '1'
    				}
    			},
    			'neon-flicker': {
    				'0%, 100%': {
    					opacity: '1',
    					filter: 'brightness(1)'
    				},
    				'3%': {
    					opacity: '0.4',
    					filter: 'brightness(0.8)'
    				},
    				'6%': {
    					opacity: '1',
    					filter: 'brightness(1)'
    				},
    				'7%': {
    					opacity: '0.4',
    					filter: 'brightness(0.8)'
    				},
    				'8%': {
    					opacity: '1',
    					filter: 'brightness(1)'
    				},
    				'9%': {
    					opacity: '0.4',
    					filter: 'brightness(0.8)'
    				},
    				'10%': {
    					opacity: '1',
    					filter: 'brightness(1)'
    				}
    			},
    			'glow-pulse-soft': {
    				'0%, 100%': {
    					boxShadow: '0 0 15px hsl(221 83% 53% / 0.2), inset 0 0 15px hsl(221 83% 53% / 0.05)'
    				},
    				'50%': {
    					boxShadow: '0 0 25px hsl(221 83% 53% / 0.4), inset 0 0 25px hsl(221 83% 53% / 0.1)'
    				}
    			},
    			'scale-subtle': {
    				'0%, 100%': {
    					transform: 'scale(1)'
    				},
    				'50%': {
    					transform: 'scale(1.02)'
    				}
    			},
    			'slide-up-fade': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(10px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			'gradient-shift': {
    				'0%, 100%': {
    					backgroundPosition: '0% 50%'
    				},
    				'50%': {
    					backgroundPosition: '100% 50%'
    				}
    			},
    			'neon-bar-pulse': {
    				'0%, 100%': {
    					opacity: '1'
    				},
    				'50%': {
    					opacity: '0.85'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
    			'text-glow': 'text-glow 3s ease-in-out infinite',
    			float: 'float 6s ease-in-out infinite',
    			'scan-line': 'scan-line 2s linear infinite',
    			'neural-pulse': 'neural-pulse 4s ease-in-out infinite',
    			'hologram-flicker': 'hologram-flicker 8s ease-in-out infinite',
    			'logo-click-ripple': 'logo-click-ripple 0.6s ease-out',
    			'logo-breathe': 'logo-breathe 4s ease-in-out infinite',
    			'logo-shake': 'logo-shake 0.5s ease-in-out',
    			'logo-success-spin': 'logo-success-spin 1s ease-in-out',
    			'particle-float': 'particle-float 3s ease-out infinite',
    			'particle-float-delay-1': 'particle-float 3s ease-out infinite 0.5s',
    			'particle-float-delay-2': 'particle-float 3s ease-out infinite 1s',
    			'particle-float-delay-3': 'particle-float 3s ease-out infinite 1.5s',
    			'holographic-shimmer': 'holographic-shimmer 3s linear infinite',
    			'chromatic-aberration': 'chromatic-aberration 2s ease-in-out infinite',
    			'matrix-rain': 'matrix-rain 2s linear infinite',
    			'matrix-rain-delay-1': 'matrix-rain 2s linear infinite 0.3s',
    			'matrix-rain-delay-2': 'matrix-rain 2s linear infinite 0.6s',
    			'neural-orbit': 'neural-orbit 8s linear infinite',
    			'energy-pulse': 'energy-pulse 2s ease-out infinite',
    			// NEW PREMIUM ANIMATIONS
    			'shimmer': 'shimmer 2s infinite',
    			'border-flow': 'border-flow 3s ease infinite',
    			'number-tick': 'number-tick 0.3s ease-out',
    			'neon-flicker': 'neon-flicker 4s ease-in-out infinite',
    			'glow-pulse-soft': 'glow-pulse-soft 3s ease-in-out infinite',
    			'scale-subtle': 'scale-subtle 3s ease-in-out infinite',
    			'slide-up-fade': 'slide-up-fade 0.4s ease-out',
    			'gradient-shift': 'gradient-shift 3s ease infinite'
    		},
    		fontFamily: {
    			sans: [
    				'ui-sans-serif',
    				'system-ui',
    				'sans-serif',
    				'Apple Color Emoji',
    				'Segoe UI Emoji',
    				'Segoe UI Symbol',
    				'Noto Color Emoji'
    			],
    			serif: [
    				'ui-serif',
    				'Georgia',
    				'Cambria',
    				'Times New Roman',
    				'Times',
    				'serif'
    			],
    			mono: [
    				'ui-monospace',
    				'SFMono-Regular',
    				'Menlo',
    				'Monaco',
    				'Consolas',
    				'Liberation Mono',
    				'Courier New',
    				'monospace'
    			]
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
