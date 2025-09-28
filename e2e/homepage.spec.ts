import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/LAMARINA BG/)
    
    // Check if the main navigation is visible
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.getByText('LAMARINA BG')).toBeVisible()
  })

  test('should display navigation menu items', async ({ page }) => {
    await page.goto('/')
    
    // Check desktop navigation items
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /portfolio/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /services/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /blog/i })).toBeVisible()
  })

  test('should open mobile menu on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Click mobile menu button
    await page.getByRole('button', { name: /отвори меню/i }).click()
    
    // Check if mobile menu is visible
    await expect(page.getByText('Меню')).toBeVisible()
  })

  test('should navigate to different pages', async ({ page }) => {
    await page.goto('/')
    
    // Test navigation to About page
    await page.getByRole('link', { name: /about/i }).click()
    await expect(page).toHaveURL('/about')
    
    // Go back to homepage
    await page.goto('/')
    
    // Test navigation to Portfolio page
    await page.getByRole('link', { name: /portfolio/i }).click()
    await expect(page).toHaveURL('/portfolio')
  })

  test('should display products dropdown', async ({ page }) => {
    await page.goto('/')
    
    // Hover over products dropdown
    await page.getByRole('button', { name: /products/i }).hover()
    
    // Check if dropdown items are visible
    await expect(page.getByText('Roofing Systems')).toBeVisible()
    await expect(page.getByText('Metal Structures')).toBeVisible()
  })

  test('should have working admin link', async ({ page }) => {
    await page.goto('/')
    
    // Check if admin link is present and clickable
    const adminLink = page.getByRole('link', { name: /админ/i })
    await expect(adminLink).toBeVisible()
    await expect(adminLink).toHaveAttribute('href', '/admin')
  })

  test('should be responsive', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/')
    await expect(page.locator('nav')).toBeVisible()
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await expect(page.locator('nav')).toBeVisible()
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await expect(page.locator('nav')).toBeVisible()
  })
})
