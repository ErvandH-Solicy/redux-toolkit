type IAddress = {
    street: string,
    suite: string,
    city: string,
    zipcode: string
}

type ICompany = {
    name: string,
    catchPhrase: string
}

export type IUser = {
    address: IAddress,
    company: ICompany,
    email: string,
    id: number,
    name: string,
    phone: string,
    username: string,
    website: string
}