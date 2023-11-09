// credit to @herobrine64 for writing a lot of this

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
