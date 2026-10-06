import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductCard } from "./ProductCard";
import { trackMetaEvent } from "@/components/seo/MetaPixel";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, onClick, ...props }: React.ComponentPropsWithoutRef<"a">) => <a {...props} onClick={event => { event.preventDefault(); onClick?.(event); }}>{children}</a>,
}));
vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("@/components/seo/MetaPixel", () => ({ trackMetaEvent: vi.fn() }));
vi.mock("next/image", () => ({ default: ({ src, alt, onLoad, className, placeholder, blurDataURL }: { src: string; alt: string; onLoad?: () => void; className?: string; placeholder?: string; blurDataURL?: string }) => <img src={src} alt={alt} onLoad={onLoad} className={className} data-placeholder={placeholder} data-blur={blurDataURL} /> }));

describe("ProductCard", () => {
  const props = { title: "Published resource", slug: "published-resource", shortDescription: "Approved description", price: 20, format: "ebook" };
  it.each([{ slug: "" }, { slug: "   " }, { slug: "undefined" }, { shortDescription: "Coming soon" }, { shortDescription: "" }])("does not advertise invalid/unpublished catalog input %j", invalid => {
    const { container } = render(<ProductCard {...props} {...invalid} />);
    expect(container).toBeEmptyDOMElement();
  });
  it("uses the cover fallback and removes its skeleton only after image load", () => {
    const { container } = render(<ProductCard {...props} coverImage="/images/fixture-cover.png" imageMetadata={{ lqip: "data:image/png;base64,fixture" }} />);
    const image = screen.getByRole("img", { name: props.title });
    expect(image).toHaveAttribute("src", "/images/fixture-cover.png");
    expect(image).toHaveAttribute("data-placeholder", "blur");
    expect(container.querySelector(".animate-pulse")).not.toBeNull();
    fireEvent.load(image);
    expect(container.querySelector(".animate-pulse")).toBeNull();
    expect(image.className).toContain("opacity-100");
  });
  it("prefers a published image URL without a fabricated blur placeholder", () => {
    render(<ProductCard {...props} imageUrl="/images/primary.png" coverImage="/images/fallback.png" />);
    expect(screen.getByRole("img", { name: props.title })).toHaveAttribute("src", "/images/primary.png");
    expect(screen.getByRole("img", { name: props.title })).toHaveAttribute("data-placeholder", "empty");
  });
  it("renders a related-resource action, approved category and actual price discount", () => {
    const { container } = render(<ProductCard {...props} layout="related" category="Approved category" badge="Approved promotion" price={20.5} compareAtPrice={30} imageUrl="  " />);
    expect(screen.getByRole("link", { name: `viewBook: ${props.title}` })).toHaveAttribute("href", "/shop/published-resource");
    expect(screen.getByText("Approved category")).toBeInTheDocument();
    expect(screen.getByText("$20.50")).toBeInTheDocument();
    expect(container.querySelector(".line-through")).toHaveTextContent("$30");
    expect(screen.queryByRole("img")).toBeNull();
    expect(container.querySelector(".lucide-star")).not.toBeNull();
  });
  it.each([undefined, 0, 10, 20])("does not invent a discount from compareAtPrice %j", compareAtPrice => {
    const { container } = render(<ProductCard {...props} compareAtPrice={compareAtPrice} />);
    expect(container.querySelector(".line-through")).toBeNull();
  });
  it.each(["bestseller", "new", "limited", "custom"])("retains configured badge %s with an unknown-format fallback", badge => {
    const { container } = render(<ProductCard {...props} badge={badge} format="Unrecognized resource" />);
    expect(screen.getByText(badge)).toBeInTheDocument();
    expect(container.querySelector(".lucide-file-text")).not.toBeNull();
  });
  it("tracks the selected published product using public identity", () => {
    vi.mocked(trackMetaEvent).mockClear();
    render(<ProductCard {...props} />);
    fireEvent.click(screen.getByRole("link"));
    expect(trackMetaEvent).toHaveBeenCalledWith("SelectContent", { content_type: "product", content_id: props.slug, name: props.title });
  });
  it("shows the product without a perpetual image skeleton when its image is missing", () => {
    const { container } = render(
      <ProductCard
        title="Test resource"
        slug="test-resource"
        shortDescription="A resource description."
        imageUrl={null}
        price={20}
        format="ebook"
        rating={5}
      />
    );

    expect(screen.getByRole("heading", { name: "Test resource" })).toBeInTheDocument();
    expect(container.querySelector(".animate-pulse")).toBeNull();
    expect(container.querySelector(".lucide-star")).toBeNull();
  });
});
