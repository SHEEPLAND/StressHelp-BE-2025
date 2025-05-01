import {insertEntry, selectEntriesByUserId, deleteEntry, updateEntryById} from '../models/entry-model.js';

const postEntry = async (req, res, next) => {
  // user_id, entry_date, mood, sleep_hours, notes
  const newEntry = req.body;
  newEntry.user_id = req.user.userId;
  try {
    const entry_id = await insertEntry(newEntry);
    res.status(201).json({message: "Entry added." , entry_id: entry_id});
  } catch (error) {
    next(error);
  }
};

/**
 * Get all entries of the logged in user
 * @param {*} req
 * @param {*} res
 */
const getEntries = async (req, res, next) => {
  try {
    const entries = await selectEntriesByUserId(req.user.userId);
    res.json(entries);
  } catch (error) {
    next(error);
  }
};

// DELETE Function
const deleteEntryById = async (req, res, next) => {
  const entryId = req.params.id;
  const userId = req.user.userId;

  try {
    const result = await deleteEntry(entryId, userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Entry not found or not authorized" });
    }
    res.status(200).json({ message: "Entry deleted" });
  } catch (error) {
    next(error);
  }
};

const updateEntry = async (req, res, next) => {
  const entryId = req.params.id;
  const userId = req.user.userId;
  const updatedData = req.body;

  try {
    const result = await updateEntryById(entryId, userId, updatedData);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Entry not found or not authorized" });
    }

    res.status(200).json({ message: "Entry updated" });
  } catch (error) {
    next(error);
  }
};


export { postEntry, getEntries, deleteEntryById, updateEntry };