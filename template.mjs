import { readFileSync } from "node:fs";

const file = readFileSync("data.txt", {encoding: "utf-8" })
.replace(/\r/g, "")
.trim()
.split("\n\n")
.map(Number);

function part1() {

}

function part2() {

}

part1();
part2();