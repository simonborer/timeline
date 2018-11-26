'use strict'

var express = require('express')

var timelineRoutes = express.Router()

var Timeline = require('./Timeline')

// get all timelines in the db

timelineRoutes.route('/all').get(function (req, res, next) {
  Timeline.find(function (err, timelines) {
    if (err) {
      return next(new Error(err))
    }

    res.json(timelines) // return all timelines
  })
})

// create a timeline item
timelineRoutes.route('/add').post(function (req, res) {
  Timeline.create(
    {
      name: req.body.name,
      done: false
    },
    function (error, timeline) {
      if (error) {
        res.status(400).send('Unable to create timeline list')
      }
      res.status(200).json(timeline)
    }
  )
})

// delete
timelineRoutes.route('/delete/:id').get(function (req, res, next) {
  var id = req.params.id
  Timeline.findByIdAndRemove(id, function (err, timeline) {
    if (err) {
      return next(new Error('Timeline was not found'))
    }
    res.json('Successfully removed')
  })
})

// perform update 

timelineRoutes.route('/update/:id').post(function (req, res, next) {
  var id = req.params.id
  Timeline.findById(id, function (error, timeline) {
    if (error) {
      return next(new Error('Timeline was not found'))
    } else {
      timeline.name = req.body.name
      timeline.done = req.body.done

      timeline.save({
        function (error, timeline) {
          if (error) {
            res.status(400).send('Unable to update timeline')
          } else {
            res.status(200).json(timeline)
          }
        }
      })
    }
  })
})

module.exports = timelineRoutes

