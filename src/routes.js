const { addNotHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByHandler } = require('./handler')

const routes = [
  {
    method: 'POST', // Tambah Catatan
    path: '/notes',
    handler: addNotHandler,
    options: {
      cors: {
        origin: ['*']
      }
    }
  },
  {
    method: 'GET', // Lihat Catatan
    path: '/notes',
    handler: getAllNotesHandler,
    options: {
      cors: {
        origin: ['*']
      }
    }
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
    options: {
      cors: {
        origin: ['*']
      }
    }
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
    options: {
      cors: {
        origin: ['*']
      }
    }
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByHandler,
    options: {
      cors: {
        origin: ['*']
      }
    }
  }

]
module.exports = routes
