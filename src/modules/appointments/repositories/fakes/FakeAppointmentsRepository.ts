import { uuid } from "uuidv4";
import { isEqual } from "date-fns";
import Appointment from "../../infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
// SOLID
class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));
    return findAppointment;
  }

  public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { date, provider_id, id: uuid()});
    this.appointments.push(appointment);
    return appointment;
  }

}

export default AppointmentsRepository;
