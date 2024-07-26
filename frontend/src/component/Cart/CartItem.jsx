import { Card, Box, Typography, Button, styled } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GroupButton from "./GroupButton";
import axios from "axios";
import { deleteCartProduct, getCartData } from "../../reducer/cartListReducer";

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

  const removeItemFromCart = (cartId, productId) => {
    dispatch(deleteCartProduct({ cartId, productId }));
  };

  const cartId = useSelector((state) => state.addProductToCart?.cartData);
  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  const cartDetails = useSelector(
    (state) => state.getCartData?.cartData?.items
  );
  console.log("cartDetails", cartDetails);

  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

  const onClickButton = async (id) => {
    try {
      const data = await getProductById(id);
      localStorage.setItem("productId", id);
      navigate("/electronics/info", { state: { data } });
      return data;
    } catch (error) {
      console.log("error ==>", error);
    }
  };

  return (
    <Component>
      {cartDetails?.map((item, i) => (
        <div key={i}>
          <LeftComponent>
            <img
              onClick={() => onClickButton(item?.productId._id)}
              src={item?.image}
              alt=""
              style={{ height: 110, width: 110 }}
            />
            {console.log("productIDDDDD=>", item)}
            <GroupButton
              cartId={cartId._id}
              productId={item.productId._id}
              price={item.price}
              qty={item.qty}
            />
          </LeftComponent>
          <Box style={{ margin: 20 }}>
            <Typography>₹{item?.productId.price}</Typography>
            <SmallText>
              Seller: RetailNet
              <span>
                <img
                  src={fassured}
                  alt=""
                  style={{ width: 50, marginLeft: 10 }}
                />
              </span>
            </SmallText>
            <Typography style={{ margin: "20px 0" }}>
              <Cost component="span">₹ {parseInt(item?.total_Price)} </Cost>
              &nbsp;&nbsp;&nbsp;
              <MRP component="span">
                <strike>₹7000</strike>
              </MRP>
              &nbsp;&nbsp;&nbsp;
              <Discount component="span">20 % off</Discount>
            </Typography>
            <Remove
              onClick={() => removeItemFromCart(cartId._id, item.productId._id)}
            >
              Remove
            </Remove>
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
