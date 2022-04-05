import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    //get user_id from headers
    const user_id  = request.header("user-id");


    this.listAllUsersUseCase.execute({user_id});


    return response.status(200).send();
  }
}

export { ListAllUsersController };
