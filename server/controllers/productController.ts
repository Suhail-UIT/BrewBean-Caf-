import { Request, Response } from 'express';
import { db } from '../models/dbStorage';

export const getProducts = (req: Request, res: Response): void => {
  try {
    const { category, search, vegetarian } = req.query;
    let products = db.getProducts();

    if (category && category !== 'All') {
      products = products.filter(
        (p) => p.category.toLowerCase() === String(category).toLowerCase()
      );
    }

    if (vegetarian === 'true') {
      products = products.filter((p) => p.vegetarian === true);
    }

    if (search) {
      const q = String(search).toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error retrieving products' });
  }
};

export const getProductById = (req: Request, res: Response): void => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product' });
  }
};

export const createProduct = (req: Request, res: Response): void => {
  try {
    const { name, description, price, category, image, ingredients, vegetarian, available, popular } = req.body;

    if (!name || !price || !category) {
      res.status(400).json({ message: 'Name, price, and category are required.' });
      return;
    }

    const newProduct = db.createProduct({
      name,
      description: description || '',
      price: Number(price),
      category,
      image: image || 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
      ingredients: Array.isArray(ingredients) ? ingredients : typeof ingredients === 'string' ? ingredients.split(',').map(s => s.trim()) : [],
      vegetarian: Boolean(vegetarian),
      available: available !== undefined ? Boolean(available) : true,
      popular: Boolean(popular),
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

export const updateProduct = (req: Request, res: Response): void => {
  try {
    const id = req.params.id;
    const updates = req.body;

    if (updates.price !== undefined) {
      updates.price = Number(updates.price);
    }
    if (typeof updates.ingredients === 'string') {
      updates.ingredients = updates.ingredients.split(',').map((s: string) => s.trim());
    }

    const updated = db.updateProduct(id, updates);
    if (!updated) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

export const deleteProduct = (req: Request, res: Response): void => {
  try {
    const success = db.deleteProduct(req.params.id);
    if (!success) {
      res.status(404).json({ message: 'Product not found or already deleted' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};
