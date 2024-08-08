//import the tourPackage module
const TourPackage = require("../modules/tourPackages");

//define the tourPackage Controller
const tourPackageController = {
    // define the createTour method
    createTour: async (req, res) => {
        const newTourPackage = new TourPackage(req.body);

        try {
            //save the new Tour package
            const savedTourPackage = await newTourPackage.save();

            //return a success message with saved user
            res.status(200).json({ message: "TourPackage created successfully", savedTourPackage });


        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    listTours: async (req, res) => {

        const page = parseInt(req.query.page)

        try {
            //get all tours from the Database
            const tours = await TourPackage.find({}).populate('reviews').skip(page * 8).limit(8).select("-__v");

            // return the tours 
            res.status(200).json( tours );

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getTourById: async (req, res) => {
        try {
            // get the tour id in req params
            const tourId = req.params.id;

            //find the tour in database
            const tour = await TourPackage.findById(tourId).populate('reviews').select("-__v");

            //if the tour does not exists, return a error message
            if (!tour) {
                return res.status(400).json({ message: "Tour not found" })
            }
            res.status(200).json( tour )
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //define the tourUpdate method
    updateTourById: async (req, res) => {
        try {
            // get the tour id in req params
            const tourId = req.params.id;

            //get the updated input form req body
            const updatedTour = await TourPackage.findByIdAndUpdate(tourId, req.body, { new: true });

            //if the tour does not exists, return a error message
            if (!updatedTour) {
                return res.status(400).json({ message: "Tour not found" })
            }

            //return the success message
            res.status(200).json({ message: "Tour Details Updated Successfully", TourPackage: updatedTour })

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //define the tourDelete method
    deleteTourById: async (req, res) => {
        try {
            // get the tour id in req params
            const tourId = req.params.id;

            //find the tour id database
            const deleteTour = await TourPackage.findByIdAndDelete(tourId);

            //if the tour does not exists, return a error message
            if (!deleteTour) {
                return res.status(400).json({ message: " Tour not found to delete" })
            }
            //return the success message
            res.status(200).json({ message: "Tour successfully Deleted" });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    getTourBySearch: async (req, res) => {

        const city = new RegExp(req.query.city, 'i')
        const distance =  parseInt(req.query.distance,)
        const price =  parseInt(req.query.price, )

        try {

            const tours = await TourPackage.find({ city, distance: { $gte: distance }, price: { $gte: price } }).populate('reviews').select("-__v");

        res.status(200).json( {data:tours} );


        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAvailableTour: async (req, res) => {

        try {
            //get available tours from the Database
            const tours = await TourPackage.find({ isAvailable: true }).populate('reviews').limit(8).select("-__v");

            // return the tours 
            res.status(200).json( tours );

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getTourCount: async (req, res) => {

        try {
            const tourCount = await TourPackage.estimatedDocumentCount()

            res.status(200).json( tourCount );

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

//export the module
module.exports = tourPackageController;
