'use client';

import { deleteProduct } from "../actions/ProductActions";

interface prop {
  id?: string;
  onDelete: () => void;
}

export default function ProductDeleteButton({ id, onDelete }: prop) {
  return (
    <button
      type="button"
      className="text-red-600 hover:text-red-800 transition-colors"
      onClick={async () => {
        if (!id) return;
        await deleteProduct(id);
        onDelete();
      }}
    >
      🗑️
    </button>
  );
}
