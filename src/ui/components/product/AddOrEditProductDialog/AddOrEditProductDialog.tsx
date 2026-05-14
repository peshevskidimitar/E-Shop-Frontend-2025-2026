import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent,
  TextField
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import useCategories from '../../../../hooks/useCategories.ts';
import useProducts from '../../../../hooks/useProducts.ts';
import type { CreateProductRequest, ProductResponse } from '../../../../api/types/product.ts';

interface FormData {
  name: string;
  description: string;
  price: string;
  quantity: string;
  categoryId: string;
}

const emptyFormData: FormData = {
  name: '',
  description: '',
  price: '',
  quantity: '',
  categoryId: ''
};

const productToFormData = (product: ProductResponse): FormData => ({
  name: product.name,
  description: product.description,
  price: product.price.toString(),
  quantity: product.quantity.toString(),
  categoryId: product.categoryId.toString()
});

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  product?: ProductResponse;
}

const AddOrEditProductDialog = ({ open, onClose, product }: ProductFormDialogProps) => {
  const { categories } = useCategories();
  const { onAdd, onEdit } = useProducts();

  const isEdit = product !== undefined;

  const [formData, setFormData] = useState<FormData>(
    product ? productToFormData(product) : emptyFormData
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload: CreateProductRequest = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      categoryId: Number(formData.categoryId)
    };

    if (isEdit) {
      await onEdit(product.id, payload);
    } else {
      await onAdd(payload);
      setFormData(emptyFormData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin='dense'
          label='Description'
          name='description'
          value={formData.description}
          onChange={handleChange}
          multiline={true}
          rows={3}
          fullWidth
        />
        <TextField
          margin='dense'
          label='Price'
          name='price'
          value={formData.price}
          onChange={handleChange}
          type='number'
          fullWidth
        />
        <TextField
          margin='dense'
          label='Quantity'
          name='quantity'
          value={formData.quantity}
          onChange={handleChange}
          type='number'
          fullWidth
        />
        <FormControl margin='dense' fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            label='Category'
            name='categoryId'
            value={formData.categoryId}
            onChange={handleChange}
            variant='outlined'>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          {isEdit ? 'Edit' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditProductDialog;