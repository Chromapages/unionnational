import { describe, it, expect } from 'vitest'
import { cn, extractString } from './utils'

describe('cn utility', () => {
  it('merges tailwind classes correctly', () => {
    expect(cn('px-2 py-2', 'p-4')).toBe('p-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles conditional classes', () => {
    expect(cn('base', true && 'active', false && 'hidden')).toBe('base active')
  })
})

describe('extractString utility', () => {
  it('returns raw string if value is string', () => {
    expect(extractString('hello')).toBe('hello')
  })

  it('extracts current locale from object', () => {
    const val = { en: 'Hello', es: 'Hola' }
    expect(extractString(val, 'en')).toBe('Hello')
    expect(extractString(val, 'es')).toBe('Hola')
  })

  it('falls back to en if locale not found', () => {
    const val = { en: 'Hello' }
    expect(extractString(val, 'fr')).toBe('Hello')
  })

  it('returns fallback if no string found', () => {
    expect(extractString(null, 'en', 'Default')).toBe('Default')
    expect(extractString({}, 'en', 'Default')).toBe('Default')
  })
})
