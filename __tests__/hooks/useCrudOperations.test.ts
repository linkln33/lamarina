import { renderHook, act } from '@testing-library/react'
import { useCrudOperations } from '@/hooks/admin/useCrudOperations'
import { DatabaseService } from '@/lib/database-service'

// Mock the DatabaseService
jest.mock('@/lib/database-service', () => ({
  DatabaseService: {
    getListings: jest.fn(() => [
      { id: '1', title: 'Test Listing', price: 100000 },
      { id: '2', title: 'Another Listing', price: 200000 }
    ]),
    getBlogPosts: jest.fn(() => [
      { id: '1', title: 'Test Post', content: 'Test content' },
      { id: '2', title: 'Another Post', content: 'Another content' }
    ]),
    getPortfolioItems: jest.fn(() => [
      { id: '1', title: 'Test Portfolio', description: 'Test description' },
      { id: '2', title: 'Another Portfolio', description: 'Another description' }
    ]),
    getUsers: jest.fn(() => [
      { id: '1', name: 'Test User', email: 'test@example.com' },
      { id: '2', name: 'Another User', email: 'another@example.com' }
    ]),
    getPages: jest.fn(() => [
      { id: '1', title: 'Test Page', content: 'Test content' },
      { id: '2', title: 'Another Page', content: 'Another content' }
    ]),
    createListing: jest.fn((data) => ({ id: '3', ...data, createdAt: '2024-01-01T00:00:00Z' })),
    createBlogPost: jest.fn((data) => ({ id: '3', ...data, createdAt: '2024-01-01T00:00:00Z' })),
    createPortfolioItem: jest.fn((data) => ({ id: '3', ...data, createdAt: '2024-01-01T00:00:00Z' })),
    createUser: jest.fn((data) => ({ id: '3', ...data, createdAt: '2024-01-01T00:00:00Z' })),
    createPage: jest.fn((data) => ({ id: '3', ...data, createdAt: '2024-01-01T00:00:00Z' })),
    updateListing: jest.fn(),
    updateBlogPost: jest.fn(),
    updatePortfolioItem: jest.fn(),
    updateUser: jest.fn(),
    updatePage: jest.fn(),
    deleteListing: jest.fn(),
    deleteBlogPost: jest.fn(),
    deletePortfolioItem: jest.fn(),
    deleteUser: jest.fn(),
    deletePage: jest.fn(),
  }
}))

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  }
}))

// Mock window.confirm
const mockConfirm = jest.fn()
Object.defineProperty(window, 'confirm', {
  value: mockConfirm,
  writable: true,
})

describe('useCrudOperations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockConfirm.mockReturnValue(true)
  })

  it('should load listings by default', () => {
    const { result } = renderHook(() => useCrudOperations({ entityType: 'listings' }))

    expect(result.current.items).toHaveLength(2)
    expect(result.current.loading).toBe(false)
    expect(DatabaseService.getListings).toHaveBeenCalled()
  })

  it('should load blog posts when entityType is blogPosts', () => {
    const { result } = renderHook(() => useCrudOperations({ entityType: 'blogPosts' }))

    expect(result.current.items).toHaveLength(2)
    expect(DatabaseService.getBlogPosts).toHaveBeenCalled()
  })

  it('should load portfolio items when entityType is portfolioItems', () => {
    const { result } = renderHook(() => useCrudOperations({ entityType: 'portfolioItems' }))

    expect(result.current.items).toHaveLength(2)
    expect(DatabaseService.getPortfolioItems).toHaveBeenCalled()
  })

  it('should load users when entityType is users', () => {
    const { result } = renderHook(() => useCrudOperations({ entityType: 'users' }))

    expect(result.current.items).toHaveLength(2)
    expect(DatabaseService.getUsers).toHaveBeenCalled()
  })

  it('should load pages when entityType is pages', () => {
    const { result } = renderHook(() => useCrudOperations({ entityType: 'pages' }))

    expect(result.current.items).toHaveLength(2)
    expect(DatabaseService.getPages).toHaveBeenCalled()
  })

  it('should create a new listing', async () => {
    const { result } = renderHook(() => useCrudOperations({ entityType: 'listings' }))
    
    const newListing = { title: 'New Listing', price: 300000 }
    
    await act(async () => {
      await result.current.createItem(newListing)
    })

    expect(DatabaseService.createListing).toHaveBeenCalledWith(newListing)
    expect(result.current.items).toHaveLength(3)
  })

  it('should create a new blog post', async () => {
    const { result } = renderHook(() => useCrudOperations({ entityType: 'blogPosts' }))
    
    const newPost = { title: 'New Post', content: 'New content' }
    
    await act(async () => {
      await result.current.createItem(newPost)
    })

    expect(DatabaseService.createBlogPost).toHaveBeenCalledWith(newPost)
    expect(result.current.items).toHaveLength(3)
  })

  it('should update an existing item', async () => {
    const { result } = renderHook(() => useCrudOperations({ entityType: 'listings' }))
    
    const updates = { title: 'Updated Listing' }
    
    await act(async () => {
      await result.current.updateItem('1', updates)
    })

    expect(DatabaseService.updateListing).toHaveBeenCalledWith('1', updates)
  })

  it('should delete an item when confirmed', async () => {
    const { result } = renderHook(() => useCrudOperations({ entityType: 'listings' }))
    
    await act(async () => {
      await result.current.deleteItem('1')
    })

    expect(mockConfirm).toHaveBeenCalledWith('Сигурни ли сте, че искате да изтриете този запис?')
    expect(DatabaseService.deleteListing).toHaveBeenCalledWith('1')
    expect(result.current.items).toHaveLength(1)
  })

  it('should not delete an item when not confirmed', async () => {
    mockConfirm.mockReturnValue(false)
    const { result } = renderHook(() => useCrudOperations({ entityType: 'listings' }))
    
    await act(async () => {
      await result.current.deleteItem('1')
    })

    expect(mockConfirm).toHaveBeenCalledWith('Сигурни ли сте, че искате да изтриете този запис?')
    expect(DatabaseService.deleteListing).not.toHaveBeenCalled()
    expect(result.current.items).toHaveLength(2)
  })

  it('should filter items based on search term', () => {
    const { result } = renderHook(() => useCrudOperations({ entityType: 'listings' }))
    
    act(() => {
      result.current.setSearchTerm('Test')
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].title).toBe('Test Listing')
  })

  it('should call onSuccess callback when provided', async () => {
    const onSuccess = jest.fn()
    const { result } = renderHook(() => useCrudOperations({ 
      entityType: 'listings', 
      onSuccess 
    }))
    
    const newListing = { title: 'New Listing', price: 300000 }
    
    await act(async () => {
      await result.current.createItem(newListing)
    })

    expect(onSuccess).toHaveBeenCalled()
  })

  it('should handle errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    DatabaseService.createListing.mockImplementation(() => {
      throw new Error('Database error')
    })

    const { result } = renderHook(() => useCrudOperations({ entityType: 'listings' }))
    
    const newListing = { title: 'New Listing', price: 300000 }
    
    await act(async () => {
      try {
        await result.current.createItem(newListing)
      } catch (error) {
        // Expected to throw
      }
    })

    expect(consoleSpy).toHaveBeenCalledWith('Error creating listings:', expect.any(Error))
    consoleSpy.mockRestore()
  })

  it('should refresh items when refresh is called', () => {
    const { result } = renderHook(() => useCrudOperations({ entityType: 'listings' }))
    
    act(() => {
      result.current.refresh()
    })

    expect(DatabaseService.getListings).toHaveBeenCalledTimes(2) // Once on mount, once on refresh
  })
})
