import { readFileSync } from "node:fs";

const data = readFileSync("data.txt", {encoding: "utf-8" })
      .replace(/\r/g, "")
      .trim()
      .split("\n");

interface Hand {
    cards: string;
    bet: number;
    label: Label;
};

enum Label {
    FiveOfaKind,
    FourOfAKind,
    FullHouse,
    ThreeOfAKind,
    TwoPair,
    OnePair,
    HighCard
}

const cardValues = (joker: boolean = false): Record<string, number> => ({
    A: 14,
    K: 13,
    Q: 12,
    J: joker ? 1 : 11,
    T: 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
});

function identifyHandLabel(cards: string, joker: boolean = false): Label {
    let valueCounts = cards.split('').reduce((acc: { [key: string]: number }, card) => {
        acc[card] = (acc[card] || 0) + 1;
        return acc;
    }, {});

    if (Object.values(valueCounts).filter((count) => count == 5).length == 1) {
        return Label.FiveOfaKind;
    } else if (Object.values(valueCounts).filter((count) => count == 4).length == 1) {
        if(valueCounts['J'] >= 1) return Label.FiveOfaKind;
        return Label.FourOfAKind;
    } else if (Object.values(valueCounts).filter((count) => count == 3).length == 1) {
        if(valueCounts['J'] == 1) return Label.FourOfAKind;
        if(valueCounts['J'] == 2) return Label.FiveOfaKind;
        if(valueCounts['J'] == 3) return Object.values(valueCounts).filter((count) => count == 2).length == 1 ? Label.FiveOfaKind : Label.FourOfAKind;
        return Object.values(valueCounts).filter((count) => count == 2).length == 1 ? Label.FullHouse : Label.ThreeOfAKind;
    } else if (Object.values(valueCounts).filter((count) => count == 2).length == 2) {
        if(valueCounts['J'] == 1) return Label.FullHouse;
        if(valueCounts['J'] == 2) return Label.FourOfAKind;
        return Label.TwoPair
    } else if (Object.values(valueCounts).filter((count) => count == 2).length == 1) {
        if(valueCounts['J'] >= 1) return Label.ThreeOfAKind;
        return Label.OnePair;
    } else {
        if(valueCounts['J'] == 1) return Label.OnePair;
        return Label.HighCard;
    }
}

function mapDataToHands(data: string[], joker: boolean = false) {
    let hands = data.map((handString) => {
        const [cardsString, betString] = handString.split(" ");

        return {
            cards: cardsString,
            bet: Number(betString),
            label: identifyHandLabel(cardsString, joker)
        };
    }).sort((a, b) => {
        if(a.label < b.label) return 1;
        if(a.label > b.label) return -1;
        for(let i:number = 0; i < a.cards.length; i++){
            if(cardValues(joker)[a.cards[i]] < cardValues(joker)[b.cards[i]]) return -1;
            if(cardValues(joker)[a.cards[i]] > cardValues(joker)[b.cards[i]]) return 1;
        }
        return 0;
    });
    let total = 0;
    hands.forEach((a) => total += a.bet * (hands.indexOf(a) + 1));
    console.log(total);
}

function part1() {
    mapDataToHands(data);
}
function part2(){
    mapDataToHands(data, true);
}

part1();
part2();
