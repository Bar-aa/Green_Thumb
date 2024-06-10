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
    const type = req.body['type'];
    const description = req.body['description'];
    const owner_id = req.body['owner_id'];
        if (!type || !description || !owner_id) {
        return res.status(400).json({ message: 'Missing important fields' });
    }

    try {
        const result = await resourcePersistence.addResourceToDatabase(type, description, owner_id);
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