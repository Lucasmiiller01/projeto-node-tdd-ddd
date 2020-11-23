import { Request, Response } from "express";

import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { container } from "tsyringe";

//index, create, show, delete, update
export default class UserAvatarController {

  public async update(request: Request, response: Response):Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    })
    return response.json(user);

  }
}
