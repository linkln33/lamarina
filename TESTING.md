# Testing Guide

This project includes comprehensive testing setup with both unit tests and end-to-end (e2e) tests.

## Test Structure

```
__tests__/
├── components/          # Component unit tests
│   ├── ui/             # UI component tests
│   ├── admin/          # Admin component tests
│   └── layout/         # Layout component tests
├── hooks/              # Custom hook tests
├── contexts/           # Context tests
├── utils/              # Utility function tests
│   ├── test-utils.tsx  # Test utilities and helpers
│   └── mock-data.ts    # Mock data for tests
└── setup.ts           # Global test setup

e2e/                    # End-to-end tests
├── homepage.spec.ts    # Homepage e2e tests
├── admin.spec.ts       # Admin panel e2e tests
├── contact.spec.ts     # Contact page e2e tests
└── admin-workflow.spec.ts # Admin workflow e2e tests
```

## Running Tests

### Unit Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### End-to-End Tests

```bash
# Run all e2e tests
npm run test:e2e

# Run e2e tests with UI
npm run test:e2e:ui

# Run e2e tests in headed mode
npm run test:e2e:headed
```

### All Tests

```bash
# Run both unit and e2e tests
npm run test:all
```

## Test Configuration

### Jest Configuration

- **File**: `jest.config.js`
- **Setup**: `jest.setup.js` and `__tests__/setup.ts`
- **Environment**: jsdom
- **Coverage**: 70% threshold for branches, functions, lines, and statements

### Playwright Configuration

- **File**: `playwright.config.ts`
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Mobile Chrome, Mobile Safari
- **Base URL**: `http://localhost:3000`

## Test Utilities

### Custom Render Function

```typescript
import { render } from '@/__tests__/utils/test-utils'

// Renders components with all necessary providers
render(<MyComponent />)
```

### Mock Data

```typescript
import { mockListings, mockUsers, mockBlogPosts } from '@/__tests__/utils/mock-data'
```

### Test Helpers

```typescript
import { 
  createMockRouter, 
  createMockSupabaseClient, 
  waitForLoadingToFinish,
  mockFetch,
  createMockFile 
} from '@/__tests__/utils/test-utils'
```

## Writing Tests

### Component Tests

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)
    
    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Updated Text')).toBeInTheDocument()
  })
})
```

### Hook Tests

```typescript
import { renderHook, act } from '@testing-library/react'
import { useMyHook } from '@/hooks/useMyHook'

describe('useMyHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useMyHook())
    expect(result.current.value).toBe('initial')
  })

  it('updates state correctly', () => {
    const { result } = renderHook(() => useMyHook())
    
    act(() => {
      result.current.setValue('new value')
    })
    
    expect(result.current.value).toBe('new value')
  })
})
```

### E2E Tests

```typescript
import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/LAMARINA BG/)
  })

  test('should navigate to different pages', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /about/i }).click()
    await expect(page).toHaveURL('/about')
  })
})
```

## Mocking

### API Calls

```typescript
// Mock fetch
mockFetch({ data: 'response' })

// Mock Supabase
const mockSupabase = createMockSupabaseClient()
```

### Next.js Router

```typescript
// Mock router
const mockRouter = createMockRouter({ pathname: '/admin' })
```

### External Libraries

```typescript
// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: { div: 'div' },
  AnimatePresence: ({ children }) => children,
}))

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: jest.fn() }),
}))
```

## Coverage

The project maintains 70% code coverage across:
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## CI/CD Integration

Tests are automatically run on:
- Push to `main` and `develop` branches
- Pull requests to `main` and `develop` branches

The CI pipeline includes:
1. **Unit Tests**: Jest tests with coverage
2. **E2E Tests**: Playwright tests across multiple browsers
3. **Build Test**: Ensures the application builds successfully
4. **Linting**: ESLint checks

## Best Practices

### Unit Tests
- Test component rendering
- Test user interactions
- Test state changes
- Test error handling
- Mock external dependencies

### E2E Tests
- Test critical user flows
- Test responsive design
- Test form submissions
- Test navigation
- Test accessibility

### Test Organization
- Group related tests in `describe` blocks
- Use descriptive test names
- Keep tests focused and simple
- Use proper cleanup in `beforeEach`/`afterEach`

### Mocking Strategy
- Mock external APIs and services
- Mock complex dependencies
- Use realistic mock data
- Keep mocks simple and maintainable

## Debugging Tests

### Unit Tests
```bash
# Run specific test file
npm test -- --testPathPattern=button.test.tsx

# Run tests in debug mode
npm test -- --detectOpenHandles --forceExit
```

### E2E Tests
```bash
# Run specific test file
npx playwright test homepage.spec.ts

# Run tests in headed mode
npx playwright test --headed

# Run tests with UI
npx playwright test --ui
```

## Troubleshooting

### Common Issues

1. **Test timeouts**: Increase timeout in test configuration
2. **Mock issues**: Ensure mocks are properly configured
3. **Async operations**: Use `act()` for state updates
4. **E2E flakiness**: Add proper waits and assertions

### Performance

- Run tests in parallel when possible
- Use `--maxWorkers` for Jest
- Use `--workers` for Playwright
- Consider test sharding for large test suites
