import React, { useState } from "react";

function EntryForm({
    onSubmit,
    initialTitle = "",
    initialBody = "",
    initialTags = "",
    editStatus = false,
    onCancel,
    forceOpen = false,
    modal = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [body, setBody] = useState(initialBody);
    const [tags, setTags] = useState(initialTags);

    let parsedTags = tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== "");

    if (parsedTags.length === 0) {
        parsedTags = [];
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !body.trim()) return;

        onSubmit({ title, body, tags: parsedTags });

        if (!editStatus) {
            setTitle("");
            setBody("");
            setTags("");
            setIsOpen(false);
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
        onCancel();
    };

    return (
        <div>
            {!isOpen && !editStatus && !forceOpen ? (
                <div
                    onClick={() => setIsOpen(true)}
                    className="bg-bg-card w-64 h-64 border-4 rounded-4xl border-accent-indigo flex items-center justify-center text-text-secondary text-sm cursor-pointer hover:border-accent-indigo-light hover:scale-105 active:scale-95 transition-transform duration-250
"
                >
                    <span className="text-lg">➕ Add Entry</span>
                </div>
            ) : (
                <div
                    className={`rounded-4xl border-2 border-neutral-700 p-4 bg-bg-card w-64 h-64 text-text-primary ${
                        modal ? "w-full h-auto" : ""
                    }`}
                >
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
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            placeholder="Enter text"
                            id="body"
                        ></textarea>

                        <input
                            className="w-full bg-transparent text-text-primary placeholder-text-secondary text-base font-inherit outline-none font-semibold"
                            type="text"
                            value={tags}
                            placeholder="Enter comma-separated tags"
                            onChange={(e) => setTags(e.target.value)}
                            autoComplete="off"
                            id="tags"
                        />

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
