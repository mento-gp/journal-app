import React, { useState } from "react";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";

export default function JournalContainer() {
    const [entries, setEntries] = useState([]);

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

    async function handleCreate({ title, body }) {
        if (!title.trim() || !body.trim()) {
            console.warn("Title and body are required.");
            return;
        }

        await fetch("http://localhost:8000/api/journal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body }),
        });
        await fetchData();
    }

    return (
        <div className="flex flex-col items-center justify-center bg-bg-primary mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-bg-primary">
                <EntryList entries={entries} refresh={fetchData} />
                <EntryForm
                    initialTitle=""
                    initialBody=""
                    onSubmit={handleCreate}
                />
            </div>
        </div>
    );
}
