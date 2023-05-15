import { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MyImageProps } from '../../types';

const MyImageMemo = ({ alt, height, width, src }: MyImageProps) => (
        <LazyLoadImage
            draggable={false}
            alt={alt}
            src={src}
            height={height}
            width={width}
            loading='lazy'
            effect='blur'
        />
);

export const MyImage = memo(MyImageMemo)
