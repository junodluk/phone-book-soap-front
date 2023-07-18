/* eslint-disable react/require-default-props */
import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, DefaultValues, Path } from "react-hook-form";
import InputMaskComponent from "react-input-mask";

interface InputParams {
    onBlurEvent?: () => Promise<any>;
}

export const Input = React.forwardRef(({ variant, onBlurEvent, ...rest }: InputParams & TextFieldProps, ref) => (
    <TextField {...rest} variant={variant || "outlined"} onBlur={onBlurEvent} inputRef={ref} />
));

type Props<T> = {
    control: Control<T>;
    name: Path<T>;
    mask: string;
    defaultValue?: DefaultValues<T>;
    children: JSX.Element;
    disabled?: boolean;
};

export const InputMask: <T extends {}>({
    mask,
    control,
    name,
    defaultValue,
    children,
    disabled,
}: Props<T>) => JSX.Element = <T extends {}>({ mask, control, name, defaultValue, children, disabled }: Props<T>) => (
    <Controller
        control={control}
        name={name}
        defaultValue={defaultValue || ""}
        render={({ field }) => (
            <InputMaskComponent
                ref={field.ref}
                onChange={(e) => field.onChange(e)}
                onInput={(e) => field.onChange(e)}
                disabled={disabled}
                name={field.name}
                mask={mask}
                value={(field.value as never) || ""}
            >
                {(inputProps: JSX.IntrinsicAttributes & TextFieldProps) =>
                    React.cloneElement(children, { ...inputProps })
                }
            </InputMaskComponent>
        )}
    />
);
