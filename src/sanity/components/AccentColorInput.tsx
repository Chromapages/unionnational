"use client";

import { Box, Button, Flex, Stack, Text } from "@sanity/ui";
import { PatchEvent, set, type StringInputProps } from "sanity";

export const ACCENT_COLORS = [
    { title: "Gold", value: "#D4AF37" },
    { title: "Deep Green", value: "#0B3B2E" },
    { title: "Forest", value: "#14532D" },
    { title: "Slate", value: "#334155" },
    { title: "Burgundy", value: "#7F1D1D" },
] as const;

export function AccentColorInput({ onChange, value, readOnly }: StringInputProps) {
    return (
        <Stack space={3}>
            <Flex gap={2} wrap="wrap">
                {ACCENT_COLORS.map((color) => {
                    const selected = value === color.value;
                    return (
                        <Button
                            key={color.value}
                            mode={selected ? "default" : "ghost"}
                            padding={2}
                            tone={selected ? "primary" : "default"}
                            disabled={readOnly}
                            onClick={() => onChange(PatchEvent.from(set(color.value)))}
                            aria-pressed={selected}
                            title={color.title}
                        >
                            <Flex align="center" gap={2}>
                                <Box style={{ backgroundColor: color.value, borderRadius: "999px", height: 20, width: 20 }} />
                                <Text size={1}>{color.title}</Text>
                            </Flex>
                        </Button>
                    );
                })}
            </Flex>
        </Stack>
    );
}
