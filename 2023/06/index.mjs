import { readFileSync } from "node:fs";

const data = readFileSync("data.txt", {encoding: "utf-8" })
      .replace(/\r/g, "")
      .trim()
      .split("\n");

function getWins(times, distances){
    let wins = [];
    for (let i = 0; i < times.length; i++) {
        let winCount = 0;
        for (let time = 1; time < times[i]; time++) {
            if (time * (times[i] - time) > distances[i]) winCount++;
        }
        wins.push(winCount);
    }
    return wins.reduce((a, n) => a * n);
}


function part1() {
    let times = data[0].split(/\s+/g).slice(1);
    let distances = data[1].split(/\s+/g).slice(1);

    console.log(getWins(times, distances));
}

function part2() {
    let times = data[0].split(/\s+/g).slice(1).join('');
    let distances = data[1].split(/\s+/g).slice(1).join('');

    console.log(getWins([parseInt(times)],[parseInt(distances)]));
}

part1();
part2();
