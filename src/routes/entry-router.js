import express from 'express';
import {getEntries, postEntry,deleteEntryById, updateEntry} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const entryRouter = express.Router();



// post to /api/entries
entryRouter

  .route('/')
  .post(
    authenticateToken,
    body('entry_date').notEmpty().isDate(),
    body('mood').trim().notEmpty().isLength({min: 3, max: 25}).escape(),
    body('energy_level').isInt({min: 0, max: 10}),
    body('stress_level').isInt({min: 0, max: 10}),
    body('sleep_hours').isInt({min: 0, max: 24}),
    body('notes').isLength({min: 0, max: 1500}).escape(),
    body('goals').trim().notEmpty().isLength({min: 3, max: 25}).escape(),
    //body('notes').trim().escape().custom((value, {req}) => {
      // customvalidointiesimerkki: jos sisältö sama kuin mood-kentässä
      // -> ei mee läpi
      // https://express-validator.github.io/docs/guides/customizing#implementing-a-custom-validator
     // console.log('custom validator', value);
      //return !(req.body.mood === value);
    //}),

    validationErrorHandler,
    postEntry,
  )
  .get(authenticateToken, getEntries);

  
  // PUT & DELETE /api/entries/:id
entryRouter
  .route('/:id')
  .put(
    authenticateToken,
    body('entry_date').notEmpty().isDate(),
    body('mood').trim().notEmpty().isLength({ min: 3, max: 25 }).escape(),
    body('energy_level').isInt({ min: 0, max: 10 }),
    body('stress_level').isInt({ min: 0, max: 10 }),
    body('sleep_hours').isInt({ min: 0, max: 24 }),
    body('notes').isLength({ min: 0, max: 1500 }).escape(),
    body('goals').trim().notEmpty().isLength({ min: 3, max: 25 }).escape(),
    validationErrorHandler,
    updateEntry
  )
  .delete(authenticateToken, deleteEntryById);

export default entryRouter;