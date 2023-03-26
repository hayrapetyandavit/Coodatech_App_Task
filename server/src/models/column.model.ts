import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config";
import User from "./user.model";
import Card from "./card.model";

interface ColAttributes {
  id: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ColCreationAttributes
  extends Omit<ColAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Column extends Model<ColAttributes, ColCreationAttributes> {
  public id!: number;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly card?: Card[];

  public static associate(models: { Card: typeof Card }) {
    User.hasMany(models.Card, { foreignKey: "columnId" });
  }
}

Column.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Column",
    timestamps: true,
  }
);

export default Column;
