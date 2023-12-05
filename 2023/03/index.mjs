import { readFileSync } from "node:fs";

const file = readFileSync("data.txt", {encoding: "utf-8" })
.replace(/\r/g, "")
.trim()
.split("\n");

const symbolRegex = (/[^0-9\.]/g);
const numRegex = (/\d+/g);

let nums = {};
let symbols = {};

for (let i = 0; i < file.length; i++) {
    let num;
    while ((num = numRegex.exec(file[i])) !== null) {
        num.added = false;
        nums[i] = [...nums[i] || [], num];
    }

    let symbol;
    while ((symbol = symbolRegex.exec(file[i])) !== null) {
        symbols[i] = [...symbols[i] || [], symbol];
    }
}


function part1() {
    let total = 0;

    for(let index in symbols){
        index = parseInt(index);
        for(const symbol of symbols[index]){
            if(index != 0 && nums[index - 1] != null){
                for(const num of nums[index - 1]){
                    if (
                        (num.index >= symbol.index - 1 &&
                         num.index <= symbol.index + 1) ||
                        (num.index + num[0].length - 1 >= symbol.index - 1 &&
                         num.index + num[0].length - 1 <= symbol.index + 1) &&
                         num.added == false
                    ) {
                        total += parseInt(num[0]);
                        num.added = true;
                    }
                }
            }
            if(nums[index] != null){
                for(const num of nums[index]){
                    if (
                        (num.index == symbol.index + 1 ||
                         num.index + num[0].length - 1 == symbol.index - 1) &&
                         num.added == false
                    ) {
                        total += parseInt(num[0]);
                        num.added = true;
                    }

                }
            }
            if (nums[index + 1] != null) {
                for (const num of nums[index + 1]) {
                    if (
                        (num.index >= symbol.index - 1 &&
                            num.index <= symbol.index + 1) ||
                        (num.index + num[0].length - 1 >= symbol.index - 1 &&
                            num.index + num[0].length - 1 <= symbol.index + 1) &&
                        num.added == false
                    ) {
                        total += parseInt(num[0]);
                        num.added = true;
                    }
                }
            }
        }
    }
    console.log(total);
}

function part2() {
    let total = 0;

    for (let index in symbols) {
        index = parseInt(index);
        for (const symbol of symbols[index]) {
            if(symbol != '*') continue;
            let count = 0;
            let subTotal = 1;
            if (index != 0 && nums[index - 1] != null) {
                for (const num of nums[index - 1]) {
                    if (
                        (num.index >= symbol.index - 1 &&
                            num.index <= symbol.index + 1) ||
                        (num.index + num[0].length - 1 >= symbol.index - 1 &&
                            num.index + num[0].length - 1 <= symbol.index + 1)
                    ) {
                        subTotal *= parseInt(num[0]);
                        count++;
                    }
                }
            }
            if(nums[index] != null){
                for(const num of nums[index]){
                    if (
                        (num.index == symbol.index + 1 ||
                         num.index + num[0].length - 1 == symbol.index - 1)
                    ) {
                        subTotal *= parseInt(num[0]);
                        count++;
                    }

                }
            }
            if (nums[index + 1] != null) {
                for (const num of nums[index + 1]) {
                    if (
                        (num.index >= symbol.index - 1 &&
                            num.index <= symbol.index + 1) ||
                        (num.index + num[0].length - 1 >= symbol.index - 1 &&
                            num.index + num[0].length - 1 <= symbol.index + 1)
                    ) {
                        subTotal *= parseInt(num[0]);
                        count++;
                    }
                }
            }
            if(count == 2) total += subTotal;
        }
    }
    console.log(total);
}

part1();
part2();
