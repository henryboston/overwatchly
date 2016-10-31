//File contains all the data used for the front end. Any new maps or heroes added here will automatically be added to the page
//File also contains all functions used to retrieve and manipulate the data data.
var mapWeight = 1; //Amount of points to give to a hero that's good on the map.
var counterWeight = 1; //Amount of points to give to each hero that counters a hero on the enemy team
var weaknessWeight = 1;  //Amount of points to give to each hero that counters a hero on hte recommended team

//Hero data, all data for each hero is stored
//name: string - Name of the hero with no spaces or special character, for use in logic.js
//actualName: string - Display name of the hero, contains spaces and special characters
//role: string - That role the hero filles, can be Attack, Defense, Tank, or support
//healer: Boolean - Is the hero a healer
//strengths: Array of strings - Who the hero is strong against
//weaknesses: Array of strings - Who the hero is weak against
//score: Int - The current score of the hero based on counters, weaknesses, and map data
//proScorew: Int - the score based on where the hero is in the current tournoment meta.  Heroes are graded A to F and get a score from 2 to -2 where A = 2 and F = -2
//icon: string - Where the hero icon is stored
var heroData = [
    {
        name: "Ana",
        actualName: "Ana",
        role: 'Support',
        healer: true,
        strengths: ["Dva", "McCree", "Pharah"],
        weaknesses: ["Genji", "Tracer", "Reaper", "Reinhardt"],
        score: 0,
        proScore: 1
    },
    {
        name: "Bastion",
        actualName: "Bastion",
        role: 'Defense',
        healer: false,
        strengths: ["Lucio", "McCree", "Pharah", "Tracer", "Winston"],
        weaknesses: ["Dva", "Genji", "Hanzo", "Pharah", "Roadhog", "Tracer", "Widowmaker"],
        score: 0,
        proScore: -2
    },
    {
        name: "Dva",
        actualName: "Dva",
        role: 'Tank',
        healer: false,
        strengths: ["Bastion", "Hanzo", "Roadhog", "Widowmaker"],
        weaknesses: ["Reaper", "Tracer", "Pharah", "Zenyatta", "Zarya", "Ana", "Mei", "Genji"],
        score: 0,
        proScore: -1
    },
    {
        name: "Genji",
        actualName: "Genji",
        role: 'Offense',
        healer: false,
        strengths: ["Ana", "Bastion", "Dva", "Hanzo", "Mercy", "Roadhog", "Tracer", "Widowmaker", "Zenyatta"],
        weaknesses: ["McCree", "Mei", "Symmetra", "Winston", "Zarya"],
        score: 0,
        proScore: 0
    },
    {
        name: "Hanzo",
        actualName: "Hanzo",
        role: 'Defense',
        healer: false,
        strengths: ["Bastion", "Hanzo", "Soldier76", "Torbjorn", "Widowmaker"],
        weaknesses: ["Genji", "Tracer", "Winston", "Dva", "Hanzo"],
        score: 0,
        proScore: -1
    },
    {
        name: "Junkrat",
        actualName: "Junkrat",
        role: 'Defense',
        healer: false,
        strengths: ["Mei", "Reinhardt", "Symmetra", "Torbjorn"],
        weaknesses: ["Pharah", "Reinhardt", "Widowmaker"],
        score: 0,
        proScore: -2
    },
    {
        name: "Lucio",
        actualName: "Lucio",
        role: 'Support',
        healer: true,
        strengths: ["Reaper"],
        weaknesses: ["Pharah", "Reaper", "Bastion", "Roadhog"],
        score: 0,
        proScore: 2
    },
    {
        name: "McCree",
        actualName: "McCree",
        role: 'Offense',
        healer: false,
        strengths: ["Genji", "Mei", "Pharah", "Reaper", "Torbjorn", "Tracer"],
        weaknesses: ["Bastion", "Widowmaker", "Zarya", "Reinhardt", "Winston", "Ana"],
        score: 0,
        proScore: 0
    },
    {
        name: "Mei",
        actualName: "Mei",
        role: 'Defense',
        healer: false,
        strengths: ["Dva", "Genji", "Roadhog", "Soldier76", "Torbjorn", "Widowmaker", "Zarya"],
        weaknesses: ["Junkrat", "McCree", "Pharah", "Widowmaker", "Reaper", "Zarya"],
        score: 0,
        proScore: 0
    },
    {
        name: "Mercy",
        actualName: "Mercy",
        role: 'Support',
        healer: true,
        strengths: [],
        weaknesses: ["Tracer", "Genji", "Widowmaker", "Winston", "Roadhog"],
        score: 0,
        proScore: -1
    },
    {
        name: "Pharah",
        actualName: "Pharah",
        role: 'Offense',
        healer: false,
        strengths: ["Bastion", "Dva", "Junkrat", "Lucio", "Mei", "Reaper", "Reinhardt", "Symmetra"],
        weaknesses: ["Bastion", "McCree", "Soldier76", "Widowmaker", "Roadhog", "Ana"],
        score: 0,
        proScore: -1
    },
    {
        name: "Reaper",
        actualName: "Reaper",
        role: 'Offense',
        healer: false,
        strengths: ["Ana", "Dva", "Lucio", "Mei", "Reinhardt", "Widowmaker", "Winston", "Zarya", "Zenyatta"],
        weaknesses: ["Lucio", "Roadhog", "McCree", "Pharah", "Zarya"],
        score: 0,
        proScore: 0
    },
    {
        name: "Reinhardt",
        actualName: "Reinhardt",
        role: 'Tank',
        healer: false,
        strengths: ["Ana", "Junkrat", "McCree", "Roadhog", "Soldier76", "Widowmaker", "Winston", "Zenyatta"],
        weaknesses: ["Junkrat", "McCree", "Pharah", "Reaper", "Symmetra", "Winston", "Torbjorn"],
        score: 0,
        proScore: 1
    },
    {
        name: "Roadhog",
        actualName: "Roadhog",
        role: 'Tank',
        healer: false,
        strengths: ["Bastion", "Lucio", "Mercy", "Pharah", "Reaper", "Torbjorn", "Tracer", "Widowmaker"],
        weaknesses: ["Mei", "Zarya", "Reinhardt", "Genji", "Tracer", "Dva"],
        score: 0,
        proScore: 0
    },
    {
        name: "Soldier76",
        actualName: "Soldier: 76",
        role: 'Offense',
        healer: false,
        strengths: ["Pharah", "Widowmaker"],
        weaknesses: ["Mei", "Hanzo", "Reinhardt", "Zenyatta"],
        score: 0,
        proScore: -2
    },
    {
        name: "Symmetra",
        actualName: "Symmetra",
        role: 'Support',
        healer: false,
        strengths: ["Genji", "Reinhardt"],
        weaknesses: ["Tracer", "Winston", "Junkrat", "Pharah"],
        score: 0,
        proScore: -2
    },
    {
        name: "Torbjorn",
        actualName: "Torbjorn",
        role: 'Defense',
        healer: false,
        strengths: ["Tracer"],
        weaknesses: ["Widowmaker", "Reinhardt", "McCree", "Mei", "Junkrat", "Pharah", "Roadhog", "Hanzo"],
        score: 0,
        proScore: -2
    },
    {
        name: "Tracer",
        actualName: "Tracer",
        role: 'Offense',
        healer: false,
        strengths: ["Ana", "Bastion", "Dva", "Hanzo", "Mercy", "Roadhog", "Symmetra", "Widowmaker", "Zarya", "Zenyatta"],
        weaknesses: ["Genji", "McCree", "Torbjorn", "Bastion", "Roadhog"],
        score: 0,
        proScore: 0
    },
    {
        name: "Widowmaker",
        actualName: "Widowmaker",
        role: 'Defense',
        healer: false,
        strengths: ["Bastion", "Junkrat", "McCree", "Mei", "Mercy", "Pharah", "Torbjorn", "Zarya", "Zenyatta"],
        weaknesses: ["Mei", "Hanzo", "Genji", "Tracer", "Reaper", "Soldier76", "Dva", "Winston", "Roadhog", "Reinhardt"],
        score: 0,
        proScore: -2
    },
    {
        name: "Winston",
        actualName: "Winston",
        role: 'Tank',
        healer: false,
        strengths: ["Genji", "Hanzo", "McCree", "Mercy", "Reinhardt", "Symmetra", "Widowmaker", "Zenyatta"],
        weaknesses: ["Reaper", "Bastion", "Reinhardt", "Zenyatta"],
        score: 0,
        proScore: 0
    },
    {
        name: "Zarya",
        actualName: "Zarya",
        role: 'Tank',
        healer: false,
        strengths: ["Dva", "Genji", "McCree", "Mei", "Reaper", "Roadhog"],
        weaknesses: ["Tracer", "Reaper", "Mei", "Widowmaker"],
        score: 0,
        proScore: 2
    },
    {
        name: "Zenyatta",
        actualName: "Zenyatta",
        role: 'Support',
        healer: true,
        strengths: ["Dva", "Soldier76", "Winston"],
        weaknesses: ["Genji", "Tracer", "Reaper", "Reinhardt", "Widowmaker", "Winston"],
        score: 0,
        proScore: 0
    }
];

