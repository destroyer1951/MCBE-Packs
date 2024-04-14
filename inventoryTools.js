import {world, ItemStack} from '@minecraft/server' // ItemStack must be imported for this to work.
player.getComponent('minecraft:inventory').container.addItem(new ItemStack('iron_ingot', 1)) // Add item to player's inventory like the /give command would

const item = player.getComponent('equippable').getEquipment('Mainhand'); // Get mainhand item of a player

// credit to @herobrine643928 for writing most of the code below
const checkItemAmount = (player, itemId, clearItems = false) => {
    const inventory = player.getComponent("inventory").container
    let itemAmount = 0
    for (let i = 0; i < 36; i++) {
        let item = inventory.getItem(i)
        if (item?.typeId !== itemId) continue
        itemAmount += item.amount
        if (clearItems) inventory.setItem(i)
    }
    return itemAmount
}

const checkInvEmpty = (player) => {
    const inventory = player.getComponent("inventory").container
    for (let i = 0; i < 36; i++) {
        let item = inventory.getItem(i)
        if (item) return false
    }
    return true
}
