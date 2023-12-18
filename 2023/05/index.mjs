import { readFileSync } from "node:fs";

const file = readFileSync("data.txt", {encoding: "utf-8" })
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

let ranges = {
    seed: [],
    soil: [],
    fertilizer: [],
    water: [],
    light: [],
    temperature: [],
    humidity: [],
    location: []
};

let map2 = maps['seeds'].flatMap(x => x);
for (let i = 0; i < map2.length; i += 2) {
    ranges.seed.push({
        start: map2[i],
        end: map2[i] + map2[i + 1] - 1
    });
}

function part1()
{
    for(let seed in seeds)
    {
        for(let map in maps)
        {
            if(map == 'seeds') break;
            let source = map.match(/^(\w+)/)[0];
            let destination = map.match(/(\w+)$/)[0];
            seeds[seed][destination] = seeds[seed][source];

            for(let entry of maps[map])
            {
                if(seeds[seed][source] >= entry[1] &&
                   seeds[seed][source] <= entry[1] + entry[2] - 1)
                {
                    seeds[seed][destination] =
                        seeds[seed][source] - entry[1] + entry[0];
                    break;
                }
            }
        }
    }
    let closest;
    for(let seed in seeds)
    {
        if(seeds[seed].location < closest || closest == null)
            closest = seeds[seed].location;
    }
    console.log(closest);
}

function mapAll(src, dest) {
    let map = maps[src + '-to-' + dest];

    ranges[src].forEach(entry => {
        let entered = false;

        for (let line of map) {
            if (entry.start < line[1] &&
                entry.end >= line[1] &&
                entry.end <= line[1] + line[2] - 1) {
                let range = { start: line[0], end: line[0] + entry.end - line[1] };
                if (ranges[dest].find(obj => obj.start == range.start && obj.end == range.end)) break;
                ranges[dest].push(range);
                entered = true;
                mapMore({ start: entry.start, end: line[1] - 1 }, dest, map);
            }
            else if (entry.start >= line[1] &&
                entry.start <= line[1] + line[2] - 1 &&
                entry.end >= line[1] + line[2]) {
                let range = { start: line[0] + entry.start - line[1], end: line[0] + line[2] - 1};
                if (ranges[dest].find(obj => obj.start == range.start && obj.end == range.end)) break;
                ranges[dest].push(range);
                entered = true;
                mapMore({ start: line[1] + line[2], end: entry.end }, dest, map);
            }
            else if (entry.start >= line[1] &&
                entry.end < line[1] + line[2]) {
                let range = { start: line[0] + entry.start - line[1], end: line[0] - line[1] + entry.end};
                if (ranges[dest].find(obj => obj.start == range.start && obj.end == range.end)) break;
                ranges[dest].push(range);
                entered = true;
            }
            else if (entry.start < line[1] &&
                entry.end >= line[1] + line[2]) {
                let range = { start: line[0], end: line[0] + line[2] - 1 };
                if (ranges[dest].find(obj => obj.start == range.start && obj.end == range.end)) break;
                ranges[dest].push(range);
                entered = true;
                mapMore({ start: entry.start, end: line[1] - 1 }, dest, map);
                mapMore({ start: line[1] + line[2], end: entry.end}, dest, map);
            }
        }
        if(!entered) ranges[dest].push(entry);
    });
}

function mapMore(entry,dest,map){
    let entered = false;
    for(let line of map) {
        if (entry.start < line[1] &&
            entry.end >= line[1] &&
            entry.end <= line[1] + line[2] - 1) {
            let range = { start: line[0], end: line[0] + entry.end - line[1] };
            if (ranges[dest].find(obj => obj.start == range.start && obj.end == range.end)) break;
            ranges[dest].push(range);
            mapMore({ start: entry.start, end: line[1] - 1 }, dest, map);
            entered = true;
        } else if (entry.start >= line[1] &&
            entry.start <= line[1] + line[2] - 1 &&
            entry.end >= line[1] + line[2]) {
            let range = { start: line[0] + entry.start - line[1], end: line[0] + line[2] - 1};
            if (ranges[dest].find(obj => obj.start == range.start && obj.end == range.end)) break;
            ranges[dest].push(range);
            mapMore({ start: line[1] + line[2], end: entry.end }, dest, map);
            entered = true;
        } else if (entry.start >= line[1] &&
            entry.end < line[1] + line[2]) {
            let range = { start: line[0] + entry.start - line[1], end: line[0] - line[1] + entry.end};
            if (ranges[dest].find(obj => obj.start == range.start && obj.end == range.end)) break;
            ranges[dest].push(range);
            entered = true;
        } else if (entry.start < line[1] &&
            entry.end >= line[1] + line[2]) {
            let range = { start: line[0], end: line[0] + line[2] - 1 };
            if (ranges[dest].find(obj => obj.start == range.start && obj.end == range.end)) break;
            ranges[dest].push(range);
            mapMore({ start: entry.start, end: line[1] - 1 }, dest, map);
            mapMore({ start: line[1] + line[2], end: entry.end}, dest, map);
            entered = true;
        }
    }
    if (!entered) ranges[dest].push(entry);
}

function part2(){
    mapAll("seed", "soil");
    mapAll("soil", "fertilizer");
    mapAll("fertilizer", "water");
    mapAll("water", "light");
    mapAll("light", "temperature");
    mapAll("temperature", "humidity");
    mapAll("humidity", "location");

    let lowest;
    for(let location of ranges.location)
        if(location.start < lowest || lowest == null) lowest = location.start;

    console.log(ranges);
    console.log(lowest);
}


part1();
part2();

