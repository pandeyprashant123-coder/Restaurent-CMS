
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
      },
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        address_label: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        area: { type: String },
        landmark: { type: String },
        alternate_number: { type: String }
    },    
    mobile: {
        type: String,
        required: true
      },
    paymentMethod: {
        type: String,
        enum: ['COD', 'Esewa', 'Card'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});




orderSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

export const Order = mongoose.model('Order', orderSchema);