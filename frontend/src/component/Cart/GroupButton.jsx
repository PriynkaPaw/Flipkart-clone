// GroupedButton.js
import React, { useState } from "react";
import { ButtonGroup, Button, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateCartProductQty } from "../../reducer/cartListReducer";

const Component = styled(ButtonGroup)`
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  border-radius: 50%;
`;

const GroupedButton = ({ cartId, productId, price, qty }) => {
  const dispatch = useDispatch();

  const [counter, setCounter] = useState(1);

  const handleIncrement = (cartId, productId) => {
    const updatedQtyChange = 1;
    dispatch(
      updateCartProductQty({
        cartId,
        productId,
        price,
        qtyChange: updatedQtyChange,
      })
    );
    setCounter((prevCount) => prevCount + 1);
  };

  const handleDecrement = (cartId, productId) => {
    if (qty > 1) {
      const updatedQtyChange = -1;
      dispatch(
        updateCartProductQty({
          cartId,
          productId,
          price,
          qtyChange: updatedQtyChange,
        })
      );
      setCounter((prevCount) => prevCount - 1);
    }
  };

  return (
    <Component>
      <StyledButton
        onClick={() => handleDecrement(cartId, productId, price)}
        // disabled={counter === 1}
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
