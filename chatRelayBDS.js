// This script requires a bot AND a webhook to function. You can also just use a bot for this, or if you only want to send messages from the server to the discord, you can just use a webhook.

import { HttpRequest, HttpClient, HttpHeader, HttpResponse, HttpRequestMethod, http } from '@minecraft/server-net'

world.sendMessage('§l§eServer Reloaded!')
const uptime = Math.floor(Date.now()/1000)

const webhookLink = 'insert webhook link here'
const webhookToken = 'insert webhook token here'
const token = 'insert bot token here'
const channelID = 'insert channel id here (keep as string)'

async function relayWebhook(message) {
    const req = new HttpRequest(webhookLink);

    req.body = JSON.stringify({
        content: message
    });

    req.method = HttpRequestMethod.Post;
    req.headers = [
        new HttpHeader('Content-Type', 'application/json'),
        new HttpHeader('auth', webhookToken),
    ];

    await http.request(req);
}

world.beforeEvents.chatSend.subscribe(data => {
    system.run(() => {
        relayWebhook(`<${data.sender.name}> ${data.message}`)
    })
})
let lastMSG = ''
async function getMessages() {
    let req
    if (lastMSG) {
        req = new HttpRequest(`https://discord.com/api/channels/${channelID}/messages?after=${lastMSG}`);
    } else {
        req = new HttpRequest(`https://discord.com/api/channels/${channelID}/messages?limit=1`);
    }

    req.method = HttpRequestMethod.Get;
    req.headers = [
        new HttpHeader('Content-Type', 'application/json'),
        new HttpHeader('Authorization', `Bot ${token}`),
    ];

    return await http.request(req);
}

system.runInterval(() => {
    getMessages().then(a => {
        const data = JSON.parse(a.body).reverse()
        for (let i of data) {
            if (i.author.bot != undefined) continue
            if (i.id == lastMSG) continue
            if (i.content == '.uptime') {
                relayWebhook(`The server has been open since <t:${uptime}:F>`)
            }
            world.sendMessage(`<§9${i.author.username}§r> ${i.content}`)
            lastMSG = i.id
        }
    })
}, 20)

world.afterEvents.playerJoin.subscribe(data => {
    relayWebhook(`**${data.playerName} has joined the server!**`)
})

world.afterEvents.playerLeave.subscribe(data => {
    relayWebhook(`**${data.playerName} has left the server!**`)
})
