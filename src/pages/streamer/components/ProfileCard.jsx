const ProfileCard = ({ profile, assets, isDark = false }) => {
    const textPrimary = isDark ? 'text-white' : 'text-gray-900';
    const textSecondary = isDark ? 'text-gray-300' : 'text-gray-600';
    const assetSet = assets ?? {};

    const followerLabel = (() => {
        if (profile?.followers === undefined || profile?.followers === null) return null;
        const num = Number(profile.followers);
        if (Number.isNaN(num)) return `${profile.followers}`;
        return `${num.toLocaleString()} followers`;
    })();

    const resolveAsset = (a, preferLight = false) => {
        if (!a) return null;
        if (typeof a === 'string') return a;
        if (typeof a === 'object') {
            if (preferLight) return a.light ?? a.dark ?? null;
            return isDark ? a.dark ?? a.light ?? null : a.light ?? a.dark ?? null;
        }
        return null;
    };

    return (
        <section
            className={`relative rounded-3xl p-6 transition-colors ${
                isDark ? 'border border-gray-700 bg-gray-900/90 shadow-none' : 'bg-white shadow-[0_18px_35px_-25px_rgba(236,72,153,0.45)]'
            }`}
        >
            <button
                type="button"
                className="absolute -right-4 -top-4 inline-flex h-10 w-10 items-center justify-center rounded-full"
                aria-label="Edit streamer profile"
            >
                <img src={resolveAsset(assetSet.edit)} alt="Edit streamer profile" className="h-7 w-7 object-contain" loading="lazy" />
            </button>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative h-28 w-28 shrink-0">
                            <img
                                src={resolveAsset(assetSet.union)}
                                data-light-src={typeof assetSet.union === 'object' ? assetSet.union.light : ''}
                                data-dark-src={typeof assetSet.union === 'object' ? assetSet.union.dark : ''}
                                alt="Profile highlight"
                                className="h-full w-full"
                                loading="lazy"
                                onError={(e) => {
                                    const img = e.currentTarget;
                                    try {
                                        const light = img.dataset.lightSrc;
                                        const dark = img.dataset.darkSrc;
                                        // if current src is dark and light exists, try light fallback once
                                        if (!img.dataset.fallbacked && light && img.src === dark) {
                                            img.dataset.fallbacked = '1';
                                            img.src = light;
                                            return;
                                        }
                                    } catch (err) {
                                        // ignore
                                    }

                                    // hide image if all fallbacks fail
                                    img.style.display = 'none';
                                }}
                            />
                            <div className="absolute inset-1 mt-3">
                                <img
                                    src={profile?.avatar ?? ''}
                                    alt={profile?.username ?? 'Streamer avatar'}
                                    className="h-full w-full"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col justify-center gap-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className={`text-2xl font-semibold tracking-tight ${textPrimary}`}>{profile?.username ?? 'Unknown streamer'}</h1>
                                <img src={resolveAsset(assetSet.verified)} alt="Verified streamer" className="h-5 w-5 object-contain" loading="lazy" />
                            </div>
                            {followerLabel ? (
                                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{followerLabel}</p>
                            ) : null}
                            {profile?.pnl ? (
                                <p className="text-sm font-semibold text-emerald-500">PNL: {profile.pnl}</p>
                            ) : null}
                        </div>
                    </div>

                    {profile?.bio ? (
                        <p className={`max-w-sm text-sm leading-relaxed ${textSecondary}`}>{profile.bio}</p>
                    ) : null}
                </div>

                <div className="flex items-center justify-center gap-5">
                    {(assetSet.actions || []).map((iconObj, index) => {
                        const src = resolveAsset(iconObj); // use dark when available
                        if (!src) return null;

                        return (
                            <button
                                key={index}
                                type="button"
                                className={`inline-flex h-16 w-16 items-center justify-center rounded-full transition ${isDark ? 'bg-emerald-700/10 hover:bg-emerald-700/20' : 'bg-pink-500/10 hover:bg-pink-500/20'}`}
                            >
                                <img
                                    src={src}
                                    alt={`Action icon ${index + 1}`}
                                    className="h-8 w-8 object-contain"
                                    loading="lazy"
                                    data-fallbacked={false}
                                    onError={(e) => {
                                        const el = e.currentTarget;
                                        // if the src came from dark variant and a light variant exists, try light
                                        try {
                                            if (!el.dataset.fallbacked && typeof iconObj === 'object' && iconObj.light) {
                                                el.dataset.fallbacked = '1';
                                                el.src = iconObj.light;
                                                return;
                                            }
                                        } catch (err) {
                                            // ignore
                                        }

                                        // otherwise hide the button to avoid empty boxes
                                        const btn = el.closest('button');
                                        if (btn) btn.style.display = 'none';
                                        else el.style.display = 'none';
                                    }}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProfileCard;

