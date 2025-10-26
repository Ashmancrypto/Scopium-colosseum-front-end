const BannerBoard = ({ banners = [], isDark = false, onAdd, onEdit }) => (
  <section className="space-y-3">
    <button
      type="button"
      onClick={onAdd}
      className={`w-full rounded-xl border border-dashed py-3 text-sm font-medium transition ${
        isDark
          ? 'border-emerald-700/40 bg-emerald-700/10 text-emerald-300 hover:bg-emerald-700/20'
          : 'border-pink-400/60 bg-pink-500/10 text-pink-500 hover:bg-pink-500/20'
      }`}
    >
      Add Banner +
    </button>

    <div className="space-y-3">
      {banners.length === 0 ? (
        <div
          className={`rounded-xl border px-4 py-6 text-center text-xs font-medium transition ${isDark ? 'border-gray-700 bg-gray-900/60 text-gray-300' : 'border-gray-200 bg-white/80 text-gray-600'}`}
        >
          No banners yet.
        </div>
      ) : (
        banners.map((banner) => (
          <article
            key={banner.id ?? banner.tokenAddress ?? banner.title}
            className={`rounded-xl border overflow-hidden transition-colors ${
              isDark ? 'border-gray-700 bg-gray-900/60' : 'border-gray-200 bg-white/80'
            }`}
          >
            {banner.imageUrl ? (
              <div className="h-32 overflow-hidden bg-gray-800">
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title} 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/header-image-dark.png';
                  }}
                />
              </div>
            ) : null}
            <div className="px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{banner.title ?? 'Untitled Banner'}</h3>
                  {banner.description ? (
                    <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{banner.description}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => onEdit?.(banner)}
                  className={`flex items-center justify-center rounded-md p-1.5 transition ${isDark ? 'hover:bg-emerald-700/20' : 'hover:bg-pink-500/20'}`}
                  aria-label="Edit banner"
                >
                  <img 
                    src="/images/icons/Streamer POV/Streamer-profile-edit.png" 
                    alt="edit" 
                    className="h-4 w-4 opacity-70"
                  />
                </button>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  </section>
);

export default BannerBoard;

