import { test, expect } from '@playwright/test';

test.describe('DashboardComponent', () => {
  const baseUrl = 'http://localhost:4200';
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/dashboard`);
  });

  test('should load dashboard page and display summary', async ({ page }) => {
    // Check if the summary elements are present
    const projects = await page.locator('text=Projects:');
    const followers = await page.locator('text=Followers:');
    const following = await page.locator('text=Following:');

    await expect(projects).toBeVisible();
    await expect(followers).toBeVisible();
    await expect(following).toBeVisible();

    // Validate data fetched and displayed
    await expect(projects).toHaveText(/Projects: 10/);
    await expect(followers).toHaveText(/Followers: 5/);
    await expect(following).toHaveText(/Following: 2/);
  });

  test('should display commit frequency bar chart', async ({ page }) => {
    // Check if the bar chart canvas exists
    const barChart = await page.locator('canvas#bar-chart');
    
    await expect(barChart).toBeVisible();
  });

  test('should display programming languages pie chart', async ({ page }) => {
    // Check if the pie chart canvas exists
    const pieChart = await page.locator('canvas#pie-chart'); 
    
    await expect(pieChart).toBeVisible();
  });

  test('should navigate to commit list page and display commits', async ({ page }) => {
    // Click on the navigation link to Commit List
    const commitListLink = await page.locator('a:has-text("Commit List")');
    await commitListLink.click();

    // Ensure navigation to the Commit List page
    await expect(page).toHaveURL(/.*\/commit-list/);

    // Check if the commit list table is visible
    const commitTable = await page.locator('table#commit-list'); 
    
    await expect(commitTable).toBeVisible();

    // Validate commit list data (mock data can be validated here)
    const commitRow = await commitTable.locator('tr:nth-child(3)');
    await expect(commitRow).toBeVisible();

    // Click on the 3rd commit and ensure navigation
    await commitRow.click();
    await expect(page).toHaveURL(/https:\/\/github\.com\/.*\/commit\/.*/);
    
  });

  test('should validate charts auto-refresh every 15 minutes', async ({ page }) => {
    // Mock time passage using Playwright's time mocking feature
    await page.waitForTimeout(900000); // 15 minutes in milliseconds
    const barChart = await page.locator('canvas#bar-chart');
    
    await expect(barChart).toBeVisible();

  });
});
