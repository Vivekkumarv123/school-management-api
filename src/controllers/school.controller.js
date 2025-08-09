import School from "../models/school.model.js";

// Haversine formula for distance (in km)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Add School(s)
export const addSchool = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Multiple schools
      const schools = req.body;

      // Validate each school
      for (let i = 0; i < schools.length; i++) {
        const { name, address, latitude, longitude } = schools[i];
        if (!name || !address || latitude === undefined || longitude === undefined) {
          return res.status(400).json({ message: `All fields are required for school at index ${i}` });
        }
        if (isNaN(latitude) || isNaN(longitude)) {
          return res.status(400).json({ message: `Latitude & Longitude must be numbers for school at index ${i}` });
        }
      }

      const createdSchools = await School.bulkCreate(schools);
      return res.status(201).json({ message: "Schools added successfully", schools: createdSchools });

    } else {
      // Single school
      const { name, address, latitude, longitude } = req.body;

      // Validation
      if (!name || !address || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ message: "All fields are required" });
      }
      if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ message: "Latitude & Longitude must be numbers" });
      }

      const school = await School.create({ name, address, latitude, longitude });
      return res.status(201).json({ message: "School added successfully", school });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// List Schools (sorted by distance)
export const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: "Latitude & Longitude are required" });
    }
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: "Latitude & Longitude must be numbers" });
    }

    const schools = await School.findAll();

    const sortedSchools = schools
      .map((school) => ({
        ...school.toJSON(),
        distance: calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
