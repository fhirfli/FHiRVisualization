// test_goals.js:
//     - describe individual goals page:
//         - it should display text Goals on page
//         - it should allow users to add and remove goals
//             (click on add goal, type in name, values etc, check it is added to list)
//             (select item, then remove item)

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
            .waitForVisible("//*[@id=\"navbar-options-container\"]/ul/li[3]/a")
            .click("//*[@id=\"navbar-options-container\"]/ul/li[3]/a")
    });

    after(() => {
        browser.end();
    });

    it('should display the text Goals on page', function (done) {
        browser
            .waitForVisible("#goals-title > h2")
            .getText("#goals-title > h2")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("Goals");
                done();
            })
            .end()
            .catch(done);
    });

    it('should allow users to add and remove goals', function (done) {
        browser
            .waitForVisible("#goals-new-button")
            .click("#goals-new-button")
            .waitForVisible("#goals-options > button:nth-child(5)")
            .click("#goals-options > button:nth-child(5)")
            .setValue("#goals-display-panel-title > input", "Goals")
            .click("#goals-display-panel-container > div:nth-child(2) > p.goals-display-panel-content > div > div.dropdown-display")
            .pause(100)
            .click("#goals-display-panel-container > div:nth-child(2) > p.goals-display-panel-content > div > div.dropdown-list.show > div:nth-child(2)")
            .pause(100)
            .click("#goals-display-panel-container > div:nth-child(3) > div > div > div.dropdown-display")
            .pause(100)
            .click("#goals-display-panel-container > div:nth-child(3) > div > div > div.dropdown-list.show > div:nth-child(2)")
            .pause(100)
            .click("#goals-display-panel-container > div:nth-child(5) > p.goals-display-panel-content > div > div.dropdown-display")
            .pause(100)
            .click("#goals-display-panel-container > div:nth-child(5) > p.goals-display-panel-content > div > div.dropdown-list.show > div:nth-child(2)")
            .pause(100)
            .click("#goals-panel-button-container > button:nth-child(1)")
            .waitForVisible("#goals-options > button:nth-child(5)")
            .getText("#goals-options > button:nth-child(5)")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("Goals")
            })
            .click("#goals-options > button:nth-child(5)")
            .pause(100)
            .click("#goals-panel-button-container > button")
            .pause(100)
            .getText("#goals-options > button:nth-child(5)")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("ADD GOAL");
                done();
            })
            .end()
            .catch(done);
    })

});