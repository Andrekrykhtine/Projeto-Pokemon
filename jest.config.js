export default {
  // Define os padrões de busca para arquivos de teste
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  
  // Ignora pastas específicas
  testPathIgnorePatterns: ['/node_modules/'],
  
  // Configura mapeamento de módulos para arquivos CSS/SCSS
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  // Extensões de arquivos suportadas
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  
  // Configura o ambiente de teste
  testEnvironment: 'jsdom',
};