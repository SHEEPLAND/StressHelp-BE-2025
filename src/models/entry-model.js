import promisePool from '../utils/database.js';

const insertEntry = async (entry) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO DiaryEntries (user_id, entry_date, mood, energy_level, stress_level, sleep_hours, notes, goals) VALUES (?, ?, ?, ?, ? ,?, ?, ?)',
      [entry.user_id, entry.entry_date, entry.mood,entry.energy_level, entry.stress_level, entry.sleep_hours, entry.notes, entry.goals],
    );
    console.log('inserEntry', result);
    // return only first item of the result array
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const selectEntriesByUserId = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const deleteEntry = async (entryId, userId) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM DiaryEntries WHERE entry_id = ? AND user_id = ?',
      [entryId, userId]
    );
    console.log('deleteEntry', result);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const updateEntryById = async (entryId, userId, updatedData) => {
  try {
    const [result] = await promisePool.query(
      `UPDATE DiaryEntries
       SET entry_date = ?, mood = ?, energy_level = ?, stress_level = ?, sleep_hours = ?, notes = ?, goals = ?
       WHERE entry_id = ? AND user_id = ?`,
      [
        updatedData.entry_date,
        updatedData.mood,
        updatedData.energy_level,
        updatedData.stress_level,
        updatedData.sleep_hours,
        updatedData.notes,
        updatedData.goals,
        entryId,
        userId
      ]
    );
    console.log('updateEntryById', result);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};


export { insertEntry, selectEntriesByUserId, deleteEntry, updateEntryById };