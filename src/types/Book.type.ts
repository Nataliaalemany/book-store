export type BookType = {
  id: string,
  authors: string[],
  imageLinks: {
    smallThumbnail: string,
    thumbnail: string,
  },
  title: string,
  industryIdentifiers: {
    type: string,
    identifier: string,
  }[],
  categories: string[],
  saleInfo: {
    price: number,
    currency: string,
  },
  count: number,
  inWishList: boolean,
}