//All Data for the maps is stored here
//name: Name of the map with no spaces or special characters, for use in logic.js
//actualName: How the name is to be displayed
//maptype: What the map type is, can be Escort, Hybrid, Assault, or Control - Control is used to deterime if the attack/defense radio buttons are to be displayed.
//attackHeroes: Heroes that are good on attack, Control maps use this for map heroes
//defenseHeroes: Heroes that are good on defense, Control maps don't use this (There is no defense on control, both teams attack)
//icon: Location of the icon used to represent the map.
//A = 2, B = 1, C = 0, D = -1, F = -2
var mapData = [
    {
        name: "Dorado",
        actualName: "Dorado",
        mapType: "Escort",
        subMaps: {},
        attackHeroes: {
            Pharah: 2,
            Torbjorn: 0,
            McCree: 2,
            Widowmaker: 1,
            Junkrat: 2,
            Bastion: 0,
            Genji: 0,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 1,
            Hanzo: 2,
            Roadhog: 2,
            Dva: 1,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 1,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: 1
        },
        defenseHeroes: {
            Pharah: 1,
            Torbjorn: -2,
            McCree: 2,
            Widowmaker: 0,
            Junkrat: 0,
            Bastion: -1,
            Genji: 1,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 1,
            Hanzo: 0,
            Roadhog: 1,
            Dva: 2,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 2,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: -1
        }
    },
    {
        name: "Eichenwalde",
        actualName: "Eichenwalde",
        mapType: "Hybrid",
        subMaps: {},
        attackHeroes: {
            Pharah: 2,
            Torbjorn: 1,
            McCree: 2,
            Widowmaker: 1,
            Junkrat: 2,
            Bastion: 1,
            Genji: 0,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 2,
            Hanzo: 2,
            Roadhog: 2,
            Dva: 1,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 1,
            Ana: 2,
            Winston: 1,
            Soldier76: 1,
            Symmetra: 2
        },
        defenseHeroes: {
            Pharah: 2,
            Torbjorn: -1,
            McCree: 2,
            Widowmaker: 1,
            Junkrat: 0,
            Bastion: 0,
            Genji: 1,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 1,
            Hanzo: 1,
            Roadhog: 2,
            Dva: 1,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 2,
            Ana: 2,
            Winston: 2,
            Soldier76: 2,
            Symmetra: -1
        }

    },
    {
        name: "Hanamura",
        actualName: "Hanamura",
        mapType: "Assault",
        subMaps: {},
        attackHeroes: {
            Pharah: 1,
            Junkrat: 2,
            Winston: 0,
            Ana: 2,
            Torbjorn: 1,
            Lucio: 2,
            Bastion: 1,
            Widowmaker: 1,
            McCree: 2,
            Mei: 2,
            Soldier76: 1,
            Zarya: 2,
            Reaper: 1,
            Hanzo: 1,
            Mercy: 2,
            Roadhog: 2,
            Symmetra: 2,
            Zenyatta: 2,
            Tracer: 0,
            Reinhardt: 2,
            Dva: 1
        },
        defenseHeroes: {
            'Pharah': 1,
            'Junkrat': 0,
            'Winston': 2,
            'Ana': 2,
            'Torbjorn': -2,
            'Lucio': 2,
            'Bastion': -1,
            'Widowmaker': 0,
            'McCree': 2,
            'Mei': 2,
            'Soldier76': 1,
            'Zarya': 2,
            'Reaper': 1,
            'Hanzo': 0,
            'Mercy': 1,
            'Roadhog': 1,
            'Symmetra': -2,
            'Zenyatta': 2,
            'Tracer': 1,
            'Reinhardt': 2,
            'Dva': 2
        }

    },
    {
        name: "Hollywood",
        actualName: "Hollywood",
        mapType: "Hybrid",
        subMaps: {},
        attackHeroes: {
            Pharah: 1,
            Torbjorn: 1,
            McCree: 2,
            Widowmaker: 0,
            Junkrat: 2,
            Bastion: 0,
            Genji: 0,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 2,
            Hanzo: 1,
            Roadhog: 2,
            Dva: 2,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 1,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: 1
        },
        defenseHeroes: {
            Pharah: 2,
            Torbjorn: -2,
            McCree: 1,
            Widowmaker: 0,
            Junkrat: 1,
            Bastion: 0,
            Genji: 1,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 1,
            Hanzo: 1,
            Roadhog: 2,
            Dva: 2,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 1,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: -2
        }

    },
    {
        name: "Ilios",
        actualName: "Ilios",
        mapType: "Control",
        subMaps: {
            Lighthouse: {
                name: "Lighthouse",
                subActualName: "Lighthouse",
                heroes: {
                    Pharah: 2,
                    Torbjorn: -2,
                    McCree: 2,
                    Widowmaker: 0,
                    Junkrat: 0,
                    Bastion: 0,
                    Genji: 1,
                    Zenyatta: 2,
                    Lucio: 2,
                    Zarya: 2,
                    Mei: 1,
                    Hanzo: 1,
                    Roadhog: 1,
                    Dva: 2,
                    Mercy: 2,
                    Reinhardt: 2,
                    Reaper: 1,
                    Tracer: 2,
                    Ana: 2,
                    Winston: 2,
                    Soldier76: 1,
                    Symmetra: -2
                }
            },
            Ruins: {
                name: "Ruins",
                subActualName: "Ruins",
                heroes: {
                    Pharah: 1,
                    Torbjorn: -2,
                    McCree: 1,
                    Widowmaker: -1,
                    Junkrat: 1,
                    Bastion: -1,
                    Genji: 1,
                    Zenyatta: 2,
                    Lucio: 2,
                    Zarya: 2,
                    Mei: 2,
                    Hanzo: 0,
                    Roadhog: 1,
                    Dva: 2,
                    Mercy: 1,
                    Reinhardt: 1,
                    Reaper: 2,
                    Tracer: 2,
                    Ana: 2,
                    Winston: 2,
                    Soldier76: 1,
                    Symmetra: -1
                }
            },
            Well: {
                name: "Well",
                subActualName: "Well",
                heroes: {
                    Pharah: 1,
                    Torbjorn: -1,
                    McCree: 2,
                    Widowmaker: 1,
                    Junkrat: 1,
                    Bastion: 0,
                    Genji: 1,
                    Zenyatta: 2,
                    Lucio: 2,
                    Zarya: 2,
                    Mei: 2,
                    Hanzo: 0,
                    Roadhog: 2,
                    Dva: 2,
                    Mercy: 0,
                    Reinhardt: 2,
                    Reaper: 2,
                    Tracer: 2,
                    Ana: 2,
                    Winston: 2,
                    Soldier76: 1,
                    Symmetra: -2
                }
            }
        },
        attackHeroes: {},
        defenseHeroes: {}
    },
    {
        name: "KingsRow",
        actualName: "King's Row",
        mapType: "Hybrid",
        subMaps: {},
        attackHeroes: {
            Pharah: 1,
            Torbjorn: 0,
            McCree: 2,
            Widowmaker: 1,
            Junkrat: 2,
            Bastion: 0,
            Genji: 0,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 2,
            Hanzo: 2,
            Roadhog: 2,
            Dva: 1,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 2,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: 1
        },
        defenseHeroes: {
            Pharah: 2,
            Torbjorn: -2,
            McCree: 2,
            Widowmaker: 1,
            Junkrat: 1,
            Bastion: -1,
            Genji: 1,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 1,
            Hanzo: 1,
            Roadhog: 1,
            Dva: 2,
            Mercy: 1,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 2,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: -1
        }
    },
    {
        name: "LijiangTower",
        actualName: "Lijiang Tower",
        mapType: "Control",
        subMaps: {
            ControlCenter: {
                name: "ControlCenter",
                subActualName: "Control Center",
                heroes: {
                    Pharah: 2,
                    Torbjorn: -2,
                    McCree: 2,
                    Widowmaker: -1,
                    Junkrat: 0,
                    Bastion: -1,
                    Genji: 1,
                    Zenyatta: 2,
                    Lucio: 2,
                    Zarya: 2,
                    Mei: 1,
                    Hanzo: 0,
                    Roadhog: 2,
                    Dva: 2,
                    Mercy: 1,
                    Reinhardt: 2,
                    Reaper: 2,
                    Tracer: 2,
                    Ana: 2,
                    Winston: 2,
                    Soldier76: 1,
                    Symmetra: -2
                }
            },
            Garden: {
                name: "Garden",
                subActualName: "Garden",
                heroes: {
                    Pharah: 1,
                    Torbjorn: -1,
                    McCree: 2,
                    Widowmaker: -1,
                    Junkrat: 0,
                    Bastion: 0,
                    Genji: 1,
                    Zenyatta: 2,
                    Lucio: 2,
                    Zarya: 2,
                    Mei: 2,
                    Hanzo: 0,
                    Roadhog: 2,
                    Dva: 1,
                    Mercy: 1,
                    Reinhardt: 2,
                    Reaper: 2,
                    Tracer: 2,
                    Ana: 2,
                    Winston: 1,
                    Soldier76: 1,
                    Symmetra: -2
                }
            },
            NightMarket: {
                name: "NightMarket",
                subActualName: "Night Market",
                heroes: {
                    Pharah: 2,
                    Torbjorn: -1,
                    McCree: 1,
                    Widowmaker: -1,
                    Junkrat: 1,
                    Bastion: -1,
                    Genji: 1,
                    Zenyatta: 1,
                    Lucio: 2,
                    Zarya: 2,
                    Mei: 2,
                    Hanzo: 0,
                    Roadhog: 2,
                    Dva: 1,
                    Mercy: 0,
                    Reinhardt: 1,
                    Reaper: 2,
                    Tracer: 2,
                    Ana: 2,
                    Winston: 2,
                    Soldier76: 1,
                    Symmetra: -2
                }
            }
        },
        attackHeroes: {},
        defenseHeroes: {}
    },
    {
        name: "Nepal",
        actualName: "Nepal",
        mapType: "Control",
        subMaps: {
            Sanctum: {
                name: "Sanctum",
                subActualName: "Sanctum",
                heroes: {
                    Pharah: 2,
                    Torbjorn: -2,
                    McCree: 1,
                    Widowmaker: -1,
                    Junkrat: 2,
                    Bastion: -1,
                    Genji: 1,
                    Zenyatta: 1,
                    Lucio: 2,
                    Zarya: 2,
                    Mei: 2,
                    Hanzo: 0,
                    Roadhog: 2,
                    Dva: 2,
                    Mercy: 1,
                    Reinhardt: 1,
                    Reaper: 2,
                    Tracer: 2,
                    Ana: 2,
                    Winston: 2,
                    Soldier76: 1,
                    Symmetra: -2
                }
            },
            Temple: {
                name: "Temple",
                subActualName: "Temple",
                heroes: {
                    Pharah: 1,
                    Torbjorn: -1,
                    McCree: 2,
                    Widowmaker: 0,
                    Junkrat: 1,
                    Bastion: 0,
                    Genji: 1,
                    Zenyatta: 2,
                    Lucio: 2,
                    Zarya: 2,
                    Mei: 2,
                    Hanzo: 0,
                    Roadhog: 2,
                    Dva: 2,
                    Mercy: 0,
                    Reinhardt: 1,
                    Reaper: 2,
                    Tracer: 2,
                    Ana: 2,
                    Winston: 2,
                    Soldier76: 1,
                    Symmetra: -2
                }
            },
            Village: {
                name: "Village",
                subActualName: "Village",
                heroes: {
                    Pharah: 1,
                    Torbjorn: -1,
                    McCree: 2,
                    Widowmaker: -1,
                    Junkrat: 2,
                    Bastion: -1,
                    Genji: 1,
                    Zenyatta: 2,
                    Lucio: 2,
                    Zarya: 2,
                    Mei: 2,
                    Hanzo: 0,
                    Roadhog: 2,
                    Dva: 2,
                    Mercy: 1,
                    Reinhardt: 2,
                    Reaper: 2,
                    Tracer: 2,
                    Ana: 2,
                    Winston: 2,
                    Soldier76: 1,
                    Symmetra: -1
                }
            }
        },
        attackHeroes: {},
        defenseHeroes: {}
    },
    {
        name: "Numbani",
        actualName: "Numbani",
        mapType: "Hybrid",
        subMaps: {},
        attackHeroes: {
            Pharah: 1,
            Torbjorn: 0,
            McCree: 2,
            Widowmaker: 1,
            Junkrat: 2,
            Bastion: 1,
            Genji: 0,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 2,
            Hanzo: 2,
            Roadhog: 2,
            Dva: 1,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 1,
            Tracer: 1,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: 1
        },
        defenseHeroes: {
            Pharah: 2,
            Torbjorn: -1,
            McCree: 2,
            Widowmaker: 2,
            Junkrat: 1,
            Bastion: 0,
            Genji: 1,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 1,
            Hanzo: 1,
            Roadhog: 1,
            Dva: 2,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 2,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: -1
        }
    },
    {
        name: "Route66",
        actualName: "Route 66",
        mapType: "Escort",
        subMaps: {},
        attackHeroes: {
            Pharah: 1,
            Torbjorn: 1,
            McCree: 2,
            Widowmaker: 1,
            Junkrat: 1,
            Bastion: 0,
            Genji: 0,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 2,
            Hanzo: 2,
            Roadhog: 2,
            Dva: 2,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 1,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: 0
        },
        defenseHeroes: {
            Pharah: 2,
            Torbjorn: -1,
            McCree: 2,
            Widowmaker: 0,
            Junkrat: 1,
            Bastion: 0,
            Genji: 1,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 1,
            Hanzo: 2,
            Roadhog: 2,
            Dva: 1,
            Mercy: 1,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 1,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: -1
        }
    },
    {
        name: "Anubis",
        actualName: "Temple of Anubis",
        mapType: "Assault",
        subMaps: {},
        attackHeroes: {
            Pharah: 1,
            Torbjorn: 1,
            McCree: 2,
            Widowmaker: 1,
            Junkrat: 2,
            Bastion: 1,
            Genji: 0,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 1,
            Hanzo: 1,
            Roadhog: 2,
            Dva: 2,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 1,
            Tracer: 0,
            Ana: 2,
            Winston: 1,
            Soldier76: 1,
            Symmetra: 1
        },
        defenseHeroes: {
            Pharah: 1,
            Torbjorn: -2,
            McCree: 2,
            Widowmaker: 0,
            Junkrat: 0,
            Bastion: -1,
            Genji: 1,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 2,
            Hanzo: 0,
            Roadhog: 1,
            Dva: 2,
            Mercy: 1,
            Reinhardt: 2,
            Reaper: 1,
            Tracer: 1,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: -2
        }
    },
    {
        name: "Volskaya",
        actualName: "Volskaya Industries",
        mapType: "Assault",
        subMaps: {},
        attackHeroes: {
            Pharah: 1,
            Torbjorn: 1,
            McCree: 2,
            Widowmaker: 1,
            Junkrat: 2,
            Bastion: 1,
            Genji: 0,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 2,
            Hanzo: 2,
            Roadhog: 2,
            Dva: 1,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 1,
            Tracer: 0,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: 1
        },
        defenseHeroes: {
            Pharah: 1,
            Torbjorn: -2,
            McCree: 1,
            Widowmaker: 1,
            Junkrat: 1,
            Bastion: -2,
            Genji: 1,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 1,
            Hanzo: 0,
            Roadhog: 1,
            Dva: 2,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 1,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: -2
        }
    },
    {
        name: "Gibraltar",
        actualName: "Watchpoint: Gibraltar",
        mapType: "Escort",
        subMaps: {},
        attackHeroes: {
            Pharah: 1,
            Torbjorn: 1,
            McCree: 2,
            Widowmaker: 1,
            Junkrat: 2,
            Bastion: 1,
            Genji: 0,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 1,
            Hanzo: 2,
            Roadhog: 1,
            Dva: 1,
            Mercy: 2,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 0,
            Ana: 2,
            Winston: 1,
            Soldier76: 1,
            Symmetra: 0
        },
        defenseHeroes: {
            Pharah: 1,
            Torbjorn: -1,
            McCree: 2,
            Widowmaker: 0,
            Junkrat: 0,
            Bastion: 0,
            Genji: 1,
            Zenyatta: 2,
            Lucio: 2,
            Zarya: 2,
            Mei: 1,
            Hanzo: 1,
            Roadhog: 2,
            Dva: 2,
            Mercy: 1,
            Reinhardt: 2,
            Reaper: 2,
            Tracer: 2,
            Ana: 2,
            Winston: 2,
            Soldier76: 1,
            Symmetra: -2
        }
    }
];


