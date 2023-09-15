import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { createProduct } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProducts';
import { listOrders } from './app/useCases/orders/listOrders';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { deleteOrder } from './app/useCases/orders/deleteOrder';
import { deleteProduct } from './app/useCases/products/deleteProduct';

export const router = Router();

const upload = multer({
  storage:
    multer.diskStorage({
      destination(req, file, callback){
        callback(null, path.resolve(__dirname, '..', 'uploads'));
      },
      filename(req, file, callback){
        callback(null, `${Date.now()}-${file.originalname}`);
      },
    }),
});

router.get('/', () => {
  const menssagem = 'Hello Word';
  return menssagem;
});

// list categories
router.get('/categories', listCategories);
// creat category
router.post('/categories', createCategory);
// list products
router.get('/products', listProducts);
// creat product
router.post('/products', upload.single('image'),createProduct);
// get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);
// list orders
router.get('/orders', listOrders);
// creat orders
router.post('/orders', createOrder);
// change order status
router.patch('/orders/:orderId', changeOrderStatus);
// delete/cancel order
router.delete('/orders/:orderId', deleteOrder);
// delete/cancel Product
router.delete('/products/:productId', deleteProduct);
