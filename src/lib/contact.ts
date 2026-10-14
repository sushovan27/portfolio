export const CONTACT_EMAIL = "sushovanhalderofficial@gmail.com";

export type ContactFields = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export function validateContactFields(fields: ContactFields): {
  values: ContactFields;
  errors: ContactErrors;
} {
  const values = {
    name: fields.name.trim(),
    email: fields.email.trim(),
    message: fields.message.trim(),
  };
  const errors: ContactErrors = {};
  const hasControlCharacters = (value: string) => /[\u0000-\u001f\u007f]/.test(value);

  if (!values.name) errors.name = "Enter your name.";
  else if (values.name.length > 100) errors.name = "Name must be 100 characters or fewer.";
  else if (hasControlCharacters(values.name)) errors.name = "Name cannot contain line breaks or control characters.";

  if (!values.email) errors.email = "Enter your email address.";
  else if (values.email.length > 254) errors.email = "Email must be 254 characters or fewer.";
  else if (hasControlCharacters(values.email) || !/^[^\s@<>()[\],;:"\\]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.message) errors.message = "Enter a message.";
  else if (values.message.length > 4000) errors.message = "Message must be 4,000 characters or fewer.";
  else if (/[\u0000-\u0009\u000b\u000c\u000e-\u001f\u007f]/.test(values.message)) {
    errors.message = "Message contains unsupported control characters.";
  }

  return { values, errors };
}

export function createContactMailto(fields: ContactFields): string {
  const subject = encodeURIComponent(`Portfolio inquiry from ${fields.name}`);
  const body = encodeURIComponent(`From: ${fields.name} (${fields.email})\n\nMessage:\n${fields.message}`);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
