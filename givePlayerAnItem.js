import {world, ItemStack} from '@minecraft/server' // ItemStack must be imported for this to work.

data.player.getComponent('minecraft:inventory').container.addItem(new ItemStack('iron_ingot', 1))
