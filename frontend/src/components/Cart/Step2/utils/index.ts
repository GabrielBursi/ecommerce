export function MaskInputCardNumber() {
    return [
        /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/
    ]
}

export function MaskInputValidate() {
    return [
        /[0-1]/, /\d/, "/", /[2-9]/, /[5-9]/
    ]
}

export function MaskInputCvv() {
    return [
        /\d/, /\d/, /\d/
    ]
}

export function MaskInputDate() {
    return [
        /[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /[1-2]/, /\d/, /\d/, /\d/, 
    ]
}
export function MaskInputCpf() {
    return [
        /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/
    ]
}