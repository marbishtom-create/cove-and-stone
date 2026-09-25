import { zodResolver } from '@hookform/resolvers/zod';
import { useRequestAppointment } from '@workspace/api-client-react';
import { ArrowRight, Check, Clock3, MapPin, Phone } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link } from 'wouter';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import './appointments.css';

const TIME_OPTIONS = Array.from({ length: 15 }, (_, index) => {
  const totalMinutes = 10 * 60 + index * 30;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
});

type AppointmentFormValues = {
  fullName: string;
  address: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
};

const getEasternDate = () => {
  const dateParts = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'America/New_York',
    year: 'numeric',
  }).formatToParts(new Date());
  const parts = Object.fromEntries(dateParts.map(({ type, value }) => [type, value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
};

const getDateDayOfWeek = (value: string): number | null => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toISOString().slice(0, 10) === value ? date.getUTCDay() : null;
};

const formatTime = (value: string) => {
  const [hour, minute] = value.split(':').map(Number);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, '0')} ${suffix}`;
};

const appointmentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(120, 'Please keep your name under 120 characters.'),
  address: z
    .string()
    .trim()
    .min(5, 'Please enter the property address.')
    .max(300, 'Please keep the address under 300 characters.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a phone number.')
    .max(30, 'Please keep the phone number under 30 characters.')
    .regex(/^[+()0-9 .-]+$/, 'Use numbers and standard phone characters only.')
    .refine((value) => value.replace(/\D/g, '').length >= 7, 'Enter at least 7 digits.'),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Choose a consultation date.')
    .refine((value) => value >= getEasternDate(), 'Choose today or a future date.'),
  preferredTime: z.enum(TIME_OPTIONS as [string, ...string[]], {
    errorMap: () => ({ message: 'Choose a preferred time.' }),
  }),
}).superRefine(({ preferredDate, preferredTime }, context) => {
  const dayOfWeek = getDateDayOfWeek(preferredDate);
  if (dayOfWeek === 6) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['preferredDate'],
      message: 'We are closed on Saturdays. Please choose another date.',
    });
  }
  if (dayOfWeek === 5 && preferredTime === '17:00') {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['preferredTime'],
      message: 'Friday appointments must finish by 5:00 PM ET. Please choose 4:30 PM or earlier.',
    });
  }
});

export default function Appointments() {
  const [submittedName, setSubmittedName] = useState('');
  const minimumDate = useMemo(getEasternDate, []);
  const mutation = useRequestAppointment();
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      fullName: '',
      address: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
    },
    mode: 'onBlur',
  });
  const selectedDateDay = getDateDayOfWeek(form.watch('preferredDate'));
  const availableTimeOptions =
    selectedDateDay === 5 ? TIME_OPTIONS.filter((time) => time !== '17:00') : TIME_OPTIONS;

  const handleSubmit = (values: AppointmentFormValues) => {
    mutation.mutate(
      { data: values },
      {
        onSuccess: () => {
          setSubmittedName(values.fullName.trim());
          form.reset();
        },
      },
    );
  };

  const handleAnotherRequest = () => {
    setSubmittedName('');
    mutation.reset();
  };

  if (submittedName) {
    return (
      <div className="appointment-page min-h-[100dvh] bg-background pt-28 lg:pt-40">
        <section className="container mx-auto max-w-4xl px-6 py-20 lg:py-28">
          <div
            className="relative overflow-hidden border border-border bg-card px-6 py-16 text-center shadow-[0_24px_70px_rgba(25,46,43,0.08)] md:px-16"
            data-testid="status-appointment-success"
            role="status"
            aria-live="polite"
          >
            <div className="appointment-watermark absolute -right-4 top-4" aria-hidden="true">
              water
            </div>
            <div className="relative mx-auto max-w-2xl">
              <span className="mx-auto mb-7 flex h-16 w-16 items-center justify-center border border-secondary text-secondary">
                <Check size={30} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-secondary">Request received</p>
              <h1 className="mb-5 text-4xl leading-tight text-primary md:text-5xl">
                We&apos;ll be in touch, {submittedName.split(' ')[0]}.
              </h1>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Cove &amp; Stone will contact you to confirm the consultation details. Your preferred time is a request only and is not reserved until our team confirms it.
              </p>
              <button
                type="button"
                className="mt-9 inline-flex min-h-12 items-center justify-center border border-primary px-6 text-xs font-medium uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                data-testid="button-another-appointment"
                onClick={handleAnotherRequest}
              >
                Request another consultation
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="appointment-page min-h-[100dvh] bg-background pt-24 lg:pt-36">
      <section className="border-b border-border bg-card">
        <div className="container mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
            <div>
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-secondary">Design consultation · Start your project</p>
              <h1 className="max-w-3xl text-5xl leading-[1.04] text-primary md:text-7xl">
                Give the backyard a place to begin.
              </h1>
            </div>
            <div className="max-w-md border-l border-secondary pl-6 lg:mb-2">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Tell us where you are, then choose a time that suits you. We&apos;ll listen to the way you want to live outdoors and shape the next conversation around your property.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Choose a preferred date and time in Eastern Time. We are closed Saturdays, and Friday appointments must finish by 5:00 PM.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <aside className="relative">
            <div className="sticky top-32">
              <div className="appointment-watermark mb-10 -ml-1" aria-hidden="true">flow</div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-secondary">A considered first step</p>
              <h2 className="max-w-sm text-3xl leading-tight text-primary md:text-4xl">A good design conversation starts with the real conditions.</h2>
              <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
                We&apos;ll use your property address and preferred time to prepare for a focused first conversation. No commitment is required to send a request.
              </p>
              <div className="mt-10 space-y-5 border-t border-border pt-6 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-secondary" size={18} aria-hidden="true" />
                  <span>Northeast Florida properties, from Jacksonville and the beaches to St. Johns County.</span>
                </div>
                <div className="flex gap-3">
                  <Clock3 className="mt-0.5 shrink-0 text-secondary" size={18} aria-hidden="true" />
                  <span>30-minute preferred-time windows · Friday appointments must finish by 5:00 PM · closed Saturdays.</span>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 shrink-0 text-secondary" size={18} aria-hidden="true" />
                  <span>We&apos;ll call the number you provide to confirm the details.</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="border border-border bg-card p-6 shadow-[0_24px_70px_rgba(25,46,43,0.08)] md:p-10 lg:p-12">
            <div className="mb-9 border-b border-border pb-6">
              <p className="text-xs uppercase tracking-[0.24em] text-secondary">Consultation request</p>
              <h2 className="mt-3 text-3xl text-primary">Let&apos;s find a place to start.</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                All fields are required. Select a preferred date and time below; Cove &amp; Stone will contact you to confirm availability.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="space-y-7" data-testid="form-appointment-request">
                <div className="grid gap-7 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-[0.16em] text-primary">Full name</FormLabel>
                        <FormControl>
                          <input {...field} className="appointment-field" placeholder="Your name" autoComplete="name" data-testid="input-full-name" />
                        </FormControl>
                        <FormMessage data-testid="error-full-name" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-[0.16em] text-primary">Phone</FormLabel>
                        <FormControl>
                          <input {...field} className="appointment-field" placeholder="(904) 555-0148" type="tel" autoComplete="tel" data-testid="input-phone" />
                        </FormControl>
                        <FormMessage data-testid="error-phone" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-[0.16em] text-primary">Property address</FormLabel>
                      <FormControl>
                        <input {...field} className="appointment-field" placeholder="Street address, city, state, ZIP" autoComplete="street-address" data-testid="input-address" />
                      </FormControl>
                      <FormDescription>Where should we imagine the outdoor environment?</FormDescription>
                      <FormMessage data-testid="error-address" />
                    </FormItem>
                  )}
                />

                <div className="grid gap-7 border-t border-border pt-7 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-[0.16em] text-primary">Preferred date</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            onChange={(event) => {
                              field.onChange(event);
                              if (
                                getDateDayOfWeek(event.target.value) === 5 &&
                                form.getValues('preferredTime') === '17:00'
                              ) {
                                form.setValue('preferredTime', '', { shouldDirty: true });
                              }
                            }}
                            className="appointment-field"
                            type="date"
                            min={minimumDate}
                            data-testid="input-preferred-date"
                          />
                        </FormControl>
                        <FormDescription>Saturdays are unavailable. Friday appointments must finish by 5:00 PM ET.</FormDescription>
                        <FormMessage data-testid="error-preferred-date" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-[0.16em] text-primary">Preferred time</FormLabel>
                        <FormControl>
                          <select {...field} className="appointment-field" data-testid="select-preferred-time">
                            <option value="">Choose a time</option>
                            {availableTimeOptions.map((time) => (
                              <option key={time} value={time}>{formatTime(time)}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormDescription>30-minute windows · Friday&apos;s latest start is 4:30 PM ET.</FormDescription>
                        <FormMessage data-testid="error-preferred-time" />
                      </FormItem>
                    )}
                  />
                </div>

                {mutation.isError && (
                  <div className="border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive" data-testid="status-appointment-error" role="alert">
                    We couldn&apos;t send your request right now. Please try again in a moment.
                  </div>
                )}

                <div className="flex flex-col gap-5 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
                    By sending this request, you&apos;re asking our team to confirm a consultation time. No time is reserved by this form.
                  </p>
                  <button
                    type="submit"
                    className="appointment-cta min-h-14 w-full shrink-0 gap-3 px-7 text-xs font-medium uppercase tracking-[0.2em] sm:w-auto"
                    disabled={mutation.isPending}
                    data-testid="button-submit-appointment"
                  >
                    {mutation.isPending ? (
                      <>
                        <span className="h-4 w-4 animate-pulse border border-current/40 border-t-current" aria-hidden="true" />
                        Sending request
                      </>
                    ) : (
                      <>
                        Send consultation request
                        <ArrowRight size={17} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-primary-foreground/70">Prefer to browse before you begin?</p>
          <Link href="/design/" className="inline-flex items-center gap-2 text-secondary transition-colors hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary" data-testid="link-design-process">
            Explore the design process <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}