import React, { createContext, useState, ReactNode, useRef, useEffect } from 'react';

import productListJsonFile from './ProductListJSON.json';
import { GetProducts } from '@/Database/dbConnection';

export type ProductListType = {
    id: number;
    productName: string;
    productInShoppingList: boolean; 
}
interface IProductListContext {    
    productList: ProductListType[];
    checkProductListProduct: (id: number) => void;
    updateProductNameById: (id: number, name: string) => void;
    addNewProduct: (id: number, name: string) => void;
    deleteProductFromProductList: (id: number) => void;
}


const fetchProductFromDB = async ():Promise<ProductListType[]> => {
    const result = await GetProducts();
    const setProductsToList:ProductListType[] = result.map(x => ( {id: x.id, productName: x.productName, productInShoppingList: Boolean(x.shoppingList)}))
    return setProductsToList;
}

const defaultProductListState: IProductListContext = {
    productList: [],    
    checkProductListProduct: (id: number) => {},
    updateProductNameById: (id: number, name: string) => {},
    addNewProduct: (id: number, name: string) => {},
    deleteProductFromProductList: (id: number) => {},
}

//CONTEXT
const ProductListContext = createContext<IProductListContext>(defaultProductListState);

//PROVIDER
export const ProductListProvider = ({children} : {children : ReactNode}) => {

    const [productList, setProductList] = useState<ProductListType[]>([]);

    //One time database fetch for product list.
    useEffect(() => {        
        async function runFetchProductsFromDB() {
            setProductList(await fetchProductFromDB());
        }
        runFetchProductsFromDB();

        if (productList.length <= 0) {
            setProductList(productListJsonFile);
        }

    },[])

    const updateProductNameById = (id: number, name: string) => {
        setProductList(productList.map(item => 
            item.id === id ? { ...item, productName: name } : item
          ));
    }

    const checkProductListProduct = (id: number) => {        
        setProductList((items) => 
                    items.map( (item) => item.id === id ? {...item, productInShoppingList: !item.productInShoppingList } : item) )        
    }

    const addNewProduct = (productId: number, productName: string) => {        
        setProductList([...productList, {id: productId, productName: productName, productInShoppingList: false}]);        
    }

    const deleteProductFromProductList = (id: number) => {
        setProductList(productList.filter(item => item.id !== id));
    }

    return (
        <ProductListContext.Provider value={{ productList, checkProductListProduct, updateProductNameById, addNewProduct, deleteProductFromProductList }}>
        {children}
        </ProductListContext.Provider>
    );
}

export default ProductListContext;
