const talkedRecently = new Set();

const { Client, Intents, MessageEmbed} = require("discord.js")
const { Token, prefix, uri} = require("./config/config.json")
const { Color } = require("./config/constant.json")
const { Login, db } = require("./utils/logger.js")
const { Commands } = require("./utils/command.js")
const { sendMessage, sendEmbed } = require("./utils/message")
const { connect, model, Schema } = require('mongoose')
const { lands, equipment} = require('./config/shop.json')

connect(uri, {useNewUrlParser: true}).then(() => {
    db('Connected to the DataBase')
})

const userSchema = new Schema({
    username: String,
    userTag: String,
    userId: Number,
    avatarUrl: String,
    balance: Number,
    skill_level: Number,
    rob_level: Number,
    house: String,
    inventory: Array,
})

const users = new model('users', userSchema)

const client = new Client({intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]});

client.once('ready', () => {
    Login("Ready")
})

client.on('messageCreate', message => {

    Commands(message, 'createprofile', (args) => {
        users.findOne({userId: message.author.id}, (err, res) => {
            if (err) {
                throw err;
            }

            if (!res) {
                const user = new users({
                    username: message.author.username,
                    userTag: message.author.tag,
                    userId: message.author.id,
                    avatarUrl: message.author.displayAvatarURL(),
                    balance: 10,
                    skill_level: 0,
                    rob_level: 0,
                    house: "none",
                    inventory: []
                });

                user.save().then(() => {
                    sendMessage(message, "User Added to the database");
                    const embed = new MessageEmbed()
                        .setTitle(message.author.tag)
                        .setThumbnail(message.author.displayAvatarURL())
                        .setColor(Color.primary)
                        .addFields(
                            {name: 'balance', value: '10', inline: true},
                            {name: 'Skill Level', value: '0', inline: true},
                            {name: 'Rob Level', value: '0', inline: true},
                            {name: 'House', value: 'none', inline: true},
                        )

                    sendEmbed(message, embed)
                })
            } else {
                sendMessage(message, "You are already in the database")

                const embed = new MessageEmbed()
                    .setTitle(res.userTag)
                    .setThumbnail(res.avatarUrl)
                    .setColor(Color.primary)
                    .addFields(
                        {name: 'balance', value: res.balance, inline: true},
                        {name: 'Skill Level', value: res.skill_level, inline: true},
                        {name: 'Rob Level', value: res.rob_level, inline: true},
                        {name: 'Own a House', value: res.ownhouse, inline: true},
                    )
                
                sendEmbed(message, embed)
            }
        })


    })
    
    Commands(message, 'profile', (args) => {
        if (!args.length) {
            users.findOne({userId: message.author.id}, (err, res) => {
                if (err) {
                    throw err;
                }
    
                if (!res) {
                    sendMessage(message, "You are not in the database")
                } else {
                    const embed = new MessageEmbed()
                    .setTitle(res.userTag)
                    .setThumbnail(res.avatarUrl)
                    .setColor(Color.primary)
                    .addFields(
                        {name: 'balance', value: res.balance.toString(), inline: true},
                        {name: 'Skill Level', value: res.skill_level.toString(), inline: true},
                        {name: 'Rob Level', value: res.rob_level.toString(), inline: true},
                        {name: 'House', value: res.house.toString(), inline: true},
                    )
                
                    sendEmbed(message, embed)
                }
            })
        } else {
            users.findOne({userId: message.mentions.users.first().id}, (err, res) => {
                if (err) {
                    throw err;
                }
    
                if (!res) {
                    sendMessage(message, "That user is not in the database")
                } else {
                    const embed = new MessageEmbed()
                    .setTitle(res.userTag)
                    .setThumbnail(res.avatarUrl)
                    .setColor(Color.primary)
                    .addFields(
                        {name: 'balance', value: res.balance.toString(), inline: true},
                        {name: 'Skill Level', value: res.skill_level.toString(), inline: true},
                        {name: 'Rob Level', value: res.rob_level.toString(), inline: true},
                        {name: 'House', value: res.house.toString(), inline: true},
                    )
                
                    sendEmbed(message, embed)
                }
            })
        } 
    })

    Commands(message, 'view', (args) => {
        if (!args.length) {
            users.findOne({userId: message.author.id}, (err, res) => {
                if (err) {
                    throw err;
                }
    
                if (!res) {
                    sendMessage(message, "You are not in the database")
                } else {
                    const embed = new MessageEmbed()
                    .setTitle(res.userTag)
                    .setThumbnail(res.avatarUrl)
                    .setColor(Color.primary)
                    .addFields(
                        {name: 'balance', value: res.balance.toString(), inline: true},
                        {name: 'Skill Level', value: res.skill_level.toString(), inline: true},
                        {name: 'Rob Level', value: res.rob_level.toString(), inline: true},
                        {name: 'House', value: res.house.toString(), inline: true},
                    )
                
                    sendEmbed(message, embed)
                }
            })
        } else {
            users.findOne({userId: message.mentions.users.first().id}, (err, res) => {
                if (err) {
                    throw err;
                }
    
                if (!res) {
                    sendMessage(message, "That user is not in the database")
                } else {
                    const embed = new MessageEmbed()
                    .setTitle(res.userTag)
                    .setThumbnail(res.avatarUrl)
                    .setColor(Color.primary)
                    .addFields(
                        {name: 'balance', value: res.balance.toString(), inline: true},
                        {name: 'Skill Level', value: res.skill_level.toString(), inline: true},
                        {name: 'Rob Level', value: res.rob_level.toString(), inline: true},
                        {name: 'House', value: res.house.toString(), inline: true},
                    )
                
                    sendEmbed(message, embed)
                }
            })
        } 
    })

    Commands(message, 'daily', (args) => {
        const hour = 60000;
        const day = hour * 24;

        if (talkedRecently.has(message.author.id)) {
            sendMessage(message, "Wait 1 day before getting the daily again");
        } else {
            const dailyamount = Math.floor(Math.random() * 10)
            users.findOne({userId: message.author.id}, function(err, res){
                if (err) {
                    logger.error(err)
                }
                users.updateOne({userId: message.author.id}, {balance: res.balance + dailyamount}, function(err, res1){
                    if (err) {
                        logger.error(err)
                    }
                    sendMessage(message, "congratulations you got " + dailyamount)
                })
            })

            // Adds the user to the set so that they can't talk for a minute
            talkedRecently.add(message.author.id);
            setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(message.author.id);
            }, day);
        } 
    })
    
    Commands(message, 'shop', (args) => {
        if(!args.length) {
            const mainEmbed = new MessageEmbed()
                .setTitle('shop')
                .setColor(Color.primary)
                .addFields(
                    {name: 'Lands', value: ` (${prefix}shop lands) to access the lands menu`},
                    {name: 'Equipment', value: ` (${prefix}shop equipment) to access the lands menu`}
                )

            sendEmbed(message, mainEmbed)
        } else if (args[0] === "lands") {
            const landEmbed = new MessageEmbed()
            .setTitle('Land Shop')
            .setColor(Color.primary)
            .addFields(
                {name: `${lands.APARTMENT.name} (${lands.APARTMENT.id})`, value: `Price: ${lands.APARTMENT.price}`},
                {name: `${lands.BOX_HOUSE.name} (${lands.BOX_HOUSE.id})`, value: `Price: ${lands.BOX_HOUSE.price}`},
                {name: `${lands.HOUSE.name} (${lands.HOUSE.id})`, value: `Price: ${lands.HOUSE.price}`},
                {name: `${lands.MANSION.name} (${lands.MANSION.id})`, value: `Price: ${lands.MANSION.price}`},
            )

            sendEmbed(message, landEmbed)
        } else if (args[0] === "equipment") {
            const equipmentEmbed = new MessageEmbed()
            .setTitle('Land Shop')
            .setColor(Color.primary)
            .addFields(
                {name: `${equipment.GUN.name} (${equipment.GUN.id})`, value: `Price: ${equipment.GUN.price}`},
                {name: `${equipment.CROWBAR.name} (${equipment.CROWBAR.id})`, value: `Price: ${equipment.CROWBAR.price}`},
                {name: `${equipment.WRENCH.name} (${equipment.WRENCH.id})`, value: `Price: ${equipment.WRENCH.price}`},
            )

            sendEmbed(message, equipmentEmbed)
        }
    })

    Commands(message, 'buy', (args) => {
        users.findOne(
            {userId: message.author.id},
            {$push}
            )

        if (!args.length) {
            sendMessage(message, "Please Provide a valid id")
        } 
        else if (args[0] === lands.APARTMENT.id.toString()) {
            sendMessage(message, `Bought ${lands.APARTMENT.name} for ${lands.APARTMENT.price}`)
        } 
        else if (args[0] === lands.BOX_HOUSE.id.toString()) {
            sendMessage(message, `Bought ${lands.BOX_HOUSE.name} for ${lands.BOX_HOUSE.price}`)
        }
        else if (args[0] === lands.HOUSE.id.toString()) {
            sendMessage(message, `Bought ${lands.HOUSE.name} for ${lands.HOUSE.price}`)
        }
        else if (args[0] === lands.MANSION.id.toString()) {
            sendMessage(message, `Bought ${lands.MANSION.name} for ${lands.MANSION.price}`)
        }
        else if (args[0] === equipment.GUN.id.toString()) {
            sendMessage(message, `Bought ${equipment.GUN.name} for ${equipment.GUN.price}`)
        }
        else if (args[0] === equipment.CROWBAR.id.toString()) {
            sendMessage(message, `Bought ${equipment.CROWBAR.name} for ${equipment.CROWBAR.price}`)
        }
        else if (args[0] === equipment.WRENCH.id.toString()) {
            sendMessage(message, `Bought ${equipment.WRENCH.name} for ${equipment.WRENCH.price}`)
        } else {
            sendMessage(message, `Cannot find Item with id of ${args[0]}.`)
        }

    })

    Commands(message, 'rob', (args) => {
        if (!args.length) {
            sendMessage(message, "ayy mate nobody to rob")
        } else {
            if (message.mentions.users.first().username.toString() === message.author.username.toString()) {
                sendMessage(message, "cannot rob yourself Idiot")
            } else {
                users.findOne({userId: message.mentions.users.first().id}, (err, res1) => {
                    if (err) {
                        throw err;
                    }
                    users.findOne({userId: message.mentions.users.first().id}, (err, res) => {
                        if (err) {
                            throw err;
                        }
        
                        if (!res) {
                            sendMessage(message, "that user is not in the database")
                        } else {
                            if (res.balance < 10) {
                                sendMessage(message, `${message.mentions.users.first().username} is to poor to be robbed let him be`)
                            } else if (res.balance > 10) {
                                const RobAmount = Math.round(Math.random() * 10)
                                users.updateOne({userId: message.author.id}, {balance: res1.balance + RobAmount}).then(() => {
                                    users.updateOne({userId: message.mentions.users.first().id}, {balance: res.balance - RobAmount}).then(() => {
                                        sendMessage(message, `${message.author.username} Has Robbed ${message.mentions.users.first().username} out of ${RobAmount}`)
                                    })
                                })
                            }
                        }
                    
                    })
                })
            }
        }
    })
    
})
client.login(Token)