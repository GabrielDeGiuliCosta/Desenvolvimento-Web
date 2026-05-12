const prisma = require('../prismaClient')

async function getSheets(req, res) {
  try {
    const sheets = await prisma.sheet.findMany({
      where: {
        userId: req.user.id
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return res.json(sheets)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Erro ao buscar fichas.' })
  }
}

async function createSheet(req, res) {
  try {
    const { title, data } = req.body

    if (!title || !data) {
      return res.status(400).json({
        message: 'Título e dados da ficha são obrigatórios.'
      })
    }

    const localId = String(data.id)

    const sheet = await prisma.sheet.create({
      data: {
        localId,
        title,
        data,
        userId: req.user.id
      }
    })

    return res.status(201).json(sheet)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Erro ao criar ficha.' })
  }
}

async function getSheetById(req, res) {
  try {
    const { id } = req.params

    const sheet = await prisma.sheet.findFirst({
      where: {
        id: Number(id),
        userId: req.user.id
      }
    })

    if (!sheet) {
      return res.status(404).json({ message: 'Ficha não encontrada.' })
    }

    return res.json(sheet)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Erro ao buscar ficha.' })
  }
}

async function updateSheet(req, res) {
  try {
    const { id } = req.params
    const { title, data } = req.body

    const sheetExists = await prisma.sheet.findFirst({
      where: {
        id: Number(id),
        userId: req.user.id
      }
    })

    if (!sheetExists) {
      return res.status(404).json({ message: 'Ficha não encontrada.' })
    }

    const sheet = await prisma.sheet.update({
      where: {
        id: Number(id)
      },
      data: {
        title: title ?? sheetExists.title,
        data: data ?? sheetExists.data
      }
    })

    return res.json(sheet)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Erro ao atualizar ficha.' })
  }
}

async function deleteSheet(req, res) {
  try {
    const { id } = req.params

    const idComoNumero = Number(id)

    let sheet = null

    if (
      Number.isInteger(idComoNumero) &&
      idComoNumero > 0 &&
      idComoNumero <= 2147483647
    ) {
      sheet = await prisma.sheet.findFirst({
        where: {
          id: idComoNumero,
          userId: req.user.id
        }
      })
    }

    if (!sheet) {
      sheet = await prisma.sheet.findFirst({
        where: {
          userId: req.user.id,
          localId: String(id)
        }
      })
    }

    if (!sheet) {
      const sheets = await prisma.sheet.findMany({
        where: {
          userId: req.user.id
        }
      })

      sheet = sheets.find(s => String(s.data?.id) === String(id))
    }

    if (!sheet) {
      return res.status(404).json({
        message: 'Ficha não encontrada.'
      })
    }

    await prisma.sheet.delete({
      where: {
        id: sheet.id
      }
    })

    return res.json({
      message: 'Ficha deletada com sucesso.'
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro ao deletar ficha.'
    })
  }
}

async function syncSheet(req, res) {
  try {
    const { localId, title, data } = req.body

    if (!localId || !title || !data) {
      return res.status(400).json({
        message: 'localId, title e data são obrigatórios.'
      })
    }

    let sheet = await prisma.sheet.findFirst({
      where: {
        userId: req.user.id,
        localId
      }
    })

    if (!sheet) {
      const sheets = await prisma.sheet.findMany({
        where: {
          userId: req.user.id
        }
      })

      sheet = sheets.find(s => String(s.data?.id) === String(localId))
    }

    if (sheet) {
      const updated = await prisma.sheet.update({
        where: {
          id: sheet.id
        },
        data: {
          localId,
          title,
          data
        }
      })

      return res.json(updated)
    }

    const created = await prisma.sheet.create({
      data: {
        localId,
        title,
        data,
        userId: req.user.id
      }
    })

    return res.json(created)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Erro ao sincronizar ficha.'
    })
  }
}

module.exports = {
  getSheets,
  createSheet,
  getSheetById,
  updateSheet,
  deleteSheet,
  syncSheet
}