import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

// Mock the LanguageContext
jest.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'admin.dashboard': 'Dashboard',
        'admin.homepage': 'Homepage',
        'admin.listings': 'Listings',
        'admin.blog': 'Blog',
        'admin.portfolio': 'Portfolio',
        'admin.users': 'Users',
        'admin.pages': 'Pages',
        'admin.analytics': 'Analytics',
        'admin.messages': 'Messages',
        'admin.settings': 'Settings',
        'admin.security': 'Security',
      }
      return translations[key] || key
    },
  }),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/admin',
}))

describe('AdminSidebar Component', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('renders with closed state by default', () => {
    render(<AdminSidebar isOpen={false} onClose={mockOnClose} />)
    
    const sidebar = screen.getByRole('navigation', { hidden: true })
    expect(sidebar).toBeInTheDocument()
  })

  it('renders with open state', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />)
    
    const sidebar = screen.getByRole('navigation', { hidden: true })
    expect(sidebar).toBeInTheDocument()
  })

  it('displays the brand logo and name', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByText('LAMARINA BG')).toBeInTheDocument()
  })

  it('renders all navigation items', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Homepage')).toBeInTheDocument()
    expect(screen.getByText('Listings')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Pages')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Messages')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
  })

  it('shows close button on mobile', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />)
    
    // The close button is an icon button without text, so we find it by its SVG icon
    const closeButton = screen.getByRole('button')
    expect(closeButton).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />)
    
    // The close button is an icon button without text, so we find it by its role
    const closeButton = screen.getByRole('button')
    await userEvent.click(closeButton)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('displays user profile information', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByText('Администратор')).toBeInTheDocument()
    expect(screen.getByText('admin@lamarina.bg')).toBeInTheDocument()
  })

  it('renders navigation links with correct hrefs', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/admin')
    expect(screen.getByRole('link', { name: /homepage/i })).toHaveAttribute('href', '/admin/homepage')
    expect(screen.getByRole('link', { name: /listings/i })).toHaveAttribute('href', '/admin/listings')
    expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute('href', '/admin/blog')
    expect(screen.getByRole('link', { name: /portfolio/i })).toHaveAttribute('href', '/admin/portfolio')
    expect(screen.getByRole('link', { name: /users/i })).toHaveAttribute('href', '/admin/users')
    expect(screen.getByRole('link', { name: /pages/i })).toHaveAttribute('href', '/admin/pages')
    expect(screen.getByRole('link', { name: /analytics/i })).toHaveAttribute('href', '/admin/analytics')
    expect(screen.getByRole('link', { name: /messages/i })).toHaveAttribute('href', '/admin/messages')
    expect(screen.getByRole('link', { name: /settings/i })).toHaveAttribute('href', '/admin/settings')
    expect(screen.getByRole('link', { name: /security/i })).toHaveAttribute('href', '/admin/security')
  })

  it('applies active styles to current page', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />)
    
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i })
    expect(dashboardLink).toHaveClass('bg-primary', 'text-primary-foreground')
  })

  it('renders mobile overlay when open', () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />)
    
    const overlay = document.querySelector('.fixed.inset-0.z-40')
    expect(overlay).toBeInTheDocument()
  })

  it('does not render mobile overlay when closed', () => {
    render(<AdminSidebar isOpen={false} onClose={mockOnClose} />)
    
    const overlay = document.querySelector('.fixed.inset-0.z-40')
    expect(overlay).not.toBeInTheDocument()
  })

  it('calls onClose when overlay is clicked', async () => {
    render(<AdminSidebar isOpen={true} onClose={mockOnClose} />)
    
    const overlay = document.querySelector('.fixed.inset-0.z-40')
    if (overlay) {
      await userEvent.click(overlay)
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    }
  })
})
