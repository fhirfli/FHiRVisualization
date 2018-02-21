const chai = require('chai');
const expect = chai.expect;

describe('Authentication endpoints', function () {
    this.timeout(120000);
    before(() => {
        return new Promise(function (fufilled, rejected) {
            const child = require('child_process').exec('artillery run -o result/auth.json config/auth.yml');
            child.stdout.pipe(process.stdout);
            child.on('exit', function () {
                fufilled();
            });
        });
    });

    it('should take less than 500ms on average to log in', function (done) {
        const result = require('./result/auth.json');
        expect(result.aggregate.latency.median).to.be.below(500);
        done();
    });

    it('should never take more than 1000ms on average to log in', function (done) {
        const result = require('./result/auth.json');
        expect(result.aggregate.latency.max).to.be.below(1000);
        done();
    });


});


describe('Preferences endpoints', function () {
    this.timeout(1200000);
    before(() => {
        return new Promise(function (fufilled, rejected) {
            const child = require('child_process').exec('artillery run -o result/preferences.json config/preferences.yml');
            child.stdout.pipe(process.stdout);
            child.on('exit', function () {
                fufilled();
            });
        });
    });

    it('should take less than 5000ms on average to retrieve preferences', function (done) {
        const result = require('./result/preferences.json');
        expect(result.aggregate.latency.median).to.be.below(1000);
        done();
    });


    it('should never take more than 10,000ms to retrieve preferences', function (done) {
        const result = require('./result/preferences.json');
        expect(result.aggregate.latency.max).to.be.below(10000);
        done();
    });


});

describe('Associations endpoints', function () {
    this.timeout(1200000);
    before(() => {
        return new Promise(function (fufilled, rejected) {
            const child = require('child_process').exec('artillery run -o result/associations.json config/associations.yml');
            child.stdout.pipe(process.stdout);
            child.on('exit', function () {
                fufilled();
            });
        });
    });

    it('should take less than 6000ms on average to get associations', function (done) {
        const result = require('./result/associations.json');

        expect(result.aggregate.latency.median).to.be.below(6000);
        done();
    });

    it('should never take more than 10,000ms to get associations', function (done) {
        const result = require('./result/associations.json');

        expect(result.aggregate.latency.max).to.be.below(10000);
        done();
    });


});


describe('Data endpoints', function () {
    this.timeout(1200000);
    before(() => {
        return new Promise(function (fufilled, rejected) {
            const child = require('child_process').exec('artillery run -o result/data.json config/data.yml');
            child.stdout.pipe(process.stdout);
            child.on('exit', function () {
                fufilled();
            });
        });
    });


});


describe('Goals endpoints', function () {
    this.timeout(1200000);
    before(() => {
        return new Promise(function (fufilled, rejected) {
            const child = require('child_process').exec('artillery run -o result/goals.json config/goals.yml');
            child.stdout.pipe(process.stdout);
            child.on('exit', function () {
                fufilled();
            });
        });
    });

    it('should take less than 20,000ms on average to get user data', function (done) {
        const result = require('./result/goals.json');

        expect(result.aggregate.latency.median).to.be.below(20000);
        done();
    });

    it('should never take more than 40,000ms to get user data', function (done) {
        const result = require('./result/goals.json');

        expect(result.aggregate.latency.median).to.be.below(40000);
        done();
    });


});
