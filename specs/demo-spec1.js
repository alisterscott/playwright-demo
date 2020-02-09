import playwright from 'playwright';
import config from 'config';

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

describe( 'Playwright 1', function() {
	this.timeout( mochaTimeoutMS );

	let browser, context;

	before( async function() {
		browser = await playwright.chromium.launch();
		context = await browser.newContext();
	} );

	it( 'can wait for an element to appear', async function() {
		const page = await context.newPage( `${ config.get( 'baseURL' )}` );
		await page.waitFor( '#elementappearschild', { visible: true, timeout: 5000 } );
	} );

	after( async function() {
		await browser.close();
	} );

} );
