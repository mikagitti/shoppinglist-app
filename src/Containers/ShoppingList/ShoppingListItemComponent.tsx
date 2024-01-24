import { useContext } from "react";

import ShoppingListContext, { ShoppingListType } from "../../Context/ShoppingList/ShoppingListContext";

type ShoppingListItemProps = {
    item: ShoppingListType;
}

export default function ShoppingListItemComponent({item} : ShoppingListItemProps) {

    const {checkShoppingListProduct } = useContext(ShoppingListContext);
    
    function updateBothLists():void {
        checkShoppingListProduct(item.productName);
    }

    return (
        <>
        <label>          
          <input                          
              type="checkbox"
              checked={item.productChecked}
              onChange={updateBothLists}
          />
          
          <span>
            {item.productName}
          </span>
        </label>
        </>
    )
}