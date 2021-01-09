addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    update(diff){
      player.p.points = hasMilestone("t", 1) ? player.p.points.add(tmp.p.resetGain.times(diff)) : player.p.points
    },
    color: "#0086C4",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult=mult.mul(upgradeEffect("p", 21))
        mult=mult.mul(upgradeEffect("t", 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  upgrades: {
    rows:2,
    cols:2,
    11: {
      title: "Point Boost",
      description: "Multiply point gain by 1.5.",
      cost: new Decimal(1),
      unlocked(){return player.p.total.gte(1)},
    },
    12: {
      title: "Prestige Bonus",
      description: "Gain more points based on total prestige points.",
      cost: new Decimal(1),
      unlocked(){return hasUpgrade("p",11)},
      effect(){return hasUpgrade("p", 12) ? player.p.total.sqrt().add(1) : new Decimal(1)},
      effectDisplay(){return hasUpgrade("p",12)?`x${format(this.effect())}`:"x1"}
    },
    21: {
      title: "Prestige Doubling",
      description: "Double prestige point gain.",
      cost: new Decimal(2),
      unlocked(){return hasUpgrade("p",11)},
      effect() {return hasUpgrade("p", 21) ? new Decimal(2) : new Decimal(1)}
    },
    22: {
      title: "Self-Synergizing",
      description: "Gain more points based on points.",
      cost: new Decimal(5),
      unlocked(){return hasUpgrade("p",11)},
      effect(){return hasUpgrade("p",22) ? player.points.add(1).log(8).add(1) : new Decimal(1)},
      effectDisplay(){return hasUpgrade("p",22)?`x${format(this.effect())}`:"x1"}
    },
  },
  branches: ["t"],
  doReset(layer){
    if(layer=="p")return
    let keep = []
    if (layer=="t") {
    if (hasMilestone("t", 0)) keep.push("upgrades")
    }
    layerDataReset("p",keep)
  }
})
