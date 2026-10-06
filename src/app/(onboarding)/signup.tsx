import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import StepperHeader from "@/components/ui/StepperHeader";
import FormSectionHeader from "@/components/ui/FormSectionHeader";
import CustomInput from "@/components/formElement/CustomInput";
import Button from "@/components/ui/Button";
import { Lock, AtSign } from "lucide-react-native";

export default function SignupStepScreen() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const currentStep = 1;
  const totalSteps = 5;

  const handleNext = () => {
    console.log("Next step submitted with:", value);
    router.push("/(onboarding)/otp");
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(onboarding)/welcome");
    }
  };

  return (
    <SafeAreaView className="bg-canvas flex-1 p-6 ">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1 justify-between"
        >
          <View>
            <StepperHeader
              currentStep={currentStep}
              totalSteps={totalSteps}
              onBack={handleBack}
            />

            <View className="mt-8">
              <FormSectionHeader
                caption="Your account"
                title="What’s your mobile or email?"
                description="We’ll send a one-time code to confirm it’s you."
                className={"mt-12 mb-8 "}
              />

              {/* Custom Input */}
              <View className="mt-8">
                <CustomInput
                  label="Mobile or Email"
                  icon={<AtSign size={20} color="#838383" />}
                  placeholder="name@example.com or phone"
                  value={value}
                  onChangeText={setValue}
                  keyboardType="email-address"
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
          </View>

          <View className="mt-auto pt-4">
            <View className="flex-row items-center justify-center gap-1.5 mb-3">
              <Lock size={14} color="#616161" />
              <Text className="text-muted font-lexend-regular text-[12px]">
                No passwords. No inbox noise.
              </Text>
            </View>
            <Button
              variant="tertiary"
              onPress={handleNext}
              showIcon={true}
              disabled={!value.trim()}
            >
              Next
            </Button>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
