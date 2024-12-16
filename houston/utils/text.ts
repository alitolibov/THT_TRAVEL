export function stringToMask(val: string): Array<string | RegExp> {
    // '+### (##) ###-##-##'
    const res = [];
    for (let i = 0; i < val.length; i++) {
        const char = val.charAt(i);
        switch (char) {
            case '#':
                res.push(/\d/);
                break;
            default:
                res.push(char);
        }
    }
    return res;
}
