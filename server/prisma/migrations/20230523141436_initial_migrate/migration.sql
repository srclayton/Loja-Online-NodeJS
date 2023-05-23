-- CreateTable
CREATE TABLE "Item" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrls" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "hasDiscount" BOOLEAN NOT NULL,
    "discountPercentage" TEXT NOT NULL,
    "discountValue" REAL NOT NULL,
    "discountedValue" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quantity" INTEGER NOT NULL
);
