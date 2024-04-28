import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  int,
  varchar,
  datetime,
  text,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const recetario = mysqlSchema("recetario");

export const dish = recetario.table("Dish", {
  id: int("id").primaryKey().notNull(),
  name: varchar("name", { length: 191 }).notNull(),
});

export const ingredient = recetario.table("Ingredient", {
  id: int("id").primaryKey().notNull(),
  name: varchar("name", { length: 191 }).notNull(),
});

export const dishToIngredient = recetario.table("_DishToIngredient", {
  a: int("A").notNull(),
  b: int("B").notNull(),
});

export const dishToweeklyPlan = recetario.table("_DishToweeklyPlan", {
  a: int("A").notNull(),
  b: int("B").notNull(),
});

export const prismaMigrations = recetario.table("_prisma_migrations", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  checksum: varchar("checksum", { length: 64 }).notNull(),
  finishedAt: datetime("finished_at", { mode: "string", fsp: 3 }),
  migrationName: varchar("migration_name", { length: 255 }).notNull(),
  logs: text("logs"),
  rolledBackAt: datetime("rolled_back_at", { mode: "string", fsp: 3 }),
  startedAt: datetime("started_at", { mode: "string", fsp: 3 })
    .default('CURRENT_TIMESTAMP(3)')
    .notNull(),
  appliedStepsCount: int("applied_steps_count", { unsigned: true })
    .default(0)
    .notNull(),
});

export const plannedWeeks = recetario.table("plannedWeeks", {
  id: int("id").primaryKey().notNull(),
  week: int("week").notNull(),
  year: int("year").notNull(),
  weeklyPlanId: int("weeklyPlanId"),
});

export const weeklyPlan = recetario.table("weeklyPlan", {
  id: int("id").primaryKey().notNull(),
  meal: mysqlEnum("meal", [
    "BREAKFAST",
    "MIDMORNING",
    "LUNCH",
    "DINNER",
    "SNACK",
    "COMPLEMENTARY",
  ]).notNull(),
  day: mysqlEnum("day", [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ]).notNull(),
});