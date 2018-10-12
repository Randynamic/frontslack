import ServiceBase from "./ServiceBase";

export default class UserData extends ServiceBase {
  constructor(state) {
    super(state);
    this.session = state.session;
  }
  get() {
    return this.request("/users.info", "user=UD3J0GD6U");
  }
}
