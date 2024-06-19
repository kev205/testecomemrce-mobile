import { Article } from "@/api/models/entities";
import CardItem from "@/components/CardItem";
import { render, screen, fireEvent } from "@testing-library/react-native";

jest.useFakeTimers();

describe("<CardItem />", () => {
  it("should render article title and price with no discount", () => {
    const item: Partial<Article> = {
      id: 1,
      title: "test product 1",
      category: "Lait",
      price: 50,
      thumbnail: "",
    };

    render(<CardItem item={item} size={50} />);

    const title = screen.getByText("test product 1");
    const price = screen.getByText("$50");
    const discountedPrice = screen.queryByLabelText("discounted-price");

    expect(title).toBeOnTheScreen();
    expect(price).toBeOnTheScreen();
    expect(discountedPrice).not.toBeOnTheScreen();
  });
  it("should render article price and discounted price", () => {
    const item: Partial<Article> = {
      id: 1,
      title: "test product 1",
      category: "Lait",
      price: 50,
      discountPercentage: 7.17,
      thumbnail: "",
    };

    render(<CardItem item={item} size={50} />);

    const title = screen.getByText("test product 1");
    const price = screen.getByText("$50");
    const discountedPrice = screen.getByText("$46.41");

    expect(title).toBeOnTheScreen();
    expect(price).toBeOnTheScreen();
    expect(discountedPrice).toBeOnTheScreen();
  });
  it("should not render article price when noprice", () => {
    const item: Partial<Article> = {
      id: 1,
      title: "test product 1",
      category: "Lait",
      price: 50,
      discountPercentage: 7.17,
      thumbnail: "",
    };

    render(<CardItem item={item} noprice size={50} />);
    const price = screen.queryByLabelText("price");
    const discountedPrice = screen.queryByLabelText("discounted-price");

    expect(price).not.toBeOnTheScreen();
    expect(discountedPrice).not.toBeOnTheScreen();
  });
});
