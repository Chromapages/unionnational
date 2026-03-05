import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface SanityImageProps {
    src: any; // Sanity Image object
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    className?: string;
    fill?: boolean;
    sizes?: string;
    quality?: number;
}

export const SanityImage = ({
    src,
    alt,
    width,
    height,
    priority = false,
    className,
    fill = false,
    sizes,
    quality = 75,
}: SanityImageProps) => {
    if (!src?.asset) {
        return null;
    }

    // Generate the actual image URL
    const imageUrl = urlFor(src).url();

    // Extract blurDataURL (lqip) from the sanity asset metadata if available
    // Note: Your GROQ queries must fetch asset->metadata.lqip for this to work
    const blurDataURL = src?.asset?.metadata?.lqip;

    const props = {
        src: imageUrl,
        alt,
        priority,
        className,
        quality,
        placeholder: blurDataURL ? 'blur' as const : 'empty' as const,
        blurDataURL: blurDataURL,
    };

    if (fill) {
        return <Image {...props} fill sizes={sizes || "100vw"} />;
    }

    return (
        <Image
            {...props}
            width={width || 800}
            height={height || 600}
            sizes={sizes}
        />
    );
};
