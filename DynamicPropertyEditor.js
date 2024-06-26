function getPlayerDynamicProperty(player, objective) {
    return world.getDynamicProperty(`${player.id}:${objective}`)
}

function setPlayerDynamicProperty(player, objective, value, add = false) {
    add && typeof value === 'number' ? world.setDynamicProperty(`${player.id}:${objective}`, value + world.getDynamicProperty(`${player.id}:${objective}`)) : world.setDynamicProperty(`${player.id}:${objective}`, value)
}

function getGlobalDynamicProperty(objective) {
    return world.getDynamicProperty(objective)
}

function setGlobalDynamicProperty(objective, value, add = false) {
    add && typeof value === 'number' ? world.setDynamicProperty(objective, value + world.getDynamicProperty(objective)) : world.setDynamicProperty(objective, value)
}
