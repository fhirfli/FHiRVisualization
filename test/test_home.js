// test_home.js:
//     - describe individual home page:
//             - it should display the text Home on page
//             - it should display date on page 
//             - it should display selected visualizations on screen
//                 (Note: to do this one, make the browser go to data page, click on the button for a visualization, and check that it shows up on home)
//             - it should display goals on screen
//                 (Note: to do this one, make the browser go to the the goals page - find the names of all the goals, go to home and check that they are present)
//     - describe corporate home:
//             - it should display the text Home on page
//             - it should display selected visualizations on screen
//                 (Note: to do this one, make the browser go to data page, click on the button for a visualization, and check that it shows up on home)


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


describe('Individual Home Page', function () {
    this.timeout(500000);

    beforeEach(() => {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
    });

    after(() => {
        browser.end();
    });

    it('should display the text Home on page', function (done) {
        browser
            .waitForVisible("#home-content__header > h2")
            .getText("#home-content__header > h2")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("Home");
                done();
            })
            .end()
            .catch(done);
    });

    it('should display the date on page', function (done) {
        browser
            .waitForVisible("//*[@id=\"home-content__header\"]/h4")
            .isExisting("//*[@id=\"home-content__header\"]/h4")
            // .moment().format()
            .then(function (value) {
                console.log(value);
                expect(value).to.equal(true);
                done();
            })
            .end()
            .catch(done);
    });

    it('should display selected visualizations on screen', function (done) {
        browser
            .waitForVisible("//*[@id=\"navbar-options-container\"]/ul/li[2]/a")
            .click("//*[@id=\"navbar-options-container\"]/ul/li[2]/a")
            .waitForVisible("//*[@id=\"data-visualizations\"]/div[1]/input")
            .click("//*[@id=\"data-visualizations\"]/div[1]/input")
            .click("//*[@id=\"navbar-options-container\"]/ul/li[1]/a")
            .getText("//*[@id=\"home-container\"]/div[2]/div/div[1]/text/tspan")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("BodyHeight")
                // done();
            })
            .click("//*[@id=\"navbar-options-container\"]/ul/li[2]/a")
            .waitForVisible("//*[@id=\"data-visualizations\"]/div[1]/input")
            .click("//*[@id=\"data-visualizations\"]/div[1]/input")
            .then(function (value) {
                done();
            })
            .end()
            .catch(done);
    });

    // it('should display goals on screen', function (done) {
    //     browser
    //         .waitForVisible("//*[@id=\"navbar-options-container\"]/ul/li[3]/a")
    //         .click("//*[@id=\"navbar-options-container\"]/ul/li[3]/a")
    // });

});


describe('Corporate Home Page', function () {
    this.timeout(500000);

    beforeEach(() => {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/corporate/home')
            .setValue("input[type=\"email\"]", "company@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
    });

    after(() => {
        browser.end();
    });

    it('should display the text Home on page', function (done) {
        browser
            .waitForVisible("//*[@id=\"home-content\"]/h2")
            .getText("//*[@id=\"home-content\"]/h2")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("Home");
                done();
            })
            .end()
            .catch(done);
    });

    it('should display selected visualizations on screen', function (done) {
        browser
            .waitForVisible("//*[@id=\"navbar-options-container\"]/ul/li[2]/a")
            .click("//*[@id=\"navbar-options-container\"]/ul/li[2]/a")
            .waitForVisible("//*[@id=\"data-list\"]/button")
            .click("//*[@id=\"data-list\"]/button")
            .click("//*[@id=\"data-panel\"]/div/button")
            .click("//*[@id=\"navbar-options-container\"]/ul/li[1]/a")
            .getText("//*[@id=\"home-content\"]/div/div/text/tspan")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("HeartRate")
                // done();
            })
            .click("//*[@id=\"navbar-options-container\"]/ul/li[2]/a")
            .waitForVisible("//*[@id=\"data-list\"]/button")
            .click("//*[@id=\"data-list\"]/button")
            .click("//*[@id=\"data-panel\"]/div/div[2]/div/button")
            .then(function (value) {
                done();
            })
            .end()
            .catch(done);
    });

});

