import axios from "axios";

const usersApi = process.env.NEXT_PUBLIC_API_V2_USERS;
const ipAddress = process.env.NEXT_PUBLIC_PRODUCTS_WEB_ADDRESS_V2;
const productsApi = process.env.NEXT_PUBLIC_API_V2_PRODUCTS;
const shoppingListsApi = process.env.NEXT_PUBLIC_API_V2_SHOPPINGLISTS;
const shoppingListProductsApi =
     process.env.NEXT_PUBLIC_API_V2_SHOPPINGLIST_PRODUCTS;

export type UserType = {
     id: number;
     username: string;
};

export type ProductType = {
     id: number;
     name: string;
     description: string;
};

export type ShoppingListsType = {
     id: number;
     shoppinglist_id: number;
     name: string;
};

export type ShoppingListProductsType = {
     id: number;
     shoppinglist_id: number;
     product_id: number;
     name: string;
     is_checked: boolean;
};

const emptyShoppingListProducts: ShoppingListProductsType = {
     id: 0,
     shoppinglist_id: 0,
     product_id: 0,
     name: "Empty product",
     is_checked: false,
};

export type NewProductToShoppingListType = {
     shoppingListId: number;
     productId: number;
};

/*****************************/
/***** GET all users ******/
/*****************************/
export const GetAllUsers = async (): Promise<UserType[]> => {
     console.log(" ** GetAllUsers **");

     let users: UserType[] = [];
     let catchError;

     const apiClause = `${ipAddress}/${usersApi}`;
     console.log(apiClause);

     await axios
          .get<[]>(apiClause)
          .then((response) => {
               console.log(response.data);
               users = response.data;
          })
          .catch((error) => {
               console.error("There was an error!", error);
               catchError = error;
          });

     if (catchError) {
          console.log("GetUsers error");
          return [
               {
                    id: 0,
                    username: "empty",
               },
          ];
     }
     return users;
};

/*****************************/
/***** GET all products ******/
/*****************************/
export const GetAllProducts = async (): Promise<ProductType[]> => {
     console.log(" ** GetAllProducts **");

     let products: ProductType[] = [];
     let catchError;

     const apiClause = `${ipAddress}/${productsApi}`;
     console.log(apiClause);

     await axios
          .get<[]>(apiClause)
          .then((response) => {
               console.log(response.data);
               const responseData: ProductType[] = response.data;
               products = responseData.map((x) => ({
                    ...x,
                    description: x.description || "",
               }));
          })
          .catch((error) => {
               console.error("There was an error!", error);
               catchError = error;
          });

     if (catchError) {
          console.log("GetProducts error");
          return [
               {
                    id: 0,
                    name: "empty",
                    description:
                         "This is empty product. Getting products did not work!",
               },
          ];
     }
     return products;
};

/*****************************/
/***** Add new product  ******/
/*****************************/
export const AddNewProduct = async (productName: string) => {
     console.log({ productName });

     try {
          const response = await axios.post(
               ipAddress + "/" + productsApi,
               { productName: productName, description: "" },
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
               }
          );

          console.log("Data insert successfully:", response.data);
          console.log("Status:", response.status);
     } catch (error) {
          console.error("Error updating data:", error);
     }
};

/****************************/
/***** Delete product  ******/
/****************************/
export const DeleteProduct = async (productid: number) => {
     console.log("Delete product");
     console.log({ productid });

     try {
          const response = await axios.delete(
               ipAddress + "/" + productsApi + `/${productid}`,
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
               }
          );

          console.log(
               "Product removed successfully from shoppinglist:",
               response.data
          );
          console.log("Status:", response.status);
     } catch (error) {
          console.error("Error removing product from shoppinglist:", error);
     }
};

