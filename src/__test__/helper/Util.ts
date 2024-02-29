export const buildMockProductResponse = () => {
  return ({
    data: {
      cartProducts: [{
        productId: 1,
        quantity: 2,
        userId: 1
      }],
      category: ["fake category"],
      image: "images/image_1704157861657.png",
      price: 70,
      quantity: 5,
      title: "fake product",
      id: 1
    },
    statusText: "OK"
  })
}

export const buildMockCartResponse = () => {
  return ({
    data: [
        {
          product: {
            category: ["fake category"],
            image: "images/image_1704157861657.png",
            price: 70,
            quantity: 5,
            title: "fake product",
            id: 1
          },
          productId: 1,
          quantity: 2,
          userId: 1,
          id: 1
        },
        {
          product: {
            category: ["fake category"],
            image: "images/image_1704157861657.png",
            price: 70,
            quantity: 5,
            title: "fake product",
            id: 2
          },
          productId: 2,
          quantity: 5,
          userId: 1,
          id: 2 
        }
    ],
    statusText: "OK"
  })
}

export const buildMockUserResponse = () => {
  return ({
    data: {
      id: 1,
      name: 'Test User',
      email: 'test@example.com'
    }
  })
}
 
export const buildProductResponse = (count: number) => {
  const products = [];

  for (let i = 1; i <= count; i++){
    products.push({
      id: i,
      image: `fake image ${i}`,
      title: `fake title ${i}`,
      category: [`fake category ${i}`, `fake category ${i + 1}`],
      price: i * 40
    })
  }

  return products;
}

export const buildPagingInfo = () => {
  return (
    {
      currentDataCount: 3,
      currentPage: 1,
      limit: 3,
      moreData: true,
      nextPage: 2,
      totalCount: 10,
      totalPage: 4
    }
  )
}

export const buildMockCouponDetail = () => {
  return ({
    name: "fake coupon",
    discountPercentage: 20
  })
}