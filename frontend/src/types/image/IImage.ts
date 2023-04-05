export interface MyImageProps {
    alt: string,
    height?: number | string,
    width?: number | string,
    src: string
}

export interface CarouselBannerProps extends MyImageProps {
    to: string
}