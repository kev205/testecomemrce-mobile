import { Article } from "@/api/models/entities";
import CardItem from "@/components/CardItem";
import PriceView from "@/components/PriceView";
import { render, screen, fireEvent } from "@testing-library/react-native";

jest.useFakeTimers();

describe("<PriceView />", () => {
  it("should render price with no discount", () => {
    const item: Partial<Article> = {
      id: 1,
      title: "test product 1",
      category: "Lait",
      price: 50,
      thumbnail: "",
    };

    render(<PriceView originalPrice={item.price} />);

    const price = screen.getByText("$50");
    const discountedPrice = screen.queryByLabelText("discounted-price");

    expect(price).toBeOnTheScreen();
    expect(discountedPrice).not.toBeOnTheScreen();
  });
  it("should render price and discounted price", () => {
    const item: Partial<Article> = {
      id: 1,
      title: "test product 1",
      category: "Lait",
      price: 50,
      discountPercentage: 7.17,
      thumbnail: "",
    };

    render(
      <PriceView
        originalPrice={item.price}
        discount={item.discountPercentage}
      />
    );

    const price = screen.getByText("$50");
    const discountedPrice = screen.getByText("$46.41");

    expect(price).toBeOnTheScreen();
    expect(discountedPrice).toBeOnTheScreen();
  });
});
