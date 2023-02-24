import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MyImageProps } from '../../types';

export const MyImage = ({ alt, height, width, src }: MyImageProps) => (
        <LazyLoadImage
            alt={alt}
            src={src}
            height={height}
            width={width}
        />
);
