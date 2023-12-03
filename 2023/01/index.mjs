import { readFileSync } from "node:fs";

const file = readFileSync("data.txt", {encoding: "utf-8" })
.replace(/[a-z]*/g, "")
.trim()
.split("\n");

function part1() {
  let numbers = [];

  for(const line of file){
    if(line.length == 1){
      numbers.push(line + line);
      continue;
    }
    let t = line[0] + line.slice(-1);
    numbers.push(t);
  }
  let total = numbers.map(Number);
  console.log(numbers.at(-1));
  console.dir(total, {'maxArrayLength': null});
  console.log(total.reduce((a, b) => a + b, 0));
}

function part2() {

}

part1();
part2();
