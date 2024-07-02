const mongoose = require('mongoose')
var business_schema = mongoose.Schema(
        {
            name: String,
            email: String,
            password: String,
            tel_no: String,
            address: String,
            img: {
                type: String,
                default: "https://www.thesait.org.za/global_graphics/default-store-350x350.jpg"
            },
        }
    );

    business_schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Business = mongoose.model("business", business_schema)

    module.exports = Business