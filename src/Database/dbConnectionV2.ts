import axios from "axios";

const productsWeb = process.env.NEXT_PUBLIC_PRODUCTS_WEB_ADDRESS_V2;
const productsApi = process.env.NEXT_PUBLIC_API_V2_PRODUCTS;
const shoppingListsApi = process.env.NEXT_PUBLIC_API_V2_SHOPPINGLISTS;
const shoppingListProductsApi =
     process.env.NEXT_PUBLIC_API_V2_SHOPPINGLIST_PRODUCTS;

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
     is_checked: boolean;
};

/*****************************/
/***** GET ALL PRODUCTs ******/
/*****************************/
export const GetProducts = async (): Promise<ProductType[]> => {
     let products: ProductType[] = [];
     let catchError;

     await axios
          .get<ProductType[]>(productsWeb + "/" + productsApi)
          .then((response) => {
               products = response.data;
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

/****************************************/
/***** GET SHOPPINGLISTS by USERID ******/
/****************************************/
export const GetShoppingListsByUserId = async (
     id: number
): Promise<ShoppingListsType[]> => {
     let shoppingLists: ShoppingListsType[] = [];
     let catchError;

     const sqlClause = `${productsWeb}/${shoppingListsApi}/${id}`;

     await axios
          .get<ShoppingListsType[]>(sqlClause)
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

/*******************************************************/
/***** GET SHOPPINGLISTPRODUCTS by SHOPPINGLISTID ******/
/*******************************************************/
export const GetShoppingListProductsByShoppingListId = async (
     id: number
): Promise<ShoppingListProductsType[]> => {
     let shoppingLists: ShoppingListProductsType[] = [];
     let catchError;

     const sqlClause = `${productsWeb}/${shoppingListProductsApi}/${id}`;

     await axios
          .get<ShoppingListProductsType[]>(sqlClause)
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
                    id: 0,
                    shoppinglist_id: 0,
                    product_id: 0,
                    is_checked: false,
               },
          ];
     }
     return shoppingLists;
};
