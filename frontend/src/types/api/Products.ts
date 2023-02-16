export interface IProducts {
    id?:number | string,
    title: string,
    description?: string,
    price:string,
    rating:number,
    img: string
}

export interface TabBarProducts {
    name:string,
    to: string
}