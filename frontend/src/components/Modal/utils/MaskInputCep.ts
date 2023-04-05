
export function MaskInputCep(value: string) {
    return [
        /[1-9]/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/
    ]
}
