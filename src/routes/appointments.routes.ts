import { Router } from 'express';

import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentRepository);

	const appointments = await appointmentsRepository.find();

	return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
	try {
		const { provider, date } = request.body;

		const parsedDate = parseISO(date);

		const createAppointment = new CreateAppointmentService();

		const appointment = await createAppointment.execute({
			date: parsedDate,
			provider,
		});

		return response.json(appointment);
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
});

export default appointmentsRouter;
