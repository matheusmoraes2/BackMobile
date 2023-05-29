const db = require('../infra/models')

class SenhaRepository{
    async create(payload){
        await db.Atendimento.create(payload)
    }

    async pegarUltimaSenha(){
        return await db.Atendimento.findOne({
            order: [ [ 'senha', 'DESC' ]]
        })
    }

    async pegarUltimaSenhaChamada(){
        return await db.Atendimento.findOne({
            where: { 
                isFoiChamada: true,
            },
            order: [ [ 'senha', 'DESC' ]]
        })
    }

    async findAll(){
        return await db.Atendimento.findAll({
            where: {
                isFoiChamada: true
            },
            order: [ [ 'senha', 'DESC' ]],
            limit:5
        })
    }

    async find(tipoSenha){
        return await db.Atendimento.findOne({
            where: { 
                isFoiChamada: false,
                tipoSenha: tipoSenha
            },
            order: [ [ 'senha', 'ASC' ]]
        })
    }

    async updateIsFoiChamada(id){
        await db.Atendimento.update({
            isFoiChamada: true
        },
        {
            where: {
                id: id
            }
        }
        )
    }
}

module.exports = new SenhaRepository()