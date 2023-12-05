import { readFileSync } from "node:fs";

const file = readFileSync("data.txt", {encoding: "utf-8" })
.replace(/\r/g, "")
.trim()
.split("\n");

let data = parseData(file);
let games = Object.keys(data);

function parseData(data) {
    let parsedData = {};

    for (const game of data) {
        const gameNumber = parseInt(game
                                    .split(':')[0]
                                    .trim()
                                    .split(' ')[1]);
        const rounds = game
              .split(':')[1]
              .trim()
              .split(';');
        parsedData[gameNumber] = {};

        parsedData[gameNumber]['red'] = 0;
        parsedData[gameNumber]['green'] = 0;
        parsedData[gameNumber]['blue'] = 0;


        for (const round of rounds) {
            const parsedRound = round
                  .trim()
                  .split(',')
                  .map((round) => round.trim().split(' '));
            for(let i = 0; i < parsedRound.length; i++){
                const color = parsedRound[i][1];
                const count = parseInt(parsedRound[i][0]);
                if(parsedData[gameNumber][color] < count)
                    parsedData[gameNumber][color] = count;
            }
        }
    }
    return parsedData;
}

function part1() {
    let total = 0;
   
    games.forEach(game => {
        if(data[game]['blue'] <= 14 &&
           data[game]['green'] <= 13 &&
           data[game]['red'] <= 12){
            total += parseInt(game);
        }
    });
    console.log(total);
}

function part2() {
    let total = 0;

    games.forEach(game => {
        total += (data[game]['blue'] * data[game]['green'] * data[game]['red']);
    });

    console.log(total);
}

part1();
part2();
