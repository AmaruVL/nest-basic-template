import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  // Persons
  // const PersonsPromises = personSeed.map(item =>
  //   prisma.person.upsert({
  //     where: { personId: item.personId },
  //     update: {},
  //     create: { ...item },
  //   }),
  // )
  // await Promise.all(PersonsPromises)
}

main()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
