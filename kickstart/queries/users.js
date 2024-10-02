import { userModel } from "@/models/user-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export async function getUserByEmail(email) {
  if (!email) return null;
  const user = await userModel.findOne({ email }).lean();

  return replaceMongoIdInObject(user);
}

export async function getAllUsers() {
  const users = await userModel.find().lean();

  return replaceMongoIdInArray(users);
}

export async function getUserByIds(userIds) {
  const users = await userModel.find({ _id: { $in: userIds } }).lean();

  return replaceMongoIdInArray(users);
}
