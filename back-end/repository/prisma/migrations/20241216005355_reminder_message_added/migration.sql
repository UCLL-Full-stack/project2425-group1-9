/*
  Warnings:

  - Added the required column `reminderMessage` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "reminderMessage" TEXT NOT NULL;
