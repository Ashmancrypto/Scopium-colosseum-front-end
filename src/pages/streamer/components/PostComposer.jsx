const PostComposer = ({ isDark = false }) => (
  <section
    className={`rounded-2xl border backdrop-blur p-6 transition-colors ${
      isDark ? 'border-gray-700 bg-gray-900/90' : 'border-gray-200 bg-white'
    }`}
  >
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="space-y-1">
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Posts</h2>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Share updates with your community</p>
      </div>

      <div className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${isDark ? 'border-emerald-600/40 text-emerald-400' : 'border-pink-400/60 text-pink-500'}`}>
        Draft mode
        <span className={`ml-1 inline-flex h-2 w-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-pink-500'}`} />
      </div>
    </div>

    <div
      className={`mt-6 rounded-2xl border p-4 transition-colors ${
        isDark ? 'border-gray-700 bg-gray-900/70' : 'border-gray-200 bg-white/90'
      }`}
    >
      <textarea
        rows={3}
        className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition ${
          isDark
            ? 'border-gray-700 bg-gray-800/70 text-gray-100 placeholder:text-gray-500'
            : 'border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400'
        }`}
        placeholder="Create a post"
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-pink-500'}`}>
          {['Image', 'Video', 'Link'].map((item) => (
            <span
              key={item}
              className={`rounded-full border px-3 py-1 transition ${isDark ? 'border-emerald-700/40 hover:bg-emerald-700 hover:text-white' : 'border-pink-400/60 hover:bg-pink-500 hover:text-white'}`}
            >
              {item}
            </span>
          ))}
        </div>
        <button
          type="button"
          className={`rounded-full px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-15px_rgba(236,72,153,0.65)] transition ${isDark ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-pink-500 hover:bg-pink-400'}`}
        >
          Publish
        </button>
      </div>
    </div>
  </section>
);

export default PostComposer;

