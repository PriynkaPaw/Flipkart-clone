// GroupedButton.js
import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../../slice/cartSlice";

const Component = styled(ButtonGroup)`
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  border-radius: 50%;
`;

const GroupedButton = ({ dataId }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.addCart?.cart);

  const initialCount = cart.find(item => item.id === dataId)?.quantity || 1;
  const [counter, setCounter] = useState(initialCount);

  useEffect(() => {
    const updatedCount = cart.find(item => item.id === dataId)?.quantity || 1;
    setCounter(updatedCount);
  }, [cart, dataId]);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
    setCounter((prevCount) => prevCount + 1);
  };

  const handleDecrement = (id) => {
    if (counter > 1) {
      dispatch(decrementQuantity(id));
      setCounter((prevCount) => prevCount - 1);
    }
  };

  return (
    <Component>
      <StyledButton onClick={() => handleDecrement(dataId)} disabled={counter === 1}>
        -
      </StyledButton>
      <Button disabled>{counter}</Button>
      <StyledButton onClick={() => handleIncrement(dataId)}>+</StyledButton>
    </Component>
  );
};

export default GroupedButton;
