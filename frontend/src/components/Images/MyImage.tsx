import { LazyLoadImage } from 'react-lazy-load-image-component';

interface MyImageProps {
    alt: string,
    height?: number | string,
    width?: number | string,
    src: string
}

export const MyImage = ({ alt, height, width, src }: MyImageProps) => (
        <LazyLoadImage
            alt={alt}
            src={src}
            height={height}
            width={width}
        />
);
