const db = require('../db/knex');

const TABLE_NAME = 'questions_likes'

const findById = id =>
    db(`${TABLE_NAME}`)
        .where({ question_id: id })
        .count('user_id as likesCount')
        .then(rows => {
            if (rows.length === 0) {
                return 0; // No likes found
            }
            return rows[0].likesCount;
        })

const findByUserId = (questionId, userId) =>
    db(TABLE_NAME)
        .where({ question_id: questionId, user_id: userId })
        .first()
        .then()

const createLike = (questionId, userId) =>
    db(`${TABLE_NAME}`)
        .insert({ question_id: questionId, user_id: userId })
        .then(() => ({ questionId, userId }));

const deleteLike = (questionId, userId) =>
    db(`${TABLE_NAME}`)
        .where({ question_id: questionId, user_id: userId })
        .del()
        .then(rowsAffected => {
            if (rowsAffected === 0) {
                throw new Error('Like not found');
            }
            return rowsAffected;
        });

module.exports = {
    findById,
    deleteLike,
    findByUserId,
    createLike
};