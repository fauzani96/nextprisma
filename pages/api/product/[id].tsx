import prisma from '../../../lib/prisma'

// DELETE /api/post/:id
export default async function handle(req: any, res: any) {
  const id = req.query.id
  if (req.method === 'DELETE') {
    try {
      const post = await prisma.product.delete({
        where: {id: parseInt(id)},
      })
      res.json(post)
    } catch (error) {
      console.error({error})
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    )
  }
}
