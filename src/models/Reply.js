const db = require('../db/knex.js')
const {v4} = require('uuid')

const TABLE_NAME = 'replies'

const createReply = async reply => {
 
    const id = v4()

    await db(`${TABLE_NAME}`)
            .insert({ id, ...reply})

    return findById(id)
}

const deleteReply = id =>
    db(`${TABLE_NAME}`)
        .where({ id })
        .del()
        .then(count => count > 0)

const updateReply = (id, reply) =>
    db(`${TABLE_NAME}`)
        .where({ id })
        .update(reply)
        .then(count => count > 0)

const findById = id =>
    db(`${TABLE_NAME}`)
        .where({ id })
        .first()
        .then(row => {
            if (!row) return null
            return {
                id: row.id,
                content: row.content,
                questionId: row.question_id,
                userId: row.user_id,
                createdAt: row.created_at,
                updatedAt: row.updated_at
            }
        })

const findByQuestionId = questionId =>
    db(`${TABLE_NAME}`)
        .where({ question_id: questionId })
        .select('id', 'content', 'user_id', 'created_at', 'updated_at')
        .then(rows => rows.map(row => ({
            id: row.id,
            content: row.content,
            userId: row.user_id,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        })))

const findAll = () =>
    db(`${TABLE_NAME}`)
        .select('id', 'content', 'question_id', 'user_id', 'created_at', 'updated_at')
        .then(rows => rows.map(row => ({
            id: row.id,
            questionId: row.question_id,
            userId: row.user_id,
            content: row.content,
            categoryId: row.category_id,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        })))

module.exports = {
    createReply,
    deleteReply,
    updateReply,
    findById,
    findByQuestionId,
    findAll
}