const agendamentoModel = require('../models/agendamento');
const disponibilidadeModel = require('../models/disponibilidade')


const diasDaSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado']

function checkDayValid(day) {
    let pattern = /^(0|1|2)[0-9]:[0-5][0-9]-(0|1|2)[0-9]:[0-5][0-9]$/
    let valido = true
    
    for (let interval of day) {
        time = interval.split('-')
        start = time[0]
        end = time[1]
        if (start.split(':')[0]*60 + start.split(':'[1]) > end.split(':')[0]*60 + end.split(':'[1]))
            valido = false

        if (valido && !pattern.test(interval))
            valido = false
    }
    return valido
}

function getMonday(d) {
    d = new Date(d);
    let day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

function isInInterval(time, interval) {
    let intervalTime = interval.split('-')
    let start = intervalTime[0]
    let end = intervalTime[1]
    
    let startMinutes = start.split(':')[0]*60 + start.split(':')[1]
    let endMinutes = end.split(':')[0]*60 + end.split(':')[1]
    let timeMinutes = time.split(':')[0]*60 + time.split(':')[1]

    if (timeMinutes >= startMinutes && timeMinutes <= endMinutes)
        return true
    return false
}

module.exports.criarDisponibilidade = async (req, res) => {
    let disponibilidadeValido = true
    for (let dia of diasDaSemana) {
        if (disponibilidadeValido && !checkDayValid(req.body[dia]))
            disponibilidadeValido = false
    }

    semana = new Date(req.body.semana);
    semana = getMonday(semana)

    try {
        if (!disponibilidadeValido)
            throw 'Formato da disponibilidade está inválido';
        const disponibilidade = new disponibilidadeModel({
            voluntario: req.body.voluntario,
            semana: semana,
            domingo: req.body.domingo,
            segunda: req.body.segunda,
            terca: req.body.terca,
            quarta: req.body.quarta,
            quinta: req.body.quinta,
            sexta: req.body.sexta,
            sabado: req.body.sabado
        });

        const disponibilidadeSalvo = await disponibilidade.save();

        return res.status(200).send(disponibilidadeSalvo);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

module.exports.criarAgendamento = async (req, res) => {
    try {
        // Checando se tem um agendamento disponivel
        let semana = new Date(req.body.data);
        let segunda = semana;
        semana = diasDaSemana[semana.getDay()]

        segunda = getMonday(segunda)
        segunda.setHours(0);
        segunda.setMinutes(0);
        segunda.setSeconds(0);
        segunda.setMilliseconds(0);

        let disponibilidadesSemana = await disponibilidadeModel.find({semana: segunda});

        let disponibilidadesHorario = []

        let horaInicio = new Date(req.body.horaInicio)
        horaInicio = horaInicio.getHours() + ':' + horaInicio.getMinutes()

        let horaFim = new Date(req.body.horaFim)
        horaFim = horaFim.getHours() + ':' + horaFim.getMinutes()
        for (let disponibilidade of disponibilidadesSemana) {
            for (let horario of disponibilidade[semana]) {
                if (isInInterval(horaInicio, horario) && isInInterval(horaFim, horario))
                    disponibilidadesHorario.push(disponibilidade)
            }
        }

        if (disponibilidadesHorario.length === 0)
            return res.status(200).send("Não há nenhum horário disponível");

        disponibilidadeEscolhida = disponibilidadesHorario[0]

        const agendamento = new agendamentoModel({
            voluntario: disponibilidadeEscolhida.voluntario,
            estudante: req.body.estudante,
            data: req.body.data,
            horaInicio: req.body.horaInicio,
            horaFim: req.body.horaFim
        });

        const agendamentoSalvo = await agendamento.save();

        return res.status(200).send(agendamentoSalvo);
    }
    catch(error) {
        console.log(error);
        return res.status(500).send(error);
    }
};