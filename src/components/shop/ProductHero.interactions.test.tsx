import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ add: vi.fn(), open: vi.fn(), track: vi.fn(), locale: "en" }));
vi.mock("next-intl", () => ({ useLocale: () => mocks.locale, useTranslations: () => (key: string, values: Record<string, unknown> = {}) => key === "viewMedia" ? `View ${values.type} ${values.number}` : key }));
vi.mock("next/image", () => ({ default: ({ src, alt, placeholder }: { src: string; alt: string; placeholder?: string }) => <img src={src} alt={alt} data-placeholder={placeholder} /> }));
vi.mock("@/components/ui/VideoEmbed", () => ({ default: ({ videoUrl, posterImage }: { videoUrl: string; posterImage?: string }) => <video data-testid="active-video" src={videoUrl} poster={posterImage} /> }));
vi.mock("@/components/ui/StickyBuyBar", () => ({ StickyBuyBar: ({ disabled, onAddToCart, format }: { disabled: boolean; onAddToCart: () => void; format: string }) => <button disabled={disabled} onClick={onAddToCart}>Sticky purchase {format}</button> }));
vi.mock("./ProductOfferSelector", () => ({ ProductOfferSelector: ({ editions, selectedId, onSelect }: { editions: Array<{ id: string; name: string }>; selectedId: string; onSelect: (id: string) => void }) => <div aria-label="Configured editions">{editions.map(edition => <button key={edition.id} onClick={() => onSelect(edition.id)} aria-pressed={edition.id === selectedId}>{edition.name}</button>)}</div> }));
vi.mock("@/i18n/navigation", () => ({ Link: ({ children, ...props }: React.ComponentProps<"a">) => <a {...props}>{children}</a> }));
vi.mock("@/components/seo/MetaPixel", () => ({ trackMetaEvent: mocks.track }));
vi.mock("@/store/useCartStore", () => ({ useCartStore: (select: (state: object) => unknown) => select({ addItem: mocks.add, setIsOpen: mocks.open }) }));
import { ProductHero, type ProductEdition } from "./ProductHero";
const props = { id: "book", slug: "another-published-book", title: "Approved book", subtitle: "Approved contents", image: "/images/cover.png", defaultPrice: 49, format: "physical" };
const editions: ProductEdition[] = [
    { id: "print", _key: "print", name: "Hardcover", price: 49, format: "physical", description: "Printed copy", stripePriceId: "price_print", stripeProductId: "prod_print" },
    { id: "pdf", _key: "pdf", name: "Digital PDF", price: 29, format: "digital", description: "CMS PDF details", stripePriceId: "price_pdf" },
    { id: "audio", _key: "audio", name: "Audiobook", price: 27, format: "audio", description: "Narrated edition + bonuses.", stripePriceId: "price_audio" },
];
beforeEach(() => { vi.clearAllMocks(); mocks.locale = "en"; });
describe("published product purchase interactions", () => {
    it("defaults to the configured PDF, changes actual edition price and preserves server cart identity", () => {
        const { container } = render(<ProductHero {...props} category="Approved category" author={{ name: "Approved author" }} editions={editions} stripeProductId="prod_top" />);
        expect(container.querySelector("[data-selected-price]")).toHaveAttribute("data-selected-price", "29");
        expect(container.querySelector("[data-purchase-support]")).toHaveTextContent("contents.pdf");
        fireEvent.click(screen.getByRole("button", { name: "Hardcover" }));
        expect(container.querySelector("[data-selected-price]")).toHaveAttribute("data-selected-price", "49");
        fireEvent.click(screen.getByRole("button", { name: "addToCart" }));
        expect(mocks.add).toHaveBeenCalledWith(expect.objectContaining({ id: "book::print", productId: "book", editionId: "print", price: 49, stripePriceId: "price_print", stripeProductId: "prod_print", fulfillmentType: "physical", requiresShipping: true }));
        expect(mocks.open).toHaveBeenCalledWith(true);
        expect(mocks.track).toHaveBeenCalledWith("AddToCart", expect.objectContaining({ value: 49 }));
        fireEvent.click(screen.getByRole("button", { name: "Audiobook" }));
        expect(container.querySelector("[data-purchase-support]")).toHaveTextContent("Narrated edition.");
        fireEvent.click(screen.getByRole("button", { name: "Sticky purchase Audiobook" }));
        expect(mocks.add).toHaveBeenLastCalledWith(expect.objectContaining({ editionId: "audio", price: 27, requiresShipping: false, stripeProductId: "prod_top" }));
    });
    it("supports a real external configured offer without claiming Stripe availability", () => {
        const { container } = render(<ProductHero {...props} image="" buyLink="https://seller.example.test/book" editions={null} />);
        expect(screen.getByRole("button", { name: "addToCart" })).toBeEnabled();
        expect(container.querySelector("[data-purchase-support]")).not.toHaveTextContent("stripeCheckout");
        fireEvent.click(screen.getByRole("button", { name: /Sticky purchase/ }));
        expect(mocks.add).toHaveBeenCalledWith(expect.objectContaining({ editionId: "book-default", price: 49, buyLink: "https://seller.example.test/book", stripePriceId: undefined }));
    });
    it("keeps a valid unconfigured edition visible while disabling every purchase action", () => {
        render(<ProductHero {...props} subtitle="" image="" editions={[]} />);
        expect(screen.getByRole("button", { name: "addToCart" })).toBeDisabled();
        expect(screen.getByRole("button", { name: /Sticky purchase/ })).toBeDisabled();
        expect(screen.getByText("purchaseUnavailable")).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: /Sticky purchase/ }));
        expect(mocks.add).not.toHaveBeenCalled();
    });
    it("filters malformed price offers and does not expose purchase controls for an empty valid set", () => {
        const { container } = render(<ProductHero {...props} editions={[{ ...editions[0], price: NaN }, { ...editions[1], price: -1 }]} />);
        expect(container.querySelector("[data-selected-price]")).toBeNull();
        expect(screen.queryByRole("button", { name: /Sticky purchase/ })).toBeNull();
        expect(screen.getByRole("button", { name: "addToCart" })).toBeDisabled();
    });
    it("selects sample/video media with accessible state and prefers the approved uploaded video", () => {
        const mediaProps = { ...props, stripePriceId: "price_top", imageMetadata: { lqip: "data:image/png;base64,fixture" }, samplePages: [null, { url: "" }, { url: "/images/sample.png" }] as unknown as Array<{ url: string }>, videoFileUrl: "https://media.example.test/approved.mp4", videoUrl: "https://video.example.test/alternate", videoThumbnail: { url: "/images/poster.png" } };
        const { container, rerender } = render(<ProductHero {...mediaProps} />);
        expect(container.querySelector("[data-book-cover-stage] img")).toHaveAttribute("data-placeholder", "blur");
        fireEvent.click(screen.getByRole("button", { name: "View image 2" }));
        expect(screen.getByRole("button", { name: "View image 2" })).toHaveAttribute("aria-pressed", "true");
        expect(container.querySelector("[data-book-cover-stage] img")).toHaveAttribute("src", "/images/sample.png");
        fireEvent.click(screen.getByRole("button", { name: "View video 3" }));
        expect(screen.getByTestId("active-video")).toHaveAttribute("src", "https://media.example.test/approved.mp4");
        expect(screen.getByTestId("active-video")).toHaveAttribute("poster", "/images/poster.png");
        rerender(<ProductHero {...props} stripePriceId="price_top" samplePages={null} />);
        expect(screen.queryByTestId("active-video")).toBeNull();
        expect(container.querySelector("[data-book-cover-stage] img")).toHaveAttribute("src", props.image);
    });
    it("retains a standalone embedded video and localized offer names/descriptions", () => {
        mocks.locale = "es";
        const localized = [{ ...editions[0], name: { en: "Hardcover", es: "Edición impresa" }, description: { en: "Print contents", es: "Contenido aprobado" }, format: { en: "physical", es: "physical" } }] as unknown as ProductEdition[];
        const { container } = render(<ProductHero {...props} image="" samplePages={null} videoUrl="https://video.example.test/book" editions={localized} />);
        expect(screen.getByTestId("active-video")).toHaveAttribute("src", "https://video.example.test/book");
        expect(container.querySelector("[data-purchase-support]")).toHaveTextContent("Contenido aprobado");
        fireEvent.click(screen.getByRole("button", { name: "addToCart" }));
        expect(mocks.add).toHaveBeenCalledWith(expect.objectContaining({ editionName: "Edición impresa", title: "Approved book — Edición impresa" }));
    });
    it("falls back to a refreshed canonical edition instead of persisting a removed selection", () => {
        const { container, rerender } = render(<ProductHero {...props} editions={editions} />);
        fireEvent.click(screen.getByRole("button", { name: "Hardcover" }));
        rerender(<ProductHero {...props} editions={[{ ...editions[1], id: "new-pdf", _key: "new-pdf", price: 31 }]} />);
        expect(container.querySelector("[data-selected-price]")).toHaveAttribute("data-selected-price", "31");
        fireEvent.click(screen.getByRole("button", { name: "addToCart" }));
        expect(mocks.add).toHaveBeenCalledWith(expect.objectContaining({ editionId: "new-pdf", price: 31 }));
    });
});
