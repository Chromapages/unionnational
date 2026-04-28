import * as React from "react";

/**
 * Custom hook to detect if a media query matches the current viewport.
 * @param query The media query string (e.g., "(max-width: 768px)")
 * @returns boolean
 */
export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = window.matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
