const item = data.player.getComponent('inventory').container.getItem(data.player.selectedSlot)
const fortuneLevel = item.getComponent('enchantments').enchantments.hasEnchantment('fortune')

// This may or may not still work haha i have no idea
