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

describe('Individual Login', function () {
    this.timeout(5000);
    let browser;

    it('should allow logging in', function (done) {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .click('/html/body/div/div/div[2]/div[2]/div/div[2]/a')
            .waitForVisible('//*[@id="text"]')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("//*[@id=\"home-content__header\"]/h2")
            .getUrl()
            .then(function (value) {
                expect(value).to.equal(base_site + "/individual/home");
                done();
            })
            .end()
            .catch(done);
    });
});


describe('Home Page', function () {
    this.timeout(10000);
    let browser;
    beforeEach(() => {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .click('/html/body/div/div/div[2]/div[2]/div/div[2]/a')
            .waitForVisible('//*[@id="text"]')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("//*[@id=\"home-content__header\"]/h2");
    });

    it('should display the correct preference names on home page', function (done) {
        browser.waitForVisible('tspan*=Heart')
            .getText('tspan*=Heart')
            .then(function (label) {
                expect(label).to.equal("Your Daily HeartRate Breakdown");
            })
            .waitForVisible('tspan*=BodyW')
            .getText('tspan*=BodyW')
            .then(function (label) {
                expect(label).to.equal("BodyWeight");
            })
            .waitForVisible('tspan*=BodyH')
            .getText('tspan*=BodyH')
            .then(function (label) {
                expect(label).to.deep.equal(["BodyHeight", "BodyHeight"]);
            })
            .waitForVisible('tspan*=BM')
            .getText('tspan*=BM')
            .then(function (label) {
                expect(label).to.equal("BMI");
                done();
            })
            .end()
            .catch(done);
    });


    it('should display the correct number of preferences', function (done) {
        browser
            .waitForVisible('tspan*=Heart')
            .getHTML('/html/body/div/div/div[2]/div[2]/div/div')
            .then(function (container) {
                // there should be 5 preferences on home page
                expect(container.length).to.equal(5);
                done();
            })
            .end()
            .catch(done);
    });

    it('should display the correct number of goals', function (done) {
        browser
            .waitForVisible('tspan*=Heart')
            .scroll('/html/body/div/div/div[2]/div[4]/div/div[4]')
            .getHTML('/html/body/div/div/div[2]/div[4]/div/div')
            .then(function (container) {
                // there should be 5 preferences on home page
                expect(container.length).to.equal(6);
                done();
            })
            .end()
            .catch(done);
    });

    it('should display the correct names of goals', function (done) {
        browser
            .waitForVisible('tspan*=Heart')
            .scroll('/html/body/div/div/div[2]/div[4]/div/div[4]')
            .waitForVisible('tspan*=Marathon Running')
            .getText('tspan*=Marathon Running')
            .then(function (label) {
                expect(label).to.equal("Marathon Running Plan");
            })
            .waitForVisible('tspan*=Weight loss')
            .getText('tspan*=Weight loss')
            .then(function (label) {
                expect(label).to.equal("Weight loss Diet");
            })
            .waitForVisible('tspan*=Reduce')
            .getText('tspan*=Reduce')
            .then(function (label) {
                expect(label).to.equal("Reduce Blood Pressure");
            })
            .waitForVisible('tspan*=Baseball')
            .getText('tspan*=Baseball')
            .then(function (label) {
                expect(label).to.equal("Baseball Training");
            })
            .waitForVisible('tspan*=Training Pl')
            .getText('tspan*=Training Pl')
            .then(function (label) {
                expect(label).to.equal("Training Plan");
            })
            .waitForVisible('tspan*=Running fo')
            .getText('tspan*=Running fo')
            .then(function (label) {
                expect(label).to.equal("Running for Marathon 12");
                done();
            })


            .end()
            .catch(done);
    });


});


