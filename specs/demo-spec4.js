import assert from 'assert';
import playwright from 'playwright';
import config from 'config';

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

// Doesn't work on CircleCI
describe( 'Playwright 4', function() {
	this.timeout( mochaTimeoutMS );

	let browser, context;

	before( async function() {
		browser = await playwright.chromium.launch();
		context = await browser.newContext();
	} );

	it( 'can check for console errors when there are present', async function() {
		const page = await context.newPage();
		let errors = '';

		page.on('pageerror', error => {
			errors = errors + error.message;
		});
		await page.goto( `${ config.get( 'baseURL' )}/error` );
		assert.equal( errors, 'Purple Monkey Dishwasher Error' );
	} );

	after( async function() {
		await browser.close();
	} );

} );
