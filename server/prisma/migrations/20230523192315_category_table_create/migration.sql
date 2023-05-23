/*
  Warnings:

  - You are about to drop the column `category` on the `Item` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Category" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "itemId" TEXT,
    CONSTRAINT "Category_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrls" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "hasDiscount" BOOLEAN NOT NULL,
    "discountPercentage" TEXT,
    "discountValue" REAL,
    "discountedValue" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quantity" INTEGER NOT NULL
);
INSERT INTO "new_Item" ("_id", "createdAt", "description", "discountPercentage", "discountValue", "discountedValue", "hasDiscount", "imageUrls", "name", "price", "quantity", "updatedAt") SELECT "_id", "createdAt", "description", "discountPercentage", "discountValue", "discountedValue", "hasDiscount", "imageUrls", "name", "price", "quantity", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
