const AddFoodCard = () => (
  <div className="admin-card overflow-hidden">
    {" "}
    <div className="p-3">
      {" "}
      <div className="flex items-center justify-between mb-3">
        {" "}
        <div>
          {" "}
          <h2 className="text-base font-black"></h2>{" "}
          <p className="text-[10px] text-slate-500">Foods &gt; Add New</p>{" "}
        </div>{" "}
        <button className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold">
          {" "}
          ← Back to Foods{" "}
        </button>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-3">
        {" "}
        <div className="space-y-2">
          {" "}
          <input
            placeholder="Food Name"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs outline-none"
          />{" "}
          <div className="grid grid-cols-2 gap-2">
            {" "}
            <select className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs outline-none">
              {" "}
              <option>Select Restaurant</option>{" "}
            </select>{" "}
            <select className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs outline-none">
              {" "}
              <option>Select Category</option>{" "}
            </select>{" "}
          </div>{" "}
          <input
            placeholder="Enter price"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs outline-none"
          />{" "}
          <textarea
            placeholder="Enter food description"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs outline-none h-20 resize-none"
          />{" "}
          <div className="border border-dashed border-white/20 rounded-lg p-3 text-center">
            {" "}
            <p className="text-[11px] font-bold">Click to upload image</p>{" "}
            <p className="text-[9px] text-slate-500 mt-1">PNG, JPG up to 5MB</p>{" "}
          </div>{" "}
        </div>{" "}
        <div>
          {" "}
          <p className="text-[10px] font-bold mb-1.5">Preview</p>{" "}
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600"
            alt="Preview"
            className="w-full h-[160px] object-cover rounded-lg"
          />{" "}
          <div className="grid grid-cols-2 gap-3 mt-5">
            {" "}
            <button className="py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold">
              {" "}
              Cancel{" "}
            </button>{" "}
            <button className="py-2 rounded-lg bg-[#ff7a00] text-white text-xs font-bold">
              {" "}
              Add Food{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>{" "}
  </div>
);
export default AddFoodCard;
