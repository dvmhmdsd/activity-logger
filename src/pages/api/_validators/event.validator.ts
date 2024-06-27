export class EventValidator {
  create(data: any) {
    const requiredProperties = [
      'action',
      'action.id',
      'action.name',
      'action.object',
      'actor_id',
      'actor_name',
      'group',
      'target_id',
      'target_name',
      'location',
      'occurred_at',
    ];

    for (const property of requiredProperties) {
      if (!getProperty(data, property)) {
        throw new Error(`${property} is required`);
      }
    }

    return data;
  }
}

function getProperty(obj: any, path: string) {
  const properties = path.split('.');
  let value = obj;
  for (const property of properties) {
    if (!value?.hasOwnProperty(property)) {
      return undefined;
    }
    value = value[property];
  }
  return value;
}
