import axios from 'axios';

const productsWebAddress = process.env.NEXT_PUBLIC_PRODUCTS_WEB_ADDRESS;
const productsApiCall = process.env.NEXT_PUBLIC_PRODUCTS_API_CALL;
const healthCheckApiCall = process.env.NEXT_PUBLIC_HEALTH_CHECK_API_CALL;

export type ProductType = {
    id: string;
    productName: string;
    shoppingList: boolean;
}


/*****************************/
/***** HEALTH CHECK ******/
/*****************************/
export const DbHealthCheck = async ():Promise<boolean> => {

    let products: ProductType[] = [];
    let catchError;

    console.log(healthCheckApiCall)

    await axios.get<ProductType[]>(productsWebAddress + '/' + healthCheckApiCall ) 
        .then(response => {            
            products = response.data;            
        })
        .catch(error => {
            console.error('There was an error!', error);
            catchError = error;
        });

    if (catchError) {
        console.log('GetProducts error');
        return false;
    }

    return true;

}



/*****************************/
/***** GET ALL PRODUCTs ******/
/*****************************/
export const GetProducts = async ():Promise<ProductType[]> => {

    let products: ProductType[] = [];
    let catchError;

    await axios.get<ProductType[]>(productsWebAddress + '/' + productsApiCall) 
        .then(response => {            
            products = response.data;            
        })
        .catch(error => {
            console.error('There was an error!', error);
            catchError = error;
        });

    if (catchError) {
        console.log('GetProducts error');
        return [{id: '0', productName: 'empty', shoppingList: false}];
    }

    return products;

}



/************************/
/***** ADD PRODUCT ******/
/************************/
export const AddNewProduct = async (data: ProductType) => {
    try {        
        const response = await axios.post(productsWebAddress + '/' + productsApiCall, data, {
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


/********************************/
/***** UPDATE PRODUCT NAME ******/
/********************************/
export const updateProductName = async (id: string, newName: string) => {
    try {    
    const response = await axios.put(productsWebAddress + '/' + productsApiCall + `/${id}`, {name: newName}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

      console.log('Product updated successfully:', response.data);
      
    } catch (error) {
      console.error('Error updating product:', error);      
    }
  };



/***************************/
/***** DELETE PRODUCT ******/
/***************************/
export const deleteProductFromDB = async (id: string) => {
    try {        
        const response = await axios.delete(productsWebAddress + '/' + productsApiCall + `/${id}`, {            
            headers: {'Content-Type': 'application/json'}
      });

      console.log('Data deleted successfully:', response.data);

    } 
    catch (error) {
      console.error('Error deleting data:', error);
    }
};

