const AdminModal = ({
  open,
  onClose,
  title,
  subtitle,
  previewImage,
  submitText,
  onSubmit,
  children,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center px-4">
      <div className="admin-card w-full max-w-5xl p-5">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-lg font-black">{title}</h2>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg border border-white/10"
          >
            ✕ Close
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_.9fr] gap-5">
          <div className="space-y-3">{children}</div>

          <div>
            <p className="font-bold mb-2">Preview</p>

            <img
              src={
                previewImage ||
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
              }
              alt=""
              className="w-full h-[220px] rounded-xl object-cover"
            />

            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                onClick={onClose}
                className="py-3 rounded-lg border border-white/10"
              >
                Cancel
              </button>

              {submitText && (
                <button
                  onClick={onSubmit}
                  className="py-3 rounded-lg bg-[#ff7a00] font-bold"
                >
                  {submitText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;