const Category = require('../models/Category.js')
const { authenticate } = require('../middleware/auth.js');
const router = require('express').Router();


router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll()
       res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching categories' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findById(id)
        
        if (!category) 
            return res.status(404).json({ error: error.message || 'Category not found' })
        
        res.json({ category })
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching category' })
    }
})

// router.post('/', authenticate, async (req, res) => {
//      console.log("BACKEND RECEBEU no req.body:", req.body);
//     const { name } = req.body
    
//     if (!name) {
//         return res.status(400).json({ error: 'Name is required' })
//     }
    
//     try {
//         const newCategory = {
//             description: name,
//         }
        
//         await Category.createCategory(newCategory)
//         res.status(201).json(newCategory)
//     } catch (error) {
//         res.status(500).json({ error: error.message || 'Error creating category' })
//     }
// })

router.post('/', authenticate, async (req, res) => {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ message: 'A descrição é obrigatória.' });
    }

    try {
        // o newCategory existe??
        const newCategory = await Category.create({ description });
        // Se chegar aqui, o sucesso é garantido
        res.status(201).json(newCategory);

    } catch (error) {
        // --- LÓGICA DE ERRO MELHORADA ---
 
        // 1. Loga o erro COMPLETO e DETALHADO no console do backend.
        console.error("### ERRO DETALHADO NO BACKEND AO CRIAR CATEGORIA ###");
        console.error(error); 

        // 2. Verifica se o erro é REALMENTE de duplicidade
        // (Procura por palavras-chave que os bancos de dados usam para isso)
        if (error.message.includes('UNIQUE constraint') || 
            error.message.includes('já existe') || 
            error.code === 'SQLITE_CONSTRAINT' // Específico para SQLite
        ) {
            return res.status(409).json({ message: `A categoria "${description}" já existe.` });
        }

        // 3. Para TODOS os outros erros, retorna um erro 500 (Erro Interno do Servidor)
        //    Isso indica um problema inesperado no nosso código do backend.
        return res.status(500).json({ 
            message: "Erro interno no servidor ao tentar criar a categoria. Verifique os logs do backend.",
            // Inclui a mensagem de erro real para facilitar a depuração no frontend
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
        
        res.json({ updatedCategory })
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error updating category' })
    }
})

module.exports = router