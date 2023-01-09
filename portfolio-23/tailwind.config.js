module.exports = {
  content: [
    "./components/**/*.{js, jsx}",
    "./pages/**/*.{js, jsx}",
  ],
  purge: [],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'mint': '#dbfff8',
      'blue': '#1fb6ff',
      'black': '#000000',
      'purple': '#7e5bef',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Kaldera', 'sans-serif'],
      serif: ['GT-Flexa', 'serif'],
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '3.441rem',
      '5xl': '5.052rem',
    }

  },
  variants: {},
  plugins: [],
}
