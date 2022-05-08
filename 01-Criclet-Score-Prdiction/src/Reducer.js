export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

export const initialState = {
  basket: [],
};

function Reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
  }

  switch (action.type) {
    case "ADD-TO-BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE-FROM-BASKET":
      let newBasket = [...state.basket];
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        newBasket.splice(index, 1);
      }
      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
}

export default Reducer;
