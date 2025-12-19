type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" data-testid="modal">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-lg">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white text-2xl font-bold rounded-full w-8 h-8 flex items-center justify-center"
          >
            &times;
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}