const { nanoid } = require('nanoid')
const notes = require('./notes')

const addNotHandler = (request, h) => { // Tambah Catatan
  const { title, tags, body } = request.payload

  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNotes = {
    title, tags, body, id, createdAt, updatedAt
  }

  notes.push(newNotes)

  const isSuccess = notes.filter((note) => note.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.responses({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllNotesHandler = () => ({ // Lihat semua Catatan
  status: 'success',
  data: {
    notes
  }
})

const getNoteByIdHandler = (request, h) => { // Melihat Catatan Berdasarkan ID
  const { id } = request.params // Destructive ==>> Ambil ID dari params

  const note = notes.filter((n) => n.id === id)[0]

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })

  response.code(404)
  return response
}

const editNoteByIdHandler = (request, h) => { // Edit Catatan
  const { id } = request.params // Ambil Parameter

  const { title, tags, body } = request.payload // Ambil data pada payload

  const updatedAt = new Date().toISOString()

  const index = notes.findIndex((note) => note.id === id)

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui'
    })
    response.code(200)
    return response
  }

  const response = h.response({ // Apabila Data ID tidak ditemukan
    status: 'fail',
    message: 'Gagal Memuat Catatan, Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteNoteByHandler = (request, h) => {
  const { id } = request.params

  const index = notes.findIndex((note) => note.id === id)

  if (index !== -1) { // cari Index yang sesuai
    notes.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.responses({
    status: 'fail',
    message: 'Catatan gagal dihapus, ID tidak ditemukan'
  })
  response.code(400)
  return response
}

module.exports = { addNotHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByHandler }
