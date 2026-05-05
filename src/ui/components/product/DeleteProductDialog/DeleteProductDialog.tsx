import type { Product } from '../../../../api/types/product.ts';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface DeleteProductDialogProps {
  product: Product;
  open: boolean,
  onClose: () => void;
  onDelete: (id: number) => Promise<void>;
}

const DeleteProductDialog = ({ product, open, onClose, onDelete }: DeleteProductDialogProps) => {
  const handleSubmit = async () => {
    await onDelete(product.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.
        </DialogContentText>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} color='error' variant='contained'>Delete</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialog;