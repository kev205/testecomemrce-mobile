import { Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get("screen");

export default function HomeCarouselSuspense() {
  return (
    <Image
      width={width}
      height={height / 3}
      style={{ backgroundColor: "#999" }}
    />
  );
}
