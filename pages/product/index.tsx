// @ts-nocheck
import {GetStaticProps} from 'next'
import {FC, useState} from 'react'
import prisma from '../../lib/prisma'

type Product = {
  id: number
  categoryId: number
  price: number
  name: string
  imgSrc: string
}

type Category = {id: number; name: string}

type Props = {
  productData: Product[]
  categoryData: Category[]
}

interface State {
  name: string
  categoryId: number
  prioe: number
  imgSrc: string
}

export const getStaticProps: GetStaticProps = async () => {
  const productData = await prisma.product.findMany({})
  const categoryData = await prisma.category.findMany({})
  return {props: {productData, categoryData}}
}

const Product: FC<Props> = ({productData, categoryData}) => {
  const [value, setValue] = useState<State>({
    name: '',
    categoryId: '',
    price: 0,
    imgSrc: '',
  })

  console.log({value})

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue({...value, [prop]: event.target.value})
    }

  const submitData = async (): Promise<void> => {
    try {
      const body = {
        name: value.name,
        categoryId: parseInt(value.categoryId),
        imgSrc: value.imgSrc,
        price: parseInt(value.price),
      }
      await fetch('/api/product', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      })
      alert('sukses')
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteData(id: number): Promise<void> {
    await fetch(`/api/product/${id}`, {
      method: 'DELETE',
    })
  }

  return (
    <div style={{marginBottom: 20}}>
      <p>this is category</p>
      <div>
        {categoryData.map((res, i) => {
          return (
            <div key={i} style={{display: 'flex'}}>
              <p style={{marginRight: 6}}>id: {res.id}</p>
              <p>name: {res.name}</p>
            </div>
          )
        })}
      </div>
      <p>this is product</p>
      <div>
        {productData.map((res, i) => {
          return (
            <div key={i} style={{display: 'flex'}}>
              <p style={{marginRight: 6}}>id: {res.id}</p>
              <p style={{marginRight: 6}}>name: {res.name}</p>
              <p style={{marginRight: 6}}>price: {res.price}</p>
              <p style={{marginRight: 6}}>category: {res.categoryId}</p>
              <img
                style={{marginRight: 6}}
                src={res.imgSrc}
                height="50"
                width="50"
              />
              <button onClick={() => deleteData(res.id)}>!!delete</button>
            </div>
          )
        })}
      </div>
      <div>
        nama
        <input type="text" value={value.name} onChange={handleChange('name')} />
      </div>
      <div>
        harga
        <input
          type="number"
          value={value.price}
          onChange={handleChange('price')}
        />
      </div>
      <div>
        img url
        <input
          type="text"
          value={value.imgSrc}
          onChange={handleChange('imgSrc')}
        />
      </div>

      <div>
        category
        <select value={value.categoryId} onChange={handleChange('categoryId')}>
          <option value={1}>t-shirt</option>
          <option value={2}>long sleeve</option>
          <option value={3}>hoodie</option>
        </select>
        <button onClick={submitData}>submit</button>
      </div>
    </div>
  )
}

export default Product
