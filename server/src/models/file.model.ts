import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";
import User from "./user.model";
import Card from "./card.model";

interface FileAttributes {
  id: number;
  type: string;
  name: string;
  data: Buffer;
  size: number;
  userId: number;
  cardId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FileCreationAttributes
  extends Omit<FileAttributes, "id" | "createdAt" | "updatedAt"> {}

export class File extends Model<FileAttributes, FileCreationAttributes> {
  public id!: number;
  public type!: string;
  public name!: string;
  public data!: Buffer;
  public size!: number;
  public userId!: number;
  public cardId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly user?: User;
  public readonly card?: Card;

  public static associate(models: { User: typeof User; Card: typeof Card }) {
    File.belongsTo(models.User, { foreignKey: "userId" });
    File.belongsTo(models.Card, { foreignKey: "cardId" });
  }
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    cardId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "File",
    timestamps: true,
  }
);

export default File;
