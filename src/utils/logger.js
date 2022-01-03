const { username } = require('../config/config.json')
const colors = require('colors')


module.exports = {
    Login: function (msg) {
        console.log(`[${username}] `.blue + "[Log In]".cyan + `: ${msg}`)
    },
    db: function (msg) {
        console.log(`[${username}] `.blue + "[Data Base]".green + `: ${msg}`)
    },
    error: function (msg) {
        console.log(`[${username}] `.blue + "[Error]".red + `: ${msg}`)
    }
}