export const {
  GET, POST, PUT, DELETE
} = process.env.STORAGE_TYPE === 'database'
  ? require('./database')
  : require('./memory')