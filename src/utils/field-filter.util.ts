/**
 * Filter object fields based on optFields parameter
 * Supports nested field selection (e.g., 'project.name', 'assignee.name')
 */
export function filterFields<T extends Record<string, any>>(
  data: T,
  optFields?: string[]
): Partial<T> {
  if (!optFields || optFields.length === 0) {
    return data;
  }

  const result: Partial<T> = {};
  const fieldSet = new Set(optFields);

  // Check for direct field matches
  for (const key in data) {
    if (fieldSet.has(key)) {
      result[key] = data[key];
    }
  }

  // Handle nested fields (e.g., 'project.name')
  for (const field of optFields) {
    if (field.includes('.')) {
      const parts = field.split('.');
      const rootKey = parts[0];
      const nestedPath = parts.slice(1).join('.');

      if (data[rootKey] && typeof data[rootKey] === 'object') {
        if (!result[rootKey]) {
          (result as any)[rootKey] = { ...(data[rootKey] as any) };
        }
        if ((result as any)[rootKey] && typeof (result as any)[rootKey] === 'object') {
          (result as any)[rootKey] = filterFields((result as any)[rootKey] as Record<string, any>, [nestedPath]);
        }
      }
    }
  }

  return result;
}

/**
 * Filter array of objects
 */
export function filterFieldsArray<T extends Record<string, any>>(
  data: T[],
  optFields?: string[]
): Partial<T>[] {
  return data.map((item) => filterFields(item, optFields));
}

