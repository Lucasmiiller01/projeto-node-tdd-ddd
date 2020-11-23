import { Request, Response } from "express";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import { container } from "tsyringe";
//index, create, show, delete, update
export default class SessionsController {
  public async create(request: Request, response: Response):Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser =  container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    return response.send({ user, token });
  }
}
