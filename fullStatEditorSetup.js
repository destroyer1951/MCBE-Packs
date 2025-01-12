// this will make my life 99999x easier lmao ive prolly written all this code at least 3 times

import { world, system, ItemStack, Player } from '@minecraft/server'
import { ModalFormData } from '@minecraft/server-ui'


function getPlayerDynamicProperty(player, objective) {
    return world.getDynamicProperty(`${player.name.toLowerCase()}:${objective}`)
}

function setPlayerDynamicProperty(player, objective, value, add = false) {
    add && typeof value === 'number' ? world.setDynamicProperty(`${player.name.toLowerCase()}:${objective}`,  world.getDynamicProperty(`${player.name.toLowerCase()}:${objective}`) + value) : world.setDynamicProperty(`${player.name.toLowerCase()}:${objective}`, value)
}

function getGlobalDynamicProperty(objective) {
    return world.getDynamicProperty(objective)
}

function setGlobalDynamicProperty(objective, value, add = false) {
    add && typeof value === 'number' ? world.setDynamicProperty(objective, world.getDynamicProperty(objective)+value) : world.setDynamicProperty(objective, value)
}

function getScore(target, objective) {
    try {
        if (world.scoreboard.getObjective(objective).getScore(typeof target === 'string' ? target : target.scoreboardIdentity) === undefined) {
            return 0
        } else { return world.scoreboard.getObjective(objective).getScore(typeof target === 'string' ? target : target.scoreboardIdentity) }
    } catch {
        return 0
    }
}

function setScore(target, objective, amount, add = false) {
    const scoreObj = world.scoreboard.getObjective(objective)
    const score = (add ? scoreObj?.getScore(target) ?? 0 : 0) + amount
    scoreObj?.setScore(target, score)
    return score;
}

function setStat(player, stat, amount, add = false) {
    if (typeof amount !== 'number') return
    if (!add) return setPlayerDynamicProperty(player, stat, amount)
    const multiplier = getPlayerDynamicProperty(player, `${stat}Mult`)
    if (!multiplier && multiplier != 0) return setPlayerDynamicProperty(player, stat, amount, true)
    return setPlayerDynamicProperty(player, stat, amount*multiplier, true)
}

function createItem(typeId, name, lore, amount = 1) {
    const item = new ItemStack(typeId, amount)
    item.nameTag = name
    if (lore) item.setLore(lore)
    return item
}

world.afterEvents.playerSpawn.subscribe(data => {
    if (!data.initialSpawn) return
    const player = data.player
    player.sendMessage('§cThis world uses Data Storage Basket. Any name changes will result in §lpermanent§r§c data loss. You have been warned.')
})

world.beforeEvents.chatSend.subscribe(data => {
    if (data.message.startsWith('-') && data.sender.hasTag('admin')) {
        data.cancel = true
        const player = data.sender
        switch (data.message.split(' ', 2)[0].toLowerCase().substring(1)) {
            case 'setlore':{
                const item = player.getComponent('equippable').getEquipment('Mainhand')
                system.run(() => {
                    if (data.message.includes('\\n')) {
                        const lore = data.message.substring(9).split('\\n')
                        for (let i = 0; i < lore.length; i++) {
                            lore[i] = '§r' + lore[i]
                        }
                        item.setLore(lore)
                    } else item.setLore([`§r${data.message.substring(9)}`])
                    player.getComponent('equippable').setEquipment('Mainhand', item)
                })
                return;
            } case 'rename':{
                const item = player.getComponent('equippable').getEquipment('Mainhand')
                system.run(() => {
                    item.nameTag = `§r§f${data.message.substring(8)}`
                    player.getComponent('equippable').setEquipment('Mainhand', item)
                })
                return;
            } case 'setplayerprop':{
                const propData = data.message.substring(15).split(' ')
                const property = propData[1]
                let name = propData[0].toLowerCase().replace('@', '')
                let newValue = propData[2]
                let add
                if (Number.isFinite(Number(newValue))) {
                    newValue = Number(newValue)
                    if (propData[3] == 'add' || propData[3] == 'true') add = true
                }
                const oldValue = world.getDynamicProperty(`${name}:${property}`)
                if (add) {
                    world.setDynamicProperty(`${name}:${property}`, oldValue+newValue)
                } else {
                    world.setDynamicProperty(`${name}:${property}`, newValue)
                }
                

world.sendMessage(`§aInformation for the global property §e${property}

§aPlayer Name: §e${name}
§aProperty Name: §e${property}
§aOld Value: §e${oldValue}
§aNew Value: §e${world.getDynamicProperty(`${name}:${property}`)}`)
                return;
            } case 'getplayerprop':{
                const propData = data.message.substring(15).split(' ')
                const property = propData[1]
                let name = propData[0].toLowerCase().replace('@', '')
                const value = world.getDynamicProperty(`${name}:${property}`)

world.sendMessage(`§aInformation for the global property §e${property}

§aPlayer Name: §e${name}
§aProperty Name: §e${property}
§aValue: §e${value}`)
                return;
            } case 'setglobalprop':{
                const propData = data.message.substring(15).split(' ')
                const property = propData[0]
                let newValue = propData[1]
                let add = false
                if (Number.isFinite(Number(newValue))) {
                    newValue = Number(newValue)
                    if (propData[2] == 'add' || propData[2] == 'true') add = true
                }


                const oldValue = getGlobalDynamicProperty(property)
                setGlobalDynamicProperty(property, newValue, add)
                world.sendMessage(`§aInformation for the global property §e${property}

§aName: §e${property}
§aOld Value: §e${oldValue}
§aNew Value: §e${getGlobalDynamicProperty(property)}`)
                return;
            } case 'getglobalprop':{
                const property = data.message.substring(15)
                world.sendMessage(`§aInformation for the global property §e${property}

§aName: §e${property}
§aValue: §e${getGlobalDynamicProperty(property)}`)
                return;
            }
        }
    }
})

