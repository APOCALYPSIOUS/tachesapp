const mongoose = require('mongoose')

mongoose.connect('mongodb://10.72.102.204:60000/tachesapp', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db