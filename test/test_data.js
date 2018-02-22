// test_data.js:
//     - describe individual data page:
//         - it should display the text All data on page
//         - it should allow users to select colour for visualizations    
//             (click on the dropdown, check that the list of colours is shown (waitUntilVisible))
//         - it should allow users to select visualizations on home
//             (check that there are a list of visualizations and the checkbox can be pressed)
//     - describe corporate data page:
//         -it should display All data on page
//         - it should allow users to select colour for visualizations
//             (click on the dropdown, check that the list of colours is shown (waitUntilVisible))
//         - it should allow users to select from multiple visualizations
//             (click on the dropdown, check that the list of visualizations is shown (waitUntilVisible))
//         - it should allow for users to select multiple data types
//             (click on the dropdown, check that the list of visualizations is shown (waitUntilVisible))


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


describe('Individual Data Page', function () {
    this.timeout(500000);

    beforeEach(() => {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("//*[@id=\"navbar-options-container\"]/ul/li[2]/a")
            .click("//*[@id=\"navbar-options-container\"]/ul/li[2]/a")
    });

    after(() => {
        browser.end();
    });

    it('should display the text Data on page', function (done) {
        browser
            .waitForVisible("#data-title > h2")
            .getText("#data-title > h2")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("Data");
                done();
            })
            .end()
            .catch(done);
    });

    it('should allow users to select colour for visualizations', function (done) {
        browser
            .waitForVisible("#data-colour-select > div > div.dropdown-display")
            .click("#data-colour-select > div > div.dropdown-display")
            .waitForVisible("#data-colour-select > div > div.dropdown-list.show > div:nth-child(2)")
            .pause(100)
            .click("#data-colour-select > div > div.dropdown-list.show > div:nth-child(2)")
            .waitForVisible("#data-colour-select > div > div.dropdown-display > span")
            .getText("#data-colour-select > div > div.dropdown-display > span")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("blue");
                done();
            })
            .end()
            .catch(done);
    });

});


describe('Corporate Data Page', function () {
    this.timeout(500000);

    beforeEach(() => {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/corporate/home')
            .setValue("input[type=\"email\"]", "company@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("//*[@id=\"navbar-options-container\"]/ul/li[2]/a")
            .click("//*[@id=\"navbar-options-container\"]/ul/li[2]/a")
    });

    after(() => {
        browser.end();
    });

    it('should display the text Data on page', function (done) {
        browser
            .waitForVisible("#data-title > h2")
            .getText("#data-title > h2")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("Data");
                done();
            })
            .end()
            .catch(done);
    });

    it('should allow users to select colour for visualizations', function (done) {
        browser
            .click("#data-list > button")
            .waitForVisible("#data-colour-select > div > div.dropdown-display")
            .click("#data-colour-select > div > div.dropdown-display")
            .waitForVisible("#data-colour-select > div > div.dropdown-list.show > div:nth-child(2)")
            .pause(1000)
            .click("#data-colour-select > div > div.dropdown-list.show > div:nth-child(2)")
            .pause(1000)

            .waitForVisible("#data-colour-select > div > div.dropdown-display > span")
            .getText("#data-colour-select > div > div.dropdown-display > span")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("blue");
                done();
            })
            .end()
            .catch(done);
    });

    it('should allow users to select from multiple visualizations', function (done) {
        browser
            .click("#data-list > button")
            .pause(1000)
            .waitForVisible("#data-panel > div > div.dropdown-container > div.dropdown-display")
            .click("#data-panel > div > div.dropdown-container > div.dropdown-display")
            .pause(1000)
            .waitForVisible("#data-panel > div > div.dropdown-container > div.dropdown-list.show")
            .isExisting("#data-panel > div > div.dropdown-container > div.dropdown-list.show")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal(true);
                done();
            })
            .end()
            .catch(done);
    });


});

