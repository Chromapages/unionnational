# Team hero headline width

The latest request widens the headline inside the existing hero's left column.

1. Replace the 15ch/12ch headline caps with the full available column width.
2. Preserve font size, copy, section spacing, CTA, and the practice column.
3. Inspect wrapping at mobile, tablet, desktop, and the supplied 1896px reference width.

Success: the heading uses the available left-column width without horizontal overflow. Natural wrapping replaces the narrow three-line layout where sufficient space exists. No new dependencies or unrelated changes.

Completed: removed the narrow caps. Rendered checks at 390, 768, 1440, and 1896px confirm that headline width equals column width, with no horizontal overflow. Desktop wraps into two lines; font sizes and other hero styling are preserved.
