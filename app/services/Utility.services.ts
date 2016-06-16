export class UtilityService {
  constructor() {

  }

  public static processEmail(email: string) {
    return email.replace(/\./g, ",");
  }
}
