import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  removeItem,
  updateQuantity,
  clearCart,
} from "../lib/store/cartSlice";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  return (
    <div className="max-w-[1400px] mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Your Cart ({totalItems})</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Number(e.target.value),
                        })
                      )
                    }
                    className="w-20 px-3 py-2 border rounded"
                  />
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">
                Total: ${totalPrice.toFixed(2)}
              </h3>
              <button
                onClick={() => dispatch(clearCart())}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
