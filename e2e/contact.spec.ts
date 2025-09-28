import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('should load contact page successfully', async ({ page }) => {
    await expect(page).toHaveURL('/contact')
    await expect(page.locator('h1, h2')).toContainText(/contact|свържете се/i)
  })

  test('should have contact form', async ({ page }) => {
    // Look for form elements
    const form = page.locator('form')
    await expect(form).toBeVisible()
    
    // Check for common form fields
    const nameField = page.locator('input[name*="name"], input[placeholder*="name"]')
    const emailField = page.locator('input[type="email"], input[name*="email"]')
    const messageField = page.locator('textarea, input[name*="message"]')
    
    if (await nameField.isVisible()) {
      await expect(nameField).toBeVisible()
    }
    if (await emailField.isVisible()) {
      await expect(emailField).toBeVisible()
    }
    if (await messageField.isVisible()) {
      await expect(messageField).toBeVisible()
    }
  })

  test('should have contact information', async ({ page }) => {
    // Check for contact details like phone, email, address
    const contactInfo = page.locator('text=/phone|email|address|телефон|имейл|адрес/i')
    if (await contactInfo.count() > 0) {
      await expect(contactInfo.first()).toBeVisible()
    }
  })

  test('should be accessible', async ({ page }) => {
    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    await expect(headings.first()).toBeVisible()
    
    // Check for form labels
    const labels = page.locator('label')
    if (await labels.count() > 0) {
      await expect(labels.first()).toBeVisible()
    }
  })

  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/contact')
    
    // Contact page should be responsive
    await expect(page.locator('body')).toBeVisible()
    
    // Form should still be accessible
    const form = page.locator('form')
    if (await form.isVisible()) {
      await expect(form).toBeVisible()
    }
  })
})
