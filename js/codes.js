addLayer("c", {
    name: "codes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#F56042",
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "codes", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
  base() {
    return hasUpgrade("m", 12) ? new Decimal(4.5) : new Decimal(5);
  },
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for codes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("t", 23)},
})