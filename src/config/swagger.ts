import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '18Smell API Documentation',
      version: '1.0.0',
      description: 'API documentation for the 18Smell luxury artisanal fragrances e-commerce backend.',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message description' },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60b8d295f1d2c72b8c9a1b2c' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            role: { type: 'string', enum: ['user', 'admin'], example: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Category: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60b8d295f1d2c72b8c9a1b2c' },
            name: { type: 'string', example: 'Floral' },
            description: { type: 'string', example: 'Sweet and natural floral scents' },
            image: { type: 'string', example: '/uploads/floral.jpg' },
            isActive: { type: 'boolean', example: true },
          },
        },
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60b8d295f1d2c72b8c9a1b2c' },
            name: { type: 'string', example: 'Rose Essence' },
            description: { type: 'string', example: 'A deep rose fragrance.' },
            price: { type: 'number', example: 120 },
            category: { $ref: '#/components/schemas/Category' },
            volume: { type: 'number', example: 50 },
            stock: { type: 'number', example: 100 },
            images: { type: 'array', items: { type: 'string' } },
            notes: { type: 'array', items: { type: 'string' }, example: ['Rose', 'Vanilla'] },
            occasion: { type: 'array', items: { type: 'string' }, example: ['Evening', 'Romantic'] },
          },
        },
        OrderItem: {
          type: 'object',
          properties: {
            product: { $ref: '#/components/schemas/Product' },
            quantity: { type: 'number', example: 2 },
            price: { type: 'number', example: 120 },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60b8d295f1d2c72b8c9a1b2c' },
            user: { $ref: '#/components/schemas/User' },
            items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
            totalAmount: { type: 'number', example: 240 },
            shippingAddress: { type: 'string', example: '123 Fragrance St, NY' },
            paymentStatus: { type: 'string', enum: ['pending', 'paid', 'failed'], example: 'pending' },
            orderStatus: { type: 'string', enum: ['processing', 'shipped', 'delivered', 'cancelled'], example: 'processing' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'], // Scan all route files in src/routes/ and its subdirectories
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
