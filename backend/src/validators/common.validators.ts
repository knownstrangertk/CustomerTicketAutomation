import { z } from 'zod';

export const idParamSchema = z.object({ params: z.object({ id: z.string().min(1) }) });

export const loginSchema = z.object({
  body: z.object({ email: z.string().email(), password: z.string().min(6) })
});

export const refreshSchema = z.object({ body: z.object({ refreshToken: z.string().min(1) }) });

export const passwordSchema = z.object({
  body: z.object({ oldPassword: z.string().min(6), newPassword: z.string().min(6) })
});

export const createAssessmentSchema = z.object({
  body: z.object({
    title: z.string(), subjectId: z.string(), classId: z.string(), sectionId: z.string(),
    teacherId: z.string(), totalMarks: z.number(), testType: z.enum(['ENDLINE', 'MIDLINE', 'UNIT_TEST', 'WEEKLY']),
    testMode: z.enum(['ONLINE', 'OFFLINE']), testDate: z.string(), duration: z.number(), academicYearId: z.string()
  })
});

export const createHomeworkSchema = z.object({
  body: z.object({
    subjectId: z.string(), classId: z.string(), sectionId: z.string(), teacherId: z.string(),
    topic: z.string(), description: z.string(), classworkDetails: z.string().optional(),
    homeworkDetails: z.string(), dueDate: z.string(), isOffline: z.boolean().optional()
  })
});

export const markAttendanceSchema = z.object({
  body: z.object({
    date: z.string(), markedBy: z.string(), entries: z.array(z.object({
      studentId: z.string(), classId: z.string(), sectionId: z.string(), status: z.enum(['PRESENT','ABSENT','LATE','HALF_DAY']), remarks: z.string().optional()
    }))
  })
});
