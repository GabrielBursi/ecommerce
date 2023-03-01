export interface IProducts {
    id?: id, //! a api tem uma propriedade asin que é única e string
    title: string,
    description?: string,
    price:string,
    rating?:number,
    img: string,
}

export type id = number | string | undefined

export interface TabBarProducts {
    name:string,
    to: string
}

export interface DepartmentCardProps {
    title: string,
    src: string,
    to: string
}