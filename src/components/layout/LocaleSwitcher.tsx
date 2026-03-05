"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";
import { locales } from "@/i18n/config";
import { Globe } from "lucide-react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const languageNames: Record<string, string> = {
  en: "English",
  es: "Español",
};

export function LocaleSwitcher() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (newLocale: string) => {
    handleClose();
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        sx={{
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
        aria-label={t("language")}
      >
        <Globe size={18} />
        <span style={{ fontSize: "0.875rem" }}>
          {languageNames[locale] || locale.toUpperCase()}
        </span>
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {locales.map((loc) => (
          <MenuItem
            key={loc}
            onClick={() => handleSelect(loc)}
            selected={locale === loc}
            disabled={isPending}
          >
            <ListItemText>{languageNames[loc] || loc.toUpperCase()}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
