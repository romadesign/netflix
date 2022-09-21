// const defaultTheme = require('tailwindcss/defaultTheme')

// module.exports = {
//     content: ['./src/**/*.js'],
//     darkMode: 'media',
//     theme: {
//         extend: {
//             fontFamily: {
//                 sans: ['Nunito', ...defaultTheme.fontFamily.sans],
//             },
//         },
//     },
//     variants: {
//         extend: {
//             opacity: ['disabled'],
//         },
//     },
//     plugins: [require('@tailwindcss/forms')],
// }


const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: ['./src/**/*.js'],
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
          addUtilities({
            '.scrollbar-hide': {
              /* IE and Edge */
              '-ms-overflow-style': 'none',
    
              /* Firefox */
              'scrollbar-width': 'none',
    
              /* Safari and Chrome */
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }
          }
          )
        })]
}


//solucion para ocultar el scroll 
// https://stackoverflow.com/questions/66416614/how-to-create-scrollable-element-in-tailwind-without-a-scrollbar