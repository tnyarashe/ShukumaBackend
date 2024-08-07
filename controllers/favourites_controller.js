
const Favorite = require('../models/favourites_models');


exports.add =  async (req, res) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemId;

    const existingFavorite = await Favorite.findOne({ userId, itemId }).populate('itemId');
    
    if (existingFavorite) {

      return res.status(400).send({ message: 'Item already favorited' });
    }

    const newFavorite = new Favorite({ userId, itemId });
    await newFavorite.save();

    res.status(201).send({ message: 'Item added to favorites', favorite: newFavorite });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error adding item to favorites', error });
  }
};

exports.remove =  async (req, res) => {
    try {
      const id = req.params.id;

      // const itemId = req.body.id
      console.log(id)

     
        const faves = await Favorite.findOneAndDelete(id.toString());

        await faves.save()
        res.status(200).send({ message: 'Favorite removed' });
      

      
      
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error removing favorite' });
    }
}

exports.fetchAll = async (req, res) => {
    try {
      const userId = req.body;
      const favorites = await Favorite.find(userId).populate('itemId'); 
      res.status(200).send(favorites);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error retrieving favorites' });
    }
  }

  exports.removeAll =  async (req, res) => {
    try {
      const id = req.params.id;

      // const itemId = req.body.id
      console.log(id)

     
        const faves = await Favorite.deleteMany();
        
        console.log(faves)
        res.status(200).send({ message: 'Favorite removed' });
      

      
      
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error removing favorite' });
    }
}
