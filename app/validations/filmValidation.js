exports.validateFilm = (req, res, next) => {
  let errors = {};
  const {
    title,
    description,
    genres,
    country,
    director,
    releaseYear,
    duration,
    rating,
    posterSrc,
    bgSrc,
    trailerID,
  } = req.body;
  if (!title) {
    errors.title = errMessage("required", "Pavadinimas");
  } else if (title.length < 2) {
    errors.title = errMessage("min_symbols", "Pavadinimas", 2);
  } else if (title.length > 40) {
    errors.title = errMessage("max_symbols", "Pavadinimas", 40);
  } else if (!/^[a-zA-Z0-9 .,:-]+$/.test(title)) {
    errors.title = "Pavadinimas gali būti sudarytas tik iš lotyniškų raidžių, skaičių, taškų, kablelių ir dvitaškių!";
  }

  if (!description) {
    errors.description = errMessage("required", "Aprašymas");
  } else if (description.length < 2) {
    errors.description = errMessage("min_symbols", "Aprašymas", 2);
  } else if (title.length > 4000) {
    errors.title = errMessage("max_symbols", "Aprašymas", 40);
  }

  if (!genres) {
    errors.genres = errMessage("required", "Žanras");
  } else if (genres.length < 2) {
    errors.genres = errMessage("min_symbols", "Žanras", 2);
  } else if (genres.length > 15) {
    errors.genres = errMessage("max_symbols", "Žanras", 20);
  }

  if (!country) {
    errors.country = errMessage("required", "Šalis");
  } else if (country.length < 2) {
    errors.country = errMessage("min_symbols", "Šalis", 2);
  } else if (country.length > 15) {
    errors.country = errMessage("max_symbols", "Šalis", 20);
  } else if (!/^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/.test(country)) {
    errors.country = "Šalies pavadinimas turi būti sudarytas tik iš raidžių!";
  }

  if (!director) {
    errors.director = errMessage("required", "Režisierius");
  } else if (director.length < 2) {
    errors.director = errMessage("min_symbols", "Režisierius", 2);
  } else if (director.length > 20) {
    errors.director = errMessage("max_symbols", "Režisierius", 20);
  }

  if (!releaseYear) {
    errors.releaseYear = errMessage("required", "Išleidimo metai");
  } else if (releaseYear < 1895) {
    errors.releaseYear = `Data negali būti ankstesnė nei 1895 m.`;
  } else if (releaseYear > 2100) {
    errors.releaseYear = `Data negali būti didesnė nei 2100 m.`;
  }

  if (!duration) {
    errors.duration = errMessage("required", "Trukmė");
  }
  if (!rating) {
    errors.rating = errMessage("required", "Reitingas");
  } else if (rating < 0.01) {
    errors.rating = `Minimali reikšmė 0.01`;
  } else if (rating > 10) {
    errors.rating = `Maksimali reikšmė 10`;
  }

  if (!posterSrc) {
    errors.posterSrc = errMessage("required", "Filmo afišos nuoroda");
  }
  if (!bgSrc) {
    errors.bgSrc = errMessage("required", "Filmo fono nuoroda");
  }
  if (!trailerID) {
    errors.trailerID = errMessage("required", "Trailer id");
  } else if (trailerID.length != 11) {
    errors.trailerID = `Trailer id turi būti sudarytas iš 11 simbolių!`;
  }
  !Object.keys(errors).length
    ? next()
    : res.status(500).json({ status: "error", data: errors });
};
