const pool = require("./connect");
const fs = require("fs");
const path = require("path");

async function runMigrations() {
  try {
    const migrationDir = path.resolve(__dirname, "../", "../", "migrations");
    const migrationFiles = fs.readdirSync(migrationDir);

    for (const migrationFile of migrationFiles) {
      const filePath = path.join(migrationDir, migrationFile);
      const sqlQuery = fs.readFileSync(filePath, "utf8");

      await new Promise((resolve, reject) => {
        pool.query(sqlQuery, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
      console.log(`Migration successful:${migrationFile}`);
    }
  } catch (error) {}
}

runMigrations();
