import FakerUsersRepository from "../repositories/fakes/FakerUsersRepository";
import CreateUserService from "./CreateUserService";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

describe("CreateUser",  () => {
  it("should be able to create a new user", async () => {
    const fakeUsersRepository = new FakerUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: "Jhon Doe",
      email: "jhondoe@exemple.com",
      password: "134"
    });

    expect(user).toHaveProperty("id");
  });
  it("should not be able to create a new user with same email from another", async () => {
    const fakeUsersRepository = new FakerUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);


    await createUser.execute({
      name: "Jhon Doe",
      email: "jhondoe@exemple.com",
      password: "134"
    });

    expect(createUser.execute({
      name: "Jhon Doe",
      email: "jhondoe@exemple.com",
      password: "134"
    })).rejects.toBeInstanceOf(AppError);

  });
});
