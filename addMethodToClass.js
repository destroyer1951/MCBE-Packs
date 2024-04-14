function getScore(objective, target) { // getScore function for the function below
    try {
        if (world.scoreboard.getObjective(objective).getScore(typeof target === 'string' ? target : target.scoreboardIdentity) === undefined) {
            return 0;
        } else { return world.scoreboard.getObjective(objective).getScore(typeof target === 'string' ? target : target.scoreboardIdentity); }
    } catch {
        return 0;
    }
}

Player.prototype.getCoins = function () {
    return getScore('coins', this); // this references the instance of the class when you call this method
};
