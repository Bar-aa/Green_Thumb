/*const db = require('../config/dbconnection');

const getresource = async (req, res) => {
   // if(req.users.role != "User"){
     // return res.json("NOT user")}
     try {
          const idUSER = req.params.owner_id;
         
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

//---------------------------------------------------------------------------------------------

const addResource = async (req, res) => {
    const { type, description, owner_id } = req.body;
    
    if (!type || !['tool', 'seed', 'compost', 'produce'].includes(type)) {
      return res.status(400).json({ success: false, error: 'Invalid type specified' });
    }
  
    try {
      // Check if the user exists in the users table
      const userExistsQuery = 'SELECT * FROM users WHERE user_id = ?';
      db.query(userExistsQuery, [owner_id], (userError, userResults) => {
        if (userError || userResults.length === 0) {
          // User does not exist or there was an error
          return res.status(400).json({ success: false, error: 'User does not exist or invalid owner_id' });
        }
        
        // Insert resource if user exists
        const insertResourceQuery = 'INSERT INTO resources (type, description, owner_id) VALUES (?, ?, ?)';
        db.query(insertResourceQuery, [type, description, owner_id], (resourceError, resourceResults) => {
          if (resourceError) {
            console.error('Error executing INSERT query:', resourceError);
            return res.status(500).json({ success: false, error: 'An error occurred while adding the resource', details: resourceError.message });
          }
          res.status(201).json({ success: true, message: 'Resource added successfully', resourceId: resourceResults.insertId });
        });
      });
    } catch (error) {
      console.error('Error adding resource:', error);
      res.status(500).json({ success: false, error: 'An error occurred while adding the resource', details: error.message });
    }
};

//-------------------------------------------------------------------------
const deleteresource= (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM resources WHERE resource_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'resource not found' });
        }
        res.status(200).json({ message: 'resource deleted successfully' });
    });
};

//--------------------------------------------------------------------------------------------------
const updateresource = (req, res) => {
  const { id } = req.params;
  const { type, description, owner_id } = req.body;

  if (!type || !description || !owner_id) {
      return res.status(400).json({ message: 'Missing important fields' });
  }

  const allowedTypes = ['tool', 'seed', 'compost', 'produce'];
  if (!allowedTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid type value' });
  }

  const query = 'UPDATE resources SET type = ?, description = ?, owner_id = ?, updated_at = CURRENT_TIMESTAMP WHERE resource_id = ?';
  db.query(query, [type, description, owner_id, id], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Resource not found' });
      }
      res.status(200).json({ message: ' updated successfully' });
  });
};




 const getResourceByType = (req, res) => {
    const { type } = req.params;

    
    console.log(`Received type: ${type}`);
    
    const query = 'SELECT * FROM resources WHERE TRIM(type) = ?';
    db.query(query, [type.trim()], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Resorce item not found' });
        }
        res.json(results);
    });
};



  module.exports = {
    showresorce,
    getresource,
    addResource,
    deleteresource,
    updateresource,
    getResourceByType
  };
  */
  const resourcePersistence = require('../Persistence/resourcepresistence');

  const getResourcesByOwnerId = async (req, res) => {
      const idUSER = req.params.owner_id;
      try {
          const results = await resourcePersistence.getResourcesByOwnerId(idUSER);
          res.status(200).json({ success: true, message: 'These resources:', resources: results });
      } catch (error) {
          console.error('Error retrieving resources:', error);
          res.status(500).json({ success: false, error: 'An error occurred while retrieving resources' });
      }
  };
  const getAllResources = async (req, res) => {
    try {
        const results = await resourcePersistence.getAllResources();
        res.status(200).json({ success: true, message: 'All resources retrieved successfully:', resources: results });
    } catch (error) {
        console.error('Error retrieving resources:', error);
        res.status(500).json({ success: false, error: 'An error occurred while retrieving resources' });
    }
};
const getResourceByType = (req, res) => {
    const { type } = req.params;

    console.log(`Received type: ${type}`);

    resourcePersistence.getResourceByType(type, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Resource item not found' });
        }
        res.json(results);
    });
};

const updateResource = (req, res) => {
    const { id } = req.params;
    const { type, description, owner_id } = req.body;

    if (!type || !description || !owner_id) {
        return res.status(400).json({ message: 'Missing important fields' });
    }

    resourcePersistence.updateResource(id, type, description, owner_id, (err, result) => {
        if (err) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(result.status).json({ message: result.message });
    });
};

const deleteResource = (req, res) => {
    const { id } = req.params;

    resourcePersistence.deleteResource(id, (err, result) => {
        if (err) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(result.status).json({ message: result.message });
    });
};

const addResourceToDatabase = async (req, res) => {
    const { type, description, owner_id } = req.body;
    if (!type || !description || !owner_id) {
        return res.status(400).json({ message: 'Missing important fields' });
    }

    try {
        const result = await addResourceToDatabase(type, description, owner_id);
        res.status(201).json({ resource_id: result.insertId, type, description, owner_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

  module.exports = {
      getResourcesByOwnerId,
      getAllResources,
      getResourceByType,
      updateResource,
      deleteResource,
      addResourceToDatabase
  };
  