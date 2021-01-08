addLayer("t", {
    name: "triangles", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#00FF00",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "triangles", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for triangles", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("p",22) || player.t.best.gte(1)},
    milestones: {
    0: {
      requirementDescription: "10 triangles",
      effectDescription: "You keep Prestige Upgrades on reset.",
      done() {
        return player.t.points.gte(5);
      }
    },
    1: {
      requirementDescription: "1000 triangles",
      effectDescription: "Gain 100% of Prestige Points every second.",
      done() {
        return player.t.points.gte(10);
      }
    },
  },
})
