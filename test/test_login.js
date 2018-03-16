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
            .url(base_site + '/individual/home')
            .getTitle()
            .then(function (title) {
                console.log(title);
                expect(title).to.equal('FHiR Visualization');
                done();
            })
            .end()
            .catch(done);
    });

    it('should accept writing username and password', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .setValue("//*[@id=\"login-form\"]/input[1]", "alex@gmail.com")
            .getValue("//*[@id=\"login-form\"]/input[1]")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("alex@gmail.com")
            })
            .setValue("//*[@id=\"login-form\"]/input[2]", "password")
            .getValue("//*[@id=\"login-form\"]/input[2]")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("password");
                done();
            })
            .end()
            .catch(done);
    });

    it('should specify which login page it is', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .getText("//*[@id=\"text\"]/p")
            .then(function (title) {
                console.log(title);
                expect(title).to.equal('Individual Account');
                done();
            })
            .end()
            .catch(done);
    });

    it('should allow people to log in', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("//*[@id=\"home-content__header\"]/h2")
            .getUrl()
            .then(function (value) {
                expect(value).to.equal("http://localhost:37832/individual/home");
                done();
            })
            .end()
            .catch(done);
    });
});

describe('Corporate Login', function () {
    this.timeout(500000);
    before(() => {

        }
    );

    after(() => {
        browser.end();
    });

    it('should accept writing username and password', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/corporate/home')
            .setValue("//*[@id=\"login-form\"]/input[1]", "company@gmail.com")
            .getValue("//*[@id=\"login-form\"]/input[1]")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("company@gmail.com")
            })
            .setValue("//*[@id=\"login-form\"]/input[2]", "password")
            .getValue("//*[@id=\"login-form\"]/input[2]")
            .then(function (value) {
                console.log(value);
                expect(value).to.equal("password");
                done();
            })
            .end()
            .catch(done);
    });

    it('should specify which login page it is', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/corporate/home')
            .getText("//*[@id=\"text\"]/p")
            .then(function (title) {
                console.log(title);
                expect(title).to.equal('Corporate Account');
                done();
            })
            .end()
            .catch(done);
    });

    it('should allow people to log in', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/corporate/home')
            .setValue("input[type=\"email\"]", "company@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("//*[@id=\"home-content\"]/h2")
            .getUrl()
            .then(function (value) {
                expect(value).to.equal("http://localhost:37832/corporate/home");
                done();
            })
            .end()
            .catch(done);
    });

});