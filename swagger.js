const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Bug Tracking API',
        description: 'Bug Tracking API'
    },
    host: 'cse341-project2-h9qe.onrender.com',
    schemes: ['https'],
    components: {
        schemas: {
            Bug: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "507f1f77bcf86cd799439011" },
                    title: { type: "string", example: "Login button not responding on mobile devices" },
                    description: { type: "string", example: "Users are unable to click the login button on iOS Safari. Button appears clickable but no action occurs when tapped." },
                    severity: { type: "string", example: "High" },
                    priority: { type: "string", example: "Medium" },
                    status: { type: "string", example: "Open" },
                    assignedDeveloper: { type: "string", example: "jane.smith@example.com" },
                    reporter: { type: "string", example: "john.doe@example.com" }
                }
            },
            Project: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "507f1f77bcf86cd799439011" },
                    name: { type: "string", example: "E-Commerce Website" },
                    description: { type: "string", example: "Full-stack web application for online retail with user authentication and payment processing" },
                    teamMembers: { type: "array", example: ["john.doe@example.com", "jane.smith@example.com"] },
                    bugCount: { type: "number", example: 15 },
                    deadline: { type: "string", example: "2024-12-31" },
                    techStack: { type: "array", example: ["Node.js", "React", "MongoDB"] },
                    status: { type: "string", example: "In Progress" }
                }
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);