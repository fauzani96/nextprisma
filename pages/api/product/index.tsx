import prisma from '../../../lib/prisma'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: any, res: any) {
  const {name, price, imgSrc, categoryId} = req.body

  const result = await prisma.product.create({
    data: {
      name,
      price,
      imgSrc,
      categoryId,
    },
  })
  res.json(result)
}
