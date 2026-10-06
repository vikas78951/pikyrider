import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  View,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import StepperHeader from "@/components/ui/StepperHeader";
import FormSectionHeader from "@/components/ui/FormSectionHeader";
import CustomInput from "@/components/formElement/CustomInput";
import Button from "@/components/ui/Button";
import InfoCard from "@/components/ui/InfoCard";

export default function ProfileScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [keyboardPadding, setKeyboardPadding] = useState(0);

  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const userNameRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const currentStep = 3;
  const totalSteps = 5;

  // Dedicated keyboard listener to guarantee Samsung / Android devices lift above keyboard
  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      (e) => {
        setKeyboardPadding(e.endCoordinates.height);
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 80);
      }
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      () => {
        setKeyboardPadding(0);
      }
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleNext = () => {
    console.log("Profile submitted:", { firstName, lastName, userName });
    router.push("/(onboarding)/gender");
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(onboarding)/otp");
    }
  };

  const handleVerifyUsername = () => {
    console.log("Verify username availability:", userName);
  };

  const isFormValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    userName.trim().length > 0;

  return (
    <SafeAreaView className="bg-canvas flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between",
              padding: 24,
              paddingBottom: 24 + keyboardPadding,
            }}
          >
            <View>
              {/* Stepper Header: Step 3 */}
              <StepperHeader
                currentStep={currentStep}
                totalSteps={totalSteps}
                onBack={handleBack}
              />

              {/* Form Section Header */}
              <FormSectionHeader
                caption="Your profile"
                title="What should we call you?"
                description="Your name helps your crew recognize you out there."
                className="mt-12 mb-8"
              />

              {/* Inputs */}
              <View className="gap-3">
                {/* First name */}
                <CustomInput
                  ref={firstNameRef}
                  label="First name"
                  placeholder="Alex"
                  value={firstName}
                  onChangeText={setFirstName}
                  returnKeyType="next"
                  onSubmitEditing={() => lastNameRef.current?.focus()}
                  blurOnSubmit={false}
                />

                {/* Second name */}
                <CustomInput
                  ref={lastNameRef}
                  label="Second name"
                  placeholder="Ridge"
                  value={lastName}
                  onChangeText={setLastName}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    userNameRef.current?.focus();
                  }}
                  blurOnSubmit={false}
                />

                {/* User name with Verify availability button */}
                <CustomInput
                  ref={userNameRef}
                  label="User name"
                  placeholder="alex_ridge"
                  value={userName}
                  onChangeText={setUserName}
                  autoCapitalize="none"
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                  rightElement={
                    <Button
                      variant="secondary"
                      size="sm"
                      onPress={handleVerifyUsername}
                      textClassName="text-[12px] font-lexend-medium"
                      className="rounded-xl"
                    >
                      Verify
                    </Button>
                  }
                />

                {/* Info Card with I Icon */}
                <View className="mt-2">
                  <InfoCard text="Your user name will be visible to people you ride with." />
                </View>
              </View>
            </View>

            {/* Bottom CTA */}
            <View className="mt-auto pt-6">
              <Button
                variant="tertiary"
                onPress={handleNext}
                showIcon={true}
                disabled={!isFormValid}
              >
                Next
              </Button>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
