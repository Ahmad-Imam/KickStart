import { userModel } from "@/models/user-model";
import { replaceMongoIdInObject } from "@/utils/data-util";

export async function getUserByEmail(email) {
  if (!email) return null;
  const user = await userModel.findOne({ email }).lean();

  return replaceMongoIdInObject(user);
}
