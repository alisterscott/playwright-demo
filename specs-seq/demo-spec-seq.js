import playwright from 'playwright';
import config from 'config';
import assert from 'assert';

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

describe( 'Playwright 1', function() {
	this.timeout( mochaTimeoutMS );

	let browser;

	before( async function() {
		browser = await playwright.chromium.launch();
	} );

	it( 'can wait for an element to appear', async function() {
		const context = await browser.newContext();
		const page = await context.newPage( `${ config.get( 'baseURL' )}` );
		await page.waitFor( '#elementappearschild', { visible: true, timeout: 5000 } );
	} );

	it( 'can handle alerts', async function() {
		const context = await browser.newContext();
		const page = await context.newPage();
		page.on('dialog', async dialog => {
			await dialog.accept();
		});
		await page.goto( `${ config.get( 'baseURL' )}/leave` );
		await page.click( '#homelink' );
		await page.waitFor( '#elementappearsparent', { visible: true, timeout: 5000 } );
	} );

	it( 'can check for errors when there should be none', async function() {
		const context = await browser.newContext();
		const page = await context.newPage();
		let errors = '';
		page.on('pageerror', pageerr => {
			errors = errors + pageerr;
		});
		await page.goto( `${ config.get( 'baseURL' )}` );
		assert.equal( errors, '' );
	} );

	it( 'can use xpath selectors to find elements', async function() {
		const context = await browser.newContext();
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
