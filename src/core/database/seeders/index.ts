// Export seeds
// export * from "./user.seed";

/**
 * Upsert unordered data in the database like string IDs, non-autoincrement IDs
 * @param model Prisma model
 * @param seedData Set of data to seed
 * @param primaryKey Primary key of the Prisma model
 */
export async function upsertUnorderedData<T>(
  model: any,
  seedData: T[],
  primaryKey: keyof T,
) {
  await Promise.all(
    seedData.map(item =>
      model.upsert({
        where: { [primaryKey]: item[primaryKey] },
        update: {},
        create: { ...item },
      }),
    ),
  )
}

/**
 * Upsert ordered data in the database like autoincrement IDs
 * @param model Prisma model
 * @param seedData Set of data to seed
 * @param primaryKey Primary key of the Prisma model
 */
export async function upsertOrderedData<T>(
  model: any,
  seedData: T[],
  primaryKey: keyof T,
) {
  for (const item of seedData) {
    const { [primaryKey]: id, ...rest } = item
    await model.upsert({
      where: { [primaryKey]: id },
      update: {},
      create: rest,
    })
  }
}
