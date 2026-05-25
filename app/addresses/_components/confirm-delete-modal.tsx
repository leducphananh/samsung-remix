import Modal from '@/components/common/modal';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  addressTitle?: string;
}

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  addressTitle,
}: Props) => {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Xác nhận xóa"
      titleClassName="font-samsung-one!"
      footerClassName="shadow-none py-4! px-5!"
      footer={
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onClose}
            className="border-surface-container-highest rounded-2xl border bg-white py-3 text-sm font-bold">
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-accent rounded-2xl py-3 text-sm font-bold text-white">
            Xóa
          </button>
        </div>
      }>
      <p className="text-secondary text-sm">
        Bạn có chắc chắn muốn xóa địa chỉ &quot;{addressTitle}&quot; không?
      </p>
    </Modal>
  );
};

export default ConfirmDeleteModal;
