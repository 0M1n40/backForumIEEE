const { v4 } = require('uuid')
const db = require('../db/knex.js')

const TABLE_NAME = 'questions'

const findById = id =>
    db(`${TABLE_NAME}`)
        .where({ id })
        .first()
        .then(row => {
            if (!row) return null
            return {
                id: row.id,
                title: row.title,
                categoryId: row.category_id,
                category: row.category_description,
                content: row.content,
                solved: row.solved,
                userId: row.user_id,
                createdAt: row.created_at,
                updatedAt: row.updated_at
            }
        })

const createQuestion = async question => {

    const id = v4()

    await db(`${TABLE_NAME}`)
            .insert({ id, ...question})
            .then(rows => rows[0])

    return findById(id)
}

const resolveQuestion = id =>
    db(`${TABLE_NAME}`)
        .where({ id })
        .update({ solved: true })
        .then(count => count > 0 ? findById(id) : null)

const deleteQuestion = id =>
    db(`${TABLE_NAME}`)
        .where({ id })
        .del()
        .then(count => count > 0)

const updateQuestion = (id, question) =>
    db(`${TABLE_NAME}`)
        .where({ id })
        .update(question)
        .then(count => count > 0)

const findByCategoryName = categoryName =>
    db(`${TABLE_NAME}`)
        .join('categories', `${TABLE_NAME}.category_id`, 'categories.id')
        .where('categories.description', categoryName)
        .select(`${TABLE_NAME}.*`)
        .then(rows => rows)

const findAll = () =>
    db(`${TABLE_NAME} as q`)
        .innerJoin('categories as c', 'q.category_id', 'c.id')
        .select(
            'q.id', 
            'q.title', 
            'q.category_id',
            'c.description as category_description', 
            'q.content',
            'q.solved',
            'q.user_id',
            'q.created_at', 
            'q.updated_at'
        )
        .then(rows => rows.map(row => ({
            id: row.id,
            title: row.title,
            categoryId: row.category_id,
            category: row.category_description,
            content: row.content,
            solved: row.solved,
            createdAt: row.created_at,
            userId: row.user_id,
            updatedAt: row.updated_at
        })))

module.exports = {
    findById,
    createQuestion,
    deleteQuestion,
    updateQuestion,
    findByCategoryName,
    findAll,
    resolveQuestion
}