import React, { useState, useEffect } from "react";
import { Box, Typography, Badge, Button, styled } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled(Link)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  margin: "0 3% 0 auto",
  display: "flex",
  "& > *": {
    marginRight: "40px !important",
    textDecoration: "none",
    color: "#FFFFFF",
    fontSize: 12,
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      color: "#2874f0",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      marginTop: 10,
    },
  },
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  color: "#2874f0",
  background: "#FFFFFF",
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 2,
  padding: "5px 40px",
  height: 32,
  boxShadow: "none",
  [theme.breakpoints.down("sm")]: {
    background: "#2874f0",
    color: "#FFFFFF",
  },
}));

const CustomButtons = () => {
  const cart = useSelector((state) => state.addCart?.cart);
  const [isLogin, setIsLogin] = useState(false);
  const [isRole, setIsRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = localStorage.getItem("islogin");
    setIsLogin(checkLogin === "true");

    const role = localStorage.getItem("role");
    setIsRole(role);
  }, []);

  const handleOnclick = () => {
    if (isLogin) {
      localStorage.setItem("islogin", "false");
      setIsLogin(false);
      localStorage.setItem("userId", "");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <Wrapper>
      <LoginButton variant="contained" onClick={handleOnclick}>
        {isLogin ? "Logout" : "Login"}
      </LoginButton>
      {isRole === "user" ? (
        <Typography style={{ marginTop: 3, width: 135 }}>
          Become a Seller
        </Typography>
      ) : (
        <Typography
          style={{ marginTop: 3, width: 135 }}
          onClick={() => navigate("/product-from")}
        >
          Add Product
        </Typography>
      )}
      <Typography style={{ marginTop: 3 }}>More</Typography>
      <Container to="/cart">
        <div className="">
          <p className="text-white bg-red-400 rounded-md px-1 w-[20px] h-[20px] pt-[2px] pl-[5px] font-bold">
            {cart.length}
          </p>
        </div>
        <Badge color="secondary">
          <ShoppingCart />
        </Badge>
        <Typography style={{ marginLeft: 10 }}>Cart</Typography>
      </Container>
    </Wrapper>
  );
};

export default CustomButtons;
