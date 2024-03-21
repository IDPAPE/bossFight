//NOTE Variables and arrays start here

const heroes = [
    {
        name: 'Merlin',
        type: 'wizard',
        damage: 5,
        health: 100
    },
    {
        name: 'Naruto',
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
let textBubbleElm = document.getElementById('text-bubble') //will be used for outputting
let gold = 0

//Variables and arrays end here

//NOTE Code Starts here
updatePage()
setInterval(bossAttack, 5000)
//Code Ends here

//NOTE Functions start here

//Boss picks a random hero from the array and deals it's dmg to them, changes target if target is dead, does nothing if all heroes dead
function bossAttack() {
    let target
    let partyHp = checkHeroesHealth()
    let randomTarget = Math.floor(Math.random() * heroes.length) //randomly selects target
    console.log(randomTarget)
    target = heroes[randomTarget] //if first target is alive
    if (target.health > 0 && partyHp > 0) {
        console.log(`attacking primary ${target.name}`)
        target.health -= boss.damage
        textBubbleElm.innerHTML = `You don't stand a chance ${target.name}!`
    }
    else if (partyHp > 0) { //if first target is dead, but there are still living heroes
        console.log(`${target.name} is dead`)
        target = heroes.find(hero => hero.health > 0)
        console.log(`${target.name} is next`)
        target.health -= boss.damage
        console.log(`${target.name} took ${boss.damage} dmg and is at ${target.health} hp`)
        textBubbleElm.innerHTML = `What will you do without your friend ${target.name}!?`
    }
    else { //if all heroes are dead
        console.log(`all heroes are dead`)
        textBubbleElm.innerHTML = `Ha! the tiny humans were crushed!`
    }
    // checkHeroesHealth()
    updatePage()
}

function bossDead() {
    let loot = boss.level * 50 //gives gold based on boss level
    console.log(`heroes get ${loot}`)
    gold += loot
    textBubbleElm.innerHTML = `You're only making me stronger!`
    boss.level++ //levels up boss and sets new stats based on level
    boss.damage = 5 * boss.level
    boss.health = 100 * boss.level
    boss.maxHealth = 100 * boss.level
    console.log(`boss reached lv ${boss.level} now deals ${boss.damage} damage and has ${boss.health}/${boss.maxHealth} hp`)
    updatePage()
}

//sums heroes damage and deals it to the boss
function heroesAttack() {
    let partyDmg = 0
    heroes.forEach(hero => { partyDmg += hero.damage });
    boss.health -= partyDmg
    console.log(`the party dealt ${partyDmg} damage, the boss is at ${boss.health}/${boss.maxHealth}`)
    checkBossHealth()
    updatePage()
}

function checkBossHealth() {
    if (boss.health <= 0) {
        console.log(`heroes win!`)
        bossDead()
    }
}

//checks and returns heroes total hp if any heroes are at negative hp, their hp is set to 0
function checkHeroesHealth() {
    let partyHp = 0
    heroes.forEach(hero => { if (hero.health < 0) { hero.health = 0 } }) //sets any negative hp to 0
    heroes.forEach(hero => partyHp += hero.health) //sums all hero health into partyHp
    console.log(`party HP is ${partyHp}`)
    if (partyHp <= 0) {
        console.log(`heroes lose`)
    }
    return partyHp
}

//heals the specified hero if there is sufficient gold
function healingPotion(heroName) {
    if (gold >= 25) {
        if (heroName == 'Merlin') {
            console.log(`selected Merlin`)
            heroes[0].health += 15
        }
        else if (heroName == 'Naruto') {
            console.log(`selected Naruto`)
            heroes[1].health += 15
        }
        gold -= 25
        textBubbleElm.innerHTML = `Stop healing Cowards!`
    }
    else {
        console.log('not enough money')
    }
    updatePage()
}

//Updates all the html elements to match their JavaScript variables
function updatePage() {
    let hero1HpElm = document.getElementById('hero-1-hp')
    hero1HpElm.innerHTML = `HP: ${heroes[0].health}`
    let hero2HpElm = document.getElementById('hero-2-hp')
    hero2HpElm.innerHTML = `HP: ${heroes[1].health}`
    let bossHpElm = document.getElementById('boss-hp')
    bossHpElm.innerHTML = `HP: ${boss.health}/${boss.maxHealth}`
    let bossLvElm = document.getElementById('boss-lv')
    bossLvElm.innerHTML = `Lv: ${boss.level}`
    let goldElm = document.getElementById('gold')
    goldElm.innerHTML = `${gold}`
}



//Functions end here