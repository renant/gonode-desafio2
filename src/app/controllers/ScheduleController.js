const { Appointment, User } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class ScheduleController {
  async index (req, res) {
    return res.render('schedule/schedules')
  }

  async scheduled (req, res) {
    const date = moment(parseInt(req.query.date))

    let appointments = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    appointments = appointments.map(appointment => {
      appointment.hour = moment(appointment.date).format('HH:mm')
      return appointment
    })

    return res.render('schedule/scheduled', { appointments })
  }
}

module.exports = new ScheduleController()
