export class UtilityService {
  constructor() {

  }

  static processEmail(email: string) {
    return email.replace(/\./g, ",");
  }
}
