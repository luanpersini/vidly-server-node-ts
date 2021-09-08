export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/vidly-ts',
  port: process.env.PORT || 5051,
  jwtSecret: process.env.JWT_SECRET || 'tj67O=5+-a55a9xw7yCH',  
}
