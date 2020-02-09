import playwright from 'playwright';
import config from 'config';

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

describe( 'Playwright 2', function() {
	this.timeout( mochaTimeoutMS );

	let browser, context;

	before( async function() {
		browser = await playwright.chromium.launch();
		context = await browser.newContext();
	} );

	it( 'can handle alerts', async function() {
		const page = await context.newPage();
		page.on('dialog', async dialog => {
			console.log(dialog.message());
			await dialog.accept();
		});
		await page.goto( `${ config.get( 'baseURL' )}/leave` );
		await page.click( '#homelink' );
		await page.waitFor( '#elementappearsparent', { visible: true, timeout: 5000 } );
	} );

	after( async function() {
		await browser.close();
	} );
} );
