'use strict';

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { fileURLToPath } from "url";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

import fsExtra from "fs";
const configPath = path.join(__dirname, "../config/config.json");
const rawConfig = fsExtra.readFileSync(configPath, "utf-8");
const configs = JSON.parse(rawConfig);
const config = configs[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const files = fs.readdirSync(__dirname).filter(file =>
  file.indexOf(".") !== 0 &&
  file !== basename &&
  file.slice(-3) === ".js" &&
  file.indexOf(".test.js") === -1
);

for (const file of files) {
  const modelPath = path.join(__dirname, file).replace(/\\/g, "/");
  const modelModule = await import(`file://${modelPath}`);
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Run associations
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