//Increments by 1 the Hero by the counterWeight
function incrementHeroByName(_hero, amount) {
    heroData.filter(function (val, index, array) {
        return val.name === _hero;
    })[0].score = heroData.filter(function (val, index, array) {
        return val.name === _hero;
    })[0].score + amount;
}

//Decrements by 1 the hero by the counterWeight
function decrementHeroByName(_hero, amount) {
    heroData.filter(function (val, index, array) {
        return val.name === _hero;
    })[0].score = heroData.filter(function (val, index, array) {
        return val.name === _hero;
    })[0].score - amount;

    var heroScore = heroData.filter(function (val, index, array) {
        return val.name === _hero;
    })[0].score;
}

//Returns an array of strings of all the hero weaknesses
function getHeroWeaknessesByName(_hero) {
    return heroData.filter(function (val, index, array) {
        return val.name === _hero;
    })[0].weaknesses;
}

//Returns an array of strings of all the hero strengths
function getHeroStrengthsByName(_hero) {
    return heroData.filter(function (val, index, array) {
        return val.name === _hero;
    })[0].strengths;
}

//Returns the mapType as a string
function getMapTypeByName(_map) {
    return mapData.filter(function (val, index, array) {
        return val.name === _map;
    })[0].mapType;
}

var previousMap = ""
    //Get all the heroes good on the map
