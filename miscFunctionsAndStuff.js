// random stuff here credit to some people for making some of it lol

// check for player's gamemode, param is player object and gamemode string
function isPlayerInGameMode(player, gamemode) {
    return world.getPlayers({ name: player.name, gameMode: gameMode }).length > 0;
} // pretty sure there is a method in the player class for this now (or maybe there always was?)

// check for ench, returns level of ench (0 if none)
const item = data.player.getComponent('inventory').container.getItem(data.player.selectedSlot)
        const fortuneLevel = item.getComponent('enchantments').enchantments.hasEnchantment('fortune')

// get player spawnpoint coords and the dimension of it
player.getSpawnPoint().x
player.getSpawnPoint().y
player.getSpawnPoint().z
player.getSpawnPoint().dimension

// give a player an item with ItemStack class imported from minecraft/server
data.player.getComponent('minecraft:inventory').container.addItem(new ItemStack('iron_ingot', 1))
