export default {
    presets: [
        ['@babel/preset-react', {
            runtime: 'automatic' // Importante para React 17+
          }]
        ],
        plugins: [
          'babel-plugin-styled-components' // Se usar styled-components
        ]
      }