/*****************************************/
/***** GET shopping lists by userID ******/
/*****************************************/
export const GetShoppingListsByUserId = async (
     id: number
): Promise<ShoppingListsType[]> => {
     let shoppingLists: ShoppingListsType[] = [];
     let catchError;

     const apiClause = `${ipAddress}/${shoppingListsApi}/${id}`;

     await axios
          .get<ShoppingListsType[]>(apiClause)
          .then((response) => {
               shoppingLists = response.data;
          })
          .catch((error) => {
               console.error("There was an error!", error);
               catchError = error;
          });

     if (catchError) {
          console.log("GetShoppingListsByUserId error");
          return [
               {
                    id: -1,
                    shoppinglist_id: -1,
                    name: "-1 empty",
               },
          ];
     }
     return shoppingLists;
};

/*********************************************************/
/***** GET shopping list products by shoppinglistID ******/
/*********************************************************/
export const GetShoppingListProductsByShoppingListId = async (
     id: number
): Promise<ShoppingListProductsType[]> => {
     console.log("GetShoppingListProductsByShoppingListId: ", id);

     let shoppingListProducts: ShoppingListProductsType[] = [];
     let catchError;

     const apiClause = `${ipAddress}/${shoppingListProductsApi}/${id}`;
     console.log(apiClause);

     await axios
          .get<ShoppingListProductsType[]>(apiClause)
          .then((response) => {
               shoppingListProducts = response.data;
          })
          .catch((error) => {
               console.error("There was an error!", error);
               catchError = error;
          });

     if (catchError) {
          console.log("GetShoppingListProductsByShoppingListId error");
          return [emptyShoppingListProducts];
     }

     return shoppingListProducts;
};

/********************************/
/***** Update product name ******/
/********************************/
export const UpdateProductNameById = async (id: number, name: string) => {
     console.log("UpdateProductNameById: ", { id, name });

     const apiClause = `${ipAddress}/${productsApi}/${id}`;
     console.log(apiClause);

     try {
          const response = await axios.put(
               apiClause,
               { name: name },
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
               }
          );

          console.log("Product updated successfully:", response.data);
     } catch (error) {
          console.error("Error updating product:", error);
     }
};

/***************************************************/
/***** Update product checked in shoppinglist ******/
/***************************************************/
export const UpdateProductCheckedInShoppingListByShoppingListIdAndProductId =
     async (shoppingListId: number, productId: number, checked: boolean) => {
          console.log(
               "UpdateProductCheckedInShoppingListByShoppingListIdAndProductId: ",
               { shoppingListId, productId, checked }
          );

          const apiClause = `${ipAddress}/${shoppingListProductsApi}/${shoppingListId}`;
          console.log(apiClause);

          try {
               const response = await axios.put(
                    apiClause,
                    {
                         productId: productId,
                         checked: checked,
                    },
                    {
                         headers: {
                              "Content-Type": "application/json",
                         },
                    }
               );

               console.log("Product updated successfully:", response.data);
          } catch (error) {
               console.error("Error updating product:", error);
          }
     };

/***************************************************/
/***** Add new product to shoppinglist *************/
/***************************************************/
export const AddNewProductToShoppingList = async (
     shoppinglistid: number,
     productid: number
) => {
     console.log({ shoppinglistid, productid });

     try {
          const response = await axios.post(
               ipAddress + "/" + shoppingListProductsApi,
               { shoppinglist_id: shoppinglistid, product_id: productid },
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
               }
          );

          console.log("Data insert successfully:", response.data);
          console.log("Status:", response.status);
     } catch (error) {
          console.error("Error updating data:", error);
     }
};

/****************************************************/
/***** Remove product from shoppinglist *************/
/****************************************************/
export const RemoveProductFromShoppingList = async (productid: number) => {
     console.log("Remove product from shoppinglist");
     console.log({ productid });

     try {
          const response = await axios.delete(
               ipAddress + "/" + shoppingListProductsApi + `/${productid}`,
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
               }
          );

          console.log(
               "Product removed successfully from shoppinglist:",
               response.data
          );
          console.log("Status:", response.status);
     } catch (error) {
          console.error("Error removing product from shoppinglist:", error);
     }
};
