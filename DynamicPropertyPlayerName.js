// Only use this if you plan on accessing player's dynamic properties via their username. Usernames can change so this system isn't perfect.

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
