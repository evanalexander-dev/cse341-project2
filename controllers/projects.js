const mongodb = require('../db/database');
const { ObjectId } = require('mongodb');

const controller = {};

controller.getAll = async (req, res) => {
    //#swagger.tags=['Projects']
    //#swagger.summary = 'Get all projects'
    //#swagger.description = 'Retrieve all projects.'
    /*#swagger.responses[200] = {
        description: 'Successfully retrieved projects',
        schema: [
            {
                $ref: '#/components/schemas/Project'
            }
        ]
    }*/
    /*#swagger.responses[400] = {
        description: 'Error retrieving projects',
        schema: { 
            message: 'Error message'
        }
    }*/
    const result = await mongodb.getDb().db().collection('projects').find();
    result.toArray().then((projects, err) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.json(projects);
    });
};

controller.getOne = async (req, res) => {
    //#swagger.tags=['Projects']
    //#swagger.summary = 'Get project by ID'
    //#swagger.description = 'Retrieve a specific project by ID.'
    /*#swagger.parameters['id'] = {
        description: 'ID of the project',
        type: 'string',
        example: '507f1f77bcf86cd799439011'
    }*/
    /*#swagger.responses[200] = {
        description: 'Successfully retrieved project',
        schema: {
            $ref: '#/components/schemas/Project'
        }
    }*/
    /*#swagger.responses[400] = {
        description: 'Error retrieving project',
        schema: { 
            message: 'Error message'
        }
    }*/
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid project id to find a project.');
    }
    const projectId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('projects').find({ _id: projectId });
    result.toArray().then((projects, err) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.json(projects[0]);
    });
};

controller.create = async (req, res) => {
    //#swagger.tags=['Projects']
    //#swagger.summary = 'Create a new project'
    //#swagger.description = 'Create a new project.'
    /*#swagger.parameters['obj'] = {
        in: 'body',
        description: 'Project information',
        required: true,
        schema: {
            name: "E-Commerce Website",
            description: "Full-stack web application for online retail with user authentication and payment processing",
            teamMembers: ["john.doe@example.com", "jane.smith@example.com"],
            bugCount: 15,
            deadline: "2024-12-31",
            techStack: ["Node.js", "React", "MongoDB"],
            status: "In Progress"
        }
    }*/
    /*#swagger.responses[201] = {
        description: 'Project successfully created'
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
        description: 'Server error while creating project',
        schema: { 
            error: 'An error occurred while creating the project.'
        }
    }*/
    const project = {
        name: req.body.name,
        description: req.body.description,
        teamMembers: req.body.teamMembers,
        bugCount: req.body.bugCount,
        deadline: req.body.deadline,
        techStack: req.body.techStack,
        status: req.body.status
    };
    const result = await mongodb.getDb().db().collection('projects').insertOne(project);
    if (result.acknowledged) {
        res.status(201).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while creating the project.');
    }
}

controller.update = async (req, res) => {
    //#swagger.tags=['Projects']
    //#swagger.summary = 'Update project by ID'
    //#swagger.description = 'Update an existing project by ID.'
    /*#swagger.parameters['id'] = {
        description: 'ID of the project to update',
        type: 'string',
        example: '507f1f77bcf86cd799439011'
    }*/
    /*#swagger.parameters['obj'] = {
        in: 'body',
        description: 'Project information',
        required: true,
        schema: {
            name: "E-Commerce Website",
            description: "Full-stack web application for online retail with user authentication and payment processing",
            teamMembers: ["john.doe@example.com", "jane.smith@example.com"],
            bugCount: 15,
            deadline: "2024-12-31",
            techStack: ["Node.js", "React", "MongoDB"],
            status: "In Progress"
        }
    }*/
    /*#swagger.responses[204] = {
        description: 'Project successfully updated'
    }*/
    /*#swagger.responses[400] = {
        description: 'Invalid project ID format',
        schema: { 
            error: 'Must use a valid project id to update a project.'
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
        description: 'Server error while updating project',
        schema: { 
            error: 'An error occurred while updating the project.'
        }
    }*/
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid project id to update a project.');
    }
    const projectId = new ObjectId(req.params.id);
    const project = {
        name: req.body.name,
        description: req.body.description,
        teamMembers: req.body.teamMembers,
        bugCount: req.body.bugCount,
        deadline: req.body.deadline,
        techStack: req.body.techStack,
        status: req.body.status
    };
    const result = await mongodb.getDb().db().collection('projects').replaceOne({ _id: projectId }, project);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while updating the project.');
    }
}

controller.delete = async (req, res) => {
    //#swagger.tags=['Projects']
    //#swagger.summary = 'Delete project by ID'
    //#swagger.description = 'Delete a project by ID.'
    /*#swagger.parameters['id'] = {
        description: 'ID of the project to delete',
        type: 'string',
        example: '507f1f77bcf86cd799439011'
    }*/
    /*#swagger.responses[204] = {
        description: 'Project successfully deleted'
    }*/
    /*#swagger.responses[400] = {
        description: 'Invalid project ID format',
        schema: { 
            error: 'Must use a valid project id to delete a project.'
        }
    }*/
    /*#swagger.responses[500] = {
        description: 'Server error while deleting project',
        schema: { 
            error: 'An error occurred while deleting the project.'
        }
    }*/
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid project id to delete a project.');
    }
    const projectId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('projects').deleteOne({ _id: projectId }, true);
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while deleting the project.');
    }
}

module.exports = controller;
