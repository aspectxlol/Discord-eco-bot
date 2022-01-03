module.exports = {
    sendMessage: function(msg, content) {
        msg.channel.send(content);
    },
    sendEmbed: function(msg, content) {
        msg.channel.send({embeds: [content]})
    }
}