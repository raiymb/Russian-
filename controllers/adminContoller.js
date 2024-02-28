
const Item = require('../models/Item');

exports.addItem = async (req, res) => {
    try {
        const { nameEn, nameRu, descriptionEn, descriptionRu, images } = req.body;

        const newItem = new Item({
            name: { en: nameEn, ru: nameRu },
            description: { en: descriptionEn, ru: descriptionRu },
            images,
            createdAt: new Date()
        });

        await newItem.save();

        res.status(201).send('Item added successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const { nameEn, nameRu, descriptionEn, descriptionRu, images } = req.body;

        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).send('Item not found');
        }

        item.name = { en: nameEn, ru: nameRu };
        item.description = { en: descriptionEn, ru: descriptionRu };
        item.images = images;
        item.updatedAt = new Date(); 
        await item.save();

        res.send('Item updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).send('Item not found');
        }

        await item.softDelete();

        res.send('Item deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