function getMapHeroesByName(_map) {
    if (_map != null) { //If map is not null
        var mapType = getMapTypeByName(_map);
        var mapIsAttack = document.getElementById("attack").checked;
        var subMaps = mapData.filter(function (val, index, array) {
            return val.name === _map;
        })[0].subMaps;
        var subMapLength = document.getElementById("subMapDropdown").length;
        var subMapDropdown = document.getElementById("subMapDropdown");
        var selectedSubMap = subMapDropdown.options[subMapDropdown.selectedIndex].value;
        $('#subMapDropdown').empty();
        $("#subMapDropdown").append("<option value=\"NoSubMap\">Average of all maps</option>");
        for (var subMap in subMaps) {
            var option = document.createElement("option");
            option.value = subMaps[subMap].name;
            option.text = subMaps[subMap].subActualName;
            subMapDropdown.add(option);
        }

        previousMap = _map
        if (mapType == "Control") { //If map is control return the heroes for the subtype
            $("#subMapDropdownContainer").css("display", "block");
            if (selectedSubMap != "NoSubMap")
                return subMaps[selectedSubMap].heroes;
            else { //Figure out the average score for each hero
                console.log(subMapDropdown.options)
                var averageArray = subMaps[subMapDropdown.options[1].value].heroes;
                var first = true;
                for (subMap in subMaps) {
                    if (!first) {
                        var tempArray = subMaps[subMap].heroes;
                        for (hero in tempArray) {
                            averageArray[hero] += tempArray[hero]
                        }
                    }
                    first = false;
                }
                for (score in averageArray)
                    averageArray[score] = averageArray[score] / 3
                return averageArray;
            }
        }
        else if (mapIsAttack) //If attack is selected
            return mapData.filter(function (val, index, array) {
                return val.name === _map;
            })[0].attackHeroes;
        else //If defense.
            return mapData.filter(function (val, index, array) {
                return val.name === _map;
            })[0].defenseHeroes;
    } else
        return [];
}

