const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'))
// Middleware, that can modift the incomming request data
app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use((req, res, next) => {
    console.log('hello from the middleware');
    next();
});



const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {tours}
    });
};

const getTourById = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => { 
    
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

const deleteTour = (req, res) => { 
    
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



// app.get('/api/v1/tours', getAllTours);
// Add : and a name to accept params off from the url, 
// add a ? to make them optional
// app.get('/api/v1/tours/:id', getTourById);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app
 .route('/api/v1/tours')
 .get(getAllTours)
 .post(createTour);

 app
 .route('/api/v1/tours/:id')
 .get(getTourById)
 .patch(updateTour)
 .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});
