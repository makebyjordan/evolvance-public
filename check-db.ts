import { PrismaClient } from './src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log('Successfully connected to the database')
  } catch (e) {
    console.error('Connection error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
