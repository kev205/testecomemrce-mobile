import { Article } from "@/api/models/entities";
import { ReactElement } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";

const { width, height } = Dimensions.get("screen");

export default function HomeCarousel({
  products,
  renderItem,
}: {
  products: Article[];
  renderItem: (info: CarouselRenderItemInfo<Article>) => ReactElement;
}) {
  return (
    <Carousel
      style={{ width }}
      width={width}
      height={height / 3}
      data={products}
      autoPlayInterval={2000}
      scrollAnimationDuration={1000}
      renderItem={renderItem}
      windowSize={1}
      autoPlay
      loop={false}
    />
  );
}
