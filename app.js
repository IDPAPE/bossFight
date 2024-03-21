//NOTE Variables and arrays start here

const heroes = [
    {
        name: 'Slate Slabrock',
        type: 'wizard',
        damage: 5,
        health: 100
    },
    {
        name: 'Flint Ironstag',
        type: 'ninja',
        damage: 10,
        health: 50
    }
]

const boss = {
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1
}

//Variables and arrays end here

//NOTE Code Starts here

bossAttack()
//Code Ends here

//NOTE Functions start here

//Boss picks a random hero from the array and deals it's dmg to them
function bossAttack() {
    let target
    let randomTarget = Math.floor(Math.random() * heroes.length)
    console.log(randomTarget)
    target = heroes[randomTarget]
    console.log(target)
    target.health -= boss.damage
    console.log(target.name, 'is at', target.health, 'hp')
}

//Updates all the html elements to match their JavaScript variables
function updatePage() {
    let hero1HpElm = document.getElementById('hero-1-hp')
    hero1HpElm.innerHTML = `HP: ${heroes[0].health}`
    let hero2HpElm = document.getElementById('hero-2-hp')
    hero2HpElm.innerHTML = `HP: ${heroes[1].health}`
    let bossHpElm = document.getElementById('boss-hp')
    bossHpElm.innerHTML = `HP: ${boss.health}/${boss.maxHealth}`

}



//Functions end here