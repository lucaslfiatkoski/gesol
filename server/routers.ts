import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createContact, getContacts, createBudget, getBudgets } from "./db";
import { notifyOwner } from "./_core/notification";
import crypto from "crypto";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        phone: z.string().min(1, "Telefone é obrigatório"),
        subject: z.string().min(1, "Assunto é obrigatório"),
        message: z.string().min(1, "Mensagem é obrigatória"),
      }))
      .mutation(async ({ input }) => {
        try {
          const contact = await createContact({
            id: crypto.randomUUID(),
            ...input,
          });

          // Notify owner about new contact
          await notifyOwner({
            title: "Novo contato recebido",
            content: `${input.name} (${input.email}) entrou em contato: ${input.subject}`,
          });

          return { success: true, message: "Contato enviado com sucesso!" };
        } catch (error) {
          console.error("Error submitting contact:", error);
          return { success: false, message: "Erro ao enviar contato" };
        }
      }),

    list: publicProcedure.query(async () => {
      return await getContacts();
    }),
  }),

  budget: router({
    calculate: publicProcedure
      .input(z.object({
        monthlyConsumption: z.number().min(1, "Consumo mensal deve ser maior que 0"),
        roofArea: z.number().min(1, "Área do telhado deve ser maior que 0"),
      }))
      .query(({ input }) => {
        // Simple calculation logic
        // Average cost per kWh in Brazil: ~R$ 0.70
        // Average solar panel cost: ~R$ 5,000 per kW installed
        // Average system efficiency: ~80%
        
        const monthlyConsumption = input.monthlyConsumption;
        const roofArea = input.roofArea;
        
        // System size needed (kW) - assuming 150W per m² of roof
        const systemSizeKw = (roofArea * 150) / 1000;
        
        // Estimated cost (R$ 5,000 per kW)
        const estimatedCost = Math.round(systemSizeKw * 5000 * 100); // in centavos
        
        // Monthly savings (R$ 0.70 per kWh)
        const monthlySavings = Math.round(monthlyConsumption * 0.70 * 100); // in centavos
        
        // Payback period in months
        const paybackMonths = Math.round((estimatedCost / 100) / (monthlySavings / 100));
        
        return {
          systemSizeKw: parseFloat(systemSizeKw.toFixed(2)),
          estimatedCost: estimatedCost / 100, // Convert back to R$
          estimatedMonthlySavings: monthlySavings / 100, // Convert back to R$
          paybackPeriodMonths: paybackMonths,
          annualSavings: (monthlySavings / 100) * 12,
          co2Reduction: parseFloat((monthlyConsumption * 0.5).toFixed(2)), // kg CO2 per month
        };
      }),

    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        phone: z.string().min(1, "Telefone é obrigatório"),
        monthlyConsumption: z.number().min(1),
        roofArea: z.number().min(1),
        roofType: z.string().min(1),
        location: z.string().min(1),
        estimatedCost: z.number(),
        estimatedMonthlySavings: z.number(),
        paybackPeriodMonths: z.number(),
      }))
      .mutation(async ({ input }) => {
        try {
          const budget = await createBudget({
            id: crypto.randomUUID(),
            name: input.name,
            email: input.email,
            phone: input.phone,
            monthlyConsumption: input.monthlyConsumption,
            roofArea: input.roofArea,
            roofType: input.roofType,
            location: input.location,
            estimatedCost: Math.round(input.estimatedCost * 100), // Convert to centavos
            estimatedMonthlySavings: Math.round(input.estimatedMonthlySavings * 100),
            paybackPeriodMonths: input.paybackPeriodMonths,
          });

          // Notify owner about new budget request
          await notifyOwner({
            title: "Novo orçamento solicitado",
            content: `${input.name} solicitou orçamento para ${input.roofArea}m² de telhado em ${input.location}`,
          });

          return { success: true, message: "Orçamento enviado com sucesso!" };
        } catch (error) {
          console.error("Error submitting budget:", error);
          return { success: false, message: "Erro ao enviar orçamento" };
        }
      }),

    list: publicProcedure.query(async () => {
      return await getBudgets();
    }),
  }),
});

export type AppRouter = typeof appRouter;

