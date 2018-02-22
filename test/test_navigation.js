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


describe('Individual Navigation', function () {
    this.timeout(500000);
    before(() => {

        }
    );

    after(() => {
        browser.end();
    });

    it('should allow navigating to data', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .pause(100)
            .click("//*[@id=\"navbar-options-container\"]/ul/li[2]/a")
            .waitForVisible("//*[@id=\"data-title\"]/h2")
            .getUrl()
            .then(function (value) {
                expect(value).to.equal("http://localhost:37832/individual/data");
                done();
            })
            .end()
            .catch(done);
    });

    it('should allow navigating to goals', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .pause(100)
            .click("//*[@id=\"navbar-options-container\"]/ul/li[3]/a")
            .waitForVisible("//*[@id=\"goals-title\"]/h2")
            .getUrl()
            .then(function (value) {
                expect(value).to.equal("http://localhost:37832/individual/goals");
                done();
            })
            .end()
            .catch(done);
    });

    it('should allow navigating to settings', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .pause(100)
            .click("//*[@id=\"navbar-options-container\"]/ul/li[4]/a")
            .waitForVisible("//*[@id=\"settings-title\"]/h2")
            .getUrl()
            .then(function (value) {
                expect(value).to.equal("http://localhost:37832/individual/settings");
                done();
            })
            .end()
            .catch(done);
    });

    it('should allow logging out', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .pause(100)
            .click("//*[@id=\"navbar-auth-button\"]")
            .waitForVisible("//*[@id=\"about-content\"]/div[1]/h2")
            .getUrl()
            .then(function (value) {
                expect(value).to.equal("http://localhost:37832/");
                done();
            })
            .end()
            .catch(done);
    });

});

describe('Corporate Navigation', function () {
    this.timeout(500000);
    before(() => {

        }
    );

    after(() => {
        browser.end();
    });

    it('should allow navigating to data', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/corporate/home')
            .setValue("input[type=\"email\"]", "company@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .pause(100)
            .click("//*[@id=\"navbar-options-container\"]/ul/li[2]/a")
            .waitForVisible("//*[@id=\"data-title\"]/h2")
            .getUrl()
            .then(function (value) {
                expect(value).to.equal("http://localhost:37832/corporate/data");
                done();
            })
            .end()
            .catch(done);
    });

    it('should allow navigating to settings', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/corporate/home')
            .setValue("input[type=\"email\"]", "company@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .pause(100)
            .click("//*[@id=\"navbar-options-container\"]/ul/li[3]/a")
            .waitForVisible("//*[@id=\"settings-title\"]/h2")
            .getUrl()
            .then(function (value) {
                expect(value).to.equal("http://localhost:37832/corporate/settings");
                done();
            })
            .end()
            .catch(done);
    });

    it('should allow logging out', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/corporate/home')
            .setValue("input[type=\"email\"]", "company@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .pause(100)
            .click("//*[@id=\"navbar-auth-button\"]")
            .waitForVisible("//*[@id=\"about-content\"]/div[1]/h2")
            .getUrl()
            .then(function (value) {
                expect(value).to.equal("http://localhost:37832/");
                done();
            })
            .end()
            .catch(done);
    });

});