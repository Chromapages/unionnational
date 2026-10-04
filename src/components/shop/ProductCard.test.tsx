import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductCard } from "./ProductCard";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, ...props }: React.ComponentPropsWithoutRef<"a">) => <a {...props}>{children}</a>,
}));
vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("@/components/seo/MetaPixel", () => ({ trackMetaEvent: vi.fn() }));

describe("ProductCard", () => {
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
