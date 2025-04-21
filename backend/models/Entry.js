import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
    {
        id: Number,
        title: { type: String, required: true },
        body: { type: String, required: true },
        tags: [String],
    },
    { timestamps: true }
);

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;
