const express = require('express')
const Product = require('../models/product')
const route = express.Router()
const Category = require('../models/category')
const mongoose = require('mongoose')
const multer = require('multer')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use('./public/uploads', express.static('./public/uploads'))


const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = fileName.split('.').pop(); // Get extension from the original filename
    cb(null, `${fileName}-${Date.now()}.${extension}`);
    // cb(null, `${file.originalname}-${Date.now()}`);
  }
});

const upload = multer({ storage: storage });

// Get all products API
route.get(`/`, async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(',') };
    }
    const productList = await Product.find(filter).populate('category');
    res.send(productList); 
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get product BY Id
route.get(`/:id`, async (req, res) => {
  console.log("req",req.params.id)
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.send(product);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Post API
route.post(`/`, upload.single('image'), async (req, res) => {
  try {
      console.log("file==", req.file)
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');

    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');

    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    const fileName = file.filename;

    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      image: `${basePath}${fileName}`,
      brand: req.body.brand,
      price: req.body.price,
       category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });

    product = await product.save();

    if (!product) {
      return res.status(500).send('The product cannot be created');
    }

    res.status(201).send(product);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// Update API

route.put('/:id', async (req, res) => {

    // if (!mongoose.isValidObjectId(req.params.id)) {
    //     return res.status(400).send('InValid Product ID ')
    // }

    const category = await Category.findById(req.body.category)
    // if (!category) return res.status(400).send('InValid Category ')


    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            CountInStock: req.body.CountInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true }  // here i want to get new updated data show in the response
    )

    if (!product) {
        return res.status(500).json({ success: false, message: 'the Product can not to updated' })
    }

    res.status(200).send(product)
})


 // Delete API


route.delete('/:id', async (req, res) => {

    Product.findByIdAndDelete(req.params.id).then((product) => {
        if (product) {
            return res.status(200).json({ success: true, message: 'product has been deleted' })
        }
        else {
            return res.status(404).json({ success: false, message: 'product not found' })
        }
    }).catch((err) => {
        return res.status(400).json({ success: false, error: err })
    })

})

// if we want the total number of products we have so mongoose has a function for this

route.get('/get/count', async (req, res) => {
    const productCount = await Product.countDocuments()

    if (!productCount) {
        return res.status(500).json({ success: false })
    }

    res.status(200).send({
        productCount: productCount
    })
})

// want to show only featured Products on the home page

route.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({ isFeatured: true }).limit(count)

    if (!products) {
        return res.status(500).json({ success: false })
    }

    res.send(products)
})






module.exports = route