import { useEffect, useState } from "react";
import EntryForm from "./EntryForm";

function EntryOverlay({ entry, onClose, handleSave }) {
    const [isEditing, setIsEditing] = useState(false);
    if (!entry) return null;

    const wordCount =
        entry?.body?.trim().split(/\s+/).filter(Boolean).length || 0;

    const lastEdited = new Date(entry.updatedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-6 bg-transparent backdrop-blur-md">
            <div className="bg-bg-card text-text-primary p-6 rounded-2xl w-full max-w-3xl shadow-xl relative overflow-y-auto min-h-64 max-h-[90vh] pointer-events-auto">
                {!isEditing ? (
                    <div>
                        <button
                            className="absolute top-4 right-16 text-sm text-accent-indigo hover:underline"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-sm text-text-secondary hover:text-white"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    ""
                )}
                {isEditing ? (
                    <EntryForm
                        onSubmit={(data) => {
                            handleSave(entry.id, data);
                            setIsEditing(false);
                        }}
                        onCancel={() => setIsEditing(false)}
                        initialTitle={entry.title}
                        initialBody={entry.body}
                        initialTags={entry.tags.join(", ")}
                        editStatus={true}
                        forceOpen={true}
                        modal={true}
                    />
                ) : (
                    <div className="flex flex-col justify-between h-full max-h-full">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold">
                                    {entry.title}
                                </h2>
                            </div>
                            <p className="whitespace-pre-wrap leading-relaxed">
                                {entry.body}
                            </p>
                        </div>
                        <div className="mt-2">
                            <div className="text-xs text-neutral-500">
                                {wordCount} words
                            </div>
                            {entry?.updatedAt && (
                                <div className="text-xs text-neutral-500 italic">
                                    {`Last edited at ${lastEdited}`}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EntryOverlay;
