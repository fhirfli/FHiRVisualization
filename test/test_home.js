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

const base_site = "http://localhost:37832";

const options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
let browser;


describe('Individual Home Page', function () {
    this.timeout(500000);
    before(() => {

    }
    );

    after(() => {
        browser.end();
    });

    it('should display the text Home on page', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("#home-content__header > h2")
            .getText("#home-content__header > h2")
            .then(function (value) {
                console.log(value)
                expect(value).to.equal("Home")
                done();
            })
            .end()
            .catch(done);
    });

    it('should display the date on page', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("//*[@id=\"home-content__header\"]/h4")
            .isExisting("//*[@id=\"home-content__header\"]/h4")
            .then(function (value) {
                console.log(value)
                expect(value).to.equal(true)
                done();
            })
            .end()
            .catch(done);
    });
    

});

// describe('Corporate Navigation', function () {
//     this.timeout(500000);
//     before(() => {

//     }
//     );

//     after(() => {
//         browser.end();
//     });

//     it('should allow navigating to data', function (done) {
//         browser = webdriverio
//             .remote(options)
//             .init()
//             .url(base_site + '/corporate/home')
//             .setValue("input[type=\"email\"]", "company@gmail.com")
//             .setValue("input[type=\"password\"]", "password")
//             .submitForm("#login-form")
//             .pause(100)
//             .click("//*[@id=\"navbar-options-container\"]/ul/li[2]/a")
//             .waitForVisible("//*[@id=\"data-title\"]/h2")
//             .getUrl()
//             .then(function (value) {
//                 expect(value).to.equal("http://localhost:37832/corporate/data")
//                 done();
//             })
//             .end()
//             .catch(done);
//     });

//     it('should allow navigating to settings', function (done) {
//         browser = webdriverio
//             .remote(options)
//             .init()
//             .url(base_site + '/corporate/home')
//             .setValue("input[type=\"email\"]", "company@gmail.com")
//             .setValue("input[type=\"password\"]", "password")
//             .submitForm("#login-form")
//             .pause(100)
//             .click("//*[@id=\"navbar-options-container\"]/ul/li[3]/a")
//             .waitForVisible("//*[@id=\"settings-title\"]/h2")
//             .getUrl()
//             .then(function (value) {
//                 expect(value).to.equal("http://localhost:37832/corporate/settings")
//                 done();
//             })
//             .end()
//             .catch(done);
//     });

//     it('should allow logging out', function (done) {
//         browser = webdriverio
//             .remote(options)
//             .init()
//             .url(base_site + '/corporate/home')
//             .setValue("input[type=\"email\"]", "company@gmail.com")
//             .setValue("input[type=\"password\"]", "password")
//             .submitForm("#login-form")
//             .pause(100)
//             .click("//*[@id=\"navbar-auth-button\"]")
//             .waitForVisible("//*[@id=\"about-content\"]/div[1]/h2")
//             .getUrl()
//             .then(function (value) {
//                 expect(value).to.equal("http://localhost:37832/")
//                 done();
//             })
//             .end()
//             .catch(done);
//     });

// });