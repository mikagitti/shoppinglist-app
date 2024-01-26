import React, { createContext, useState, ReactNode, useRef } from 'react';

import readyProductList from './ProductListJSON.json';

export type ProductListType = {
    id: number;
    productName: string;
    productInShoppingList: boolean; 
}
interface IProductListContext {    
    productList: ProductListType[];
    checkProductListProduct: (id: number) => void;
    updateProductNameById: (id: number, name: string) => void;
    addNewProduct: (name: string) => void;
    deleteProductFromProductList: (id: number) => void;
}

const defaultProductListState: IProductListContext = {
    productList: [],    
    checkProductListProduct: (id: number) => {},
    updateProductNameById: (id: number, name: string) => {},
    addNewProduct: (name: string) => {},
    deleteProductFromProductList: (id: number) => {},
}

//CONTEXT
const ProductListContext = createContext<IProductListContext>(defaultProductListState);

//PROVIDER
export const ProductListProvider = ({children} : {children : ReactNode}) => {
    const [productList, setProductList] = useState<ProductListType[]>(readyProductList);

    const productIdInUseRef = useRef<number>(100);

    const updateProductNameById = (id: number, name: string) => {
        setProductList(productList.map(item => 
            item.id === id ? { ...item, productName: name } : item
          ));
    }

    const checkProductListProduct = (id: number) => {        
        setProductList((items) => 
                    items.map( (item) => item.id === id ? {...item, productInShoppingList: !item.productInShoppingList } : item) )        
    }

    const addNewProduct = (name: string) => {
        productIdInUseRef.current += 1;
        setProductList([...productList, {id: productIdInUseRef.current, productName: name, productInShoppingList: false}]);        
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
