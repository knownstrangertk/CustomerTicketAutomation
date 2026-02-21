import bcrypt from 'bcryptjs';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const school = await prisma.school.create({
    data: {
      name: 'Springfield Public School',
      code: 'SPS001',
      address: 'Main Road, Springfield',
      phone: '+911234567890',
      email: 'info@springfield.edu'
    }
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@schoolconnect.com',
      password: await bcrypt.hash('Admin@123', 10),
      role: Role.ADMIN,
      schoolId: school.id
    }
  });

  const class1 = await prisma.class.create({ data: { name: 'Grade 1', schoolId: school.id } });
  const sectionA = await prisma.section.create({ data: { name: 'A', classId: class1.id } });
  const ay = await prisma.academicYear.create({
    data: { name: '2026-27', startDate: new Date('2026-04-01'), endDate: new Date('2027-03-31'), isCurrent: true, schoolId: school.id }
  });

  const parentUser = await prisma.user.create({
    data: { email: 'parent1@mail.com', password: await bcrypt.hash('Parent@123', 10), role: Role.PARENT, schoolId: school.id }
  });
  const parent = await prisma.parent.create({
    data: { userId: parentUser.id, firstName: 'Marge', lastName: 'Simpson', phone: '9999999991', email: 'parent1@mail.com', address: 'Evergreen Terrace' }
  });

  const teacherUser = await prisma.user.create({
    data: { email: 'teacher1@mail.com', password: await bcrypt.hash('Teacher@123', 10), role: Role.TEACHER, schoolId: school.id }
  });
  const teacher = await prisma.teacher.create({
    data: { userId: teacherUser.id, firstName: 'Edna', lastName: 'Krabappel', phone: '9999999992', email: 'teacher1@mail.com', subjects: ['Math'] }
  });

  const student = await prisma.student.create({
    data: {
      firstName: 'Bart',
      lastName: 'Simpson',
      dateOfBirth: new Date('2016-04-01'),
      gender: 'M',
      admissionNumber: 'ADM001',
      classId: class1.id,
      sectionId: sectionA.id,
      parentId: parent.id,
      schoolId: school.id,
      address: 'Evergreen Terrace'
    }
  });

  await prisma.feeStructure.create({
    data: {
      academicYearId: ay.id,
      classId: class1.id,
      schoolId: school.id,
      feeType: 'INSTALLMENT',
      installmentNumber: 1,
      amount: 25000,
      dueDate: new Date('2026-06-10'),
      description: 'Term 1 fee'
    }
  });

  console.log({ school: school.id, admin: admin.id, teacher: teacher.id, student: student.id });
}

main().finally(() => prisma.$disconnect());
