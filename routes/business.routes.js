
    const business = require('../controllers/business.controller.js')

    const router = require('express').Router() 

    router.post('/', business.create)

    router.get('/', business.findAll)

    router.get('/:id', business.findOne)

    router.put('/:id', business.update)

    router.delete('/:id', business.delete)

    //router.delete('/', shop.deleteAll)
    

   module.exports= router
