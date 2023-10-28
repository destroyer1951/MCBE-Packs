function getPlayerDynamicProperty(objective, player) {
    return world.getDynamicProperty(`${player.id}:${objective}`)
}

function setPlayerDynamicProperty(objective, player, value, add = false) {
    add && typeof value === 'number' ? world.setDynamicProperty(`${player.id}:${objective}`, value + world.getDynamicProperty(`${player.id}:${objective}`)) : world.setDynamicProperty(`${player.id}:${objective}`, value)
}
