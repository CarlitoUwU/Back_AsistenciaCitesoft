const { WEEKDAY_LIST } = require('../constantes/weekday')

class Attendance {
  constructor () {
    this.id = null
    this.usuario_id = ''
    this.weekday = ''
    this.hora_init = ''
    this.hora_fin = ''
  }

  setWeekday (day) {
    if (!WEEKDAY_LIST.includes(day)) {
      throw new Error('Día de la semana inválido')
    }
    this.weekday = day
  }

  setHoraInit (hora) {
    if (!/^\d{2}:\d{2}$/.test(hora)) {
      throw new Error('Hora de inicio inválida, debe ser en formato HH:MM')
    }

    // Si ya existe hora_fin, validar que la nueva hora_init sea menor que hora_fin
    if (this.hora_fin && !this._isHoraMenor(hora, this.hora_fin)) {
      throw new Error('Hora de inicio debe ser menor que hora de fin')
    }

    this.hora_init = hora
  }

  setHoraFin (hora) {
    if (!/^\d{2}:\d{2}$/.test(hora)) {
      throw new Error('Hora de fin inválida, debe ser en formato HH:MM')
    }

    // Si ya existe hora_init, validar que hora_fin sea mayor que hora_init
    if (this.hora_init && !this._isHoraMayor(hora, this.hora_init)) {
      throw new Error('Hora de fin debe ser mayor que hora de inicio')
    }

    this.hora_fin = hora
  }

  // Método privado para comparar horas (HH:MM)
  _isHoraMenor (hora1, hora2) {
    return this._convertHoraToMinutes(hora1) < this._convertHoraToMinutes(hora2)
  }

  _isHoraMayor (hora1, hora2) {
    return this._convertHoraToMinutes(hora1) > this._convertHoraToMinutes(hora2)
  }

  _convertHoraToMinutes (hora) {
    const [h, m] = hora.split(':').map(Number)
    return h * 60 + m
  }
}

module.exports = Attendance
