const mongoose = require('mongoose');
const request = require('request');
mongoose.Promise = Promise;


const profileSchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, required: true},
    type: {type: mongoose.Schema.Types.String, enum: ["apache", "mongo"], required: true},
    times: [{type: mongoose.Schema.Types.Number, required: true}],
});
const Profile = mongoose.model('ProfilingResults', profileSchema);

function parseHrtimeToNanoseconds(hrtime) {
    let nanoSeconds = ((hrtime[0] * 1e9) + (hrtime[1]));
    return nanoSeconds;
}

function timeFunction(f, name, type) {
    let hrStart = process.hrtime();
    f(() => {
        let hrEnd = process.hrtime();
        new Profile({})
    });
}
request({
    url: 'http://localhost:8047/query.json',
    method: "POST",
    json: true,
    body: {
        queryType: 'SQL',
        query: 'SELECT * FROM mongo.admin.individualusers LIMIT 20'
    }
}, (err, response, body) => {
    console.log(JSON.stringify(body));
});