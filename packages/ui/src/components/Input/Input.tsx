import type {
    InputBaseProps,
    InputNumberProps,
    InputPasswordProps,
} from "./Input.types";
import { InputNumber } from "./InputNumber";
import { InputPassword } from "./InputPassword";
import { InputText } from "./InputText";

export const Input = (
    props: InputBaseProps | InputPasswordProps | InputNumberProps,
) => {
    switch (props.type) {
        case "number":
            return <InputNumber {...(props as InputNumberProps)} />;
        case "password":
            return <InputPassword {...(props as InputPasswordProps)} />;
        default:
            return <InputText {...(props as InputBaseProps)} />;
    }
};
