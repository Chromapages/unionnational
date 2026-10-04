import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PlaybookNav } from "./PlaybookNav";

vi.mock("next/link", () => ({ default: ({ children, ...props }: React.ComponentPropsWithoutRef<"a">) => <a {...props}>{children}</a> }));

const chapters = [{ _id: "chapter", title: "Prime Cost", slug: "prime-cost", chapterNumber: 1 }];

describe("PlaybookNav", () => {
    it("uses the selected playbook path and locale", () => {
        render(<PlaybookNav playbookTitle="Restaurant Margin Playbook" chapters={chapters} locale="es" basePath="/hub/playbooks/restaurant-margin" />);
        expect(screen.getByRole("link", { name: "Restaurant Margin Playbook" })).toHaveAttribute("href", "/es/hub/playbooks/restaurant-margin");
        expect(screen.getByRole("link", { name: /Prime Cost/ })).toHaveAttribute("href", "/es/hub/playbooks/restaurant-margin/prime-cost");
    });

    it("keeps the legacy S-Corp path as the default", () => {
        render(<PlaybookNav playbookTitle="S-Corp Playbook" chapters={chapters} locale="en" />);
        expect(screen.getByRole("link", { name: /Prime Cost/ })).toHaveAttribute("href", "/en/hub/s-corp-playbook/prime-cost");
    });
});
