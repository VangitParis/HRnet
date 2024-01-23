const isLocal = process.env.NODE_ENV === "development";

export const basename = isLocal ? "/" : "/HRnet";