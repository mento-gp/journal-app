import Entry from "../models/Entry.js";

export async function getEntries(req, res, next) {
    const entries = await Entry.find();
    res.status(200).json(entries);
}

export async function createEntry(req, res) {
    const count = await Entry.countDocuments();
    const entry = await Entry.create({
        id: count + 1,
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
        createdAt: new Date().toISOString(),
    });
    res.status(201).json(entry);
}

export async function updateEntry(req, res) {
    const id = req.params.id;
    const updatedEntry = await Entry.findOneAndUpdate(
        { id: parseInt(id) },
        {
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags,
        },
        { new: true }
    );
    res.status(201).json(updatedEntry);
}

export async function deleteEntry(req, res) {
    const id = req.params.id;
    const deleted = await Entry.findOneAndDelete({ id: parseInt(id) });
    res.status(200).json({ message: "Entry deleted", id });
}
