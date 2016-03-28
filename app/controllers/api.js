var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Employee = mongoose.model('Employee')
  Entry = mongoose.model('Entry');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/api/employees/:id', function (req, res, next) {

  Employee
  .findOne({_id: req.params.id})
  .populate('entries')
  .exec(function(error, employee) {
    if (employee) {
      res.json(employee);  
    }
    else
    {
      res.json({
        error: 'Employee not found or not existing'
      });
    }
  });
});

router.get('/api/employees', function (req, res, next) {
  Employee.find()
  .populate('entries')
  .sort('-created')
  .exec(function (err, employees) {

    if (err){
      res.json({
        error: 'Something went wrong. Please try again later.'
      });
    } 
    else
    {
      res.json(employees);
    }

  });
});

router.post('/api/employees', function(req, res, next) {
  
  Employee.create({
    name: req.body.name,
    lastName: req.body.lastName,
    created: Date.now()
  }, function (err, user) {

    if (err) {
      res.json({
        error: err
      });
    }
    else
    {
      // saved!
      res.json({
        sucess: true,
        message: 'User was added',
        user: user
      });
    }

  })
});

router.post('/api/employees/:id/entry', function (req, res, next) {

  // First we get time at which user is checking in
  var now = new Date(),
      idEmployee = req.params.id; 

  // Determine if user is leaving or arriving, so we look for a today's entry if it is that exists
  Entry
    .find({
      created: {
        "$gte": +new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0),
        "$lt": +new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0)
      },
      employee: idEmployee
    })
    .exec(function(err, entry) {

         if (entry.length == 0) {

            var entry = new Entry({
                created: +now,
                arrivedAt: +now,
                leftAt: null,
                expectedArrivalTime: req.body.expectedArrivalTime,
                expectedLeavingTime: req.body.expectedArrivalTime,
                allowedTolerance: req.body.allowedTolerance,
                employee: idEmployee
            });

          // There is a record, let's updated it. 
            entry.save(function(err, entry) {

              if (err){
                res.json({
                  error: err
                });
              }
              else
              {

                Employee.update({
                  _id: req.params.id
                },{
                  $push: {
                    entries: entry._id
                  }
                }, function(err, numberAffected, raw) {

                  if (err) {
                    res.json({
                      error: err
                    });
                  }
                  else
                  {
                    res.json({
                      success: true,
                      message: 'The entry for user [user] was added.'
                    });
                  }

                });
              }

            });

         }
         else
         {
          // let's update the today's entry

          entry[0].leftAt = +now,
          entry[0].save().then(function(result) {

            res.json({
              success: true,
              message: 'Entry was registered correctly',
              entry : +now
            });

          });

         }

    });

});

router.get('/api/entries', function(req, res, next) {

  Entry
  .find()
  .populate('employee')
  .sort('-created')
  .exec(function(error, entries) {

    if (error) {
      res.json({
        error: error
      })
    }
    else
    {
      res.json({
        success: true,
        result: entries
      });
    }

  });

});

router.get('/api/employees/:id:/entries', function(req, res, next) {
  
debugger;

  Entry
  .find()
  .populate('employee')
  .sort('-created')
  .exec(function(error, entries) {

    if (error) {
      res.json({
        error: error
      })
    }
    else
    {
      res.json({
        success: true,
        message: entries
      });
    }

  });
});