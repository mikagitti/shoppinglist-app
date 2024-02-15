import axios from 'axios';

const apiAddress = process.env.NEXT_PUBLIC_API_CALL_ADDRESS;

export type ProductType = {
    id: number;
    productName: string;
    shoppingList: boolean;
}



/*****************************/
/***** GET ALL PRODUCTs ******/
/*****************************/
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
        return [{id: 0, productName: 'empty', shoppingList: false}];
    }

    return products;

}



/************************/
/***** ADD PRODUCT ******/
/************************/
export const AddNewProduct = async (data: ProductType) => {
    try {        
        const response = await axios.post(apiAddress+'/products', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Data updated successfully:', response.data);
    } 
    catch (error) {        
        console.error('Error updating data:', error);
    }
};


/***************************/
/***** DELETE PRODUCT ******/
/***************************/
export const deleteProductFromDB = async (id: number) => {
    try {        
        const response = await axios.delete(apiAddress + `/products/${id}`, {            
            headers: {'Content-Type': 'application/json'}
      });

      console.log('Data deleted successfully:', response.data);

    } 
    catch (error) {
      console.error('Error deleting data:', error);
    }
};

