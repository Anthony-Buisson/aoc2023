//day 3
export const getGearsFromLine = (line: string, gearIndex) => {
    const possibleAdjacentAbove = [];

    if (/\d/.test(line[gearIndex])) {
        if (/\d/.test(line[gearIndex - 1])) {
            if (/\d/.test(line[gearIndex - 2])) {
                possibleAdjacentAbove.push(line[gearIndex - 2] + line[gearIndex - 1] + line[gearIndex])
            } else if (/\d/.test(line[gearIndex + 1])) {
                possibleAdjacentAbove.push(line[gearIndex - 1] + line[gearIndex] + line[gearIndex + 1])
            } else {
                possibleAdjacentAbove.push(line[gearIndex - 1] + line[gearIndex])
            }
        } else if (/\d/.test(line[gearIndex + 1])) {
            if (/\d/.test(line[gearIndex + 2])) {
                possibleAdjacentAbove.push(line[gearIndex] + line[gearIndex + 1] + line[gearIndex + 2])
            } else {
                possibleAdjacentAbove.push(line[gearIndex] + line[gearIndex + 1])
            }
        } else {
            possibleAdjacentAbove.push(line[gearIndex])
        }
    } else if (/\d/.test(line[gearIndex - 1])) {
        if (/\d/.test(line[gearIndex - 2])) {
            if (/\d/.test(line[gearIndex - 3])) {
                possibleAdjacentAbove.push(line[gearIndex - 3] + line[gearIndex - 2] + line[gearIndex - 1])
            } else {
                possibleAdjacentAbove.push(line[gearIndex - 2] + line[gearIndex - 1])
            }
        } else {
            possibleAdjacentAbove.push(line[gearIndex - 1])

        }
    } else if (/\d/.test(line[gearIndex + 1])) {
        if (/\d/.test(line[gearIndex + 2])) {
            if (/\d/.test(line[gearIndex + 3])) {
                possibleAdjacentAbove.push(line[gearIndex + 1] + line[gearIndex + 2] + line[gearIndex + 3])
            } else {
                possibleAdjacentAbove.push(line[gearIndex + 1] + line[gearIndex + 2])
            }
        } else {
            possibleAdjacentAbove.push(line[gearIndex + 1])
        }
    }

    // Cas où 2 nombres séparés matchs sur la même ligne
    if (possibleAdjacentAbove.length && !/\d/.test(line[gearIndex]) && /\d/.test(line[gearIndex - 1]) && /\d/.test(line[gearIndex + 1])) {
        if (/\d/.test(line[gearIndex - 2])) {
            if (/\d/.test(line[gearIndex - 3])) {
                if (/\d/.test(line[gearIndex + 2])) {
                    if (/\d/.test(line[gearIndex + 3])) {
                        possibleAdjacentAbove.push(line[gearIndex + 1] + line[gearIndex + 2] + line[gearIndex + 3])
                    } else {
                        possibleAdjacentAbove.push(line[gearIndex + 1] + line[gearIndex + 2])
                    }
                } else {
                    possibleAdjacentAbove.push(line[gearIndex + 1])

                }
            } else if (/\d/.test(line[gearIndex + 2])) {
                if (/\d/.test(line[gearIndex + 3])) {
                    possibleAdjacentAbove.push(line[gearIndex + 1] + line[gearIndex + 2] + line[gearIndex + 3])
                } else {
                    possibleAdjacentAbove.push(line[gearIndex + 1] + line[gearIndex + 2])
                }
            } else {
                possibleAdjacentAbove.push(line[gearIndex + 1])
            }
        } else if (/\d/.test(line[gearIndex + 2])) {
            if (/\d/.test(line[gearIndex + 3])) {
                possibleAdjacentAbove.push(line[gearIndex + 1] + line[gearIndex + 2] + line[gearIndex + 3])
            } else {
                possibleAdjacentAbove.push(line[gearIndex + 1] + line[gearIndex + 2])
            }
        } else {
            possibleAdjacentAbove.push(line[gearIndex + 1])
        }
    }
    return possibleAdjacentAbove;
}
