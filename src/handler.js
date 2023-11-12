const { nanoid } = require('nanoid');
const products = require('./products');

const addProductHandler = (request, h) => {
  const {
    image, name, price, description, umkm, resources, production, impact, contribution,
  } = request.payload;

  const id = nanoid(8);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newProducts = {
    id,
    name,
    image,
    price,
    description,
    umkm,
    resources,
    production,
    impact,
    contribution,
    createdAt,
    updatedAt,
  };

  products.push(newProducts);
  const isSuccess = products.filter((product) => product.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Produk berhasil ditambahkan',
      data: {
        productId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Produk gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllProductsHandler = () => ({
  status: 'success',
  message: 'menampilkan semua produk',
  data: {
    products: products && products.length > 0 ? products.map((product) => ({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    })) : null,
  },
});

const getProductByIdHandler = (request, h) => {
  const { id } = request.params;

  const product = products.filter((n) => n.id === id)[0];

  if (product !== undefined) {
    return {
      status: 'success',
      data: {
        product,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Produk tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editProductByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    image, name, price, description, umkm, resources, production, impact, contribution,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = products.findIndex((product) => product.id === id);

  if (index !== -1) {
    products[index] = {
      ...products[index],
      name,
      image,
      price,
      description,
      umkm,
      resources,
      production,
      impact,
      contribution,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Produk berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui produk. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteProductByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = products.findIndex((product) => product.id === id);

  if (index !== -1) {
    products.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addProductHandler,
  getAllProductsHandler,
  editProductByIdHandler,
  deleteProductByIdHandler,
  getProductByIdHandler,
};
