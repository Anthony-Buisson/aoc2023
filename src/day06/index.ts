import run from "aocrunner";

const parseInput = (rawInput: string) => {
    const timeAndDistance = rawInput.match(/(\d+)/g).map(n => Number(n)); // [ ...times, ...distances ]
    return [...timeAndDistance]
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const nbRaces = input.length / 2
    const numberOfWaysToWin = Array(nbRaces).fill(0);
    for (let i = 0; i < nbRaces; i++) {
        for (let j = 1; j < input[i]; j++) {
            if (j * (input[i] - j) > input[i + nbRaces]) {
                numberOfWaysToWin[i] += 1
            }
        }
    }

    return numberOfWaysToWin.reduce((acc, val) => acc * val, 1);
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let numberOfWaysToWin = 1;
    const time = Number(input.slice(0, input.length / 2).reduce((acc, val) => acc + String(val), ''))
    const distance = Number(input.slice(input.length / 2).reduce((acc, val) => acc + String(val), ''))
    for (let i = 0; i < time / 2; i++) {
        if (i * (time - i) > distance) {
            numberOfWaysToWin += 2
        }
    }
    return numberOfWaysToWin;
};

run({
    part1: {
        tests: [
            // {
            //   input: ``,
            //   expected: "",
            // },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            // {
            //   input: ``,
            //   expected: "",
            // },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
