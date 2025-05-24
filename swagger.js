const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Bugs API',
        description: 'Bugs API'
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
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);