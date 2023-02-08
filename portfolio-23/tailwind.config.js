module.exports = {
  content: [
    "./components/**/*.{js, jsx}",
    "./pages/**/*.{js, jsx}",
  ],
  purge: [],
  theme: {
    screens: {
      sm: '215px',
      md: '768px',
      lg: '1260px',
      xl: '1440px',
    },
    colors: {
      'mint': '#dbfff8',
      'blue': '#1fb6ff',
      'black': '#000000',
      'purple': '#7e5bef',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'white': '#ffffff',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      Kaldera: ['Kaldera', 'sans-serif'],
      GT_Flexa: ['GT-Flexa', 'serif'],
      Bebas_Neue: ['Bebas Neue', 'cursive'],
    },
    fontSize: {
      xs: '0.5rem',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.125rem',
      '2xl': '2.563rem',
      '3xl': '3.953rem',
      '4xl': '5.441rem',
      '5xl': '8.25rem',
    }

  },
  variants: {},
  plugins: [],
}
