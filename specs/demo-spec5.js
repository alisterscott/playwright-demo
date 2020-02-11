import playwright from 'playwright';
import config from 'config';

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

describe( 'Playwright 5', function() {
	this.timeout( mochaTimeoutMS );

	let browser, context;

	before( async function() {
		browser = await playwright.chromium.launch();
		context = await browser.newContext();
	} );

	it( 'can use xpath selectors to find elements', async function() {
		const page = await context.newPage();
		await page.goto( `${ config.get( 'baseURL' )}` );
		await page.waitFor( '//span[contains(., "Scissors")]' );
		await page.click( '//span[contains(., "Scissors")]' );
		await page.waitFor( '//div[contains(., "Scissors clicked!")]' );
	} );

	after( async function() {
		await browser.close();
	} );
} );
