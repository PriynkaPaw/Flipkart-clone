import { Card, Box, Typography, Button, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../../slice/cartSlice";
import GroupButton from "./GroupButton";
import axios from "axios";

const Component = styled(Card)`
  border-top: 1px solid #f0f0f0;
  border-radius: 0px;
  display: flex;
`;

const LeftComponent = styled(Box)`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const SmallText = styled(Typography)`
  color: #878787;
  font-size: 14px;
  margin-top: 10px;
`;

const Cost = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const MRP = styled(Typography)`
  color: #878787;
`;

const Discount = styled(Typography)`
  color: #388e3c;
`;

const Remove = styled(Button)`
  margin-top: 20px;
  font-size: 16px;
`;

const CartItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectId, setSelectId] = useState();

  const cart = useSelector((state) => state.addCart?.cart);
  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    console.log("Getting data in Cart  =>", cart);
  }, [cart]);

  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

  const onClickButton = async (id) => {
    try {
      const data = await getProductById(id);
      localStorage.setItem("productId", id);
      navigate("/electronics/info", { state: { data } });
    } catch (error) {
      console.log("error ==>", error);
    }
  };

  return (
    <Component>
      {cart?.map((item, i) => (
        <div key={i}>
          <LeftComponent>
            <img
              onClick={() => onClickButton(item?.id)}
              src={item?.image}
              style={{ height: 110, width: 110 }}
            />
            <GroupButton dataId={item.id} />
          </LeftComponent>
          <Box style={{ margin: 20 }}>
            <Typography>₹{parseInt(item?.price)}</Typography>
            <SmallText>
              Seller: RetailNet
              <span>
                <img src={fassured} style={{ width: 50, marginLeft: 10 }} />
              </span>
            </SmallText>
            <Typography style={{ margin: "20px 0" }}>
              <Cost component="span">₹ {parseInt(item?.totalPrice)} </Cost>
              &nbsp;&nbsp;&nbsp;
              <MRP component="span">
                <strike>₹7000</strike>
              </MRP>
              &nbsp;&nbsp;&nbsp;
              <Discount component="span">20 % off</Discount>
            </Typography>
            <Remove onClick={() => removeItemFromCart(item.id)}>Remove</Remove>
          </Box>
        </div>
      ))}
    </Component>
  );
};

export default CartItem;

export async function getProductById(id) {
  try {
    const response = await axios.get(
      `http://localhost:4441/api/v1/product/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("ERROR IN PRODUCT GET API BY ID", error);
    throw error;
  }
}
