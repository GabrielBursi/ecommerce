import { forwardRef } from "react";
import MaskedInput from "react-text-mask";

export const CustomInput = forwardRef<HTMLInputElement, any>((props, ref) => {
    return (
        <MaskedInput {...props} inputRef={ref} />
    );
});