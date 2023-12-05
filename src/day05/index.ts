import run from "aocrunner";

const parseInput = (rawInput: string) => {
    const steps = rawInput.split(/[a-z- ]+\:/);
    const seeds = steps[1].split(/\D+/).filter(s => Number(s)).map(s => Number(s));
    const maps = [];
    for (let i = 1; i < steps.length; i++) {
        maps.push(steps[i].split('\n').map(s => s.split(' ').map(s => Number(s))).filter(s => s.length > 2))
    }
    return {seeds, maps}
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    // Pour chaque étape de transformation
    input.maps.forEach(map => {
        // Pour chaque transformation
        let transformations = []
        map.forEach(transformLine => {
            // On cherche les seeds a map
            input.seeds.forEach((seed, index) => {
                if (seed >= transformLine[1] && seed <= transformLine[1] + transformLine[2] - 1) {
                    transformations[index] = seed + (transformLine[0] - transformLine[1])
                }
            })
        })
        input.seeds = input.seeds.map((seed, index) =>
            transformations[index] ? transformations[index] : seed
        )
    })
    return Math.min(...input.seeds);
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let minLocation = Infinity;

    for (let i = 0; i < input.seeds.length - 1; i += 2) {
        for (let j = 0; j < input.seeds[i + 1] - 1; j++) {
            let stepState = input.seeds[i] + j;
            // Pour chaque étape de transformation
            input.maps.forEach(map => {
                // Pour chaque transformation
                let newStepState;
                map.forEach(transformLine => {
                    // On cherche les seeds a map
                    if (stepState >= transformLine[1] && stepState <= transformLine[1] + transformLine[2] - 1) {
                        newStepState = stepState + (transformLine[0] - transformLine[1])
                    }
                })
                stepState = newStepState ?? stepState;
            })
            if (stepState < minLocation) {
                minLocation = stepState
            }
        }
    }
    return minLocation;
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
