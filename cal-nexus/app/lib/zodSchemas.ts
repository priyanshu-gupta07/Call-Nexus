import { conformZodMessage } from '@conform-to/zod';
import { title } from 'process';
import {z} from 'zod'


export const OnboardingSchema = z.object({
    fullName: z.string().min(3).max(255),
    userName: z.string().min(3).max(255).regex(/^[a-zA-Z0-9-]+$/,{
        message: "only alphanumeric characters and hyphens"
    }),
});

export function OnboardingSchemaValidation(options?: {
    isUsernameUnique: () => Promise<boolean>
}) {
    return z.object({
      userName: z
        .string()
        .min(3)
        .max(150)
        .regex(/^[a-zA-Z0-9-]+$/, {
          message: "Username must contain only letters, numbers, and hyphens",
        })
        .pipe(

          z.string().superRefine((_, ctx) => {
            if (typeof options?.isUsernameUnique !== "function") {
              ctx.addIssue({
                code: "custom",
                message: conformZodMessage.VALIDATION_UNDEFINED,
                fatal: true,
              });
              return;
            }
  
            return options.isUsernameUnique().then((isUnique) => {
              if (!isUnique) {
                ctx.addIssue({
                  code: "custom",
                  message: "Username is already exists",
                });
              }
            });
          })
        ),
      fullName: z.string().min(3).max(150),
    });
  }

  export const settingsSchema = z.object({
    fullName: z.string().min(3).max(150),
    profileImage: z.string(),
  });

  export const eventTypeSchema = z.object({
    title: z.string().min(3).max(150),
    duration: z.number().min(1).max(100),
    url: z.string().min(3).max(150),
    description: z.string().min(3).max(300),
    videoCallSoftware: z.string(),
  });