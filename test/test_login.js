const webdriverio = require('webdriverio');
// const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
// chai.use(chaiAsPromised);
// chai.should();

const options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
let browser;


describe('Individual Login', function () {
    this.timeout(500000);
    before(() => {

        }
    );

    after(() => {
        browser.end();
    });

    it('should have a correct title', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url('http://localhost:8000/individual/home')
            .getTitle()
            .then(function (title) {
                console.log(title);
                expect(title).t0.equal('FHiR Visualizations');
                done();
            })
            .end();
    });
});
//

