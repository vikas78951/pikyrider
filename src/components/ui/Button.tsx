import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight } from "lucide-react-native";
import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonIconPosition = "left" | "right";

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  icon?: ReactNode;
  showIcon?: boolean;
  iconPosition?: ButtonIconPosition;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
}

const variantStyles = {
  primary: {
    container: "bg-base",
    text: "text-secondary",
    iconContainer: "bg-primary/10",
    iconColor: "#F6F6F6",
  },

  secondary: {
    container: "bg-interactive",
    text: "text-primary",
    iconContainer: "bg-primary/10",
    iconColor: "#F6F6F6",
  },

  tertiary: {
    container: "",
    text: "text-accent-foreground",
    iconContainer: "bg-accent-foreground/10",
    iconColor: "#0E0E0E",
  },
} satisfies Record<ButtonVariant, object>;

const Button = ({
  children,
  onPress,
  icon,
  showIcon = false,
  iconPosition = "right",
  variant = "primary",
  disabled = false,
  loading = false,
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const styles = variantStyles[variant];

  const iconElement = loading ? (
    <ActivityIndicator size="small" color={styles.iconColor} />
  ) : (
    (icon ?? <ArrowRight size={17} color={styles.iconColor} />)
  );

  const content = ({ pressed }: { pressed: boolean }) => (
    <View
      className={`min-h-16 flex-row items-center px-6 ${
        showIcon ? "justify-between" : "justify-center"
      } ${pressed ? "opacity-80" : "opacity-100"} ${
        isDisabled ? "opacity-50" : ""
      }`}
    >
      {showIcon && iconPosition === "left" && (
        <View
          className={`mr-3 h-8 w-8 items-center justify-center rounded-full ${styles.iconContainer}`}
        >
          {iconElement}
        </View>
      )}

      <Text className={`font-lexend-regular text-label-lg ${styles.text}`}>
        {children}
      </Text>

      {showIcon && iconPosition === "right" && (
        <View
          className={`ml-3 h-8 w-8 items-center justify-center rounded-full ${styles.iconContainer}`}
        >
          {iconElement}
        </View>
      )}
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className="overflow-hidden rounded-full"
    >
      {({ pressed }) =>
        variant === "tertiary" ? (
          <LinearGradient
            colors={["#FF6347", "#FF8A3D"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            {content({ pressed })}
          </LinearGradient>
        ) : (
          <View className={styles.container}>{content({ pressed })}</View>
        )
      }
    </Pressable>
  );
};

export default Button;
