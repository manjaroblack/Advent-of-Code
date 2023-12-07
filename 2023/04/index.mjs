import { readFileSync } from "node:fs";

const file = readFileSync("data.txt", {encoding: "utf-8" })
      .replace(/\r/g, "")
      .trim()
      .split("\n")
      .map(line => line.replace('Card ', '').split(": ")
           .flatMap(a => a.split(' | ')
                    .map(b => b.trim().replace(/\s+/g, ' ').split(' ')
                         .map(c => parseInt(c.trim())))));

function part1() {
    let total = 0;
    for(const card of file){
        let count = 0;
        card[2].forEach(num => {
            if(card[1].includes(num)) count++;
        });
        if(count > 0) total += 2**(count - 1);
    }
    console.log(total);
}

function part2() {
    let cards = {};
    for(let i = 1; i <= file.length; i++){
        cards[i] = 1;
    }
    for (let i = 0; i < file.length; i++) {
        for(let j = 1; j <= cards[i + 1]; j++){
            let count = 0;
            file[i][2].forEach(num => {
                if (file[i][1].includes(num)) count++;
            });
            for(count; count > 0; count --) {
                cards[i + 1 + count] += 1;
            }
        }
    }
    console.log(Object.values(cards).reduce((a,b) => a + b));

}

part1();
part2();
