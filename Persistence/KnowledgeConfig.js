// knowledgePersistence.js
const db = require('../config/dbconnection');

const getAllKnowledges = () => {
    const query = 'SELECT * FROM knowledgebase';
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const getKnowledgeById = (id) => {
    const query = 'SELECT * FROM knowledgebase WHERE article_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const getKnowledgeByTitle = (title) => {
    const query = 'SELECT * FROM knowledgebase WHERE TRIM(title) = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [title.trim()], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const createKnowledgeItem = (title, content, author_id) => {
    const query = 'INSERT INTO knowledgebase (title, content, author_id) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [title, content, author_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const updateKnowledge = (id, title, content, author_id) => {
    const query = 'UPDATE knowledgebase SET title = ?, content = ?, author_id = ? WHERE article_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [title, content, author_id, id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const deleteKnowledge = (id) => {
    const query = 'DELETE FROM knowledgebase WHERE article_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    getAllKnowledges,
    getKnowledgeById,
    getKnowledgeByTitle,
    createKnowledgeItem,
    updateKnowledge,
    deleteKnowledge
};
