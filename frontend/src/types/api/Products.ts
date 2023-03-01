export interface IProducts {
    id?: number | string, //! a api tem uma propriedade asin que é única e string
    title: string,
    description?: string,
    price:string,
    rating?:number,
    img: string,
}

export interface TabBarProducts {
    name:string,
    to: string
}

export interface DepartmentCardProps {
    title: string,
    src: string,
    to: string
}