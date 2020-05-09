def get_ema(cps):
    ema1 = cps.copy()
    ema2 = cps.copy()
    for i in range(len(cps)):
        if i == 0:
            ema1[i] = cps[i]
            ema2[i] = cps[i]
        if i > 0:
            ema1[i] = (11 * ema1[i - 1] + 2 * cps[i]) / 13
            ema2[i] = (25 * ema2[i - 1] + 2 * cps[i]) / 27
    return ema1, ema2


def get_macd(cps):
    ema12, ema26 = get_ema(cps)
    diff = cps.copy()
    dea = cps.copy()
    bar = cps.copy()
    for i in range(len(cps)):
        if i == 0:
            diff[i] = 0
            dea[i] = 0
            bar[i] = 0
        if i > 0:
            diff[i] = ema12[i] - ema26[i]
            dea[i] = dea[i - 1] * 0.8 + diff[i] * 0.2
            bar[i] = 2 * (diff[i] - dea[i])
    return ema12. ema26, diff, dea, bar
