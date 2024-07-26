// GroupedButton.js
import React, { useState } from "react";
import { ButtonGroup, Button, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  getCartData,
  updateCartProductQty,
} from "../../reducer/cartListReducer";

const Component = styled(ButtonGroup)`
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  border-radius: 50%;
`;

const GroupedButton = ({ cartId, productId, price, qty }) => {
  const dispatch = useDispatch();

  // const initialCount = cart.find((item) => item.id === dataId)?.quantity || 1;
  const [counter, setCounter] = useState(1);

  // useEffect(() => {
  //   const updatedCount = cart.find((item) => item.id === dataId)?.quantity || 1;
  //   setCounter(updatedCount);
  // }, [cart, dataId]);

  const handleIncrement = (cartId, productId) => {
    const updatedQtyChange = 1;
    dispatch(
      updateCartProductQty({
        cartId,
        productId,
        price,
        qtyChange: updatedQtyChange,
      })
    ).then(() => {
      dispatch(getCartData());
    });
    console.log("productID and cartId in gb", cartId, productId);
    setCounter((prevCount) => prevCount + 1);
  };

  const handleDecrement = (cartId, productId) => {
    if (counter > 1) {
      const updatedQtyChange = -1;
      dispatch(
        updateCartProductQty({
          cartId,
          productId,
          price,
          qtyChange: updatedQtyChange,
        })
      ).then(() => {
        dispatch(getCartData());
      });
      setCounter((prevCount) => prevCount - 1);
    }
  };

  return (
    <Component>
      <StyledButton
        onClick={() => handleDecrement(cartId, productId, price)}
        disabled={counter === 1}
      >
        -
      </StyledButton>
      <Button disabled>{qty}</Button>
      <StyledButton onClick={() => handleIncrement(cartId, productId, price)}>
        +
      </StyledButton>
    </Component>
  );
};

export default GroupedButton;
