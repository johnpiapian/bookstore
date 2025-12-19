export const {
  GET, POST, PUT, DELETE
} = process.env.STORAGE_TYPE === 'database'
  ? await import('./database')
  : await import('./memory')