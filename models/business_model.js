const mongoose = require('mongoose')
var business_schema = mongoose.Schema(
        {
            name:{ 
                type: String,
                required: true,
                trim: true,
                unique: true,
            },
            email: { 
                type: String,
                required: true,
                trim: true
            },
            description: { 
                type: String,
                required: true,
                trim: true
            },
            industry: String,
            tel_no: { 
                type: String,
                required: true,
                trim: true
            },
            address: String,
            img: {
                type: String,
                default: "https://www.thesait.org.za/global_graphics/default-store-350x350.jpg"
            },
            // admins: [{
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'User' 
            //   }],
            //   users: [{
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'User' 
            //   }]
        }
    );

    business_schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Business = mongoose.model("business", business_schema)

    module.exports = Business