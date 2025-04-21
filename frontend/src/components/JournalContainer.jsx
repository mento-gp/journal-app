import React, { useState } from "react";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";
import TagFilterBar from "./TagFilterBar";

export default function JournalContainer() {
    const [entries, setEntries] = useState([]);
    const [openEntry, setOpenEntry] = useState(null);
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

    async function handleSave(id, { title, body, tags }) {
        try {
            const res = await fetch(`http://localhost:8000/api/journal/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, body, tags }),
            });

            if (!res.ok) {
                throw new Error("Failed to update entry");
            }

            const updatedEntry = await res.json();

            setEntries((prevEntries) =>
                prevEntries.map((entry) =>
                    entry.id === id ? updatedEntry : entry
                )
            );

            setOpenEntry((prev) =>
                prev && prev.id === id ? updatedEntry : prev
            );
        } catch (error) {
            console.error("Error updating entry:", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center bg-bg-primary mt-6">
            <TagFilterBar
                allTags={allTags}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-bg-primary">
                <EntryList
                    entries={entries}
                    selectedTag={selectedTag}
                    onTagsUpdate={setAllTags}
                    handleSave={handleSave}
                    openEntry={openEntry}
                    setOpenEntry={setOpenEntry}
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
