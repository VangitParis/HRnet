const isProduction = process.env.NODE_ENV === "production";

export const basename = isProduction ? "/HRnet" : "/";