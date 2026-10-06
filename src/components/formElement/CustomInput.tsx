import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { View, Text, TextInput, TextInputProps, Pressable } from "react-native";

export interface CustomInputProps extends TextInputProps {
  label: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  className?: string;
  onPressContainer?: () => void;
}

export const CustomInput = forwardRef<TextInput, CustomInputProps>(
  (
    {
      label,
      icon,
      rightElement,
      className = "",
      onPressContainer,
      ...inputProps
    },
    ref
  ) => {
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => inputRef.current as TextInput);

    const handlePress = () => {
      inputRef.current?.focus();
      onPressContainer?.();
    };

    return (
      <Pressable
        onPress={handlePress}
        className={`bg-raised rounded-[18px] p-4 flex-row items-center gap-3.5 ${className}`}
      >
        {icon ? (
          <View className="items-center justify-center">{icon}</View>
        ) : null}

        <View className="flex-1 justify-center">
          <Text className="text-secondary font-lexend-regular text-[11px] capitalize tracking-wider mb-1.5">
            {label}
          </Text>
          <TextInput
            ref={inputRef}
            placeholderTextColor="#616161"
            className="text-primary font-lexend-regular text-[16px] p-0 leading-5"
            selectionColor="#FF8A3D"
            autoCapitalize="none"
            {...inputProps}
          />
        </View>

        {rightElement ? (
          <View className="items-center justify-center ml-2">
            {rightElement}
          </View>
        ) : null}
      </Pressable>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
