import React, { useState, useEffect } from "react";
import EntryForm from "./EntryForm";
import EntryOverlay from "./EntryOverlay";

function EntryList({
    entries = [],
    selectedTag,
    onTagsUpdate,
    handleSave,
    handleDelete,
    openEntry,
    setOpenEntry,
    refresh,
}) {
    const [editingId, setEditingId] = useState();

    useEffect(() => {
        refresh();
    }, []);

    const allTags = entries.flatMap((entry) => entry.tags);
    const uniqueTags = [...new Set(allTags)];

    useEffect(() => {
        onTagsUpdate(uniqueTags);
    }, [entries]);

    const filteredEntries = selectedTag
        ? entries.filter((entry) => entry.tags.includes(selectedTag))
        : entries;

    return (
        <>
            {filteredEntries &&
                filteredEntries.map((entry) =>
                    entry.id === editingId ? (
                        <EntryForm
                            initialTitle={entry.title}
                            initialBody={entry.body}
                            initialTags={entry.tags.join(", ")}
                            editStatus={true}
                            onCancel={() => setEditingId(null)}
                            onSubmit={(data) => {
                                handleSave(entry.id, data);
                                setEditingId(null);
                            }}
                        />
                    ) : (
                        <div
                            key={entry.id}
                            className="cursor-pointer flex flex-col justify-between rounded-4xl border-2 border-neutral-700 bg-bg-card p-4 w-64 h-64 text-text-primary"
                        >
                            <div>
                                {entry.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 max-w-full break-words overflow-hidden">
                                        {entry.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-accent-indigo-light text-xs rounded-full mr-1 hover:bg-accent-indigo transition-colors whitespace-nowrap"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div onClick={() => setOpenEntry(entry)}>
                                    <h3 className="mt-2 text-base font-semibold">
                                        {entry.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary mt-1 line-clamp-3">
                                        {entry.body}
                                    </p>
                                    <p className="text-xs text-text-secondary mt-2 italic">
                                        {new Date(
                                            entry.createdAt
                                        ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
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
            {openEntry && (
                <EntryOverlay
                    entry={openEntry}
                    onClose={() => setOpenEntry(null)}
                    handleSave={handleSave}
                />
            )}
        </>
    );
}

export default EntryList;
