const Business = require('../models/business_model')
const UploadImage = require('../middleware/images_controllers')

exports.create = async (req, res) => {
    
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
        const imgUrl  = await UploadImage.UploadImage(req.files.images)
        console.log(imgUrl)
        const business = new Business({
        name: req.body.name,
        img: imgUrl.Location,
        email: req.body.email,
        tel_no: req.body.tel_no,
        address: req.body.address,
        description: req.body.description
    })

    business
        .save(business)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Some error while trying to save the business"
            })
        })
}

exports.findAll = (req, res) => {
    const name = req.query.name
    let condition = name ? { name: { $regex: new RegExp(name), $options: 'i'} } : {}

    Business.find(condition)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ msg: err.message || "Some error occurred while retrieving data" })
        })
}
exports.findOne = async (req, res) => {
    const id = req.params.id;
  
    Business.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Shop with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Shop with id=" + id });
      });
  };

exports.update = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({ msg: "Date to update cannot be empty!" })
    }

    const id = req.params.id
    
    Business.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({
                    msg: `Cannot update Shope with id=${id}. Maybe it was not found`
                })
            } else res.status(201).send({ msg: "Shop was updated successfully." })
        })
        .catch(err => {
            res.status(500).send({ msg: `Error updating Shop with id=${id}`})
        })
}

exports.delete = async (req, res) => {
    const id = req.params.id

    Business.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({ msg: `Cannot delete Shop with id=${id}. Maybe Shop was not found`})
            } else res.status(201).send({ msg: 'Shop was deleted successfully!' })
        })
        .catch( err => {
            res.status(500).send({ msg: `Could not delete Shop with id=${id}` })
        })
}

// exports.deleteAll = (req, res) => {
    
//     Shop.deleteMany()
//         .then(data => {
//             res.status(404).send({ 
//                 message: data + ' All shops were deleted successfully!' 
//             });
           
//         })
//         .catch(err => {
//             res.status(500).send({
//                message:
//                 err.message || "Some error occured while removing all Products."
//             });
//         });
// }