'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductosSchema = Schema({
    handle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    grams: {
        type: String,
        required: true
    },
    compare_price: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },

    barcode: {
        type: String,
        required: true
    },


});

module.exports = mongoose.model('productos', ProductosSchema);