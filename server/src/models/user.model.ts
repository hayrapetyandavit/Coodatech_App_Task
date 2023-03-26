import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config";
import Card from "./card.model";
import File from "./file.model";

export enum roles {
  "ADMIN" = "ADMIN",
  "USER" = "USER",
}

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: roles;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Omit<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: roles;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly card?: Card[];

  public static associate(models: { Card: typeof Card; File: typeof File }) {
    User.hasMany(models.Card, { foreignKey: "userId" });
    User.hasMany(models.File, { foreignKey: "userId" });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "User",
    timestamps: true,
  }
);

export default User;
