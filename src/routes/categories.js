const Category = require('../models/Category.js')
const { authenticate } = require('../middleware/auth.js');
const router = require('express').Router();


router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll()

        if(!categories)
            res.json([])
        
        res.json(categories)
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching categories' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findById(id)
        
        if (!category) 
            return res.status(404).json({ error: 'Category not found' })
        
        res.json(category)
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching category' })
    }
})

router.post('/', authenticate, async (req, res) => {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ message: 'A descrição é obrigatória.' });
    }

    try {
        const newCategory = await Category.create({ description });

        res.status(201).json(newCategory);
    } catch (error) {
        console.error("### ERRO DETALHADO NO BACKEND AO CRIAR CATEGORIA ###");
        console.error(error); 

        if (error.message.includes('UNIQUE constraint') || 
            error.message.includes('already exists') ||

            error.code === 'SQLITE_CONSTRAINT' // Específico para SQLite
        ) {
            return res.status(409).json({ message: `A categoria "${description}" já existe.` });
        }
        return res.status(500).json({ 
            message: "Erro interno no servidor ao tentar criar a categoria. Verifique os logs do backend.",
            error: error.message 
        });
    }
});

router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params
    
    try {
        const deleted = await Category.deleteCategory(id)
        
        if (!deleted) 
            return res.status(404).json({ error: 'Category not found' })
        
        res.json({ message: 'Category deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error deleting category' })
    }
})

router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    
    if (!name) {
        return res.status(400).json({ error: 'Name is required' })
    }
    
    try {
        const updatedCategory = {
            description: name,
        }
        
        const updated = await Category.updateCategory(id, updatedCategory)
        
        if (!updated) 
            return res.status(404).json({ error: 'Category not found' })
        
        res.json(updatedCategory)
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error updating category' })
    }
})

module.exports = router