function issuesToErrors(issues) {
  const fieldErrors = {};
  const formErrors = [];

  for (const issue of issues) {
    const field = issue.path?.[0];

    if (!field) {
      formErrors.push(issue.message);
      continue;
    }

    fieldErrors[field] ??= [];
    fieldErrors[field].push(issue.message);
  }

  return {
    fieldErrors,
    formError: formErrors[0] ?? "Dati non validi",
  };
}

export { issuesToErrors };
