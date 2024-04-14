
// Get scores
function getScore(target, objective) {
    try {
        if (world.scoreboard.getObjective(objective).getScore(typeof target === 'string' ? target : target.scoreboardIdentity) === undefined) {
            return 0
        } else { return world.scoreboard.getObjective(objective).getScore(typeof target === 'string' ? target : target.scoreboardIdentity) }
    } catch {
        return 0
    }
}


// Set scores
function setScore(target, objective, amount, add = false) {
    const scoreObj = world.scoreboard.getObjective(objective)
    const score = (add ? scoreObj?.getScore(target) ?? 0 : 0) + amount
    scoreObj?.setScore(target, score)
    return score;
}

// Test for scores without a function using a player object (NOT RECOMMENDED!!!)
world.scoreboard.getObjective("objective").getScore(player.scoreboardIdentity)

// Add a scoreboard objective
world.scoreboard.addObjective("objectiveName", "displayName")
