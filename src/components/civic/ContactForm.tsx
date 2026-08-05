import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().nonempty({ message: "Please enter a name." }).max(100),
  email: z.string().trim().email({ message: "Please enter a valid email." }).max(255),
  organisation: z.string().trim().max(120).optional(),
  message: z
    .string()
    .trim()
    .nonempty({ message: "Please describe the work." })
    .max(1000, { message: "Please keep it under 1000 characters." }),
});

type Field = "name" | "email" | "organisation" | "message";

const FIELD_CLASS =
  "w-full border-0 border-b border-[color-mix(in_oklab,var(--rule)_70%,transparent)] bg-transparent pb-3 pt-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none transition-colors duration-500 sm:text-[0.95rem]";

export function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    organisation: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Field;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    const { name, email, organisation, message } = parsed.data;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      organisation ? `Organisation: ${organisation}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:studio@solenacivic.com?subject=${encodeURIComponent(
      `Enquiry — ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-2xl">
      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="label-civic block">
            Name
          </label>
          <input id="cf-name" name="name" value={values.name} onChange={set("name")} className={`${FIELD_CLASS} mt-4`} />
          {errors.name ? <p className="label-civic mt-3 text-foreground">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="cf-email" className="label-civic block">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            value={values.email}
            onChange={set("email")}
            className={`${FIELD_CLASS} mt-4`}
          />
          {errors.email ? <p className="label-civic mt-3 text-foreground">{errors.email}</p> : null}
        </div>
      </div>

      <div className="mt-10">
        <label htmlFor="cf-org" className="label-civic block">
          Institution — optional
        </label>
        <input
          id="cf-org"
          name="organisation"
          value={values.organisation}
          onChange={set("organisation")}
          className={`${FIELD_CLASS} mt-4`}
        />
      </div>

      <div className="mt-10">
        <label htmlFor="cf-message" className="label-civic block">
          The work
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          maxLength={1000}
          value={values.message}
          onChange={set("message")}
          className={`${FIELD_CLASS} mt-4 resize-none`}
        />
        {errors.message ? <p className="label-civic mt-3 text-foreground">{errors.message}</p> : null}
      </div>

      <div className="mt-12 flex flex-wrap items-baseline gap-6">
        <button
          type="submit"
          className="label-civic rule-hair border-0 border-b border-foreground pb-2 text-foreground transition-opacity duration-700 hover:opacity-55"
        >
          Begin the conversation
        </button>
        {sent ? <p className="label-civic">Thank you — your note is on its way.</p> : null}
      </div>
    </form>
  );
}
