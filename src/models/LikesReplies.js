const db = require('../db/knex');

const TABLE_NAME = 'replies_likes'

const findById = id =>
    db(`${TABLE_NAME}`)
        .where({ reply_id: id })
        .count('user_id as likesCount')
        .then(rows => {
            if (rows.length === 0) {
                return 0; // No likes found
            }
            return rows[0].likesCount;
        })

const findByUserId = (replyId, userId) =>
    db(TABLE_NAME)
        .where({ reply_id: replyId, user_id: userId })
        .first()
        .then()

const createLike = (replyId, userId) =>
    db(`${TABLE_NAME}`)
        .insert({ reply_id: replyId, user_id: userId })
        .then(() => ({ replyId, userId }));

const deleteLike = (replyId, userId) =>
    db(`${TABLE_NAME}`)
        .where({ reply_id: replyId, user_id: userId })
        .del()
        .then(rowsAffected => {
            if (rowsAffected === 0) {
                throw new Error('Like not found');
            }
            return rowsAffected;
        });

module.exports = {
    findById,
    findByUserId,
    createLike,
    deleteLike
};