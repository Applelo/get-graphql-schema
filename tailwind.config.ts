import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      green: colors.green,
    },
    extend: {
      colors: {
        cerise: {
          50: '#fdf2fa',
          100: '#fce7f6',
          200: '#fcceef',
          300: '#fba6e0',
          400: '#f76fc9',
          500: '#f044b2',
          600: '#e13098',
          700: '#c21475',
          800: '#a01460',
          900: '#851653',
          950: '#52052f',
        },
      },
    },
  },
}