describe('Data Page', function () {
    this.timeout(10000);
    let browser;
    beforeEach(() => {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .click('/html/body/div/div/div[2]/div[2]/div/div[2]/a')
            .waitForVisible('//*[@id="text"]')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("//*[@id=\"home-content__header\"]/h2")
            .click('*=All Data')
            .waitForVisible('/html/body/div/div/div[2]/div[1]/h2');
    });

    it('should display options for the supported types of data', function (done) {
        browser.waitForVisible('button*=HeartR')
            .getText('button*=HeartR')
            .then(function (label) {
                expect(label).to.equal("HeartRate");
            })
            .waitForVisible('button*=BodyH')
            .getText('button*=BodyH')
            .then(function (label) {
                expect(label).to.equal("BodyHeight");
            })
            .waitForVisible('button*=BodyW')
            .getText('button*=BodyW')
            .then(function (label) {
                expect(label).to.equal("BodyWeight");
            })
            .waitForVisible('button*=Bloo')
            .getText('button*=Bloo')
            .then(function (label) {
                expect(label).to.equal("BloodPressure");
            })
            .waitForVisible('button*=Bloo')
            .getText('button*=Bloo')
            .then(function (label) {
                expect(label).to.equal("BloodPressure");
            })
            .waitForVisible('button*=Systo')
            .getText('button*=Systo')
            .then(function (label) {
                expect(label).to.equal("SystolicAndDiastolic");
            })
            .waitForVisible('button*=BM')
            .getText('button*=BM')
            .then(function (label) {
                expect(label).to.equal("BMI");
                done();
            })
            .end().catch(done);
    });


    it('should display the correct selected color for HeartRate', function (done) {
        browser.waitForVisible('button*=HeartR')
            .click('button*=HeartR')
            .waitForVisible('/html/body/div/div/div[2]/div[4]/div/div[1]/div/div[1]/span')
            .getText('/html/body/div/div/div[2]/div[4]/div/div[1]/div/div[1]/span')
            .then(function (label) {
                expect(label).to.equal("green");
                done();
            })
            .end().catch(done);
    });

    it('should display the correct available visualizations for HeartRate', function (done) {
        browser.waitForVisible('button*=HeartR')
            .click('button*=HeartR')
            .waitForVisible('/html/body/div/div/div[2]/div[4]/div/div[1]/div/div[1]/span')
            .waitForVisible('/html/body/div/div/div[2]/div[4]/div/div/div/p')
            .getText('/html/body/div/div/div[2]/div[4]/div/div/div/p')
            .then(function (label) {
                expect(label).to.equal("DoughnutDaily");
                done();
            })
            .end().catch(done);
    });


    it('should display the correct selected color for BodyHeight', function (done) {
        browser.waitForVisible('button*=BodyHeight')
            .click('button*=BodyHeight')
            .waitForVisible('/html/body/div/div/div[2]/div[4]/div/div[1]/div/div[1]/span')
            .getText('/html/body/div/div/div[2]/div[4]/div/div[1]/div/div[1]/span')
            .then(function (label) {
                expect(label).to.equal("yellow");
                done();
            })
            .end().catch(done);
    });

    it('should display the correct selected color for BodyWeight', function (done) {
        browser.waitForVisible('button*=BodyWeight')
            .click('button*=BodyWeight')
            .waitForVisible('/html/body/div/div/div[2]/div[4]/div/div[1]/div/div[1]/span')
            .getText('/html/body/div/div/div[2]/div[4]/div/div[1]/div/div[1]/span')
            .then(function (label) {
                expect(label).to.equal("blue");
                done();
            })
            .end().catch(done);
    });

    it('should display the correct selected color for BloodPressure', function (done) {
        browser.waitForVisible('button*=BloodP')
            .click('button*=BloodP')
            .waitForVisible('/html/body/div/div/div[2]/div[4]/div/div[1]/div/div[1]/span')
            .getText('/html/body/div/div/div[2]/div[4]/div/div[1]/div/div[1]/span')
            .then(function (label) {
                expect(label).to.equal("green");
                done();
            })
            .end().catch(done);
    });

    it('should display the correct selected color for SystolicAndDiastolic', function (done) {
        browser.waitForVisible('button*=Systolic')
            .click('button*=Systolic')
            .waitForVisible('/html/body/div/div/div[2]/div[4]/div/div[1]/div/div[1]/span')
            .getText('/html/body/div/div/div[2]/div[4]/div/div[1]/div/div[1]/span')
            .then(function (label) {
                expect(label).to.equal("yellow");
                done();
            })
            .end().catch(done);
    });

    it('should display the correct selected color for BMI', function (done) {
        browser.waitForVisible('button*=BM')
            .click('button*=BM')
            .waitForVisible('/html/body/div/div/div[2]/div[4]/div/div[1]/div/div[1]/span')
            .getText('/html/body/div/div/div[2]/div[4]/div/div[1]/div/div[1]/span')
            .then(function (label) {
                expect(label).to.equal("green");
                done();
            })
            .end().catch(done);
    });


});


