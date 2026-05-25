'use client';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AddEditAddressSheet from './_components/add-edit-address-sheet';
import ConfirmDeleteModal from './_components/confirm-delete-modal';

type AddressItem = {
  id: number;
  title: string;
  address: string;
};

const mockAddresses: AddressItem[] = [
  {
    id: 1,
    title: 'Địa chỉ giao hàng',
    address: 'số 279 đường Vân Canh, X. Sơn Đồng, Thành phố Hà Nội',
  },
  {
    id: 2,
    title: 'Địa chỉ giao hàng',
    address: 'số 279 đường Vân Canh, X. Vân Canh, Thành phố Hà Nội',
  },
];

const AddressesPage = () => {
  const [addresses, setAddresses] = useState<AddressItem[]>(mockAddresses);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<AddressItem | null>(
    null,
  );

  return (
    <div className="bg-surface min-h-[calc(100vh-3.5rem)] pb-10">
      <div className="mx-auto w-full max-w-xl px-5 pt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h1 className="text-primary text-2xl leading-none font-semibold">
            Địa chỉ của tôi
          </h1>
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="bg-accent flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
            <Plus className="h-5 w-5" />
            <span>Thêm địa chỉ mới</span>
          </button>
        </div>

        <div className="space-y-5">
          {addresses.map(item => (
            <article
              key={item.id}
              className="border-surface-container-highest rounded-3xl border bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-primary text-base leading-tight font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-secondary mt-3 text-sm leading-tight">
                    {item.address}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-center gap-7 pt-1">
                  <button
                    type="button"
                    aria-label="Sửa địa chỉ"
                    onClick={() => setIsSheetOpen(true)}
                    className="hover:text-primary text-[#7b8799] transition-colors">
                    <Pencil className="size-5" strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    aria-label="Xóa địa chỉ"
                    onClick={() => setAddressToDelete(item)}
                    className="text-[#7b8799] transition-colors hover:text-red-600">
                    <Trash2 className="size-5" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <AddEditAddressSheet
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />

      <ConfirmDeleteModal
        open={!!addressToDelete}
        onClose={() => setAddressToDelete(null)}
        onConfirm={() => {
          if (!addressToDelete) return;
          setAddresses(current =>
            current.filter(item => item.id !== addressToDelete.id),
          );
          setAddressToDelete(null);
        }}
        addressTitle={addressToDelete?.title}
      />
    </div>
  );
};

export default AddressesPage;
