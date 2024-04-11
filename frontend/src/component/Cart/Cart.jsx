import { useEffect } from 'react';

import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { removeFromCart } from '../../slice/cartSlice';


import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { useDispatch ,useSelector} from 'react-redux';



const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    justifyContent:'space-between',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const BottomWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`;

const Cart = () => {
    const cart = useSelector(state => state.addCart?.cart);

    return (
        <>

{ cart.length ? 
            <Component container item lg={19} md={19} sm={12} xs={12}>
                <LeftComponent >
                    <Header>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cart?.length})</Typography>
                    </Header>
                      <div className='grid-cols-4'>
                      <CartItem />

                      </div>
                          
                    <BottomWrapper>
                        <StyledButton variant="contained">Place Order</StyledButton>
                    </BottomWrapper>
                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView  />
                </Grid>
            </Component> : <EmptyCart />
        }

        </>

    )
}

export default Cart;