// helper fxn to check if product exists in cart
export const existingCartItem = ({ prevCartItems, nextCartItem }) => {
  // check if the documentID matches on products that are in cart
  if (prevCartItems) {
    return prevCartItems.find(
      (cartItem) => cartItem.documentID === nextCartItem.documentID
    );
  }
};

// helper fxn add products to cart
export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  // tracks product quantity
  const quantityIncrement = 1;
  // fxn call to helper fxn
  //boolean state to determine if product already exists in cart
  const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });

  // if product exists
  if (cartItemExists) {
    // map through all products in cart
    return prevCartItems.map((cartItem) =>
      // compare the documentID of products
      // if ID matches increase quanity
      // else return current cart item
      cartItem.documentID === nextCartItem.documentID
        ? {
            ...cartItem,
            quantity: cartItem.quantity + quantityIncrement,
          }
        : cartItem
    );
  }

  // if product does not exists in cart
  // a new product in cart

  if (prevCartItems) {
    return [
      ...prevCartItems,
      {
        ...nextCartItem,
        quantity: quantityIncrement,
      },
    ];
  }
};

// helper fxn to remove item from cart
export const handleRemoveCartItems = ({ prevCartItems, cartItemToRemove }) => {
  // filter array and remove it if id matches
  if (prevCartItems) {
    return prevCartItems.filter(
      (item) => item.documentID !== cartItemToRemove.documentID
    );
  }
};

export const handleReduceCartItems = ({ prevCartItems, cartItemToReduce }) => {
  // finds current cart item
  const existingCartItem = prevCartItems.find(
    (cartItem) => cartItem.documentID === cartItemToReduce.documentID
  );

  // if quanity is 1
  // reducing it resolves in deleting it from cart
  if (existingCartItem.quantity === 1) {
    return prevCartItems.filter(
      (cartItem) => cartItem.documentID !== existingCartItem.documentID
    );
  }

  // if quantity is more than 1
  // reduce item quantity by 1
  return prevCartItems.map((cartItem) =>
    cartItem.documentID === existingCartItem.documentID
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
};
