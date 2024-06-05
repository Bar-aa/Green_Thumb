const db = require('../config/dbconnection');

const getAllKnowledges = (req, res) => {
    const query = 'SELECT * FROM knowledgebase';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
};

const getKnowledgeById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM knowledgebase WHERE article_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Knowledge item not found' });
        }
        res.json(result[0]);
    });
};
const getKnowledgeByTitle = (req, res) => {
    const { title } = req.params;

    // Print the title for debugging purposes
    console.log(`Received title: ${title}`);

    const query = 'SELECT * FROM knowledgebase WHERE TRIM(title) = ?';
    db.query(query, [title.trim()], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Knowledge item not found' });
        }
        res.json(results);
    });
};

const createKnowledgeItem = (req, res) => {
    const { title, content, author_id } = req.body;
    if (!title || !content || !author_id) {
        return res.status(400).json({ message: 'Missing important fields' });
    }

    const query = 'INSERT INTO knowledgebase (title, content, author_id) VALUES (?, ?, ?)';
    db.query(query, [title, content, author_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ id: result.insertId, title, content, author_id });
    });
};

const updateKnowledge = (req, res) => {
    const { id } = req.params;
    const { title, content, author_id } = req.body;

    if (!title || !content || !author_id) {
        return res.status(400).json({ message: 'Missing important fields' });
    }

    const query = 'UPDATE knowledgebase SET title = ?, content = ?, author_id = ? WHERE article_id = ?';
    db.query(query, [title, content, author_id, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Knowledge not found' });
        }
        res.status(200).json({ message: 'Knowledge updated successfully' });
    });
};

const deleteKnowledge = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM knowledgebase WHERE article_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Knowledge not found' });
        }
        res.status(200).json({ message: 'Knowledge deleted successfully' });
    });
};

module.exports = {
    getKnowledgeByTitle,
    getAllKnowledges,
    createKnowledgeItem,
    updateKnowledge,
    deleteKnowledge,
    getKnowledgeById
    
};
