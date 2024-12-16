function getPlayerDynamicProperty(player, objective) {
    return world.getDynamicProperty(`${player.id}:${objective}`)
}

function setPlayerDynamicProperty(player, objective, value, add = false) {
    add && typeof value === 'number' ? world.setDynamicProperty(`${player.id}:${objective}`,  world.getDynamicProperty(`${player.id}:${objective}`) + value) : world.setDynamicProperty(`${player.id}:${objective}`, value)
}

function getGlobalDynamicProperty(objective) {
    return world.getDynamicProperty(objective)
}

function setGlobalDynamicProperty(objective, value, add = false) {
    add && typeof value === 'number' ? world.setDynamicProperty(objective, world.getDynamicProperty(objective)+value) : world.setDynamicProperty(objective, value)
}
