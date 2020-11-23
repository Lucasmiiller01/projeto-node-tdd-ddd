import { Request, Response } from "express";

import CreateUserService from "@modules/users/services/CreateUserService";
import { container } from "tsyringe";
//index, create, show, delete, update
export default class UsersController {
  public async create(request: Request, response: Response):Promise<Response> {
    const { email, password, name } = request.body;

    const createUser =  container.resolve(CreateUserService);

    const user = await createUser.execute({ email, password, name });

   // delete user.password;

    return response.send(user);
  }
}
