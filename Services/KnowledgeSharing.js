// knowledgeController.js
const knowledgePersistence = require('../Persistence/KnowledgeConfig');

const getAllKnowledges = async (req, res) => {
    try {
        const results = await knowledgePersistence.getAllKnowledges();
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getKnowledgeById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await knowledgePersistence.getKnowledgeById(id);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Knowledge item not found' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getKnowledgeByTitle = async (req, res) => {
    const { title } = req.params;
    console.log(`Received title: ${title}`);
    try {
        const results = await knowledgePersistence.getKnowledgeByTitle(title);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Knowledge item not found' });
        }
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createKnowledgeItem = async (req, res) => {
    const { title, content, author_id } = req.body;
    if (!title || !content || !author_id) {
        return res.status(400).json({ message: 'Missing important fields' });
    }

    try {
        const result = await knowledgePersistence.createKnowledgeItem(title, content, author_id);
        res.status(201).json({ id: result.insertId, title, content, author_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateKnowledge = async (req, res) => {
    const { id } = req.params;
    const { title, content, author_id } = req.body;
    if (!title || !content || !author_id) {
        return res.status(400).json({ message: 'Missing important fields' });
    }

    try {
        const result = await knowledgePersistence.updateKnowledge(id, title, content, author_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Knowledge not found' });
        }
        res.status(200).json({ message: 'Knowledge updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteKnowledge = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await knowledgePersistence.deleteKnowledge(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Knowledge not found' });
        }
        res.status(200).json({ message: 'Knowledge deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getKnowledgeByTitle,
    getAllKnowledges,
    createKnowledgeItem,
    updateKnowledge,
    deleteKnowledge,
    getKnowledgeById
};
