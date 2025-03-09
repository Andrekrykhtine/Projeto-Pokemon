import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// Não é mais necessário estender os matchers manualmente
// A linha expect.extend(matchers) não é mais necessária

// Limpa após cada teste
afterEach(() => {
  cleanup()
})