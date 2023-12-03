import run from "aocrunner";
import {getGearsFromLine} from "../utils/donottouch.js";

const hasSymbol = (char) => /[^\d\.]/.test(char);

const hasNumber = (char) => [...char.matchAll(/\d+/g)]
const parseInput = (rawInput: string) => {
    const lines = rawInput.split('\n')
    return lines;
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let partsSum = 0;
    input.forEach((line, index) => {
        const matches = [...line.matchAll(/\d+/g)];
        matches.forEach((potentialPartNumber, j) => {
            const partSize = potentialPartNumber[0].length;
            const partIndex = potentialPartNumber['index'];

            const adjacentToSymbolInLine = (partIndex - 1 >= 0 ? hasSymbol(line[partIndex - 1]) : false) || (partIndex + partSize < line.length ? hasSymbol(line[partIndex + partSize]) : false);
            const adjacentAbove = index - 1 >= 0 ? hasSymbol(input[index - 1].substring(partIndex - 1 || 0, partIndex + partSize + 1 < line.length ? partIndex + partSize + 1 : undefined)) : false;
            const adjacentBelow = index + 1 < input.length ? hasSymbol(input[index + 1].substring(partIndex - 1 || 0, partIndex + partSize + 1 < line.length ? partIndex + partSize + 1 : undefined)) : false;
            const adjacentToSymbol = adjacentToSymbolInLine || adjacentAbove || adjacentBelow;

            if (adjacentToSymbol) {
                partsSum += Number(potentialPartNumber[0]);
            }
        })
    })
    return partsSum;
};

const part2Old = (rawInput: string) => {
    const input = parseInput(rawInput);
    let gearsSum = 0;
    input.forEach((line, index) => {
        const matches = [...line.matchAll(/\*/g)];
        matches.forEach((potentialGear, j) => {
            const gearSize = 1;
            const gearIndex = potentialGear['index'];

            const adjacentToSymbolInStartLine = (gearIndex - 1 >= 0 ? hasNumber(line[gearIndex - 1]) : []);
            const adjacentToSymbolInEndLine = (gearIndex + gearSize < line.length ? hasNumber(line[gearIndex + gearSize]) : []);
            const adjacentAbove = index - 1 >= 0 ? hasNumber(input[index - 1].substring(gearIndex - 1 || 0, gearIndex + gearSize + 1 < line.length ? gearIndex + gearSize + 1 : undefined)) : [];
            const adjacentBelow = index + 1 < input.length ? hasNumber(input[index + 1].substring(gearIndex - 1 || 0, gearIndex + gearSize + 1 < line.length ? gearIndex + gearSize + 1 : undefined)) : [];
            const adjacentToSymbol = [...adjacentToSymbolInStartLine, ...adjacentToSymbolInEndLine, ...adjacentAbove, ...adjacentBelow];

            if (adjacentToSymbol.length === 2) {
                let gears = [];
                if (adjacentToSymbolInStartLine.length > 0) {
                    gears.push(line.substring(gearIndex - 3 || 0, gearIndex).match(/\d+/).pop());
                }
                if (adjacentToSymbolInEndLine.length > 0) {
                    gears.push(line.substring(gearIndex + 1, gearIndex + 4 < line.length ? gearIndex + 4 : undefined).match(/\d+/)[0]);
                }
                if (adjacentAbove.length > 0) {
                    const aboveLine = input[index - 1];
                    adjacentAbove.forEach((match) => {
                        // On a match déjà le nombre en entier
                        if (match[0].length === 3) {
                            gears.push(match[0]);
                        } else {
                            // les chiffres au dessus du symbol
                            const gear = aboveLine.substring(gearIndex - 3 || 0, gearIndex + 4 < aboveLine.length ? gearIndex + 4 : undefined).match(/\d+/g).filter(g => g.includes(match[0]))
                            console.log(gear)
                            gears.push(gear[0]);
                        }
                    })

                }
                if (adjacentBelow.length > 0) {
                    const belowLine = input[index + 1];
                    adjacentBelow.forEach(match => {
                        // On a match déjà le nombre en entier
                        if (match[0].length === 3) {
                            gears.push(match[0])
                        } else {
                            // les chiffres en dessous du symbol
                            const gear = belowLine.substring(gearIndex - 3 || 0, gearIndex + 4 < belowLine.length ? gearIndex + 4 : undefined).match(/\d+/g).filter(g => g.includes(match[0]));
                            console.log(gear)
                            gears.push(gear[0]);
                        }
                    })

                }
                // console.log({gears})
                gearsSum += gears[0] * gears[1];
            }
        })
    })
    return gearsSum;
};
const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let gearsSum = 0;
    input.forEach((line, index) => {
        const matches = [...line.matchAll(/\*/g)];
        matches.forEach((potentialGear) => {
            const gearIndex = potentialGear['index'];

            const adjacentToSymbolInStartLine = /\d/.test(line[gearIndex - 1]) ? hasNumber(line.substring(gearIndex - 3 >= 0 ? gearIndex - 3 : 0, gearIndex))?.pop() || [] : [];
            const adjacentToSymbolInEndLine = /\d/.test(line[gearIndex + 1]) ? hasNumber(line.substring(gearIndex + 1, gearIndex + 4 <= line.length ? gearIndex + 4 : undefined))?.[0] || [] : [];

            const adjacentAbove = getGearsFromLine(input[index - 1], gearIndex);
            const adjacentBelow = getGearsFromLine(input[index + 1], gearIndex);
            const adjacentToSymbol = [...adjacentToSymbolInStartLine, ...adjacentToSymbolInEndLine, ...adjacentAbove, ...adjacentBelow];


            if (adjacentToSymbol.length === 2) {
                gearsSum += adjacentToSymbol[0] * adjacentToSymbol[1];
            }
        })
    })
    return gearsSum;
};

run({
    part1: {
        tests: [
            {
                input: `...*.............................117*...........459........767*648....#.........*...................................$...&..=................
....970.........368.124.+............57................653...........723.....366....*443..60.........536....441....45..879.....789...*......
...........749*...-...+..330.....................215%...*................725.....953........%.................*............639......331.419.`,
                expected: 117 + 767 + 648
                    + 970 + 368 + 124 + 57 + 653 + 723 + 366 + 443 + 60 + 441 + 45 + 879 +
                    749 + 330 + 215 + 953 + 331,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
..362..36.
...$.*.4..
.664.366..`,
                expected: 148837,
            }, {
                input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
..598.755.
...$.*....
.664......`,
                expected: 467835,
            }, {
                input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
..598.....
...$.*755.
.664......`,
                expected: 467835,
            }, {
                input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
..........
...$.*....
..598.755.`,
                expected: 467835,
            }, {
                input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
...3.2.3..
.....*75.
...3...3.`,
                expected: 16495,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
