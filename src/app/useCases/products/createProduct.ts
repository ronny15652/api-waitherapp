import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function createProduct(req: Request, res: Response) {
  try {
    const imagePatch = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    const product = await Product.create({
      name: String(name),
      description: String(description),
      imagePatch,
      price: Number(price),
      category: Object(category),
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });

    res.status(201).json(product);
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  }
}





