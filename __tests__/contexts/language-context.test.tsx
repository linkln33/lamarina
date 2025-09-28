import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'

// Test component to use the context
const TestComponent = () => {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div>
      <div data-testid="current-language">{language}</div>
      <button data-testid="set-bg" onClick={() => setLanguage('bg')}>
        Set Bulgarian
      </button>
      <button data-testid="set-en" onClick={() => setLanguage('en')}>
        Set English
      </button>
      <div data-testid="translation">{t('nav.about')}</div>
    </div>
  )
}

describe('LanguageContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('provides default language (Bulgarian)', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-language')).toHaveTextContent('bg')
    expect(screen.getByTestId('translation')).toHaveTextContent('За нас')
  })

  it('allows changing language', async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    // Initially Bulgarian
    expect(screen.getByTestId('current-language')).toHaveTextContent('bg')
    expect(screen.getByTestId('translation')).toHaveTextContent('За нас')

    // Change to English
    await userEvent.click(screen.getByTestId('set-en'))
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('en')
    expect(screen.getByTestId('translation')).toHaveTextContent('About')
  })

  it('persists language in localStorage', async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    // Change to English
    await userEvent.click(screen.getByTestId('set-en'))
    
    // Check localStorage
    expect(localStorage.getItem('language')).toBe('en')
  })

  it('loads language from localStorage on mount', () => {
    // Set language in localStorage before rendering
    localStorage.setItem('language', 'en')

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-language')).toHaveTextContent('en')
    expect(screen.getByTestId('translation')).toHaveTextContent('About')
  })

  it('ignores invalid language in localStorage', () => {
    // Set invalid language in localStorage
    localStorage.setItem('language', 'invalid')

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    // Should default to Bulgarian
    expect(screen.getByTestId('current-language')).toHaveTextContent('bg')
  })

  it('translates different keys correctly', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    // Test Bulgarian translations
    expect(screen.getByTestId('translation')).toHaveTextContent('За нас')
  })

  it('returns key when translation is missing', () => {
    const MissingTranslationComponent = () => {
      const { t } = useLanguage()
      return <div data-testid="missing">{t('nonexistent.key')}</div>
    }

    render(
      <LanguageProvider>
        <MissingTranslationComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId('missing')).toHaveTextContent('nonexistent.key')
  })

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useLanguage must be used within a LanguageProvider')

    consoleSpy.mockRestore()
  })

  it('handles language switching with different translations', async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    // Start with Bulgarian
    expect(screen.getByTestId('translation')).toHaveTextContent('За нас')

    // Switch to English
    await userEvent.click(screen.getByTestId('set-en'))
    expect(screen.getByTestId('translation')).toHaveTextContent('About')

    // Switch back to Bulgarian
    await userEvent.click(screen.getByTestId('set-bg'))
    expect(screen.getByTestId('translation')).toHaveTextContent('За нас')
  })
})
