function TagFilterBar({ allTags, selectedTag, setSelectedTag }) {
    if (!allTags || allTags.length === 0) return null;

    return (
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
    );
}

export default TagFilterBar;
