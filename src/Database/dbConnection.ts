
import axios from 'axios';

const apiAddress = process.env.NEXT_PUBLIC_API_CALL_ADDRESS;

export type ProductType = {
    id: number;
    name: string;
    shoppinglist: boolean;
}


export const GetProducts = async ():Promise<ProductType[]> => {

    let products: ProductType[] = [];
    let catchError;

    await axios.get<ProductType[]>(apiAddress+'/products') 
        .then(response => {            
            products = response.data;            
        })
        .catch(error => {
            console.error('There was an error!', error);
            catchError = error;
        });

    if (catchError) {
        console.log('GetProducts error');
        return [{id: 0, name: 'empty', shoppinglist: false}];
    }

    return products;

}
