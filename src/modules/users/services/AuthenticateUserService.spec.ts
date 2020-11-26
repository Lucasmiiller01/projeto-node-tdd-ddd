import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";

describe("CreateUser",  () => {
  it("should be able to authenticate", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider );

    const user = await createUser.execute({
      name: "Jhon Doe",
      email: "jhondoe@exemple.com",
      password: "134"
    });

    const response = await authenticateUser.execute({
      email: "jhondoe@exemple.com",
      password: "134"
    })

    expect(response).toHaveProperty("token");
  });


  it("should not be able to authenticate with non existing user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider );



    expect(authenticateUser.execute({
      email: "jhondoe@exemple.com",
      password: "134"
    })).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to authenticate with wrong password", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider );

    const user = await createUser.execute({
      name: "Jhon Doe",
      email: "jhondoe@exemple.com",
      password: "134"
    });


    expect(authenticateUser.execute({
      email: "jhondoe@exemple.com",
      password: "1345"
    })).rejects.toBeInstanceOf(AppError);
  });


});
