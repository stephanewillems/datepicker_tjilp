/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      tjilp: ['Tjilp'],
    },
    extend: {

      colors: {
        primary: {
          DEFAULT: '#0073E6',
          hover: '#0073E6',
          dark: '#294766',
          light: '#A2B7CC',
          info: '#5C7A99',
          '50': '#F3F9FF',
          '100': '#E5F2FF',
          '200': '#CBE5FF',
          '300': '#A5D2FF',
          '400': '#67B3FF',
          '500': '#67B3FF',
          '600': '#0073E6',
          '700': '#005CB8',
          '800': '#004A94',
          '900': '#003D7A',
          '1000': '#002346',
        },
        secondary: {
          DEFAULT: '#B8BFCC',
          hover: '#A0A9BA',
          light: '#FAFBFD',
          '50': '#FAF8EC',
          '100': '#F6F1CE',
          '200': '#F1E480',
          '300': '#E8CE0A',
          '400': '#C3AF15',
          '500': '#A1921E',
          '600': '#827724',
          '700': '#675F27',
          '800': '#514C29',
          '900': '#413E2A',
          '1000': '#24231E',
        },
        shade: {
          DEFAULT: '#71767C',
          '50': '#F8F8F8',
          '100': '#F0F0F1',
          '200': '#E1E2E3',
          '300': '#CBCDD0',
          '400': '#ACAFB3',
          '500': '#8D9297',
          '600': '#71767C',
          '700': '#5B5F64',
          '800': '#484B4F',
          '900': '#3B3E41',
          '1000': '#212325',
        },
        muted: {
          DEFAULT: '#EBF0F5',
          '30': '#FBFCFD',
          '50': '#F8FAFC',
          '100': '#F2F5F7',
          '200': '#DFE6ED',
          '300': '#CCD8E3',
          '400': '#B8CADB',
          '500': '#9DB9D4',
          '600': '#84A4C4',
          '700': '#7290AD',
          '800': '#5C7691',
          '900': '#465C73',
          '1000': '#2B3845',
        },
        warning: {
          DEFAULT: '#FF7700',
          '50': '#FBF8F6',
          '100': '#F7EFE7',
          '200': '#F4DFCD',
          '300': '#F2C6A0',
          '400': '#F39B4D',
          '500': '#FF7700',
          '600': '#BB5E0C',
          '700': '#904E14',
          '800': '#6E4119',
          '900': '#59391D',
          '1000': '#2F2115',
        },
        error: {
          DEFAULT: '#ED0008',
          '50': '#FBF8F8',
          '100': '#F7EEEE',
          '200': '#F4DDDE',
          '300': '#F2C3C5',
          '400': '#F1979A',
          '500': '#F56166',
          '600': '#ED0008',
          '700': '#BC0C12',
          '800': '#921418',
          '900': '#761B1E',
          '1000': '#3E1415',
        },
        valid: {
          DEFAULT: '#81E50F',
          '50': '#F3F9EC',
          '100': '#E8F6D7',
          '200': '#C5F093',
          '300': '#81E50F',
          '400': '#69C400',
          '500': '#5BA20B',
          '600': '#4E8312',
          '700': '#426717',
          '800': '#37511A',
          '900': '#32431D',
          '1000': '#1E2515',
        },
        info: {
          DEFAULT: '#A93CF1',
          '50': '#F9F8FA',
          '100': '#F4F0F6',
          '200': '#EAE0F1',
          '300': '#DEC7ED',
          '400': '#CB9EE9',
          '500': '#BB74EB',
          '600': '#A93CF1',
          '700': '#8A1ED2',
          '800': '#6B249B',
          '900': '#562775',
          '1000': '#301C3E',
        },
      },
    },
  },
  plugins: [],
}