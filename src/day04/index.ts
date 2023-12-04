import run from "aocrunner";

const parseInput = (rawInput: string) => {
    const lines = rawInput.split('\n');
    const cards = lines.map((line, index) => {
        const winningNumbers = line.split(' | ')[0].replace(/Card\s+\d+\: /, '').trim().split(/\s+/);
        const playedNumbers = line.split(' | ')[1].trim().split(/\s+/);
        return {index, playedNumbers, winningNumbers}
    })
    return cards;
};

const calcPoint = (input, card) => {
    const wins = card.playedNumbers.filter(n => card.winningNumbers.includes(n));
    let points = 1;
    if (wins.length) {
        wins.forEach((win, i) => {
            points += calcPoint(input, input[card.index + i + 1]);
        })
    }
    return points
}
const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let response = 0;
    input.forEach((card) => {
        const nbWin = card.playedNumbers.filter(n => card.winningNumbers.includes(n)).length;
        if (nbWin) {
            response += 2 ** (nbWin - 1)
        }
    })
    return response;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let response = 0;
    input.forEach((card) => {
        response += calcPoint(input, card)
    })
    return response;
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
