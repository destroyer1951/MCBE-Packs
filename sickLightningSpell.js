/* I spent literally like 10 minutes just adding negative signs and swapping sin and cosine for ts lmao */

world.afterEvents.itemUse.subscribe(data => {

    if (data.itemStack.typeId !== "minecraft:golden_sword" || !data.source.isOnGround) return

    const player = data.source
    const rot = player.getRotation()
    const loc = player.location

    const x = loc.x
    const y = loc.y
    const z = loc.z




    const newZ = 15*Math.cos(rot.y*((Math.PI)/180))
    const newX = -15*Math.sin(rot.y*((Math.PI)/180))


    player.teleport({x:x+newX, y:y, z:z+newZ})

    for (let i = 0; i < 6; i++) {
        const lightZ = i*2*Math.cos(rot.y*((Math.PI)/180))
        const lightX = -i*2*Math.sin(rot.y*((Math.PI)/180))

        player.dimension.spawnEntity("minecraft:lightning_bolt", {x:x+lightX, y:y, z:z+lightZ})
    }


})
