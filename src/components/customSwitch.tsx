import { useState } from "react";
import { FormGroup, Input } from "reactstrap";
import '../css/customswitch.css';

type CustomSwitchProps = {
    initialState: boolean;
    onStateChange: any;
    disabled?: boolean;
}

export default function CustomSwitch({ initialState, onStateChange, disabled }: CustomSwitchProps) {
    const [state, setState] = useState(initialState);

    const onChangeHandler = () => {
        setState(prevState => {
            onStateChange(!prevState);
            return !prevState;
        });
    }

    return (
        <FormGroup switch>
            <Input
                type="switch"
                checked={state}
                disabled={disabled}
                onChange={onChangeHandler}
            />
        </FormGroup>
    )
}