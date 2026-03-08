const countryAliases = {
  "Republic of Korea": "Korea",
  "South Korea": "Korea",
};

const optimizedCountryAssets = new Set([
  "Canada",
  "Germany",
  "Italy",
  "Korea",
  "Slovakia",
]);

const normalizeCountry = (country) => {
  const trimmedCountry = String(country || "").trim();
  return countryAliases[trimmedCountry] || trimmedCountry;
};

const countryPngFallback = (country) => `/${encodeURIComponent(country)}.png`;

export const getCountryCardImageSrc = (country) => {
  const normalizedCountry = normalizeCountry(country);

  if (!normalizedCountry) {
    return "/picture.png";
  }

  if (optimizedCountryAssets.has(normalizedCountry)) {
    return `/optimized/countries/${normalizedCountry}-card.jpg`;
  }

  return countryPngFallback(normalizedCountry);
};

export const getCountryDetailImageSrc = (country) => {
  const normalizedCountry = normalizeCountry(country);

  if (!normalizedCountry) {
    return "/picture.png";
  }

  if (optimizedCountryAssets.has(normalizedCountry)) {
    return `/optimized/countries/${normalizedCountry}-detail.jpg`;
  }

  return countryPngFallback(normalizedCountry);
};
