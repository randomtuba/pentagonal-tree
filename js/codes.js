function getBuyableAmt(x,y) {return getBuyableAmount(x,y)}
addLayer("c", {
    name: "codes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#F56042",
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    resource: "codes", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    base() {
      return 10;
    },
  exponent: 1,
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for codes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("t", 23)},
  buyables: {
    rows: 3,
    cols: 3,
    11: {
      title: "Point Duplication",
        cost() { return new Decimal(1).mul(getBuyableAmt(this.layer, this.id)).plus(1) },
        display() { if (getBuyableAmount(this.layer,this.id).eq(5)) return "MAXED";return "Triple point gain. Cost: "+format(this.cost()) },
        canAfford() { return player[this.layer].points.gte(this.cost())&&getBuyableAmount(this.layer,this.id).lt(5) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmt(this.layer, this.id).add(1))
        },
    },
    12: {title: "Hacked Prestige",
        cost() { return new Decimal(1).mul(getBuyableAmt(this.layer, this.id)).plus(1) },
        display() { if (getBuyableAmount(this.layer,this.id).eq(5)) return "MAXED";return "Triple prestige point gain. Cost: "+format(this.cost()) },
        canAfford() { return player[this.layer].points.gte(this.cost())&&getBuyableAmount(this.layer,this.id).lt(5) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmt(this.layer, this.id).add(1))
        },
    },
    13: {title: "Geometrical Extension",
        cost() { return new Decimal(1).mul(getBuyableAmt(this.layer, this.id)).plus(1) },
        display() { if (getBuyableAmount(this.layer,this.id).eq(5)) return "MAXED";return "Triple triangle gain. Cost: "+format(this.cost()) },
        canAfford() { return player[this.layer].points.gte(this.cost())&&getBuyableAmount(this.layer,this.id).lt(5) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmt(this.layer, this.id).add(1))
        },
    },
},
  milestones: {
    0: {
        requirementDescription: "3 codes",
        effectDescription: "keep prestige upgrades on code reset.",
        done() { return player.c.points.gte(3) }
    },
    1: {
        requirementDescription: "6 codes",
        effectDescription: "you can buy max codes.",
        done() { return player.c.points.gte(6) }
    },

},
  canBuyMax(){return hasMilestone(this.layer,1)},
})
