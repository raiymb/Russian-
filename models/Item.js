const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        en: { type: String, required: true },
        ru: { type: String, required: true }
    },
    description: {
        en: { type: String, required: true },
        ru: { type: String, required: true }
    },
    images: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
});

itemSchema.methods.softDelete = function() {
    this.deletedAt = new Date();
    return this.save();
};

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
