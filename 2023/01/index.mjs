import { readFileSync } from "node:fs";

const file = readFileSync("data.txt", {encoding: "utf-8" })
.replace(/\r/g, "")
.trim()
.split("\n");

const wordNumbers = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9"
};

const wordNumberPattern = new RegExp("(" + Object.keys(wordNumbers).join("|") + ")", "gi");

function addNumbers(array) {
  let numbers = [];

  for(const element of array){
    let number = element.replace(/[a-z]/g,"");
    if(number.length == 1){
      numbers.push(number + number);
      continue;
    }
    numbers.push(number[0] + number.slice(-1));
  }
  return numbers.map(Number).reduce((a, b) => a + b, 0);
}

function part1() {
  console.log(addNumbers(file));
}

function part2() {
  let numbers = [];
  for(const line of file){
    numbers.push(line.replace(wordNumberPattern, (match) => wordNumbers[match.toLowerCase()]).replace(/[a-z]/g,""));
  }
  console.log(addNumbers(numbers));
}

part1();
part2();
