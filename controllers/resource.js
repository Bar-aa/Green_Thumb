const db = require('../config/dbconnection');

const getresource = async (req, res) => {
   // if(req.users.role != "User"){
     // return res.json("NOT user")}
      try {
          const idUSER = req.params.user_id;
         
          db.query(
             ' SELECT * FROM resources WHERE owner_id = ?',
           
              [idUSER],
              (error, results) => {
                  if (error) {
                      console.error('Error executing SELECT query:', error);
                      return res.status(500).json({ success: false, error: 'An error  occurred while retrieving resorce ' });
                  }
                 res.status(200).json({ success: true, message: 'These resource:', resources: results });
  
              }
          );
      } catch (error) {
          console.error('Error retrieving materials:', error);
          res.status(500).json({ success: false, error: 'An error occurred while retrieving materials' });
      }
  };

//----------------------------------------------------------------------
const showresorce = async (req, res) => {
    try {
        db.query(
            'SELECT * FROM resources',
            (error, results) => {
                if (error) {
                    console.error('Error executing SELECT query:', error);
                    return res.status(500).json({ success: false, error: 'An error occurred while retrieving materials' });
                }
                res.status(200).json({ success: true, message: 'All resources retrieved successfully:', resources: results });
            }
        );
    } catch (error) {
        console.error('Error retrieving resource:', error);
        res.status(500).json({ success: false, error: 'An error occurred while retrieving materials' });
    }
};







  module.exports = {
    showresorce,
    getresource
   
  };