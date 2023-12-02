import run from "aocrunner";

const maxCubes = {
  red: 12,
  blue: 14,
  green: 13,
}
const matchId = /Game \d+: /;
const matchRed = /\d+ red/;
const matchGreen = /\d+ green/;
const matchBlue = /\d+ blue/;
const parseInput = (rawInput: string) => {
  const lines = rawInput.split('\n');
  const games = [];
  lines.forEach(line=> {
    const rawGameRounds = line.replace(matchId,'').split(';');
    const gameRounds = rawGameRounds.map(round=> ({
      red: round.match(matchRed) ? Number(round.match(matchRed)[0].trim().replace(' red', '')) : 0,
      green: round.match(matchGreen) ? Number(round.match(matchGreen)[0].trim().replace(' green', '')) : 0,
      blue: round.match(matchBlue) ? Number(round.match(matchBlue)[0].trim().replace(' blue', '')) : 0
    }))
    games.push({
      id: Number(line.match(matchId)[0].replace(/\D/g, '')),
     rounds: gameRounds
    })
  })
  return games
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, game) => {
    let isValid = true;
    game.rounds.forEach(round=> {
      if(round.red >maxCubes.red) isValid = false;
      if(round.green >maxCubes.green) isValid = false;
      if(round.blue >maxCubes.blue) isValid = false;
    })
    return isValid ? acc + game.id : acc
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, game) => {
    let blue = game.rounds[0].blue;
    let red = game.rounds[0].red;
    let green = game.rounds[0].green;
    game.rounds.forEach(round=> {
      if(round.red > red) red = round.red;
      if(round.green > green) green = round.green;
      if(round.blue > blue) blue = round.blue;
    })
    return  acc + (blue*red*green)
  }, 0);
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
