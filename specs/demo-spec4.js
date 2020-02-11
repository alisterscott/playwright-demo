import assert from 'assert';
import playwright from 'playwright';
import config from 'config';

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

// Doesn't work on CircleCI
describe( 'Playwright 4', function() {
	this.timeout( mochaTimeoutMS );

	let browser, context;

	before( async function() {
		browser = await playwright.webkit.launch();
		context = await browser.newContext();
	} );

	it( 'can check for console errors when there are present', async function() {
		const page = await context.newPage();
		let errors = '';

		page.on( 'console', msg => {
			if ( msg.type() === 'error' ) {
				errors = errors + msg.text();
			}
		} );
		await page.goto( `${ config.get( 'baseURL' )}/error` );
		assert( errors.indexOf( 'Purple Monkey Dishwasher Error' ) > -1 );
	} );

	after( async function() {
		await browser.close();
	} );

} );
