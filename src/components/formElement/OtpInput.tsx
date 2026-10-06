import React, { useRef } from "react";
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Pressable,
} from "react-native";

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
  className?: string;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
  className = "",
}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const digits = Array.from({ length }).map((_, i) => value[i] || "");

  const handleChangeText = (text: string, index: number) => {
    // If user pasted a full code
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length > 1) {
      const newOtp = cleaned.slice(0, length);
      onChange(newOtp);
      const nextIndex = Math.min(newOtp.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const char = cleaned.slice(-1);
    const newChars = [...digits];
    newChars[index] = char;
    const newOtp = newChars.join("");
    onChange(newOtp);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newChars = [...digits];
        newChars[index - 1] = "";
        onChange(newChars.join(""));
      }
    }
  };

  const handleBoxPress = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  return (
    <View
      className={`flex-row justify-between items-center w-full ${className}`}
    >
      {Array.from({ length }).map((_, index) => {
        const isFilled = Boolean(digits[index]);
        const isCurrent =
          digits[index] !== "" ||
          index === digits.findIndex((d) => d === "") ||
          (index === length - 1 && value.length === length);

        return (
          <Pressable
            key={index}
            onPress={() => handleBoxPress(index)}
            className="flex-1 aspect-square max-w-[50px] min-h-[54px] mx-1 bg-raised rounded-[18px] items-center justify-center"
          >
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              value={digits[index]}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={index === 0 ? length : 1}
              selectTextOnFocus
              className="w-full h-full text-center text-primary font-lexend-medium text-heading-md p-0"
              selectionColor="#FF8A3D"
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default OtpInput;
