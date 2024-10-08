const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    tours: tours,
  });
};

//Getting Tour ID
const getTourId = (req, res) => {
  //Converting string to array
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  //Catching failed response
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found with that ID',
    });
  }

  //catching success response
  res.status(200).json({
    status: 'success',
    tour: tour,
  });
};

//Create Tours
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

//Update Tours
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found with that ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here....>',
    },
  });
};

//Delete Tours
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found with that ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTourId);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

// app.route('/api/v1/tours').get(getAllTours).post(createTour);
// app.route('/api/v1/tours').get(getTourId).patch(updateTour).delete(deleteTour);

//Listening on Port
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
