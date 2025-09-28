import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('handles conditional classes', () => {
    expect(cn('base', true && 'conditional')).toBe('base conditional')
    expect(cn('base', false && 'conditional')).toBe('base')
  })

  it('handles undefined and null values', () => {
    expect(cn('base', undefined, null)).toBe('base')
  })

  it('handles empty strings', () => {
    expect(cn('base', '')).toBe('base')
  })

  it('handles arrays of classes', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2')
  })

  it('handles objects with boolean values', () => {
    expect(cn({ 'class1': true, 'class2': false })).toBe('class1')
  })

  it('merges conflicting Tailwind classes correctly', () => {
    expect(cn('px-2 px-4')).toBe('px-4')
    expect(cn('bg-red-500 bg-blue-500')).toBe('bg-blue-500')
  })

  it('handles complex combinations', () => {
    const result = cn(
      'base-class',
      'px-2 px-4',
      { 'conditional': true, 'hidden': false },
      ['array-class1', 'array-class2'],
      undefined,
      null,
      ''
    )
    expect(result).toBe('base-class px-4 conditional array-class1 array-class2')
  })

  it('handles empty input', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
  })

  it('handles single class', () => {
    expect(cn('single-class')).toBe('single-class')
  })
})
