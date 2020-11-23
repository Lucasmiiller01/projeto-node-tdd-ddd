import Appointment from "../infra/typeorm/entities/Appointment";
import { startOfHour } from "date-fns";
import AppError from "@shared/errors/AppError";
import IAppointmentsReposity from "../repositories/IAppointmentsRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  provider_id: string;
  date: Date;
}
/**
 * Dependency Inversion (SOLID)
 * DRY: Don't repeat Yourself
 */
@injectable()
class CreateAppointmentService {
  constructor(@inject("AppointmentsRepository") private appointmentsRepository: IAppointmentsReposity){}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked.");
    }
    const appointment = await this.appointmentsRepository.create({ provider_id, date: appointmentDate });

    return appointment;
  }

}


export default CreateAppointmentService;
