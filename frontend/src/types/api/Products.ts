export interface IProducts {
    id?:number | string,
    title: string,
    description?: string,
    price:string,
    rating?:number,
    img: string,
    smDown? : boolean
}

export interface TabBarProducts {
    name:string,
    to: string
}