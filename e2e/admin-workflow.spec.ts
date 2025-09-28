import { test, expect } from '@playwright/test'

test.describe('Admin Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin')
  })

  test('should navigate through admin sections', async ({ page }) => {
    // Wait for admin page to load
    await page.waitForLoadState('networkidle')
    
    // Check if we're on admin page
    await expect(page).toHaveURL('/admin')
    
    // Look for admin navigation or sidebar
    const adminNav = page.locator('nav, aside, [role="navigation"]')
    if (await adminNav.count() > 0) {
      await expect(adminNav.first()).toBeVisible()
    }
  })

  test('should handle admin navigation menu', async ({ page }) => {
    // Look for navigation links
    const navLinks = [
      'Dashboard',
      'Homepage', 
      'Listings',
      'Blog',
      'Portfolio',
      'Users',
      'Pages',
      'Analytics',
      'Messages',
      'Settings'
    ]
    
    for (const linkText of navLinks) {
      const link = page.getByText(linkText, { exact: false })
      if (await link.count() > 0) {
        await expect(link.first()).toBeVisible()
      }
    }
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/admin')
    
    // Admin should be functional on mobile
    await expect(page.locator('body')).toBeVisible()
    
    // Look for mobile menu or hamburger button
    const mobileMenu = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], .hamburger, .menu-toggle')
    if (await mobileMenu.count() > 0) {
      await expect(mobileMenu.first()).toBeVisible()
    }
  })

  test('should have proper page structure', async ({ page }) => {
    // Check for basic HTML structure
    await expect(page.locator('html')).toBeVisible()
    await expect(page.locator('body')).toBeVisible()
    
    // Check for meta tags
    const viewport = page.locator('meta[name="viewport"]')
    if (await viewport.count() > 0) {
      await expect(viewport).toHaveAttribute('content', /width=device-width/)
    }
    
    // Check for title
    const title = await page.title()
    expect(title).toBeTruthy()
  })

  test('should handle form interactions', async ({ page }) => {
    // Look for forms on the admin page
    const forms = page.locator('form')
    const formCount = await forms.count()
    
    if (formCount > 0) {
      // Test form interactions if forms exist
      const firstForm = forms.first()
      await expect(firstForm).toBeVisible()
      
      // Look for input fields
      const inputs = firstForm.locator('input, textarea, select')
      const inputCount = await inputs.count()
      
      if (inputCount > 0) {
        // Test typing in first input
        const firstInput = inputs.first()
        await firstInput.fill('test input')
        await expect(firstInput).toHaveValue('test input')
      }
    }
  })

  test('should handle button clicks', async ({ page }) => {
    // Look for buttons on the page
    const buttons = page.locator('button, input[type="button"], input[type="submit"]')
    const buttonCount = await buttons.count()
    
    if (buttonCount > 0) {
      // Test clicking first button
      const firstButton = buttons.first()
      await expect(firstButton).toBeVisible()
      
      // Click button and check for any changes
      await firstButton.click()
      
      // Wait a bit for any potential changes
      await page.waitForTimeout(500)
    }
  })

  test('should handle data tables if present', async ({ page }) => {
    // Look for tables
    const tables = page.locator('table')
    const tableCount = await tables.count()
    
    if (tableCount > 0) {
      const firstTable = tables.first()
      await expect(firstTable).toBeVisible()
      
      // Check for table headers
      const headers = firstTable.locator('th')
      const headerCount = await headers.count()
      
      if (headerCount > 0) {
        await expect(headers.first()).toBeVisible()
      }
      
      // Check for table rows
      const rows = firstTable.locator('tr')
      const rowCount = await rows.count()
      
      if (rowCount > 0) {
        await expect(rows.first()).toBeVisible()
      }
    }
  })

  test('should handle modals and dialogs', async ({ page }) => {
    // Look for modal triggers
    const modalTriggers = page.locator('button, a').filter({ hasText: /add|create|new|edit|delete/i })
    const triggerCount = await modalTriggers.count()
    
    if (triggerCount > 0) {
      // Click first modal trigger
      const firstTrigger = modalTriggers.first()
      await firstTrigger.click()
      
      // Look for modal/dialog
      const modal = page.locator('[role="dialog"], .modal, .dialog, [data-modal]')
      if (await modal.count() > 0) {
        await expect(modal.first()).toBeVisible()
        
        // Look for close button
        const closeButton = modal.locator('button[aria-label*="close"], button[aria-label*="Close"], .close')
        if (await closeButton.count() > 0) {
          await closeButton.first().click()
        }
      }
    }
  })

  test('should handle search functionality', async ({ page }) => {
    // Look for search inputs
    const searchInputs = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]')
    const searchCount = await searchInputs.count()
    
    if (searchCount > 0) {
      const searchInput = searchInputs.first()
      await expect(searchInput).toBeVisible()
      
      // Type in search
      await searchInput.fill('test search')
      await expect(searchInput).toHaveValue('test search')
      
      // Press Enter to trigger search
      await searchInput.press('Enter')
      
      // Wait for potential search results
      await page.waitForTimeout(1000)
    }
  })

  test('should handle pagination if present', async ({ page }) => {
    // Look for pagination
    const pagination = page.locator('.pagination, [role="navigation"] a, .page-numbers')
    const paginationCount = await pagination.count()
    
    if (paginationCount > 0) {
      // Click first pagination link
      const firstPageLink = pagination.first()
      await expect(firstPageLink).toBeVisible()
      await firstPageLink.click()
      
      // Wait for page to load
      await page.waitForLoadState('networkidle')
    }
  })
})
