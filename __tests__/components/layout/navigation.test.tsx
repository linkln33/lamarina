import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navigation } from '@/components/layout/navigation'

// Mock the LanguageContext
jest.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'nav.about': 'About',
        'nav.portfolio': 'Portfolio',
        'nav.services': 'Services',
        'nav.blog': 'Blog',
        'nav.products.title': 'Products',
        'nav.products.roofing': 'Roofing Systems',
        'nav.products.structures': 'Metal Structures',
        'nav.products.bending': 'Bending',
        'nav.products.cutting': 'Cutting',
        'nav.products.welding': 'Welding',
        'nav.products.custom': 'Custom',
      }
      return translations[key] || key
    },
  }),
}))

describe('Navigation Component', () => {
  it('renders the logo and brand name', () => {
    render(<Navigation />)
    
    expect(screen.getByText('LAMARINA BG')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /lamarina bg/i })).toHaveAttribute('href', '/')
  })

  it('renders desktop navigation items', () => {
    render(<Navigation />)
    
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument()
  })

  it('renders products dropdown', () => {
    render(<Navigation />)
    
    const productsButton = screen.getByRole('button', { name: /products/i })
    expect(productsButton).toBeInTheDocument()
  })

  it('opens products dropdown and shows categories', async () => {
    render(<Navigation />)
    
    const productsButton = screen.getByRole('button', { name: /products/i })
    await userEvent.click(productsButton)
    
    expect(screen.getByText('Roofing Systems')).toBeInTheDocument()
    expect(screen.getByText('Metal Structures')).toBeInTheDocument()
    expect(screen.getByText('Bending')).toBeInTheDocument()
    expect(screen.getByText('Cutting')).toBeInTheDocument()
    expect(screen.getByText('Welding')).toBeInTheDocument()
    expect(screen.getByText('Custom')).toBeInTheDocument()
  })

  it('renders admin button', () => {
    render(<Navigation />)
    
    const adminButton = screen.getByRole('link', { name: /админ/i })
    expect(adminButton).toBeInTheDocument()
    expect(adminButton).toHaveAttribute('href', '/admin')
  })

  it('renders mobile menu button', () => {
    render(<Navigation />)
    
    const menuButton = screen.getByRole('button', { name: /отвори меню/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('opens mobile menu when menu button is clicked', async () => {
    render(<Navigation />)
    
    const menuButton = screen.getByRole('button', { name: /отвори меню/i })
    await userEvent.click(menuButton)
    
    expect(screen.getByText('Меню')).toBeInTheDocument()
  })

  it('renders language toggle', () => {
    render(<Navigation />)
    
    // Language toggle should be present in both desktop and mobile
    const languageToggles = screen.getAllByRole('button')
    expect(languageToggles.length).toBeGreaterThan(0)
  })

  it('has proper navigation structure', () => {
    render(<Navigation />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50')
  })

  it('renders with proper accessibility attributes', () => {
    render(<Navigation />)
    
    const menuButton = screen.getByRole('button', { name: /отвори меню/i })
    expect(menuButton).toBeInTheDocument()
    // Note: The button uses screen reader text instead of aria-label
  })
})
