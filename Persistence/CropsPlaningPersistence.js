
const conn = require('../config/dbconnection');
const queryPromise = (sql, args) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, args, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

const getAllCrops = () => {
  return queryPromise('SELECT * FROM crop_rotation');
};

const getCropById = (id) => {
  return queryPromise('SELECT * FROM crop_rotation WHERE rotation_id = ?', [id])
    .then(rows => rows[0]);
};

const addCrop = (cropData) => {
  return queryPromise(
    'INSERT INTO crop_rotation (plot_id, current_crop_id, previous_crop_id, rotation_date) VALUES (?, ?, ?, ?)',
    [cropData.plot_id, cropData.current_crop_id, cropData.previous_crop_id, cropData.rotation_date]
  ).then(result => ({ id: result.insertId, ...cropData }));
};

const updateCrop = (id, cropData) => {
  return queryPromise(
    'UPDATE crop_rotation SET plot_id=?, current_crop_id=?, previous_crop_id=?, rotation_date=? WHERE rotation_id=?',
    [cropData.plot_id, cropData.current_crop_id, cropData.previous_crop_id, cropData.rotation_date, id]
  ).then(() => ({ id, ...cropData }));
};

const deleteCrop = (id) => {
  return queryPromise('DELETE FROM crop_rotation WHERE rotation_id = ?', [id]);
};

module.exports = {
  getAllCrops,
  getCropById,
  addCrop,
  updateCrop,
  deleteCrop,
};
