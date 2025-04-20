import React, { useState, useEffect } from "react";
import EntryForm from "./EntryForm";

function EntryList({ entries = [], refresh }) {
    const [editingId, setEditingId] = useState();

    useEffect(() => {
        refresh();
    }, []);

    async function handleDelete(id) {
        try {
            const res = await fetch(`http://localhost:8000/api/journal/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error("Fetch failed");
            }
            refresh();
        } catch (error) {
            console.log("Error deleting entry");
        }
    }

    async function handleSave(id, { title, body }) {
        await fetch(`http://localhost:8000/api/journal/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body }),
        });

        setEditingId(null); // Exit edit mode
        refresh(); // Refresh the list
    }

    return (
        <>
            {entries &&
                entries.map((entry) =>
                    entry.id === editingId ? (
                        <EntryForm
                            initialTitle={entry.title}
                            initialBody={entry.body}
                            editStatus={true}
                            onCancel={() => setEditingId(null)}
                            onSubmit={(data) => handleSave(entry.id, data)}
                        />
                    ) : (
                        <div
                            key={entry.id}
                            className="cursor-pointer flex flex-col justify-between rounded-4xl border-2 border-neutral-700 bg-bg-card p-4 w-64 h-64 text-text-primary hover:bg-bg-card-secondary transition-colors"
                        >
                            <div>
                                <h3 className="text-base font-semibold">
                                    {entry.title}
                                </h3>
                                <p className="text-sm text-text-secondary mt-1 line-clamp-3">
                                    {entry.body}
                                </p>
                                <p className="text-xs text-text-secondary mt-2 italic">
                                    {new Date(entry.createdAt).toLocaleString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit",
                                        }
                                    )}
                                </p>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => handleDelete(entry.id)}
                                    className="cursor-pointer text-xs text-red-400 hover:underline"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setEditingId(entry.id)}
                                    className="cursor-pointer text-xs text-indigoAccent hover:underline"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    )
                )}
        </>
    );
}

export default EntryList;
