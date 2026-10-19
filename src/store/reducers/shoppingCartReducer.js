import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_COUNT,
  TOGGLE_CART_ITEM_CHECK,
  CLEAR_CART,
} from "../actions/shoppingCartActions";

// LocalStorage'dan sepet verisini güvenli şekilde oku
const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

// LocalStorage'a sepet verisini kaydet
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Cart save error:", e);
  }
};

const initialState = {
  cart: loadCartFromStorage(), // [{ count: 1, checked: true, product: { ... } }]
  payment: {},
  address: {},
};

export const shoppingCartReducer = (state = initialState, action) => {
  let newCart;

  switch (action.type) {
    case ADD_TO_CART: {
      const productToAdd = action.payload;
      const existingIndex = state.cart.findIndex(
        (item) => item.product.id === productToAdd.id
      );

      if (existingIndex > -1) {
        newCart = state.cart.map((item, index) =>
          index === existingIndex
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        newCart = [
          ...state.cart,
          { count: 1, checked: true, product: productToAdd },
        ];
      }
      saveCartToStorage(newCart);
      return { ...state, cart: newCart };
    }

    case REMOVE_FROM_CART: {
      newCart = state.cart.filter((item) => item.product.id !== action.payload);
      saveCartToStorage(newCart);
      return { ...state, cart: newCart };
    }

    case UPDATE_CART_ITEM_COUNT: {
      const { productId, count } = action.payload;
      if (count <= 0) {
        newCart = state.cart.filter((item) => item.product.id !== productId);
      } else {
        newCart = state.cart.map((item) =>
          item.product.id === productId ? { ...item, count } : item
        );
      }
      saveCartToStorage(newCart);
      return { ...state, cart: newCart };
    }

    case TOGGLE_CART_ITEM_CHECK: {
      newCart = state.cart.map((item) =>
        item.product.id === action.payload
          ? { ...item, checked: !item.checked }
          : item
      );
      saveCartToStorage(newCart);
      return { ...state, cart: newCart };
    }

    case CLEAR_CART:
      saveCartToStorage([]);
      return { ...state, cart: [] };

    default:
      return state;
  }
};

export default shoppingCartReducer;
