import React, { useState } from "react";

function EntryForm({
    onSubmit,
    initialTitle = "",
    initialBody = "",
    editStatus = false,
    onCancel,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [body, setBody] = useState(initialBody);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !body.trim()) return;

        onSubmit({ title, body });

        // Reset state after creating (only for Add mode)
        if (!editStatus) {
            setTitle("");
            setBody("");
            setIsOpen(false);
        }
    };

    const handleCancel = () => {
        if (editStatus && onCancel) {
            onCancel(); // exit edit mode
        } else {
            setIsOpen(false); // collapse "Add Entry"
        }
    };

    return (
        <div>
            {!isOpen && !editStatus ? (
                <div
                    onClick={() => setIsOpen(true)}
                    className="bg-bg-card w-64 h-64 border-4 rounded-4xl border-accent-indigo flex items-center justify-center text-text-secondary text-sm cursor-pointer hover:border-accent-indigo-light hover:scale-105 active:scale-95 transition-transform duration-250
"
                >
                    <span className="text-lg">➕ Add Entry</span>
                </div>
            ) : (
                <div className="rounded-4xl border-2 border-neutral-700 bg-bg-card p-4 w-64 h-64 text-text-primary">
                    <form
                        className="min-h-full flex flex-col justify-between"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="w-full bg-transparent text-text-primary placeholder-text-secondary text-base font-inherit outline-none font-semibold"
                            value={title}
                            placeholder="Enter a title"
                            onChange={(e) => setTitle(e.target.value)}
                            id="title"
                        />

                        <textarea
                            className="rounded flex-1 bg-transparent text-text-secondary text-sm placeholder-text-secondary resize-none focus:outline-none mt-1 font-inherit"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Enter text"
                            id="body"
                        ></textarea>

                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                className="cursor-pointer text-sm text-text-secondary hover:underline"
                                type="submit"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="cursor-pointer text-sm text-text-secondary hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default EntryForm;
