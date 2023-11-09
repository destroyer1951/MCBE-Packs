function getScore(objective, target) {
    try {
        if (world.scoreboard.getObjective(objective).getScore(typeof target === 'string' ? target : target.scoreboardIdentity) === undefined) {
            return 0
        } else { return world.scoreboard.getObjective(objective).getScore(typeof target === 'string' ? target : target.scoreboardIdentity) }
    } catch {
        return 0
    }
}

function setScore(objective, target, amount, add = false) {
    const scoreObj = world.scoreboard.getObjective(objective)
    const score = (add ? scoreObj?.getScore(target) ?? 0 : 0) + amount
    scoreObj?.setScore(target, score)
    return score;
}
