const BannerBoard = ({ banners, isDark = false }) => (
  <section className="space-y-3">
    <button
      type="button"
      className={`w-full rounded-xl border-dashed py-3 text-sm font-medium transition ${isDark ? 'border-emerald-700/40 bg-emerald-700/10 text-emerald-300 hover:bg-emerald-700/20' : 'border-pink-400/60 bg-pink-500/10 text-pink-500 hover:bg-pink-500/20'}`}
    >
      Add Banner +
    </button>

    <div className="space-y-3">
      {banners.map((banner) => (
        <article
          key={banner.id}
          className={`rounded-xl border px-4 py-3 transition-colors ${
            isDark ? 'border-gray-700 bg-gray-900/60' : 'border-gray-200 bg-white/80'
          }`}
        >
            <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{banner.title}</h3>
              <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{banner.description}</p>
            </div>
            <span className={`rounded-md border px-2 py-1 text-xs font-medium ${isDark ? 'border-emerald-700/40 text-emerald-300' : 'border-pink-400/60 text-pink-500'}`}>Edit</span>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default BannerBoard;

