import { readFileSync } from "node:fs";

const file = readFileSync("example.txt", {encoding: "utf-8" })
      .replace(/\r/g, "")
      .trim()
      .split("\n\n")
      .map(line => line.replace(' map', '').replace(/\x20+/g, ' ').trim().split(':')
           .map(a => a.trim().split('\n'))
      );

let maps = {};
for (const map of file) {
    maps[map[0]] = map[1].map(a => a.split(' ').map(b => parseInt(b)));
}

let seeds = {};
for (const map of maps['seeds']) {
    for(let seed of map){
        seeds[seed] = {
            seed: seed,
            soil: seed,
            fertilizer: seed,
            water: seed,
            light: seed,
            temperature: seed,
            humidity: seed,
            location: seed
        };
    }
}

function part1() {
    for(let seed in seeds){
        for(let map in maps){
            if(map == 'seeds') continue;
            let source = map.match(/^(\w+)/)[0];
            let destination = map.match(/(\w+)$/)[0];
            seeds[seed][destination] = seeds[seed][source];

            for(let entry of maps[map]){
                if(seeds[seed][source] >= entry[1] &&
                   seeds[seed][source] <= entry[1] + entry[2]){
                    seeds[seed][destination] =
                        seeds[seed][source] - entry[1] + entry[0];
                    break;
                }
            }
        }
    }
    let closest;
    for(let seed in seeds){
        if(seeds[seed].location < closest || closest == null)
            closest = seeds[seed].location;
    }
    console.log(closest);
}

function part2() {
    let possible = {};
    let possibleLocations = maps['seeds'];

    for(let map in maps){
        if (map == 'seeds') continue;

        let source = map.match(/^(\w+)/)[0];
        possible[source] = [];

        for (let entry of maps[map]) {
            possible[source].push(entry[1]);
        }
    }

    maps['humidity-to-location'].forEach(map => {
        possibleLocations.push(map[0]);
    });

    possibleLocations.push(possible['seed']);

    for(let h in possible[humidity]){
        
    }

    console.log(possible);
}

part1();
part2();
