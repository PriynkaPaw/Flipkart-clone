const ShoppingCart = require("../models/shoppingCart");
const express = require("express");
const user = require("../models/user");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await ShoppingCart.findOne({ userId: userId }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.status(404).json({ error: "ShoppingCart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const userId = req.body.userId;

    const existingUser = await user.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    let cartProduct = await ShoppingCart.findOne({ userId: userId });

    if (cartProduct) {
      var existingItems = cartProduct.items.map((item) =>
        item.productId.toString()
      );

      const newItems = req.body.items.map((item) => ({
        productId: item.productId,
        qty: item.qty,
        price: item.price,
        total_Price: item.qty * item.price,
        image: item.image,
      }));

      const alreadyInCart = newItems.some((item) =>
        existingItems.includes(item.productId.toString())
      );

      if (alreadyInCart) {
        return res.status(200).json(cartProduct);
      }

      cartProduct.items.push(...newItems);

      let totalQuantity = 0;
      let grand_total = 0;
      cartProduct.items.forEach((item) => {
        totalQuantity += item.qty;
        grand_total += item.total_Price;
      });

      cartProduct.totalQuantity = totalQuantity;
      cartProduct.grand_total = grand_total;
    } else {
      // Create new cart if it doesn't exist
      const items = req.body.items.map((item) => ({
        productId: item.productId,
        qty: item.qty,
        price: item.price,
        total_Price: item.qty * item.price,
        image: item.image,
      }));

      let totalQuantity = 0;
      let grand_total = 0;
      items.forEach((item) => {
        totalQuantity += item.qty;
        grand_total += item.total_Price;
      });

      cartProduct = new ShoppingCart({
        userId: userId,
        items: items,
        totalQuantity: totalQuantity,
        grand_total: grand_total,
        image: items.image,
      });
    }

    await cartProduct.save();
    res.status(202).json(cartProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// For deleting specific product from cart List

router.delete("/:cartID/:productId", async (req, res) => {
  try {
    const cartId = req.params.cartID;
    const productId = req.params.productId;

    const updatedCart = await ShoppingCart.findByIdAndUpdate(
      cartId,
      {
        $pull: { items: { productId: productId } },
        $inc: { totalQuantity: -1 },
      },

      { new: true }
    );

    if (!updatedCart) {
      res.status(404).json({ error: "Cart item not found" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:cartId/:productId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const qtyChange = parseInt(req.body.qtyChange);

    const updatedCart = await ShoppingCart.findOneAndUpdate(
      {
        _id: cartId,
        "items.productId": productId,
      },
      {
        $inc: {
          "items.$.qty": isNaN(qtyChange) ? 0 : qtyChange,
          // "items.$.total_Price": qtyChange * req.body.price,
          "items.$.total_Price": isNaN(req.body.price) ? 0 : req.body.price,
        },
        $set: {
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    let totalQuantity = 0;
    let grand_total = 0;
    updatedCart.items.forEach((item) => {
      totalQuantity += item.qty;
      grand_total += item.total_Price;
    });

    updatedCart.totalQuantity = totalQuantity;
    updatedCart.grand_total = grand_total;

    await updatedCart.save();

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
