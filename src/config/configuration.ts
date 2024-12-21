export default () => ({
  database: {
    connect: process.env.DATABASE_CONNECT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
