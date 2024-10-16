world.beforeEvents.chatSend.subscribe(data => { // its not perfect but if you know how to code maybe its useful to you (if you can read my bad code)
    if (data.message.startsWith('-') && data.sender.hasTag('admin')) {
        data.cancel = true
        const player = data.sender
        switch (data.message.split(' ', 2)[0].toLowerCase().substring(1)) {
            case 'test': {
                const targetName = `${data.message.includes('@') ? data.message.substring(7) : data.message.substring(6)}`
                const players = world.getAllPlayers()
                let target
                players.forEach(p => {
                    if (p.name == targetName.replaceAll('"', '')) return target = p
                })
                if (!target) return player.sendMessage(`No player by the name of §e${targetName}§r found!`)
                target.sendMessage('test')
            }
        }
    }
})
