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

    it('should return successful 200 responses for more than 80% of requests', function (done) {
        const result = require('./result/auth.json');
        expect(result.aggregate.codes["200"]).to.be.above(500);
        done();
    });

    describe('Individual Authentication endpoint', function () {

        let name = 'individual_auth';

        this.timeout(120000);
        before(() => {
            return new Promise(function (fufilled, rejected) {
                const child = require('child_process').exec('artillery run -o result/' + name + '.json config/' + name + '.yml');
                child.stdout.pipe(process.stdout);
                child.on('exit', function () {
                    fufilled();
                });
            });
        });

        it('should return successful 200 responses for more than 80% of requests', function (done) {
            const result = require('./result/' + name + '.json');
            expect(result.aggregate.codes["200"]).to.be.above(500);
            done();
        });

    });

    describe('Corporate Authentication endpoint', function () {

        let name = 'corporate_auth';

        this.timeout(120000);
        before(() => {
            return new Promise(function (fufilled, rejected) {
                const child = require('child_process').exec('artillery run -o result/' + name + '.json config/' + name + '.yml');
                child.stdout.pipe(process.stdout);
                child.on('exit', function () {
                    fufilled();
                });
            });
        });

        it('should return successful 200 responses for more than 80% of requests', function (done) {
            const result = require('./result/' + name + '.json');
            expect(result.aggregate.codes["200"]).to.be.above(500);
            done();
        });

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

    it('should return successful 200 responses for more than 80% of requests', function (done) {
        const result = require('./result/preferences.json');
        expect(result.aggregate.codes["200"]).to.be.above(500);
        done();
    });


    describe('Individual Preferences endpoint', function () {

        let name = 'individual_preferences';

        this.timeout(120000);
        before(() => {
            return new Promise(function (fufilled, rejected) {
                const child = require('child_process').exec('artillery run -o result/' + name + '.json config/' + name + '.yml');
                child.stdout.pipe(process.stdout);
                child.on('exit', function () {
                    fufilled();
                });
            });
        });

        it('should return successful 200 responses for more than 80% of requests', function (done) {
            const result = require('./result/' + name + '.json');
            expect(result.aggregate.codes["200"]).to.be.above(500);
            done();
        });

    });

    describe('Corporate Preferences endpoint', function () {

        let name = 'corporate_preferences';

        this.timeout(120000);
        before(() => {
            return new Promise(function (fufilled, rejected) {
                const child = require('child_process').exec('artillery run -o result/' + name + '.json config/' + name + '.yml');
                child.stdout.pipe(process.stdout);
                child.on('exit', function () {
                    fufilled();
                });
            });
        });

        it('should return successful 200 responses for more than 80% of requests', function (done) {
            const result = require('./result/' + name + '.json');
            expect(result.aggregate.codes["200"]).to.be.above(500);
            done();
        });

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

    it('should return successful 200 responses for more than 80% of requests', function (done) {
        const result = require('./result/associations.json');
        expect(result.aggregate.codes["200"]).to.be.above(500);
        done();
    });


    describe('Individual Authentication endpoint', function () {

        let name = 'individual_associations';

        this.timeout(120000);
        before(() => {
            return new Promise(function (fufilled, rejected) {
                const child = require('child_process').exec('artillery run -o result/' + name + '.json config/' + name + '.yml');
                child.stdout.pipe(process.stdout);
                child.on('exit', function () {
                    fufilled();
                });
            });
        });

        it('should return successful 200 responses for more than 80% of requests', function (done) {
            const result = require('./result/' + name + '.json');
            expect(result.aggregate.codes["200"]).to.be.above(500);
            done();
        });

    });

    describe('Corporate Authentication endpoint', function () {

        let name = 'individual_associations';

        this.timeout(120000);
        before(() => {
            return new Promise(function (fufilled, rejected) {
                const child = require('child_process').exec('artillery run -o result/' + name + '.json config/' + name + '.yml');
                child.stdout.pipe(process.stdout);
                child.on('exit', function () {
                    fufilled();
                });
            });
        });

        it('should return successful 200 responses for more than 80% of requests', function (done) {
            const result = require('./result/' + name + '.json');
            expect(result.aggregate.codes["200"]).to.be.above(500);
            done();
        });

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

    it('should return successful 200 responses for more than 80% of requests', function (done) {
        const result = require('./result/data.json');
        expect(result.aggregate.codes["200"]).to.be.above(500);
        done();
    });


    describe('Individual Data endpoint', function () {

        let name = 'individual_data';

        this.timeout(120000);
        before(() => {
            return new Promise(function (fufilled, rejected) {
                const child = require('child_process').exec('artillery run -o result/' + name + '.json config/' + name + '.yml');
                child.stdout.pipe(process.stdout);
                child.on('exit', function () {
                    fufilled();
                });
            });
        });

        it('should return successful 200 responses for more than 80% of requests', function (done) {
            const result = require('./result/' + name + '.json');
            expect(result.aggregate.codes["200"]).to.be.above(500);
            done();
        });

    });

    describe('Corporate Data endpoint', function () {

        let name = 'corporate_data';

        this.timeout(120000);
        before(() => {
            return new Promise(function (fufilled, rejected) {
                const child = require('child_process').exec('artillery run -o result/' + name + '.json config/' + name + '.yml');
                child.stdout.pipe(process.stdout);
                child.on('exit', function () {
                    fufilled();
                });
            });
        });

        it('should return successful 200 responses for more than 80% of requests', function (done) {
            const result = require('./result/' + name + '.json');
            expect(result.aggregate.codes["200"]).to.be.above(500);
            done();
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

    it('should return successful 200 responses for more than 80% of requests', function (done) {
        const result = require('./result/goals.json');
        expect(result.aggregate.codes["200"]).to.be.above(500);
        done();
    });


});

