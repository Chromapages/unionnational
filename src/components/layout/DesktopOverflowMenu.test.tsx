import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { DesktopOverflowMenu } from "./DesktopOverflowMenu";
import type { SiteNavigationItem } from "./navigationData";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ref, ...props }: React.ComponentPropsWithoutRef<"a"> & {
    href: string;
    ref?: React.Ref<HTMLAnchorElement>;
  }) => (
    <a ref={ref} href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: () => "/",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      more: "More",
      moreOptions: "More options",
      resources: "Guides & Tools",
    };
    return messages[key] || key;
  },
}));

vi.mock("./LocaleSwitcher", () => ({
  LocaleSwitcher: () => <button type="button">Language</button>,
}));

const items: SiteNavigationItem[] = [
  {
    id: "resources",
    translationKey: "resources",
    href: "/resources",
    icon: "BookOpen",
    desktopPlacement: "secondary",
    mobileSection: "more",
  },
];

function Harness() {
  const [isOpen, setIsOpen] = useState(false);
  return <DesktopOverflowMenu items={items} isOpen={isOpen} onOpenChange={setIsOpen} />;
}

describe("DesktopOverflowMenu", () => {
  it.each(["{Enter}", " ", "{ArrowDown}"])(
    "opens with %s, focuses the first link, and restores focus with Escape",
    async (key) => {
      const user = userEvent.setup();
      render(<Harness />);

      const trigger = screen.getByRole("button", { name: "More options" });
      trigger.focus();
      await user.keyboard(key);

      expect(screen.getByRole("link", { name: "Guides & Tools" })).toHaveFocus();

      await user.keyboard("{Escape}");
      expect(trigger).toHaveFocus();
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    },
  );
});
