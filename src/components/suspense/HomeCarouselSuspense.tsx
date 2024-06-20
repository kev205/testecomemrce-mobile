import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const AnimatedLinear = Animated.createAnimatedComponent(LinearGradient);

export default function HomeCarouselSuspense() {
  const gradientAnimation = useSharedValue(0);

  gradientAnimation.value = withRepeat(
    withTiming(1, { duration: 1000, easing: Easing.linear }),
    4
  );

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      gradientAnimation.value,
      [0, 1],
      [-100, 100],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateX: translateX }],
    };
  });

  return (
    <View style={{ backgroundColor: "#999", width, height: height / 3 }}>
      <AnimatedLinear
        colors={["#999", "#b3b3b3", "#cccccc", "#b3b3b3", "#999"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[StyleSheet.absoluteFill, animatedStyle, { borderRadius: 8 }]}
      />
    </View>
  );
}
