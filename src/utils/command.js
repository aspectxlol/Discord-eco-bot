const { prefix } = require('../config/config.json')

module.exports = {
    Commands: function (message, cmd, callback) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
    
        if (command === cmd.toString()) {
            callback(args)
        } 
    }
}