import http from "@/utils/api";
import { AccountResType } from "@/schemaValidations/account.schema";

const accountApiRequest = {
  meClient: () =>
    http.get<IBackendRes<AccountResType>>("users/my-info"),
};

export default accountApiRequest;
