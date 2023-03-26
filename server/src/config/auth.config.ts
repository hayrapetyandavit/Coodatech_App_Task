import dotenv from "dotenv";

dotenv.config();

export default {
  ACCESS_JWT_SECRET:
    process.env.ACCESS_JWT_SECRET || "jwtsecretkeyifwedonthaveanotherfromenv",
  REFRESH_JWT_SECRET:
    process.env.REFRESH_JWT_SECRET ||
    "refreshjwtsecretkeyifwedonthaveanotherfromenv",
  jwtExpiration: 3600,
  jwtRefreshExpiration: 1000000,
};
