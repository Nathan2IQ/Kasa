import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageCarousel from "../ImageCarousel";

describe("ImageCarousel", () => {
  const mockImages = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
  ];
  const mockTitle = "Test Property";
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("renders the carousel with the initial image", () => {
    render(
      <ImageCarousel
        images={mockImages}
        title={mockTitle}
        initialIndex={0}
        onClose={mockOnClose}
      />,
    );

    const image = screen.getByTestId("carousel-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "Test Property - Image 1");
  });

  it("displays the correct image counter", () => {
    render(
      <ImageCarousel
        images={mockImages}
        title={mockTitle}
        initialIndex={0}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("navigates to the next image when clicking the next button", () => {
    render(
      <ImageCarousel
        images={mockImages}
        title={mockTitle}
        initialIndex={0}
        onClose={mockOnClose}
      />,
    );

    const nextButton = screen.getByTestId("carousel-next");
    fireEvent.click(nextButton);

    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("navigates to the previous image when clicking the previous button", () => {
    render(
      <ImageCarousel
        images={mockImages}
        title={mockTitle}
        initialIndex={1}
        onClose={mockOnClose}
      />,
    );

    const previousButton = screen.getByTestId("carousel-previous");
    fireEvent.click(previousButton);

    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("loops to the last image when clicking previous on the first image", () => {
    render(
      <ImageCarousel
        images={mockImages}
        title={mockTitle}
        initialIndex={0}
        onClose={mockOnClose}
      />,
    );

    const previousButton = screen.getByTestId("carousel-previous");
    fireEvent.click(previousButton);

    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("loops to the first image when clicking next on the last image", () => {
    render(
      <ImageCarousel
        images={mockImages}
        title={mockTitle}
        initialIndex={2}
        onClose={mockOnClose}
      />,
    );

    const nextButton = screen.getByTestId("carousel-next");
    fireEvent.click(nextButton);

    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("navigates to a specific image when clicking a dot", () => {
    render(
      <ImageCarousel
        images={mockImages}
        title={mockTitle}
        initialIndex={0}
        onClose={mockOnClose}
      />,
    );

    const secondDot = screen.getByTestId("carousel-dot-1");
    fireEvent.click(secondDot);

    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("calls onClose when clicking the close button", () => {
    render(
      <ImageCarousel
        images={mockImages}
        title={mockTitle}
        initialIndex={0}
        onClose={mockOnClose}
      />,
    );

    const closeButton = screen.getByTestId("carousel-close");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking the overlay", () => {
    render(
      <ImageCarousel
        images={mockImages}
        title={mockTitle}
        initialIndex={0}
        onClose={mockOnClose}
      />,
    );

    const overlay = screen.getByTestId("carousel-overlay");
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking inside the carousel content", () => {
    render(
      <ImageCarousel
        images={mockImages}
        title={mockTitle}
        initialIndex={0}
        onClose={mockOnClose}
      />,
    );

    const image = screen.getByTestId("carousel-image");
    fireEvent.click(image);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("does not render navigation buttons when there is only one image", () => {
    render(
      <ImageCarousel
        images={[mockImages[0]]}
        title={mockTitle}
        initialIndex={0}
        onClose={mockOnClose}
      />,
    );

    expect(screen.queryByTestId("carousel-next")).not.toBeInTheDocument();
    expect(screen.queryByTestId("carousel-previous")).not.toBeInTheDocument();
  });

  it("does not render dots when there is only one image", () => {
    render(
      <ImageCarousel
        images={[mockImages[0]]}
        title={mockTitle}
        initialIndex={0}
        onClose={mockOnClose}
      />,
    );

    expect(screen.queryByTestId("carousel-dot-0")).not.toBeInTheDocument();
  });

  it("renders null when images array is empty", () => {
    const { container } = render(
      <ImageCarousel
        images={[]}
        title={mockTitle}
        initialIndex={0}
        onClose={mockOnClose}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("highlights the active dot", () => {
    render(
      <ImageCarousel
        images={mockImages}
        title={mockTitle}
        initialIndex={1}
        onClose={mockOnClose}
      />,
    );

    const activeDot = screen.getByTestId("carousel-dot-1");
    const inactiveDot = screen.getByTestId("carousel-dot-0");

    expect(activeDot).toHaveClass("w-8");
    expect(inactiveDot).not.toHaveClass("w-8");
  });
});
