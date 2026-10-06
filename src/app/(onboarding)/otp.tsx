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
import OtpInput from "@/components/formElement/OtpInput";
import Button from "@/components/ui/Button";
import { Check } from "lucide-react-native";

export default function OtpVerificationScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const currentStep = 2;
  const totalSteps = 5;

  const handleNext = () => {
    console.log("OTP submitted:", otp);
    router.push("/(onboarding)/profile");
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(onboarding)/signup");
    }
  };

  const handleResend = () => {
    console.log("Resending OTP code");
  };

  return (
    <SafeAreaView className="bg-canvas flex-1 p-6">
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
                caption="Check your email"
                title="Enter your code"
                description="We sent a 6-digit code to alex@ridge.cc."
                className="mt-12 mb-8"
              />

              {/* 6-digit OTP Box Input */}
              <View className="mt-4">
                <OtpInput length={6} value={otp} onChange={setOtp} />
              </View>

              {/* Resend row */}
              <View className="flex-row items-center justify-between mt-6 px-1">
                <Text className="text-muted font-lexend-regular text-[12px]">
                  Didn’t get it?
                </Text>
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={handleResend}
                  textClassName="text-muted font-lexend-regular text-[12px]"
                  className="px-0"
                >
                  Resend in 00:24
                </Button>
              </View>
            </View>
          </View>

          {/* CTA at Bottom */}
          <View className="mt-auto pt-4">
            <Button
              variant="tertiary"
              onPress={handleNext}
              showIcon={true}
              icon={<Check size={19} color="#0E0E0E" />}
              disabled={otp.length < 6}
            >
              Verify & continue
            </Button>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
