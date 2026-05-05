import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent,
  TextField
} from '@mui/material';
import useCategories from '../../../../hooks/useCategories.ts';
import { useState } from 'react';
import type { ProductFormData } from '../../../../api/types/product.ts';
import * as React from 'react';

interface FormData {
  name: string;
  description: string;
  price: string;
  quantity: string;
  categoryId: string;
}

const initialFormData: FormData = {
  name: '',
  description: '',
  price: '',
  quantity: '',
  categoryId: ''
};

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: ProductFormData) => Promise<void>;
}

const AddProductDialog = ({ open, onClose, onAdd }: AddProductDialogProps) => {
  const { categories } = useCategories();

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload: ProductFormData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      categoryId: Number(formData.categoryId)
    };

    await onAdd(payload);
    setFormData({ ...initialFormData });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Add Product</DialogTitle>
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
        <Button onClick={handleSubmit} variant='contained' color='primary'>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;