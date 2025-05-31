const mongodb = require('../db/database');
const { ObjectId } = require('mongodb');

const controller = {};

controller.getAll = async (req, res) => {
    //#swagger.tags=['Bugs']
    //#swagger.summary = 'Get all bugs'
    //#swagger.description = 'Retrieve all bugs.'
    /*#swagger.responses[200] = {
        description: 'Successfully retrieved bugs',
        schema: [
            {
                $ref: '#/components/schemas/Bug'
            }
        ]
    }*/
    /*#swagger.responses[500] = {
        description: 'Internal server error',
        schema: { 
            error: 'An error occurred while retrieving bugs.'
        }
    }*/
    try {
        const result = await mongodb.getDb().db().collection('bugs').find();
        const bugs = await result.toArray();
        res.json(bugs);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving bugs.' });
    }
};

controller.getOne = async (req, res) => {
    //#swagger.tags=['Bugs']
    //#swagger.summary = 'Get bug by ID'
    //#swagger.description = 'Retrieve a specific bug by ID.'
    /*#swagger.parameters['id'] = {
        description: 'ID of the bug',
        type: 'string',
        example: '507f1f77bcf86cd799439011'
    }*/
    /*#swagger.responses[200] = {
        description: 'Successfully retrieved bug',
        schema: {
            $ref: '#/components/schemas/Bug'
        }
    }*/
    /*#swagger.responses[400] = {
        description: 'Invalid bug ID format',
        schema: { 
            error: 'Must use a valid bug id to find a bug.'
        }
    }*/
    /*#swagger.responses[404] = {
        description: 'Bug not found',
        schema: { 
            error: 'Bug not found.'
        }
    }*/
    /*#swagger.responses[500] = {
        description: 'Internal server error',
        schema: { 
            error: 'An error occurred while retrieving the bug.'
        }
    }*/
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid bug id to find a bug.' });
        }
        
        const bugId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('bugs').find({ _id: bugId });
        const bugs = await result.toArray();
        
        if (bugs.length === 0) {
            return res.status(404).json({ error: 'Bug not found.' });
        }
        
        res.json(bugs[0]);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving the bug.' });
    }
};

controller.create = async (req, res) => {
    //#swagger.tags=['Bugs']
    //#swagger.summary = 'Create a new bug'
    //#swagger.description = 'Create a new bug.'
    /*#swagger.parameters['obj'] = {
        in: 'body',
        description: 'Bug information',
        required: true,
        schema: {
            title: "Login button not responding on mobile devices",
            description: "Users are unable to click the login button on iOS Safari. Button appears clickable but no action occurs when tapped.",
            severity: "High",
            priority: "Medium",
            status: "Open",
            assignedDeveloper: "jane.smith@company.com",
            reporter: "john.doe@company.com"
        }
    }*/
    /*#swagger.responses[201] = {
        description: 'Bug successfully created',
        schema: {
            success: true,
            id: 'Generated bug ID'
        }
    }*/
    /*#swagger.responses[400] = {
        description: 'Bad request - missing required fields',
        schema: { 
            error: 'Missing required fields'
        }
    }*/
    /*#swagger.responses[500] = {
        description: 'Internal server error',
        schema: { 
            error: 'An error occurred while creating the bug.'
        }
    }*/
    try {
        const bug = {
            title: req.body.title,
            description: req.body.description,
            severity: req.body.severity,
            priority: req.body.priority,
            status: req.body.status,
            assignedDeveloper: req.body.assignedDeveloper,
            reporter: req.body.reporter,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const result = await mongodb.getDb().db().collection('bugs').insertOne(bug);
        
        if (result.acknowledged) {
            res.status(201).json({ success: true, id: result.insertedId });
        } else {
            res.status(500).json({ error: 'An error occurred while creating the bug.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while creating the bug.' });
    }
};

controller.update = async (req, res) => {
    //#swagger.tags=['Bugs']
    //#swagger.summary = 'Update bug by ID'
    //#swagger.description = 'Update an existing bug by ID.'
    /*#swagger.parameters['id'] = {
        description: 'ID of the bug to update',
        type: 'string',
        example: '507f1f77bcf86cd799439011'
    }*/
    /*#swagger.parameters['obj'] = {
        in: 'body',
        description: 'Bug information',
        required: true,
        schema: {
            title: "Login button not responding on mobile devices",
            description: "Users are unable to click the login button on iOS Safari. Button appears clickable but no action occurs when tapped.",
            severity: "High",
            priority: "Medium",
            status: "Open",
            assignedDeveloper: "jane.smith@company.com",
            reporter: "john.doe@company.com"
        }
    }*/
    /*#swagger.responses[204] = {
        description: 'Bug successfully updated'
    }*/
    /*#swagger.responses[400] = {
        description: 'Invalid bug ID format or missing required fields',
        schema: { 
            error: 'Error message'
        }
    }*/
    /*#swagger.responses[404] = {
        description: 'Bug not found',
        schema: { 
            error: 'Bug not found or no changes made.'
        }
    }*/
    /*#swagger.responses[500] = {
        description: 'Internal server error',
        schema: { 
            error: 'An error occurred while updating the bug.'
        }
    }*/
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid bug id to update a bug.' });
        }
        
        const bugId = new ObjectId(req.params.id);
        const bug = {
            title: req.body.title,
            description: req.body.description,
            severity: req.body.severity,
            priority: req.body.priority,
            status: req.body.status,
            assignedDeveloper: req.body.assignedDeveloper,
            reporter: req.body.reporter,
            updatedAt: new Date()
        };
        
        const result = await mongodb.getDb().db().collection('bugs').replaceOne({ _id: bugId }, bug);
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Bug not found.' });
        }
        
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Bug not found or no changes made.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while updating the bug.' });
    }
};

controller.delete = async (req, res) => {
    //#swagger.tags=['Bugs']
    //#swagger.summary = 'Delete bug by ID'
    //#swagger.description = 'Delete a bug by ID.'
    /*#swagger.parameters['id'] = {
        description: 'ID of the bug to delete',
        type: 'string',
        example: '507f1f77bcf86cd799439011'
    }*/
    /*#swagger.responses[204] = {
        description: 'Bug successfully deleted'
    }*/
    /*#swagger.responses[400] = {
        description: 'Invalid bug ID format',
        schema: { 
            error: 'Must use a valid bug id to delete a bug.'
        }
    }*/
    /*#swagger.responses[404] = {
        description: 'Bug not found',
        schema: { 
            error: 'Bug not found.'
        }
    }*/
    /*#swagger.responses[500] = {
        description: 'Internal server error',
        schema: { 
            error: 'An error occurred while deleting the bug.'
        }
    }*/
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Must use a valid bug id to delete a bug.' });
        }
        
        const bugId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('bugs').deleteOne({ _id: bugId });
        
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Bug not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while deleting the bug.' });
    }
};

module.exports = controller;