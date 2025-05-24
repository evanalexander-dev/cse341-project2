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
    /*#swagger.responses[400] = {
        description: 'Error retrieving bugs',
        schema: { 
            message: 'Error message'
        }
    }*/
    const result = await mongodb.getDb().db().collection('bugs').find();
    result.toArray().then((bugs, err) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.json(bugs);
    });
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
        description: 'Error retrieving bug',
        schema: { 
            message: 'Error message'
        }
    }*/
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid bug id to find a bug.');
    }
    const bugId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('bugs').find({ _id: bugId });
    result.toArray().then((bugs, err) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.json(bugs[0]);
    });
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
        description: 'Bug successfully created'
    }*/
    /*#swagger.responses[412] = {
        description: 'Validation failed',
        schema: { 
            success: false,
            message: 'Validation failed',
            data: 'Validation error details'
        }
    }*/
    /*#swagger.responses[500] = {
        description: 'Server error while creating bug',
        schema: { 
            error: 'An error occurred while creating the bug.'
        }
    }*/
    const bug = {
        title: req.body.title,
        description: req.body.description,
        severity: req.body.severity,
        priority: req.body.priority,
        status: req.body.status,
        assignedDeveloper: req.body.assignedDeveloper,
        reporter: req.body.reporter
    };
    const result = await mongodb.getDb().db().collection('bugs').insertOne(bug);
    if (result.acknowledged) {
        res.status(201).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while creating the bug.');
    }
}

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
        description: 'Invalid bug ID format',
        schema: { 
            error: 'Must use a valid bug id to update a bug.'
        }
    }*/
    /*#swagger.responses[412] = {
        description: 'Validation failed',
        schema: { 
            success: false,
            message: 'Validation failed',
            data: 'Validation error details'
        }
    }*/
    /*#swagger.responses[500] = {
        description: 'Server error while updating bug',
        schema: { 
            error: 'An error occurred while updating the bug.'
        }
    }*/
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid bug id to update a bug.');
    }
    const bugId = new ObjectId(req.params.id);
    const bug = {
        title: req.body.title,
        description: req.body.description,
        severity: req.body.severity,
        priority: req.body.priority,
        status: req.body.status,
        assignedDeveloper: req.body.assignedDeveloper,
        reporter: req.body.reporter
    };
    const result = await mongodb.getDb().db().collection('bugs').replaceOne({ _id: bugId }, bug);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while updating the bug.');
    }
}

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
    /*#swagger.responses[500] = {
        description: 'Server error while deleting bug',
        schema: { 
            error: 'An error occurred while deleting the bug.'
        }
    }*/
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid bug id to delete a bug.');
    }
    const bugId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('bugs').deleteOne({ _id: bugId }, true);
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while deleting the bug.');
    }
}

module.exports = controller;
