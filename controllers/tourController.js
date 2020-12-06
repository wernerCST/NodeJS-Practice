const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
); 

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {tours}
    });
};

exports.getTourById = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    
    // if(id > tours.length) { 
    if(!tour) { 
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    
    
    res.status(200).json({
        status: 'success',
        data: {tour}
    });
};

exports.createTour = (req, res) => {
    // console.log(req.body);
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newID}, req.body);
    tours.push(newTour);
    // Never ever ever, block the event loop from a call back fundtion.
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        if(err) { res.status(500).send("server error");}
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};

exports.updateTour = (req, res) => { 
    
    if(req.params.id * 1 > tours.length) { 
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status: "success",
        data: {tour: 'updated tour'}
    });
};

exports.deleteTour = (req, res) => { 
    
    if(req.params.id * 1 > tours.length) { 
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(204).json({
        status: "success",
        data: null
    }); 
};