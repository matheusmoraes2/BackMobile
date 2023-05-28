const SenhaRepository = require('../repository/SenhaRepository')

class SenhaService{
    async create(payload){

        const ultimaSenha = await SenhaRepository.pegarUltimaSenha()
        let senha
        if(ultimaSenha){
            senha = ultimaSenha.senha + 1
        }else{
            senha = 1
        }
        const entity = {
            tipoSenha: payload.tipoSenha,
            data: new Date(),
            isFoiChamada: false,
            senha: senha
        }

        await SenhaRepository.create(entity)
    }
    async find(tipoSenha){
        const senha = await SenhaRepository.find(tipoSenha)

        await SenhaRepository.updateIsFoiChamada(senha.id)

        return senha
    }

    async findAll(){
        return await SenhaRepository.findAll()
    }
}

module.exports = new SenhaService()