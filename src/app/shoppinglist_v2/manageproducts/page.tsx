'use client'
import { DeleteProduct, GetAllProducts, ProductType } from "@/Database/dbConnectionV2";
import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import ProductListItem, { iconType } from "../components/productListItem";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { green, red } from "@mui/material/colors";
import { NewProductModal } from "../components/NewProductModal";


const productListStyle = {
  maxWidth: '500px', 
  display:"flex", 
  flexDirection: 'column' 
}


export default function Page() {

  const IconPropsForAddingProduct : iconType = {
    icon: AddIcon,
    color: green[500],
  };

  const IconPropsForDeletingProduct : iconType = {
    icon: DeleteIcon,
    color: red[800],    
  };

  const [productList, setProductList] = useState<ProductType[] | null>(null)
  const [isNewProductModal, setIsNewProductModal] = useState<boolean>(false);
  const [trickerProductListUpdate, setTrickerProductListUpdate] = useState<boolean>(false);

  useEffect( () => {
    console.log(trickerProductListUpdate);
    getAllProductsFromDb();
  }, [trickerProductListUpdate]);

  const getAllProductsFromDb = async() => {
    const products = await(GetAllProducts());
    setProductList(products);
  }

  const deleteProductFromDbById = async(productId: number) => {
    await DeleteProduct(productId);    
  }

  const removeProduct = (productId: number) => {
    deleteProductFromDbById(productId);
    getAllProductsFromDb();
    setTrickerProductListUpdate(value => !value);
  }

  const closeModal = () => {
    setIsNewProductModal(false);
    getAllProductsFromDb();
  }

  return (
    <>
    <Box sx={ productListStyle }>
    
      <Box sx={{marginLeft: '5px', marginTop: '10px', marginBottom: '10px'}}>
        <ProductListItem icon={IconPropsForAddingProduct} name='Add new product' iconAction={() => setIsNewProductModal(true)} />  
      </Box>      

      <Divider sx={{border: 'solid 3px', margin: ' 15px 5px'}}/>

      {
        productList?.map((product, index) => {
          return (
            <Box key={index} sx={ {margin: '5px'}}>
              <ProductListItem icon={IconPropsForDeletingProduct} name={product.name} iconAction={() => removeProduct(product.id)} />          
            </Box>
          )
        })
      }
    </Box>

  {
    isNewProductModal &&
    <NewProductModal onClose={closeModal} />
  }
  </>
    )
  }