module.exports = (sequelize, Datatypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: Datatypes.DATE
  })

  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { foreingKey: 'user_id' })
    Appointment.belongsTo(models.User, { foreingKey: 'provider_id' })
  }

  return Appointment
}
