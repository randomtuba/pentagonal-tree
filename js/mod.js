let modInfo = {
	name: "The Pentagonal Tree",
	id: "pentagonaltree",
	author: "randomtuba",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "Codes",
}

let changelog = `<h1>Changelog:</h1><br><br>
  <h3>v0.2</h3><br>
    - Added Codes and Code Buyables <br>
    - Added 3 new triangle upgrades and 2 new prestige upgrades
    <br><br>
  <h3>v0.1.1</h3><br>
		- Changed the id of the game <br>
		- Fixed a bug where Prestige Bonus would not be affected by passive prestige point generation
    <br><br>
	<h3>v0.1</h3><br>
		- Added 2 layers (the 3rd layer is not done yet).<br>
		- bottom text`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
    
		return new Decimal(0)

	let gain = new Decimal(1)
  gain = gain.mul(hasUpgrade("p", 11) ? 1.5 : 1)
  gain = gain.mul(upgradeEffect("p", 12))
  gain = gain.mul(upgradeEffect("p", 22))
  gain = gain.mul(upgradeEffect("t", 11))
  gain=gain.mul(new Decimal(hasUpgrade("t",31)?4:3).pow(getBuyableAmount("c",11)))
  gain=gain.mul(upgradeEffect("p",13))
  
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = ["Current Endgame: 1e50 points and 1e25 triangles"
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e50"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}