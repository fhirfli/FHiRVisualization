const webdriverio = require('webdriverio');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

const base_site = "http://localhost:8000";

const options = {
    desiredCapabilities: {
        browserName: 'chrome'
    },
    deprecationWarnings: false,
    waitforTimeout: 10000
};


describe('corporate login', function () {
    this.timeout(5000);
    let browser;

    it('should allow logging in', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .click('/html/body/div/div/div[2]/div[2]/div/div[1]/a')
            .waitForVisible('//*[@id="text"]')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("h2*=Home")
            .getUrl()
            .then(function (value) {
                expect(value).to.equal(base_site + "/corporate/home");
                done();
            })
            // .end()
            .catch(done);
    });

});


