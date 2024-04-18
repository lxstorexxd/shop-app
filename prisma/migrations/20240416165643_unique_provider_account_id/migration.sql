/*
  Warnings:

  - A unique constraint covering the columns `[provider_account_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_account_id_key" ON "accounts"("provider_account_id");
