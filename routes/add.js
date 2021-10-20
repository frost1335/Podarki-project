const { Router } = require("express");
const Product = require("../models/Product");
const file = require("../middleware/file");
const router = Router();

const filterInfo = (req) => {
    const arrValues = Object.values(req.body);
    console.log(arrValues);
    const keys = Object.keys(req.body).map((c, i) => {
        if (c.indexOf("box") === 0) {
            if (arrValues[i] instanceof Array) {
                return arrValues[i];
            } else {
                return [arrValues[i]];
            }
        }
    });
    const filterKeys = keys.filter((c) => c);
    const info = req.body.infoTitle.map((c, i) => {
        return {
            infoTitle: c,
            infoText: filterKeys[i].map(c => {
                return ({ text: c })
            }),
        };
    });
    return info;
};

router.get("/add", (req, res) => {
    res.render("add", {
        title: "Добавить продукт",
        layout: 'admin'
    });
});

router.post("/add", file.single("image"), async (req, res) => {
    try {
        req.file ? (image = req.file.filename) : (image = "");
        const { name, price, weight } = req.body;
        const product = new Product({
            name,
            price,
            info: filterInfo(req),
            weight,
            image,
        });
        await product.save();
        res.redirect("/");
    } catch (e) {
        console.log(e.message);
    }
});


router.get("/edit/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("edit-page", {
        title: `Изменить ${product.name}`,
        product,
        layout: 'admin'
    });
});


router.post("/edit/:id", file.single("image"), async (req, res) => {
    const product = await Product.findById(req.params.id);
    req.file ? (image = req.file.filename) : (image = product.image);
    const { name, price, weight } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        info: filterInfo(req),
        weight,
        image,
    });
    res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/");
});


module.exports = router