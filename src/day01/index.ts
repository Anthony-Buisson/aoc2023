import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;
const matchNumber = /one|two|three|four|five|six|seven|eight|nine|\d/;
const mapLetterDigitsToDigitV2 = (s: string) => s.replace(/one|two|three|four|five|six|seven|eight|nine/, (u) => {
    if (u === 'one') return '1';
    if (u === 'two') return '2';
    if (u === 'three') return '3';
    if (u === 'four') return '4';
    if (u === 'five') return '5';
    if (u === 'six') return '6';
    if (u === 'seven') return '7';
    if (u === 'eight') return '8';
    if (u === 'nine') return '9';
})

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const r = input.split('\n');

    const sanitizedInput = r.map(c => {
        const l = c.replace(/\D/g, '').split('');
        const i = l.length > 1 ? String(l[0]) + String(l[l.length - 1]) : String(l[0]) + String(l[0])
        return Number(i)
    })
    return String(sanitizedInput.reduce((acc, r) => acc + r, 0))
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const r = input.split('\n');

    const sanitizedInput = r.map(c => {
        const firstNumber = mapLetterDigitsToDigitV2(c.match(matchNumber)[0])
        let stock = '';
        c.split('').forEach((val, index) => {
            if (c.substring(index).match(matchNumber)?.length)
                stock = c.substring(index).match(matchNumber)[0]
        })
        const lastNumber = mapLetterDigitsToDigitV2(stock);
        return Number(firstNumber + lastNumber)
    })
    return String(sanitizedInput.reduce((acc, r) => acc + r, 0))
};

run({
    part1: {
        tests: [
            {
                input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
                expected: "142",
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
                expected: "281",
            }, {
                input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
                expected: "142",
            }, {
                input: `twone`
                ,
                expected: "21",
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
