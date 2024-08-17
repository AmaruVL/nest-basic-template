import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  /**
   * Use upsertUnorderedData for unordered data (string IDs, non-autoincrement IDs)
   * Use upsertOrderedData for ordered data (autoincrement IDs)
   */
  // await upsertUnorderedData(prisma.user, userSeed, 'userId')
  // await upsertOrderedData(prisma.user, userSeed, 'userId')
}

main()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
