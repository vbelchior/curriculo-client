export class TypeUtil {
  private constructor() {} // eslint-disable-line @typescript-eslint/no-empty-function

  public static exists(value: any) {
    return value !== null && value !== undefined;
  }
  public static hasText(value: any) {
    return TypeUtil.exists(value) && value !== '';
  }
  public static isFullArray(value: any[]): boolean {
    return value !== null && value !== undefined && value.length > 0;
  }
  public static isFullString(value: string, trim?: boolean) {
    if (trim)
      return value !== null && value !== undefined && value.trim().length > 0;
    else return value !== null && value !== undefined && value.length > 0;
  }
}
