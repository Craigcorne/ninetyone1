import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import productReducer from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";
import { compareReducer } from "./reducers/compare";
import categoryReducer from "./reducers/categories";
import { statementsReducer } from "./reducers/statements";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    compare: compareReducer,
    wishlist: wishlistReducer,
    categories: categoryReducer,
    order: orderReducer,
    statements: statementsReducer,
  },
});

export default Store;
