export function evalEnv(statusValues) {
    const level = ["Không tốt", "Tốt", "Rất tốt"];
    if (statusValues[0] && statusValues[1] && statusValues[2] && statusValues[3])
        return level[1];
    return level[1];
}