//Returns an array of six heroes as objects sorted by score
function getTopSixHeroesArray() {
    return heroData.sort(function (a, b) {
        return a.score - b.score;
    }).reverse().slice(0, 6);
}

//Returns an array of objects filled with all heroes sorted by score from highest to lowest
function getAllHeroesArray() {
    return heroData.sort(function (a, b) {
        return a.score - b.score;
    }).reverse();
}

//Returns an object of the selected hero
function getHeroByName(_hero) {
    return heroData.filter(function (val, index, array) {
        return val.name === _hero;
    })[0];
}

//Returns all heroes of a given role as an array of objects
function getSortedRoleByName(roleToSearch){
    var tempArray = new Array();
    if (roleToSearch)
        heroData.forEach(function (hero, index){
            if(hero.role == roleToSearch)
                tempArray.push(hero)
        });
    return tempArray;
}

//Returns an array of objects of all heroes marked as healers
function getHealersArray() {
    var tempArray = new Array();
    heroData.forEach(function (hero, index){
        if(hero.healer)
            tempArray.push(hero)
    });
    return tempArray;
}

//Testing, logs to the console all the hero's scores
function printEachHeroScore(){
    console.log("");
    for (var i = 0; i < heroData.length; i++)
        console.log(heroData[i].name + "'s score: " + heroData[i].score);
}
