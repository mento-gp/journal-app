import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    id: Number,
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [String],
    createdAt: { type: Date, default: Date.now },
});

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;
