// test_settings.js:
//     - describe individual settings page:
//         - it should display text settings on page
//         - it should list companies on page
//         - it should allow users to add company 
//             (just store the company name in a variable at the top (like base_url))
//         - it should allow users to remove company
//             (just store the company name in a variable at the top (like base_url))
//     - describe corporate settings page:
//         - it should display text settings on page
//         - it should list users on page


const webdriverio = require('webdriverio');
// const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
// chai.use(chaiAsPromised);
// chai.should();
const moment = require('moment');

const base_site = "http://localhost:37832";

const options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
let browser;


describe('Individual Settings Page', function () {
    this.timeout(500000);

    beforeEach(() => {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("//*[@id=\"navbar-options-container\"]/ul/li[4]/a")
            .click("//*[@id=\"navbar-options-container\"]/ul/li[4]/a")
    });

    after(() => {
        browser.end();
    });

    it('should display the text Settings on page', function (done) {
        browser
            .waitForVisible("#settings-title > h2")
            .getText("#settings-title > h2")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("Settings");
                done();
            })
            .end()
            .catch(done);
    });

    it('should list companies on page', function (done) {
        browser
            .isExisting("#settings-company-list > div > button")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal(true);
                done();
            })
            .end()
            .catch(done);
    });

    it('should allow users to remove company', function (done) {
        browser
            .click("#settings-company-list > div > button")
            .isVisible("#settings-company-list > div > button")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal(false);
                done();
            })
            .end()
            .catch(done);
    });

    it('should allow users to add company', function (done) {
        browser
            .click("#add-form > input.settings-inp")
            .pause(1000)
            .setValue("#add-form > input.settings-inp", ".com")
            .pause(1000)
            .click("#add-submit")
            .pause(1000)
            .isVisible("#settings-company-list > div > button")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal(true);
                done();
            })
            .end()
            .catch(done);
    });

});


describe('Corporate Settings Page', function () {
    this.timeout(500000);

    beforeEach(() => {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/corporate/home')
            .setValue("input[type=\"email\"]", "company@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("//*[@id=\"navbar-options-container\"]/ul/li[3]/a")
            .click("//*[@id=\"navbar-options-container\"]/ul/li[3]/a")
    });

    after(() => {
        browser.end();
    });

    it('should display the text Settings on page', function (done) {
        browser
            .waitForVisible("#settings-title > h2")
            .getText("#settings-title > h2")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("Settings");
                done();
            })
            .end()
            .catch(done);
    });

    it('should list users on page', function (done) {
        browser
            .isExisting("#settings-company-list > div > div > div > button")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal(true);
                done();
            })
            .end()
            .catch(done);
    });

});