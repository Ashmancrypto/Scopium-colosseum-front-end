const getActionClasses = (variant, isDark) => {
  if (variant === 'primary') {
    return isDark
      ? 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30'
      : 'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30';
  }

  return isDark
    ? 'border border-emerald-600/30 bg-gray-900/60 text-emerald-300 hover:border-emerald-500/60 hover:text-emerald-200'
    : 'border border-pink-400/40 bg-white text-pink-500 hover:border-pink-500/60 hover:text-pink-600';
};

const VideosFeed = ({ sections = [], isDark = false, isLoading = false }) => {
  if (isLoading) {
    return (
      <div
        className={`rounded-2xl border p-10 text-center transition-colors ${
          isDark ? 'border-gray-700 bg-gray-900/90 text-gray-300' : 'border-gray-200 bg-white text-gray-600'
        }`}
      >
        Loading videos…
      </div>
    );
  }

  const hasVideos = sections.some((section) => section.items && section.items.length > 0);

  const resolveIcon = (icon) => {
    if (!icon) return null;
    if (typeof icon === 'string') return icon;
    if (typeof icon === 'object') {
      return isDark ? icon.dark ?? icon.light ?? null : icon.light ?? icon.dark ?? null;
    }
    return null;
  };

  if (!hasVideos) {
    return (
      <div
        className={`rounded-2xl border p-10 text-center transition-colors ${
          isDark ? 'border-gray-700 bg-gray-900/90 text-gray-300' : 'border-gray-200 bg-white text-gray-600'
        }`}
      >
        <p className="text-sm font-medium">No videos yet. Upload a video to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.id} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2
                className={`text-lg font-semibold tracking-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {section.title}
              </h2>
              {section.subtitle ? (
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{section.subtitle}</p>
              ) : null}
            </div>

            {section.actions?.length ? (
              <div className="flex flex-wrap items-center gap-2">
                {section.actions.map((action) => {
                  const iconSource = resolveIcon(action.icon);

                  return (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => action.onClick?.(section)}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${getActionClasses(
                        action.variant || 'secondary',
                        isDark
                      )}`}
                    >
                      {iconSource ? <img src={iconSource} alt="" className="h-4 w-4" /> : null}
                      {action.label}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {section.items?.map((video) => (
              <article
                key={video.id}
                className={`rounded-3xl border p-4 transition-colors ${
                  isDark ? 'border-gray-700 bg-gray-900/80' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="aspect-video w-full object-cover"
                  />

                  {video.liveLabel ? (
                    <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-lg ${isDark ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-emerald-500/30' : 'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 shadow-pink-500/30'}`}>
                      {video.liveLabel}
                    </span>
                  ) : null}

                  {video.duration ? (
                    <span
                      className={`absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-semibold ${
                        isDark ? 'bg-gray-900/80 text-gray-200' : 'bg-white/90 text-gray-800'
                      }`}
                    >
                      {video.duration}
                    </span>
                  ) : null}

                  {video.viewerCount ? (
                    <span
                      className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-gray-900/80 px-3 py-1 text-xs font-semibold text-white shadow"
                    >
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                      {video.viewerCount}
                    </span>
                  ) : null}
                </div>

                <div className="mt-5 flex flex-col gap-5">
                  <h3
                    className={`text-base font-semibold leading-snug ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {video.title}
                  </h3>

                  {video.actions?.length ? (
                    <div className="flex flex-wrap items-center gap-3">
                      {video.actions.map((action) => (
                        <span
                          key={action.id}
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                            isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {resolveIcon(action.icon) ? (
                            <img src={resolveIcon(action.icon)} alt="" className="h-4 w-4" />
                          ) : (
                            <span className={`inline-flex h-2 w-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-pink-500'}`} />
                          )}
                          {action.label}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default VideosFeed;

