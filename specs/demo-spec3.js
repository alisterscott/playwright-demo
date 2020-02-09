import assert from 'assert';
import playwright from 'playwright';
import config from 'config';

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

describe( 'Playwright 3', function() {
	this.timeout( mochaTimeoutMS );

	let browser, context;

	before( async function() {
		browser = await playwright.chromium.launch();
		context = await browser.newContext();
	} );

	it( 'can check for errors when there should be none', async function() {
		const page = await context.newPage();
		let errors = '';
		page.on('pageerror', pageerr => {
			errors = errors + pageerr;
		});
		await page.goto( `${ config.get( 'baseURL' )}` );
		assert.equal( errors, '' );
	} );

	after( async function() {
		await browser.close();
	} );

} );