describe('Goals Page', function () {
    this.timeout(10000);
    let browser;
    beforeEach(() => {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .click('/html/body/div/div/div[2]/div[2]/div/div[2]/a')
            .waitForVisible('//*[@id="text"]')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("//*[@id=\"home-content__header\"]/h2")
            .click('*=Goals')
            .waitForVisible('//*[@id="goals-title"]/h2');
    });

    it('should display the correct list of goals', function (done) {
        browser
            .waitForVisible('button*=Marathon Running')
            .getText('button*=Marathon Running')
            .then(function (label) {
                expect(label).to.equal("Marathon Running Plan");
            })
            .waitForVisible('button*=Weight loss')
            .getText('button*=Weight loss')
            .then(function (label) {
                expect(label).to.equal("Weight Loss Diet");
            })
            .waitForVisible('button*=Reduce')
            .getText('button*=Reduce')
            .then(function (label) {
                expect(label).to.equal("Reduce Blood Pressure");
            })
            .waitForVisible('button*=Baseball')
            .getText('button*=Baseball')
            .then(function (label) {
                expect(label).to.equal("Baseball Training");
            })
            .waitForVisible('button*=Training Pl')
            .getText('button*=Training Pl')
            .then(function (label) {
                expect(label).to.equal("Training Plan");
            })
            .waitForVisible('button*=Running fo')
            .getText('button*=Running fo')
            .then(function (label) {
                expect(label).to.equal("Running For Marathon 12");
                done();
            })
            .end().catch(done);

    });

    it('should contain correct data field for goals', function (done) {
        let fieldSelector = '/html/body/div/div/div[2]/div[4]/div/div[2]/p[2]/div/div[1]/span';
        browser
            .waitForVisible('button*=Marathon Running')
            .click('button*=Marathon Running')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("BMI");
            })
            .click('button*=Weight loss')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("BodyWeight");
            })
            .click('button*=Reduce Blood')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("SystolicAndDiastolic");
            })
            .click('button*=Baseball Training')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("BMI");
            })
            .click('button*=Training Plan')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("BMI");
            })
            .click('button*=Running for')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("HeartRate");
                done();
            })
            .end().catch(done);

    });


    it('should contain correct colour field for goals', function (done) {
        let fieldSelector = '//*[@id="goals-display-panel-container"]/div[3]/div/div/div[1]/span';
        browser
            .waitForVisible('button*=Marathon Running')
            .click('button*=Marathon Running')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("green");
            })
            .click('button*=Weight loss')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("green");
            })
            .click('button*=Reduce Blood')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("yellow");
            })
            .click('button*=Baseball Training')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("yellow");
            })
            .click('button*=Training Plan')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("blue");
            })
            .click('button*=Running for')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("red");
                done();
            })
            .end().catch(done);

    });

    it('should contain correct period field for goals', function (done) {
        let fieldSelector = '/html/body/div/div/div[2]/div[4]/div/div[5]/p[2]/div/div[1]/span';
        browser
            .waitForVisible('button*=Marathon Running')
            .click('button*=Marathon Running')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("MONTH");
            })
            .click('button*=Weight loss')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("MONTH");
            })
            .click('button*=Reduce Blood')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("FORTNIGHT");
            })
            .click('button*=Baseball Training')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("MONTH");
            })
            .click('button*=Training Plan')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("MONTH");
            })
            .click('button*=Running for')
            .waitForVisible('//*[@id="goals-display-panel-title"]/p[2]')
            .getText(fieldSelector)
            .then(function (label) {
                expect(label).to.equal("DAY");
                done();
            })
            .end().catch(done);

    });


});


describe('Settings Page', function () {
    this.timeout(10000);
    let browser;
    beforeEach(() => {
        browser = webdriverio
            .remote(options)
            .init()
            .url(base_site + '/individual/home')
            .click('/html/body/div/div/div[2]/div[2]/div/div[2]/a')
            .waitForVisible('//*[@id="text"]')
            .setValue("input[type=\"email\"]", "alex@gmail.com")
            .setValue("input[type=\"password\"]", "password")
            .submitForm("#login-form")
            .waitForVisible("//*[@id=\"home-content__header\"]/h2")
            .click('*=Settings')
    });

    it('should list associations to the correct company', function (done) {
        browser
            .waitForVisible('//*[@id="settings-company-list"]/div')
            .getHTML('//*[@id="settings-company-list"]/div')
            .then(function (label) {
                expect(label).to.equal('<div class="grid">Nuffield Health - nuffield.com<button class="buttonn">Remove</button></div>');
                done();
            })
            .end().catch(done);
    });

});

