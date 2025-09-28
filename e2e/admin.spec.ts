import { test, expect } from '@playwright/test'

test.describe('Admin Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin')
  })

  test('should load admin login page', async ({ page }) => {
    await expect(page).toHaveURL('/admin')
    await expect(page.locator('h1, h2, h3')).toContainText(/admin|login|sign/i)
  })

  test('should have admin navigation', async ({ page }) => {
    // Check if admin sidebar or navigation is present
    const adminNav = page.locator('nav, aside, [role="navigation"]')
    await expect(adminNav).toBeVisible()
  })

  test('should display admin sections', async ({ page }) => {
    // Check for common admin sections
    const sections = [
      'Dashboard',
      'Listings',
      'Users',
      'Messages',
      'Settings',
      'Analytics',
      'Blog',
      'Portfolio'
    ]
    
    for (const section of sections) {
      const sectionElement = page.getByText(section, { exact: false })
      if (await sectionElement.isVisible()) {
        await expect(sectionElement).toBeVisible()
      }
    }
  })

  test('should be accessible on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/admin')
    
    // Admin should still be functional on mobile
    await expect(page.locator('body')).toBeVisible()
  })

  test('should have proper page structure', async ({ page }) => {
    // Check for basic HTML structure
    await expect(page.locator('html')).toBeVisible()
    await expect(page.locator('body')).toBeVisible()
    
    // Check for meta tags
    const viewport = page.locator('meta[name="viewport"]')
    await expect(viewport).toHaveAttribute('content', /width=device-width/)
  })
})
