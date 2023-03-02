export interface IProducts {
    id: id, //! a api tem uma propriedade asin que é única e string
    name: string,
    description?: string,
    price:string,
    rating?:number,
    img: string,
}

export type id = number | string

export interface TabBarProducts {
    name:string,
    to: string
}

export interface DepartmentCardProps {
    name: string,
    src: string,
    to: string
}