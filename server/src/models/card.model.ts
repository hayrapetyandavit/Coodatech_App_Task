import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.config";
import User from "./user.model";
import Column from "./column.model";
import File from "./file.model";

interface CardAttributes {
  id: number;
  title: string;
  userId: number;
  columnId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CardCreationAttributes
  extends Omit<CardAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Card extends Model<CardAttributes, CardCreationAttributes> {
  public id!: number;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly user?: User;
  public readonly colum?: Column;

  public static associate(models: {
    User: typeof User;
    Column: typeof Column;
    File: typeof File;
  }) {
    Card.belongsTo(models.User, { foreignKey: "userId" });
    Card.belongsTo(models.Column, { foreignKey: "columnId" });
    Card.hasMany(models.File, { foreignKey: "cardId" });
  }
}

Card.init(
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
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    columnId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Card",
    timestamps: true,
  }
);

export default Card;
