-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sheet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "localId" TEXT NOT NULL DEFAULT 'temp',
    "title" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Sheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sheet" ("createdAt", "data", "id", "title", "updatedAt", "userId") SELECT "createdAt", "data", "id", "title", "updatedAt", "userId" FROM "Sheet";
DROP TABLE "Sheet";
ALTER TABLE "new_Sheet" RENAME TO "Sheet";
CREATE UNIQUE INDEX "Sheet_userId_localId_key" ON "Sheet"("userId", "localId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
