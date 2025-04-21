import React, { useState } from "react";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";

export default function JournalContainer() {
    const [entries, setEntries] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [allTags, setAllTags] = useState([]);

    async function fetchData() {
        try {
            const res = await fetch("http://localhost:8000/api/journal");
            if (!res.ok) {
                throw new Error("Fetch failed");
            }
            const data = await res.json();
            setEntries(data);
        } catch (error) {
            console.log("Failed to connect to server");
        }
    }

    async function handleCreate({ title, body, tags }) {
        if (!title.trim() || !body.trim()) {
            console.warn("Title and body are required.");
            return;
        }

        await fetch("http://localhost:8000/api/journal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body, tags }),
        });
        await fetchData();
    }

    return (
        <div className="flex flex-col items-center justify-center bg-bg-primary mt-6">
            <div className="max-w-[528px] md:max-w-[800px] flex flex-wrap gap-2 mb-4">
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm border ${
                            selectedTag === tag
                                ? "bg-accent-indigo text-white"
                                : "bg-neutral-800 text-text-secondary"
                        } hover:bg-accent-indigo-light transition`}
                    >
                        #{tag}
                    </button>
                ))}
                {selectedTag && (
                    <button
                        onClick={() => setSelectedTag(null)}
                        className="px-3 py-1 rounded-full text-sm bg-neutral-700 text-text-secondary border hover:bg-neutral-600 transition"
                    >
                        ✕ Clear Filter
                    </button>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-bg-primary">
                <EntryList
                    entries={entries}
                    selectedTag={selectedTag}
                    onTagsUpdate={setAllTags}
                    refresh={fetchData}
                />
                <EntryForm
                    initialTitle=""
                    initialBody=""
                    onSubmit={handleCreate}
                />
            </div>
        </div>
    );
}
