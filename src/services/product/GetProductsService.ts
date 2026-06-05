import { productRepository } from '../../repositories/index.js';

export interface ProductQuery {
  category?: string;
  notes?: string;
  occasion?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  page?: string;
  limit?: string;
  sort?: string;
}

class GetProductsService {
  async execute(query: ProductQuery) {
    const filter: any = {};
    
    if (query.category) {
      filter.category = query.category;
    }
    
    if (query.notes) {
      filter.notes = { $in: query.notes.split(',') };
    }
    
    if (query.occasion) {
      filter.occasion = { $in: query.occasion.split(',') };
    }
    
    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) filter.price.$gte = Number(query.minPrice);
      if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
    }
    
    if (query.search) {
      filter.name = { $regex: query.search, $options: 'i' };
    }

    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const skip = (page - 1) * limit;

    let sortOption: any = '-createdAt';
    if (query.sort === 'priceAsc') sortOption = 'price';
    if (query.sort === 'priceDesc') sortOption = '-price';

    const productsQuery = productRepository['find'] ? await productRepository.find(filter, 'category', '', sortOption) : [];
    
    const paginatedProducts = productsQuery.slice(skip, skip + limit);
    
    return {
      products: paginatedProducts,
      total: productsQuery.length,
      page,
      pages: Math.ceil(productsQuery.length / limit)
    };
  }
}

export default new GetProductsService();
